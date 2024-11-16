import { User } from "@prisma/client";
import PlanFeature from "./PlanFeature";
import Stripe from "stripe";
import CheckoutButton from "./CheckoutButton";
import { freePlanFeatures, premiumPlanFeatures } from "@/src/data/planFeatures";

type PlanItemListProps = {
    user: User
    price?: Stripe.Price
}

export default function PlanItemList({user, price} : PlanItemListProps) {

    const features = price ? premiumPlanFeatures : freePlanFeatures
    const yearlyPlan = price?.id === process.env.STRIPE_YEARLY_PRICE_ID

    return (
        <li className={`relative bg-purple-500 bg-opacity-10 px-4 py-5 rounded-lg flex flex-col justify-between gap-3 duration-300 hover:-translate-y-1 shadow-lg hover:shadow-sm hover:shadow-zenith-yellow hover:scale-[1.01] transition-all ${yearlyPlan && 'lg:scale-105 bg-yellow-600/70 border border-zenith-yellow'}`}>
            <div className='h-32 flex flex-col items-center justify-center gap-3'>
                <h1 className='text-3xl font-black text-zenith-yellow italic'>{price ? 'Plan Super Zenith': 'Plan Gratis'}</h1>
                <p className="font-black text-zenith-yellow -mt-3">{price && price.nickname}</p>
                <p className='text-white text-4xl font-bold italic'>{price ? price.unit_amount! / 100  : '$ 0 MXN'} {price && <span className='uppercase'>{price.currency}</span>}</p>
            </div>

            <div className='w-full h-1 bg-zenith-yellow rounded-full'/>

            {features.map(feature => (
                <ul key={feature.id} className='rounded-lg flex flex-col gap-20 p-2 text-white'>
                    <PlanFeature notIncluded={feature.notIncluded}>{feature.name}</PlanFeature>
                </ul>
            ))}
            
            <CheckoutButton priceId={price?.id} user={user}/>

            <div className="absolute top-10 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"/>
            <div className="absolute top-10 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"/>
        </li>
    )
}
