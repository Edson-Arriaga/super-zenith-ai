"use server"

import prisma from "@/src/lib/prisma"
import { HabitFormData } from "@/src/schema"
import { revalidatePath } from "next/cache"
import { getUser } from "./get-user"

export async function createHabit(data : HabitFormData){
    const user = await getUser()

    let completedAchievement
    let message
    if(!user.completedAchievements.includes(0)){
        await prisma.user.update({where: { id: user.id }, data: {
            completedAchievements: [...user.completedAchievements, 0]
        }})
        completedAchievement = 0
        revalidatePath('/achievements')
    }

    const habitsLength = await prisma.habit.count({
        where: { userId: user.id }
    })

    if((user.plan === 'PREMIUM' && habitsLength < 10) || (user.plan === 'FREE' && habitsLength < 2)){

        if(user.plan === 'FREE' && (data.plannedDays === 30 || data.plannedDays === 66)){
            message = "No puedes Crear Hábitos con Estos Días Planeados"
        }

        await prisma.habit.create({
            data: {
                ...data,
                userId: user.id
            }
        })

        message = "Habito Creado Correctamente"
    } else {
        message = "Límite de Hábitos Excedido"
    }



    revalidatePath('/habit-tracker')

    return {
        message,
        completedAchievement
    }
}