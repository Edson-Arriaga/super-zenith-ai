"use server"

import prisma from "@/src/lib/prisma"
import { Habit } from "@prisma/client"

export async function updateDatesCompleted(id: number, habit: Habit, today: string){
    let uppdatedDates : Habit['completedDates'] = []
    let message : string
    let level = habit.level
    
    if(habit.completedDates.some(date => date === today)){
        uppdatedDates = habit.completedDates.filter(date => date !== today)
        message = 'No te desanimes, tu puedes'
    } else {
        uppdatedDates = [...habit.completedDates, today]
        message = 'Felicidades Por Completar Un Hábito Nuevo'
    }

    switch (uppdatedDates.length) {
        case 6: level = 1; break;
        case 7: level = 2; break;
        case 21: level = 3; break;
        case 33: level = 4; break;
        case 50: level = 5; break;
        case 66: level = 6; break;
        default: habit.level; break;
    }

    await prisma.habit.update({
        where: {
            id
        },
        data: {
            completedDates: uppdatedDates,
            streak: uppdatedDates.length,
            level
        }
    })

    return { message }
}