"use client"

export default function CheckoutButton({planId, isRecurring} : {planId : string, isRecurring: boolean | null}) {
    const handleClick = async () => {
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
            className='w-full text-base xl:text-lg capitalize text-zenith-yellow py-3 rounded-lg text-center lg:hover:scale-[1.025] border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all font-black lg:hover:bg-white/10'
            onClick={handleClick}
        >Comprar Ahora</button>
    )
}
