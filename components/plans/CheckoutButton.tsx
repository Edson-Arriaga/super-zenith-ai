"use client"

import { User } from "@prisma/client"
import { useState } from "react"
import LittleLoading from "../ui/LittleLoading"

type CheckoutButtonProps = {
    planId : string, 
    isRecurring: boolean | null
    planUser: User['plan']
}

export default function CheckoutButton({planId, isRecurring, planUser} : CheckoutButtonProps) {
    
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        const res = await fetch('/api/stripe/checkout', {
            method: 'POST',
            body: JSON.stringify({
                planId,
                isRecurring
            }),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        window.location.href = data.url
    }

    return (
        <button
            className='w-full text-base xl:text-lg capitalize text-zenith-yellow py-3 rounded-lg text-center lg:hover:scale-[1.025] border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all font-black lg:hover:bg-white/10 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-transparent'
            onClick={handleClick}
            disabled={planUser === 'PREMIUM'}
        >
            {isLoading ? (
                <LittleLoading />
            ): (
                <>
                    {planUser === 'PREMIUM' ? 'Ya Eres Premium' : 'Comprar Ahora'}
                </>
            )}
            
        </button>
    )
}
