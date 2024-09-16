"use server"

import prisma from "@/src/lib/prisma"
import { AddHabitFormData } from "@/src/schema"

export async function createHabit(data : AddHabitFormData){
    
    await prisma.habit.create({
        data: {
            ...data,
            userId: 1
        }
    })

    return 'Habito Creado Correctamente'
}