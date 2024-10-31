"use server"

import prisma from "@/src/lib/prisma"
import { calcAchievements } from "@/src/utils/calcAchievements"
import { isSameDay } from "@/src/utils/isSameDay"
import { Habit } from "@prisma/client"

export async function updateDatesCompleted(habit: Habit, today: Date, zoneOff: number){
    let uppdatedDates : Habit['completedDates'] = []
    let message : string

    const adjustedDate = new Date(today)
    const timezoneOffset = zoneOff / 60
    adjustedDate.setHours(adjustedDate.getHours() - timezoneOffset)
    adjustedDate.setHours(timezoneOffset, 0, 0, 0)
    
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
        const user = await prisma.user.findUnique({
            where: { id: habit.userId },
            select: { completedAchievements: true, completedHabits: true }
        })

        if(user){
            newAchievements = await calcAchievements({user, habit})
        }

        await prisma.habit.update({
            where: { id: habit.id },
            data: {
                completed: true,
                completedDates: []
            }
        })
    } else {
        await prisma.habit.update({
            where: {
                id: habit.id
            },
            data: {
                completedDates: uppdatedDates,
                longestStreak,
                completed,
                level
            }
        })
    }

    return {
        message,
        newAchievements
    }
}