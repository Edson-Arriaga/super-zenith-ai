import Stripe from "stripe";

export async function getStipePrices(){
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) throw new Error('No pudimos encontrar la clave de stripe');

    const stripe = new Stripe(secretKey)  
    const prices = await stripe.prices.list({
        active: true
    })
    
    return prices.data
}