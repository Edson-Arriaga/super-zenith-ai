import { updateDatesCompleted } from "@/actions/update-day-mompleted"
import { Habit } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { deleteHabit } from "@/actions/delete-habit";
import { resetHabit } from "@/actions/reset-habit";
import { isSameDay } from "../utils/isSameDay";
import NotificationIcon from "@/components/ui/NotificationIcon"

export default function useHabitActions(habit: Habit) {
    const [isConfettiActive, setIsConfettiActive] = useState(false)
    const [newAchievements, setNewAchievements] = useState<number[]>()

    const today = new Date();
    const isTodayCompleted = habit.completedDates.some(date => isSameDay(date, today));

    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutate : updateDatesCompletedMutate, isPending : isPendingUpdate } = useMutation({
        mutationFn: () => updateDatesCompleted(habit, new Date() , new Date().getTimezoneOffset()),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data.message, { icon: () => <NotificationIcon />})
            
            if(!isTodayCompleted) setIsConfettiActive(true)

            if(data.newAchievements.length !== 0){
                const newAchievements = data.newAchievements.join(',')
                router.push(`habit-tracker?achievements=${newAchievements}`)
                setNewAchievements(data.newAchievements)
            }
            
        },
        onError: () => toast.error('Error Al Actualizar El Hábito')
    })

    const { mutate : deleteHabitMutate, isPending : isPendingDelete } = useMutation({
        mutationFn: () => deleteHabit(habit.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data, { icon: () => <NotificationIcon />})
        },
        onError: () => toast.error('Error Al Eliminar El Hábito')
    })

    const { mutate : resetHabitMutate, isPending : isPendingReset} = useMutation({
        mutationFn: () => resetHabit(habit.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data.message, { icon: () => <NotificationIcon />})
            router.push('habit-tracker?achievements=7')
        },
        onError: () => toast.error('Error Al Reiniciar El Hábito')
    })

    const isPending = isPendingUpdate || isPendingDelete || isPendingReset
    
    return {
        updateDatesCompletedMutate,
        deleteHabitMutate,
        resetHabitMutate,
        isPending,
        isConfettiActive,
        setIsConfettiActive,
        newAchievements,
    }
}
