import { getUser } from '@/actions/get-user';
import { getStipePrices } from '@/actions/stripe/get-stripe-prices';
import PlanItemList from '@/components/plans/PlanItemList';
import AppButton from '@/components/ui/AppButton';
import PageTitle from '@/components/ui/PageTitle';
import React from 'react'

export default async function PlansPage() {
    
    const user = await getUser()
    const prices = await getStipePrices()
    
    return (
        <div className='max-w-7xl mx-auto mb-10'>

            <div className='flex items-center justify-between'>
                <PageTitle>Planes</PageTitle>

                <AppButton className='max-w-64' href={`${process.env.STRIPE_CUSTOMER_PORTAL}`} >
                    Consultar Plan Actual
                </AppButton>
            </div>

            <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 text-center'>
                <PlanItemList planUser={user.plan}/>

                {prices.map(price => (
                    <PlanItemList key={price.id} planUser={user.plan} price={price}/>
                ))}
            </ul> 
        </div>
    )
}
