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
        case 'invoice.payment_succeeded':
            const inv1 = event.data.object
            console.log(`Invoice was successful: ${inv1.id}`);
            break
        
        case 'invoice.payment_failed':
            const inv2 = event.data.object
            console.log(`Invoice payment failed: ${inv2.id}`)
            break

        case 'payment_intent.succeeded':
            const pay1 = event.data.object
            console.log(`Payment was successful: ${pay1.id}`)
            break

        case 'payment_intent.payment_failed':
            const pay2 = event.data.object
            console.log(`Payment failed: ${pay2.id}`)
            break

        case 'customer.subscription.deleted':
            const cus1 = event.data.object
            console.log(`Subsicrion deleted: ${cus1.id}`)
            break;

        case 'customer.subscription.updated':
            
            const cus2 = event.data.object
            console.log(`subscription updated: ${cus2.id}`)
            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({received: true});
}