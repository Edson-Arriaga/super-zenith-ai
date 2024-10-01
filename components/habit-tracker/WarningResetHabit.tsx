import { RiErrorWarningLine } from "react-icons/ri";

import { resetHabit } from "@/actions/reset-habit";
import { Habit } from "@prisma/client";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationIcon from "../ui/NotificationIcon";
import Loading from "../ui/Loading";
import AppButton from "../ui/AppButton";


type WarningResetHabitProps = {
    habitId : Habit['id'], 
}

export default function WarningResetHabit({habitId} : WarningResetHabitProps) {
    const queryClient = useQueryClient()

    const { mutate : ResetHabitMutate, isPending } = useMutation({
        mutationFn: () => resetHabit(habitId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data, { icon: () => <NotificationIcon />});
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if(isPending) return <Loading />

    return (
        <div className="bg-white/10 rounded-lg p-4 flex flex-col gap-5 items-center py-12">
            <p className="text-zenith-yellow font-black text-xl text-center">Haz superado el rango máximo de fallos para este hábito (5%)</p>
            <RiErrorWarningLine className="w-20 h-20 text-zenith-yellow" />
            <AppButton
                type="button"
                onClick={ResetHabitMutate}
            >Reiniciar Hábito</AppButton>
        </div>
    )
}
