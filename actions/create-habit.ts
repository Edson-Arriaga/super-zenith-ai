"use server"

import prisma from "@/src/lib/prisma"
import { HabitFormData } from "@/src/schema"
import { currentUser } from "@clerk/nextjs/server"

export async function createHabit(data : HabitFormData){
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
            startDay: new Date().toISOString().split('T')[0],
            userId: user.id
        }
    })

    return 'Habito Creado Correctamente'
}