"use client"

import React from 'react'
import AppButton from '../ui/AppButton'
import { User } from '@prisma/client'

type BillingPortalButtonProps = {
    customerId: User['stripeCustomerId']
}

export default function BillingPortalButton({customerId} : BillingPortalButtonProps) {

    async function handleClick(){
        const res = await fetch('/api/stripe/billing-portal', {
            method: 'POST',
            body: JSON.stringify({
                customerId
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
            className='max-w-72 mb-14 lg:mb-0'
            onClick={handleClick}    
        >
            Centro de Facturación
        </AppButton>
    )
}
