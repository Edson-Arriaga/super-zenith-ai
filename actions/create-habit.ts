"use server"

import prisma from "@/src/lib/prisma"
import { HabitFormData } from "@/src/schema"
import { revalidatePath } from "next/cache"
import { getUser } from "./get-user"

export async function createHabit(data : HabitFormData){
    const user = await getUser()

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

    revalidatePath('/habit-tracker')

    return {
        message: "Habito Creado Correctamente",
        completedAchievement
    }
}