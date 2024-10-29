import prisma from "@/src/lib/prisma";
import { User } from "@prisma/client";
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
            await updatePlan('PREMIUM', event.data.object.customer)
            break

        case 'customer.subscription.deleted':
        case 'invoice.payment_failed':
            await updatePlan('FREE', event.data.object.customer)
            break
            
        case 'checkout.session.async_payment_succeeded': 
            const session = event.data.object as Stripe.Checkout.Session;
            const clerkId = session.metadata?.clerkId;
            const stripeCustomerId = session.customer as string;

            if (clerkId && stripeCustomerId) {
                await prisma.user.update({
                    where: { clerkId },
                    data: { stripeCustomerId }
                })
            }
            break
        
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({received: true});
}


async function updatePlan (newPlan: User['plan'], customer: string | Stripe.Customer | Stripe.DeletedCustomer | null){
    const userInvoice = await prisma.user.findUnique({
        where: { stripeCustomerId: customer as string },
    })

    if (userInvoice?.plan !== newPlan) {
        await prisma.user.update({
            where: { stripeCustomerId: customer as string },
            data: { plan: newPlan}
        })
    }
}