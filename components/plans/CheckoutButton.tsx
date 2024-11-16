"use client"

import { User } from "@prisma/client"
import AppButton from "../ui/AppButton"
import Stripe from "stripe"

type CheckoutButtonProps = {
    priceId? : Stripe.Price['id'], 
    user: User
}

export default function CheckoutButton({priceId, user} : CheckoutButtonProps) {
    
    async function handleClick(){
        const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            body: JSON.stringify({
                priceId,
                userId: user.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        window.location.href = data.url
    }
    
    return (
        <AppButton
            onClick={handleClick}
            disabled={user.plan === 'PREMIUM'}
        >
            {priceId ? (
                <>{user.plan === 'PREMIUM' ? 'Ya Eres Premium' : 'Comprar Ahora'}</>
            ) : (
                <>{user.plan === 'PREMIUM' ? 'Ya Eres Premium' : 'Plan actual'}</>
            )}
        </AppButton>
    )
}
