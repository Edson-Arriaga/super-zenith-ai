import { getUser } from '@/actions/get-user';
import { getStipePrices } from '@/actions/stripe/get-stripe-prices';
import BillingPortalButton from '@/components/plans/BillingPortalButton';
import PlanItemList from '@/components/plans/PlanItemList';
import PageTitle from '@/components/ui/PageTitle';
import React from 'react'

export default async function PlansPage() {
    
    const user = await getUser()
    const prices = await getStipePrices()
    
    return (
        <div className='max-w-7xl mx-auto mb-10'>

            <div className={`flex flex-col lg:flex-row items-center ${user.stripeCustomerId  ? 'justify-between' : 'justify-center'}`}>
                <PageTitle>Planes</PageTitle>

                {user.stripeCustomerId && (
                    <BillingPortalButton customerId={user.stripeCustomerId}/>
                )}
            </div>

            <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 text-center'>
                <PlanItemList user={user}/>

                {prices.map(price => (
                    <PlanItemList key={price.id} user={user} price={price}/>
                ))}
            </ul> 
        </div>
    )
}
