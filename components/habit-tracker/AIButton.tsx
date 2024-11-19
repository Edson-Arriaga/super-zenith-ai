"use client"

import { IoSparklesOutline } from "react-icons/io5";
import generateHabitAdvice from "@/actions/generate-habit-advice";
import { useState } from "react";
import { HabitsAdvice, HabitsAdviceSchema } from "@/src/schema";
import { toast } from "react-toastify";
import LittleLoading from "../ui/LittleLoading";
import AIModal from "./AIModal";
import substractZenithPoint from "@/actions/substract-zenith-point";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { storeLastAdvicePrompt } from "@/actions/store-last-advice-prompt";
import NotificationIcon from "../ui/NotificationIcon";
import LastPromptAdviceModal from "./LastPromptAdviceModal";
import getHabitsLength from "@/actions/get-habits-length";

export default function AIButton() {

    const [isLoading, setIsLoading] = useState(false)
    const [isAIModalOpen, setIsAIModalOpen] = useState(false)
    const [isLastPromptAdviceModalOpen, setIsLastPromptAdviceModalOpen] = useState(false)
    const [habitsAdvice, setHabitsAdvice] = useState<HabitsAdvice>({} as HabitsAdvice)
    const queryClient = useQueryClient()
    
    async function handleClick(){
        setIsLoading(true)
        const points = await substractZenithPoint()
        queryClient.invalidateQueries({queryKey: ['zenith-points']})
        
        if(points !== 0){
            const response = await generateHabitAdvice()
            const habitsAdviceData = JSON.parse(response)
            const {success, data} = HabitsAdviceSchema.safeParse(habitsAdviceData)
            if(success){
                setHabitsAdvice(data)
                setIsAIModalOpen(true)
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
    
    const {data : habitsLength} = useQuery({
        queryFn: () => getHabitsLength(),
        queryKey: ['habits-length']
    })

    if (habitsLength !== undefined) return (
        <>
            <button 
                className="flex justify-center transition-transform rounded-lg h-full relative disabled:opacity-40 disabled:cursor-not-allowed" 
                onClick={handleClick} 
                disabled={habitsLength < 2}
            >
                <div className="relative flex justify-center items-center hover:scale-105 transition-all duration-500 text-zenith-yellow hover:text-zenith-purple hover:bg-yellow-600 hover:bg-opacity-90 h-[20px] w-[20px] p-7 rounded-full border-2 border-dotted border-zenith-yellow hover:border-transparent">
                    {isLoading ? (
                        <LittleLoading/>
                    ) : (
                        <>
                            <IoSparklesOutline className="animate-pulse absolute" size={20}/>
                            <IoSparklesOutline className="animate-ping absolute" size={20}/>
                        </>
                    )}
                </div>
            </button>
        
            <AIModal isAIModalOpen={isAIModalOpen} setIsAIModalOpen={setIsAIModalOpen} habitsAdvice={habitsAdvice}/>

            <LastPromptAdviceModal 
                isLastPromptAdviceModalOpen={isLastPromptAdviceModalOpen}
                setIsLastPromptAdviceModalOpen={setIsLastPromptAdviceModalOpen}
            />
        </>
    )
}
