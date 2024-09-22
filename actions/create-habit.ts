"use server"

import prisma from "@/src/lib/prisma"
import { AddHabitFormData } from "@/src/schema"
import { currentUser } from "@clerk/nextjs/server"

export async function createHabit(data : AddHabitFormData){
    
    const clerkUser = await currentUser()

    const user = await prisma.user.findUnique(
        {
            where: { clerkId: clerkUser?.id }
        }
    )

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    await prisma.habit.create({
        data: {
            ...data,
            weeklyDays: data.weeklyDays ? data.weeklyDays.map(day => +day) : undefined,
            userId: user.id
        }
    })

    return 'Habito Creado Correctamente'
}