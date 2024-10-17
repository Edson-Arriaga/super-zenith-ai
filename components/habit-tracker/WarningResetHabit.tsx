import { RiErrorWarningLine } from "react-icons/ri";

import { UseMutateFunction } from "@tanstack/react-query";
import AppButton from "../ui/AppButton";


type WarningResetHabitProps = {
    resetHabitMutate: UseMutateFunction<{
        message: string;
        completedAchievement: number | undefined;
    }, Error, void, unknown>
}

export default function WarningResetHabit({resetHabitMutate} : WarningResetHabitProps) {

    const handleClick = () => {
        resetHabitMutate()
    }

    return (
        <div className="bg-white/10 rounded-lg p-4 flex flex-col gap-5 items-center py-12">
            <p className="text-zenith-yellow font-black text-xl text-center">Haz superado el rango máximo de fallos para este hábito (5%)</p>
            <RiErrorWarningLine className="w-20 h-20 text-zenith-yellow" />
            <AppButton
                type="button"
                onClick={handleClick}
            >Reiniciar Hábito</AppButton>
        </div>
    )
}
