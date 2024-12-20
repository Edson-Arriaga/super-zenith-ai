"use server"

import prisma from "@/src/lib/prisma"
import { calcAchievements } from "@/src/utils/calcAchievements"
import { isSameDay } from "@/src/utils/isSameDay"
import { Habit } from "@prisma/client"
import updateCompletedHabitHistory from "./update-completed-habit-history"

export async function updateDatesCompleted(habit: Habit, today: Date){
    let uppdatedDates : Habit['completedDates'] = []
    let message : string

    const adjustedDate = new Date(today)
    
    if(habit.completedDates.some(date => isSameDay(date, adjustedDate))){
        uppdatedDates = habit.completedDates.filter(date => !isSameDay(date, adjustedDate))
        message = '¡No te desanimes! ¡Tu Puedes!'
    } else {
        uppdatedDates = [...habit.completedDates, adjustedDate]
        message = '¡Felicidades! ¡Sigue Así!'
    }

    let level = habit.level

    const habitComplianceCalc = (percentage : number) => uppdatedDates.length + habit.failedDates.length < Math.floor(habit.plannedDays * percentage)
    
    if(habitComplianceCalc(0.25)) level = 1
    else if(habitComplianceCalc(0.50)) level = 2
    else if(habitComplianceCalc(0.75)) level = 3
    else if(habitComplianceCalc(1)) level = 4
    else level = 5

    const longestStreak = (habit.longestStreak < uppdatedDates.length) ? uppdatedDates.length : habit.longestStreak 
    const completed = level === 5

    let newAchievements : number[] = []
    //Achievements
    if(completed){
        message = 'Felicidades por haber completado un hábito nuevo.'

        const user = await prisma.user.findUnique({
            where: { id: habit.userId },
            select: { completedAchievements: true, completedHabits: true }
        })

        if(user){
            newAchievements = await calcAchievements({user, habit})
        
            await prisma.habit.update({
                where: { id: habit.id },
                data: {
                    completed: true,
                    longestStreak,
                    level,
                    completedDates: []
                }
            })
            
            //Server validation
            await updateCompletedHabitHistory(habit)   
        }
    } else {
        await prisma.habit.update({
            where: {
                id: habit.id
            },
            data: {
                completedDates: uppdatedDates,
                longestStreak,
                level
            }
        })
    }

    return {
        message,
        newAchievements
    }
}