"use server"

import prisma from "@/src/lib/prisma"
import { HabitFormData } from "@/src/schema"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

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
                startDay: new Date().toLocaleDateString('en-CA').toString(),
                userId: user.id
            }
        })

        revalidatePath('/habit-tracker')
        return { success: true, message: 'Habito Creado Correctamente'}
    } catch (error) {
        return { success: false, message: 'Error Al Crear El hábito'}
    }
}