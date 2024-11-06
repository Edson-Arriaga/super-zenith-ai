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
    const plans = await stripe.prices.list({
        active: true
    })
    const orderedPlans = plans.data.sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
    
    return orderedPlans
}

export default async function PlansPage() {
    
    const plans = await getStipePlans()
    const user = await getUser()
    
    return (
        <div className='max-w-7xl mx-auto mb-10'>
            <PageTitle>Planes</PageTitle>
            <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 text-center'>
                <li className='bg-purple-500 bg-opacity-10 px-4 py-5 rounded-lg flex flex-col justify-between gap-3 hover:scale-[1.01] duration-300 hover:-translate-y-1 shadow-lg hover:shadow-sm hover:shadow-zenith-yellow transition-all'>
                    <div className='h-32 flex flex-col items-center justify-center gap-3'>
                        <h1 className='text-3xl font-black text-zenith-yellow italic'>Plan Gratis</h1>
                        <p className='text-white text-4xl font-bold italic'>$ 0 MXN</p>
                    </div>

                    <div className='w-full h-1 bg-zenith-yellow rounded-full'/>

                    <ul className=' p-2 py-5 rounded-lg flex flex-col gap-3 text-white'>
                        <PlanFeature>Crea un máximo de 2 hábitos</PlanFeature>
                        <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full opacity-50'/>
                        <PlanFeature>3 puntos zenith al día</PlanFeature>
                        <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full opacity-50'/>
                        <PlanFeature>Solo hábitos con una duración de 45 días</PlanFeature>
                        <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full opacity-50'/>
                        <PlanFeature notIncluded>SIN niveles en los hábitos</PlanFeature>
                        <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full opacity-50'/>
                        <PlanFeature notIncluded>SIN historial de hábitos completos</PlanFeature>
                    </ul>

                    <button
                        className='w-full text-base xl:text-lg capitalize text-zenith-yellow py-3 rounded-lg text-center border-t-2 border-b-2 border-r-1 border-l-1 border-zenith-yellow transition-all font-black opacity-50'
                        disabled
                    >{user.plan === 'PREMIUM' ? 'Ya eres premium' : 'Plan Actual'}</button>
                </li>

                {plans.map(plan => (
                    <li 
                        key={plan.id}
                        className='relative bg-purple-500 bg-opacity-10 px-4 py-5 rounded-lg flex flex-col justify-between gap-3 hover:scale-[1.01] duration-300 hover:-translate-y-1 shadow-lg hover:shadow-sm hover:shadow-zenith-yellow transition-all'
                    >
                        <div className='h-32 flex flex-col items-center justify-center gap-3'>
                            <h1 className='text-3xl font-black text-zenith-yellow italic'>{plan.nickname}</h1>
                            <p className='text-white text-4xl font-bold italic'>$ {plan.unit_amount! / 100} <span className='uppercase'>{plan.currency}</span></p>
                        </div>
                        
                        <div className='w-full h-1 bg-zenith-yellow rounded-full'/>

                        <ul className=' p-2 py-5 rounded-lg flex flex-col gap-3 text-white'>
                            <PlanFeature>Crea hasta 10 hábitos</PlanFeature>
                            <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full animate-pulse'/>
                            <PlanFeature>10 puntos zenith al día</PlanFeature>
                            <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full animate-pulse'/>
                            <PlanFeature>Crea hábitos con las 3 duraciones disponibles</PlanFeature>
                            <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full animate-pulse'/>
                            <PlanFeature>Niveles en los hábitos</PlanFeature>
                            <div className='w-1/2 h-[1.5px] bg-zenith-yellow rounded-full animate-pulse'/>
                            <PlanFeature>Historial de hábitos completos</PlanFeature>
                        </ul>
                        
                        <CheckoutButton planId={plan.id} planUser={user.plan}/>
                        <div className="absolute top-10 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute top-10 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
                    </li>
                ))}

            </ul>
        </div>
    )
}
