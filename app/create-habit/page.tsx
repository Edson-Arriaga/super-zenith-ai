"use client"

import { createHabit } from "@/actions/create-habit"
import ErrorMessage from "@/components/ErrorMessage"
import { categories } from "@/src/data/categories"
import { AddHabitFormData } from "@/src/schema"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function CreateHabitPage() {

    const [frecuency, setFrecuency] = useState('')
    const { register, handleSubmit , formState: {errors}} = useForm<AddHabitFormData>()
    
    async function handleCreateHabitForm(data : AddHabitFormData){
        const response = await createHabit(data)
        console.log(response)
    }

    return (
        <>
            <h1 className="text-zenith-yellow uppercase text-center font-bold text-5xl py-5">crea un nuevo hábito</h1>
            <main className="max-w-sm mx-auto">
                <form noValidate className="space-y-5" onSubmit={handleSubmit(handleCreateHabitForm)}>
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
                        <option className="bg-zenith-yellow text-zenith-purple" value="MONTHLY">Mensual</option>
                    </select>

                    {errors.frequency && (
                        <ErrorMessage>{errors.frequency.message}</ErrorMessage>
                    )}
                    
                    {frecuency === 'WEEKLY' && (
                        <select
                            defaultValue=""
                            className="bg-white/20 rounded-lg w-full p-2 border border-white/50 text-white placeholder:text-gray-400"
                            {...register('daysPerWeek', {
                                required: 'Selecciona la frecuencia a la semana'
                            })}
                        >   
                            <option className="bg-zenith-yellow text-zenith-purple" value="" disabled>-- Veces a la semana --</option>
                            <option className="bg-zenith-yellow text-zenith-purple" value="1">1</option>
                            <option className="bg-zenith-yellow text-zenith-purple" value="2">2</option>
                            <option className="bg-zenith-yellow text-zenith-purple" value="3">3</option>
                            <option className="bg-zenith-yellow text-zenith-purple" value="4">4</option>
                            <option className="bg-zenith-yellow text-zenith-purple" value="5">5</option>
                            <option className="bg-zenith-yellow text-zenith-purple" value="6">6</option>
                        </select>
                    )}

                    {errors.daysPerWeek && (
                        <ErrorMessage>{errors.daysPerWeek.message}</ErrorMessage>
                    )}

                    <button
                        type="submit"
                        className="w-full capitalize text-zenith-purple bg-zenith-yellow py-3 rounded-lg text-center hover:bg-yellow-500 transition-colors"
                    >
                        crear hábito
                    </button>
                </form>
            </main>
        </>
    )
}
