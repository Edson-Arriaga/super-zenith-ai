"use client"

import { IoSparklesOutline } from "react-icons/io5";
import AppButton from "../ui/AppButton";
import generateHabitAdvice from "@/actions/generate-habit-advice";
import { useState } from "react";
import { HabitsAdvice, HabitsAdviceSchema } from "@/src/schema";
import { toast } from "react-toastify";
import LittleLoading from "../ui/LittleLoading";
import AIModal from "./AIModal";
import substractZenithPoint from "@/actions/substract-zenith-point";
import { useQueryClient } from "@tanstack/react-query";

export default function AIButton() {

    const [isLoading, setIsLoading] = useState(false)
    const [isAIModalOpen, setIsAIModalOpen] = useState(false)
    const [habitsAdvice, setHabitsAdvice] = useState<HabitsAdvice>({} as HabitsAdvice)
    const queryClient = useQueryClient()
    
    async function handleClick(){
        setIsLoading(true)
        const points = await substractZenithPoint()

        if(points !== 0){
            const response = await generateHabitAdvice()
            const habitsAdviceData = JSON.parse(response)
            const {success, data} = HabitsAdviceSchema.safeParse(habitsAdviceData)
            if(success){
                setHabitsAdvice(data)
                setIsAIModalOpen(true)
                queryClient.invalidateQueries({queryKey: ['zenith-points']})
            } else {
                toast.error('Error, Intenta De Nuevo Más Tarde')
            }
        } else {
            toast.error('No Tienes Suficientes Puntos Zenith, espera al día de mañana.')
        }
        
        setIsLoading(false)
    }

    return (
        <>
            <AppButton className="w-20 col-span-2 relative" onClick={handleClick}>
                {isLoading ? (
                    <LittleLoading/>
                ) : (
                    <div className="flex justify-center items-center">
                        <IoSparklesOutline className="animate-pulse absolute"/>
                        <IoSparklesOutline className="animate-ping absolute"/>
                    </div>
                )}
            </AppButton>
        
            <AIModal isAIModalOpen={isAIModalOpen} setIsAIModalOpen={setIsAIModalOpen} habitsAdvice={habitsAdvice}/>
        </>
    )
}
