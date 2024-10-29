import prisma from '@/src/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export async function POST(request : NextRequest){
    const { planId, isRecurring } = await request.json()

    const secretKey = process.env.STRIPE_SECRET_KEY

    if(!secretKey){
        throw new Error('Stripe Secret Key No Encontrada')
    }

    const stripe = new Stripe(secretKey)

    const clerkUser = await currentUser()
    if(!clerkUser){
        throw new Error('Clerk User no encontrado')
    }

    const session = await stripe.checkout.sessions.create({
        mode: isRecurring ? 'subscription' : 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price: planId,
                quantity: 1
            }
        ],
        success_url: `${process.env.FRONTEND_URL}/successful-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/plans`,
        metadata: {clerkId: clerkUser.id}
    })

    const retrievedSession = await stripe.checkout.sessions.retrieve(session.id)
    console.log(retrievedSession)
    const stripeCustomerId = retrievedSession.customer as string

    await prisma.user.update({
        where: { clerkId: clerkUser.id },
        data: { stripeCustomerId }
    })

    return NextResponse.json({url: session.url})
}