"use server"

import prisma from "@/src/lib/prisma"
import { HabitFormData } from "@/src/schema"
import { currentUser } from "@clerk/nextjs/server"

export async function createHabit(data : HabitFormData){
    try {
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
                userId: user.id
            }
        })
        return { success: true, message: 'Habito Creado Correctamente'}
    } catch (error) {
        return { success: false, message: 'Error Al Crear El hábito'}
    }
}