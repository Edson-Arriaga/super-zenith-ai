"use server"

import prisma from "@/src/lib/prisma"
import { Habit } from "@prisma/client"

export async function updateDatesCompleted(id: number, habit: Habit, today: string){
    let uppdatedDates : Habit['completedDates'] = []
    let message : string
    
    if(habit.completedDates.includes(today)){
        uppdatedDates = habit.completedDates.filter(date => date !== today)
        message = 'No te desanimes, tu puedes'
    } else {
        uppdatedDates = [...habit.completedDates, today]
        message = 'Felicidades Por Completar Un Hábito Nuevo'
    }

    let level = habit.level

    const habitComplianceCalc = (percentage : number) => uppdatedDates.length < Math.floor(habit.plannedDays * percentage)
    
    if(habitComplianceCalc(0.25)) level = 1
    else if(habitComplianceCalc(0.50)) level = 2
    else if(habitComplianceCalc(0.75)) level = 3
    else if(habitComplianceCalc(1)) level = 4
    else level = 5

    const longestStreak = (habit.longestStreak < uppdatedDates.length) ? uppdatedDates.length : habit.longestStreak 
    const completed = level === 5
    
    await prisma.habit.update({
        where: {
            id
        },
        data: {
            completedDates: uppdatedDates,
            longestStreak,
            completed,
            level
        }
    })

    return { message }
}