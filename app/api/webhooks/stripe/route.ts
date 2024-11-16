import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY

if(!secretKey) throw new Error('Invalid Stripe Secret Key')
const stripe = new Stripe(secretKey)

export async function POST(request : NextRequest){
    const sig = request.headers.get('stripe-signature')

    if (!sig) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
    }

    const rawBody = await request.text()
    let event

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
        return NextResponse.json({ error: 'Webhook signature verification failed'}, { status: 400 })
    }

    try {
        switch(event.type){
            case 'checkout.session.completed': 
                const session = await stripe.checkout.sessions.retrieve(
                    (event.data.object as Stripe.Checkout.Session).id, {
                        expand: ["line_items"]
                    }
                )

                const metadata = session.metadata

                const customerId = session.customer as string
                const customersDetails = session.customer_details
    
                if(customersDetails?.email){
                    const user = await prisma.user.findUnique({where: {id: +metadata?.userId!}})
                    if(!user) throw new Error('User not found')
    
                    if(!user.stripeCustomerId){
                        await prisma.user.update({
                            where: {id: user.id},
                            data: {stripeCustomerId: customerId}
                        })
                    }
    
                    const lineItems = session.line_items?.data || []
    
                    for(const item of lineItems){
                        const priceId = item.price?.id
    
                        const isSubscription = item.price?.type === 'recurring'
    
                        if(isSubscription){
                            const endDate = new Date()
    
                            if(priceId === process.env.STRIPE_YEARLY_PRICE_ID){
                                endDate.setFullYear(endDate.getFullYear() + 1)
                            } else if(priceId === process.env.STRIPE_MONTHLY_PRICE_ID)
                                endDate.setMonth(endDate.getMonth() + 1)
                            else {
                                throw new Error('Invalid priceId')
                            }
    
                            await prisma.subscription.upsert({
                                where: {userId: user.id},
                                create: {
                                    userId: user.id,
                                    startDate: new Date(),
                                    endDate: endDate,
                                    plan: 'PREMIUM',
                                    period: priceId === process.env.STRIPE_YEARLY_PRICE_ID ? 'YEARLY' : 'MONTHLY'
                                },
                                update: {
                                    startDate: new Date(),
                                    endDate: endDate,
                                    plan: 'PREMIUM',
                                    period: priceId === process.env.STRIPE_YEARLY_PRICE_ID ? 'YEARLY' : 'MONTHLY'
                                }
                            })
    
                            await prisma.user.update({
                                where: { id: user.id },
                                data: { plan: 'PREMIUM', zenithPoints: 10 }
                            })
    
                        } else {
                            // One payment
                        }
                    }
                } 
                break

                case 'customer.subscription.deleted':
                    const subscription = await stripe.subscriptions.retrieve((event.data.object as Stripe.Subscription).id)
                    const user = await prisma.user.findUnique({
                        where: { stripeCustomerId: subscription.customer as string}
                    })

                    if(user){
                        await prisma.user.update({
                            where: {id: user.id},
                            data: { plan: 'FREE', zenithPoints: 3}
                        })
                    }else{
                        console.log('User not found for the subscription deleted event')
                        throw new Error('User not found for the subscription deleted event')
                    }

                    break
                
    
                default:
                    console.log(`Unhandled event type ${event.type}`)
            
        }
    } catch (error) {
        console.log('Error handling event', error)
        return new Response('Webhook error', {status: 400})
    }

    return new Response('Webhook received', {status: 200})
}