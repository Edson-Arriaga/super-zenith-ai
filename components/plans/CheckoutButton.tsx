import { User } from "@prisma/client"
import AppButton from "../ui/AppButton"
import Stripe from "stripe"

type CheckoutButtonProps = {
    priceId? : Stripe.Price['id'], 
    planUser: User['plan']
}

export default function CheckoutButton({priceId, planUser} : CheckoutButtonProps) {

    let paymentLink
    switch (priceId) {
        case process.env.STRIPE_MONTHLY_PRICE_ID:
            paymentLink = process.env.STRIPE_MONTHLY_PRICE_LINK
            break;
        
        case process.env.STRIPE_YEARLY_PRICE_ID:
            paymentLink = process.env.STRIPE_YEARLY_PRICE_LINK
            break;
    
        default:
            paymentLink = ''
            break;
    }
 
    return (
        <AppButton
            className='w-full text-base xl:text-lg capitalize text-zenith-yellow py-3 rounded-lg text-center lg:hover:scale-[1.025] border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all font-black lg:hover:bg-white/10 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-transparent'
            href={paymentLink}
            disabled={planUser === 'PREMIUM'}
        >
            {paymentLink ? (
                <>{planUser === 'PREMIUM' ? 'Ya Eres Premium' : 'Comprar Ahora'}</>
            ) : (
                <>{planUser === 'PREMIUM' ? 'Ya Eres Premium' : 'Plan actual'}</>
            )}
        </AppButton>
    )
}
