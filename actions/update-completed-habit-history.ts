import prisma from "@/src/lib/prisma"
import { Habit } from "@prisma/client"

export default async function updateCompletedHabitHistory(habit: Habit){
    const habitCoincidence = await prisma.completedHabitHistory.findUnique({where: {id: habit.id}})
        
    if(!habitCoincidence){
        await prisma.completedHabitHistory.create({
            data: {
                id: habit.id,
                title: habit.title,
                description: habit.description,
                frequency: habit.frequency,
                category: habit.category,
                plannedDays: habit.plannedDays,
                completedDay: new Date(),
                startDay: habit.startDay,
                weeklyDays: habit.weeklyDays,
                userId: habit.userId
            }
        })
    } else {
        await prisma.completedHabitHistory.update({
            where: { id: habit.id },
            data: {
                timesCompleted: habitCoincidence.timesCompleted + 1
            }
        })
    }
}