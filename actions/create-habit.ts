"use server"

import prisma from "@/src/lib/prisma"
import { AddHabitFormData } from "@/src/schema"

export async function createHabit(data : AddHabitFormData){
    
    await prisma.habit.create({
        data: {
            ...data,
            daysPerWeek: data.daysPerWeek ? +data.daysPerWeek : null,
            userId: 1
        }
    })

    return 'Bien'
}