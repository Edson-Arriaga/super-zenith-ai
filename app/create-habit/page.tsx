"use client"

import { createHabit } from "@/actions/create-habit"
import AppButton from "@/components/AppButton"
import ErrorMessage from "@/components/ErrorMessage"
import Loading from "@/components/Loading"
import NotificationIcon from "@/components/NotificationIcon"
import PageTitle from "@/components/PageTitle"
import { categories } from "@/src/data/categories"
import { weeklyDaysCheckBoxes } from "@/src/dictionaries/weeklyDaysCheckBoxes"
import { AddHabitFormData } from "@/src/schema"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function CreateHabitPage() {

    const [frecuency, setFrecuency] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit , formState: {errors}} = useForm<AddHabitFormData>()
    const router = useRouter()

    async function handleCreateHabitForm(data : AddHabitFormData){
        setIsLoading(true)
        const res = await createHabit(data)
        if(res.success){
            toast.success(res.message, { icon: () => <NotificationIcon />})  
        } else {
            toast.error(res.message)
        }
        router.push('/habit-tracker')
    }

    if(isLoading) return <Loading/>

    return (
        <main>
            <PageTitle>Crea un hábito nuevo</PageTitle>
            <form noValidate className="space-y-5 max-w-sm mx-auto mt-20" onSubmit={handleSubmit(handleCreateHabitForm)}>
                <input 
                    type="text"
                    placeholder="Titulo"
                    className="bg-white/20 rounded-lg w-full p-2 border border-white/50 text-white placeholder:text-gray-400"
                    {...register('title', {
                        required: 'El titulo es obligatorio'
                    })}
                />

                {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}

                <textarea 
                    className="bg-white/20 rounded-lg w-full p-2 border border-white/50 text-white placeholder:text-gray-400"
                    placeholder="Descripción (Opcional)"
                    {...register('description')}
                >
                
                </textarea>

                <select 
                    defaultValue=""
                    className="bg-white/20 rounded-lg w-full p-2 border border-white/50 text-white placeholder:text-gray-400"
                    {...register('category', {
                        required: 'Selecciona una categoria'
                    })}
                >
                    <option className="bg-zenith-yellow text-zenith-purple" value="" disabled>-- Selecciona una categoría --</option>
                    {categories.map(cat => (
                        <option
                            key={cat.id}
                            value={cat.value}
                            className="bg-zenith-yellow text-zenith-purple"
                        >{cat.name}</option>
                    ))}
                </select>

                {errors.category && (
                    <ErrorMessage>{errors.category.message}</ErrorMessage>
                )}
                
                <select 
                    defaultValue=""
                    className="bg-white/20 rounded-lg w-full p-2 border border-white/50 text-white placeholder:text-gray-400"
                    {...register('frequency', {
                        required: 'La frecuencia es obligatoria'
                    })}
                    onChange={e => setFrecuency(e.target.value)}
                >
                    <option className="bg-zenith-yellow text-zenith-purple" value="" disabled>-- Frecuencia --</option>
                    <option className="bg-zenith-yellow text-zenith-purple" value="DAILY">Diario</option>
                    <option className="bg-zenith-yellow text-zenith-purple" value="WEEKLY">Semanal</option>
                </select>

                {errors.frequency && (
                    <ErrorMessage>{errors.frequency.message}</ErrorMessage>
                )}
                
                {frecuency === 'WEEKLY' && (
                    <div className="grid grid-cols-5 place-items-center">
                        {weeklyDaysCheckBoxes.map(weekDay => (
                            <div key={weekDay.value} className="flex gap-2">
                                <label className="text-zenith-yellow font-black" htmlFor={weekDay.day}>{weekDay.day}</label>
                                <input 
                                    id={weekDay.day}
                                    type="checkbox"
                                    {...register('weeklyDays', {
                                        required: 'Selecciona la frecuencia a la semana'
                                    })}
                                    value={weekDay.value}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {errors.weeklyDays && (
                    <ErrorMessage>{errors.weeklyDays.message}</ErrorMessage>
                )}

                <AppButton type='submit'>Crear hábito</AppButton>
            </form>
        </main>
    )
}
