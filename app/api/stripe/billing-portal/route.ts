import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { customerId } = await req.json();
    

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) throw new Error('Invalid Stripe Secret Key');
    const stripe = new Stripe(secretKey);

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.FRONTEND_URL}/plans`,
    })

    return NextResponse.json({ url: portalSession.url });
}
