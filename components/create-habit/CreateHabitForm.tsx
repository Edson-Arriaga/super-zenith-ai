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

    const { mutate , isPending } = useMutation({
        mutationFn: createHabit,
        onSuccess: (data) => {
            toast.success(data.message, { icon: () => <NotificationIcon />})
            if(data.completedAchievement !== undefined){
                router.push(`habit-tracker?achievements=${data.completedAchievement}`)
            } else {
                router.push('/habit-tracker')
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    async function handleCreateHabitForm(data : HabitFormData){
        data.weeklyDays = !data.weeklyDays ? [] : data.weeklyDays.map(day => +day)
        data.plannedDays = +data.plannedDays
        
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
        <form noValidate className="flex flex-col gap-5 max-w-sm mx-auto" onSubmit={handleSubmit(handleCreateHabitForm)}>
            <input 
                type="text"
                placeholder="Titulo"
                className="bg-zenith-dark-purple rounded-lg w-full p-2 border text-white border-zenith-yellow focus:bg-zenith-purple"
                {...register('title', {
                    required: 'El titulo es obligatorio',
                    maxLength: {value: 40, message: 'El titulo debe contener menos de 40 caracteres'}
                })}
            />

            {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}

            <textarea 
                className="bg-zenith-dark-purple rounded-lg w-full p-2 border text-white border-zenith-yellow focus:bg-zenith-purple"
                placeholder="Descripción (Opcional)"
                {...register('description')}
            >
            
            </textarea>

            <select 
                defaultValue=""
                className="bg-zenith-dark-purple rounded-lg w-full p-2 border border-zenith-yellow text-white placeholder:text-gray-400 focus:bg-zenith-purple"
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
                className="bg-zenith-dark-purple rounded-lg w-full p-2 border border-zenith-yellow text-white placeholder:text-gray-400 focus:bg-zenith-purple"
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
                <div className="grid grid-cols-5 gap-4">
                    {weeklyDaysCheckBoxes.map(weekDay => (
                        <div key={weekDay.value} className="flex flex-col items-center">
                            <input 
                                id={weekDay.day}
                                type="checkbox"
                                className="appearance-none w-6 h-6 border border-zenith-yellow rounded-md bg-zenith-dark-purple checked:bg-zenith-yellow checked:border-zenith-purple focus:ring-2 focus:ring-zenith-yellow focus:outline-none transition duration-200 cursor-pointer"
                                {...register('weeklyDays', {
                                    required: 'Selecciona la frecuencia a la semana'
                                })}
                                value={weekDay.value}
                            />
                            <label 
                                htmlFor={weekDay.day} 
                                className="text-zenith-yellow font-bold text-xs mt-2 transition-all hover:text-zenith-purple cursor-pointer">
                                {weekDay.day}
                            </label>
                        </div>
                    ))}
                </div>            
            )}

            {errors.weeklyDays && (
                <ErrorMessage>{errors.weeklyDays.message}</ErrorMessage>
            )}

            <select 
                defaultValue=""
                className="mb-5 bg-zenith-dark-purple rounded-lg w-full p-2 border border-zenith-yellow text-white placeholder:text-gray-400 focus:bg-zenith-purple"
                {...register('plannedDays', {
                    required: 'La duración es obligatoria'
                })}
            >
                <option className="bg-zenith-yellow text-zenith-purple" value="" disabled>-- Duración --</option>
                <option className="bg-zenith-yellow text-zenith-purple" value="30">30 Días (Corta)</option>
                <option className="bg-zenith-yellow text-zenith-purple" value="45">45 Días (Intermedia)</option>
                <option className="bg-zenith-yellow text-zenith-purple" value="66">66 Días (Definitiva)</option>
            </select>

            {errors.plannedDays && (
                <ErrorMessage>{errors.plannedDays.message}</ErrorMessage>
            )}

            <AppButton type='submit'>Crear hábito</AppButton>
        </form>
    )
}
