import { getUser } from '@/actions/get-user';
import CheckoutButton from '@/components/plans/CheckoutButton';
import PlanFeature from '@/components/plans/PlanFeature';
import PageTitle from '@/components/ui/PageTitle';
import React from 'react'
import {Stripe} from 'stripe';

async function getStipePlans(){
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) throw new Error('No pudimos encontrar la clave de stripe');

    const stripe = new Stripe(secretKey)  
    const plans = await stripe.prices.list()
    const orderedPlans = plans.data.sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
    
    return orderedPlans
}

export default async function PlansPage() {
    
    const plans = await getStipePlans()
    const user = await getUser()
    
    return (
        <main className='items-center justify-center text-white max-w-7xl mx-auto -mb-10'>
            <PageTitle>Planes</PageTitle>
            <ul className='grid grid-cols-2 lg:grid-cols-3 gap-5 text-center'>
                <li className='bg-purple-800 bg-opacity-50 px-4 py-5 rounded-lg flex flex-col justify-between gap-3 border-r-2 border-l-2 border-zenith-yellow hover:scale-[1.02] transition-transform'>
                    <h1 className='text-3xl font-black text-zenith-yellow italic'>Plan Gratis</h1>
                    
                    <p className='text-white text-4xl font-bold'>$ 0 MXN</p>

                    <div className='w-full h-1 bg-zenith-yellow rounded-full'/>

                    <ul className=' p-2 py-5 rounded-lg flex flex-col gap-5'>
                        <PlanFeature>Funciones disponibles</PlanFeature>
                        <PlanFeature>Funciones disponibles</PlanFeature>
                        <PlanFeature>Funciones disponibles</PlanFeature>
                        <PlanFeature>Funciones disponibles</PlanFeature>
                        <PlanFeature>Funciones disponibles</PlanFeature>
                    </ul>

                    <button
                        className='w-full text-base xl:text-lg capitalize text-zenith-yellow py-3 rounded-lg text-center border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all font-black opacity-50'
                        disabled
                    >{user.plan === 'PREMIUM' ? 'Ya eres premium' : 'Plan Actual'}</button>
                </li>

                {plans.map(plan => (
                    <li 
                        key={plan.id}
                        className='bg-purple-800 bg-opacity-50 px-4 py-5 rounded-lg flex flex-col justify-between gap-3 border-r-2 border-l-2 border-zenith-yellow hover:scale-[1.02] transition-transform'
                    >
                        <h1 className='text-3xl font-black text-zenith-yellow italic'>{plan.nickname}</h1>
                        <p className='text-white text-4xl font-bold italic'>$ {plan.unit_amount! / 100} <span className='uppercase'>{plan.currency}</span></p>
                        
                        <div className='w-full h-1 bg-zenith-yellow rounded-full'/>

                        <ul className=' p-2 py-5 rounded-lg flex flex-col gap-5'>
                            <PlanFeature>Funciones disponibles</PlanFeature>
                            <PlanFeature>Funciones disponibles</PlanFeature>
                            <PlanFeature>Funciones disponibles</PlanFeature>
                            <PlanFeature>Funciones disponibles</PlanFeature>
                            <PlanFeature>Funciones disponibles</PlanFeature>
                        </ul>
                        
                        <CheckoutButton planId={plan.id} isRecurring={plan.recurring ? true : false} planUser={user.plan}/>
                    </li>
                ))}
            </ul>
        </main>
    )
}
