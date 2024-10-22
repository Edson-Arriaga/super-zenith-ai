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

    if(!event) throw new Error("There was an error")

    switch(event.type){
        case 'payment_intent.succeeded':
        case 'invoice.payment_succeeded':
            const user = await prisma.user.findUnique({
                where: { stripeCustomerId: event.data.object.customer as string },
            })

            if (user?.plan !== 'PREMIUM') {
                await prisma.user.update({
                    where: { stripeCustomerId: event.data.object.customer as string },
                    data: { plan: 'PREMIUM' }
                })
            }
            break

        case 'customer.subscription.deleted':
            await prisma.user.update({
                where: {stripeCustomerId: event.data.object.customer as string},
                data: {plan: 'FREE'}
            })

            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({received: true});
}