"use server"

import prisma from "@/src/lib/prisma"
import { Habit } from "@prisma/client"

export async function updateDatesCompleted(habit: Habit){
    let uppdatedDates : Habit['completedDates'] = []
    let message : string

    const today = new Date()
    const todayString = today.toLocaleDateString('en-CA')
    
    if(habit.completedDates.some(date => date.getDate() === today.getDate())){
        uppdatedDates = habit.completedDates.filter(date => date.toLocaleDateString('en-CA') !== todayString)
        message = '¡No te desanimes! ¡Tu Puedes!'
    } else {
        uppdatedDates = [...habit.completedDates, today]
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

    return message
}