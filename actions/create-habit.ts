"use server"

import prisma from "@/src/lib/prisma"
import { AddHabitFormData } from "@/src/schema"

export async function createHabit(data : AddHabitFormData, clerkId: string){
    
    const user = await prisma.user.findUnique(
        {
            where: { clerkId }
        }
    )

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    await prisma.habit.create({
        data: {
            ...data,
            userId: user.id
        }
    })

    return 'Habito Creado Correctamente'
}