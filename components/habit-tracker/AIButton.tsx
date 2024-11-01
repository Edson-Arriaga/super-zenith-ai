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
import { storeLastAdvicePrompt } from "@/actions/store-last-advice-prompt";
import NotificationIcon from "../ui/NotificationIcon";
import LastPromptAdviceModal from "./LastPromptAdviceModal";
import { JsonValue } from "@prisma/client/runtime/library";

export default function AIButton({habitsIsEmpty} : {habitsIsEmpty: boolean}) {

    const [isLoading, setIsLoading] = useState(false)
    const [isAIModalOpen, setIsAIModalOpen] = useState(false)
    const [isLastPromptAdviceModalOpen, setIsLastPromptAdviceModalOpen] = useState(false)
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
                if(points === 1) {
                    const response = await storeLastAdvicePrompt(data)
                    toast.success(response, { icon: () => <NotificationIcon />})
                }
            } else {
                toast.error('Error, Intenta De Nuevo Más Tarde')
            }
        } else {
            setIsLastPromptAdviceModalOpen(true)
        }
        
        setIsLoading(false)
    }

    return (
        <>
            <AppButton className="w-20 col-span-2 relative disabled:opacity-40 disabled:cursor-not-allowed" onClick={handleClick} disabled={habitsIsEmpty}>
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

            <LastPromptAdviceModal 
                isLastPromptAdviceModalOpen={isLastPromptAdviceModalOpen}
                setIsLastPromptAdviceModalOpen={setIsLastPromptAdviceModalOpen}
            />
        </>
    )
}
