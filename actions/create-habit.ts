"use server"

import prisma from "@/src/lib/prisma"
import { HabitFormData } from "@/src/schema"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function createHabit(data : HabitFormData){
    const clerkUser = await currentUser()

    const user = await prisma.user.findUnique({ where: { clerkId: clerkUser?.id } })

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    let completedAchievement

    if(!user.completedAchievements.includes(0)){
        await prisma.user.update({where: { id: user.id }, data: {
            completedAchievements: [...user.completedAchievements, 0]
        }})
        completedAchievement = 0
        revalidatePath('/achievements')
    }

    await prisma.habit.create({
        data: {
            ...data,
            userId: user.id
        }
    })

    return {
        message: "Habito Creado Correctamente",
        completedAchievement
    }
}