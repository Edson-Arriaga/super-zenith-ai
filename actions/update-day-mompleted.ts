"use server"

import prisma from "@/src/lib/prisma"
import { Habit } from "@prisma/client"

export async function updateDatesCompleted(id: number, completedDates: Habit['completedDates'], today: string){
    let uppdatedDates : Habit['completedDates'] = []
    let message : string

    if(completedDates.some(date => date === today)){
        uppdatedDates = completedDates.filter(date => date !== today)
        message = 'No te desanimes, tu puedes'
    } else {
        uppdatedDates = [...completedDates, today]
        message = 'Felicidades Por Completar Un Hábito Nuevo'
    }

    await prisma.habit.update({
        where: {
            id
        },
        data: {
            completedDates: uppdatedDates
        }
    })

    return { message }
}