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
    if(!clerkUser) throw new Error("There was an error")
    const user = await prisma.user.findUnique({where: {clerkId : clerkUser.id}})

    let stripeCustomerId = user?.stripeCustomerId

    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: clerkUser.primaryEmailAddress?.emailAddress,
            name: ''
        })

        stripeCustomerId = customer.id

        await prisma.user.update({
            where: { clerkId: clerkUser.id },
            data: { stripeCustomerId }
        })
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: isRecurring ? 'subscription' : 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price: planId,
                quantity: 1
            }
        ],
        success_url: `${process.env.FRONTEND_URL}/successful-payment`,
        cancel_url: `${process.env.FRONTEND_URL}/plans`
    })

    return NextResponse.json({url: session.url})
}