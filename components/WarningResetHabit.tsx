import { RiErrorWarningLine } from "react-icons/ri";
import AppButton from "./AppButton";
import { resetHabit } from "@/actions/reset-habit";
import { Habit } from "@prisma/client";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

type WarningResetHabitProps = {
    habitId : Habit['id'], 
    setRefetch: Dispatch<SetStateAction<boolean>>
}

export default function WarningResetHabit({habitId, setRefetch} : WarningResetHabitProps) {
    
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);  
    const localDate = newDate.toISOString();

    const handleResetHabitClick = async () => {
        const response = await resetHabit(habitId, localDate) 
        toast.success(response.message)
        setRefetch(prev => !prev)
    }
    
    return (
        <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm flex flex-col gap-5 items-center py-10">
            <p className="text-red-200 font-black text-xl text-center">Haz superado el rango máximo de fallos para este hábito (5%)</p>
            <RiErrorWarningLine className="w-20 h-20 text-zenith-yellow" />
            <AppButton 
                type="button"
                onClick={handleResetHabitClick}
            >Reiniciar Hábito</AppButton>
        </div>
    )
}
