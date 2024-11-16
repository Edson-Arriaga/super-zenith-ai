import prisma from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req : NextRequest){

    const {priceId, userId} = await req.json()

    const secretKey = process.env.STRIPE_SECRET_KEY
    if(!secretKey) throw new Error('Invalid Stripe Secret Key')
    const stripe = new Stripe(secretKey)

    const user = await prisma.user.findUnique({
        where: { id: +userId },
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [{
            price: priceId,
            quantity: 1
        }],
        success_url: `${process.env.FRONTEND_URL}/successful-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/plans`,
        metadata: { userId },
        customer: user?.stripeCustomerId ? user.stripeCustomerId : undefined
    })

    return NextResponse.json({url: session.url})
}