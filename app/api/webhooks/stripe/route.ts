import prisma from "@/src/lib/prisma";
import { useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
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


    const user = await currentUser()
    if(!user) throw new Error("There was an error")
    

    switch(event.type){
        case 'payment_intent.succeeded':
            prisma.user.update({
                where: {clerkId: user?.id},
                data: {plan: 'PREMIUM'}
            })

            break

        case 'customer.subscription.deleted':
            prisma.user.update({
                where: {clerkId: user?.id},
                data: {plan: 'FREE'}
            })

            break;

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({received: true});
}