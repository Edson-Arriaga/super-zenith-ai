"use client"

import { HabitFormData, HabitSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Loading from "../ui/Loading"
import { categories } from "@/src/data/categories"
import { toast } from "react-toastify"
import { createHabit } from "@/actions/create-habit"
import NotificationIcon from "../ui/NotificationIcon"
import ErrorMessage from "../ui/ErrorMessage"
import { weeklyDaysCheckBoxes } from "@/src/dictionaries/weeklyDaysCheckBoxes"
import AppButton from "../ui/AppButton"
import { useMutation } from "@tanstack/react-query"

export default function CreateHabitForm() {

    const [frecuency, setFrecuency] = useState('')
    const { register, handleSubmit , formState: {errors}, setValue} = useForm<HabitFormData>()

    const router = useRouter()

    const {mutate , isPending} = useMutation({
        mutationFn: createHabit,
        onSuccess: (data) => {
            toast.success(data, { icon: () => <NotificationIcon />})
            router.push('/habit-tracker')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    async function handleCreateHabitForm(data : HabitFormData){
        data.weeklyDays = !data.weeklyDays ? [] : data.weeklyDays.map(day => +day)
        
        const result = HabitSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
        } else {
            mutate(result.data)
        }
    }
    
    if(isPending) return <Loading/>
    
    return (
        <form noValidate className="space-y-5 max-w-sm mx-auto" onSubmit={handleSubmit(handleCreateHabitForm)}>
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
                onChange={e => {
                    setFrecuency(e.target.value),
                    setValue('weeklyDays', [])
                }}
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
    )
}
