"use server"

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Habit } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function resetHabit(habitId : Habit['id']){

    const clerkUser = await currentUser()

    const user = await prisma.user.findUnique({ where: { clerkId: clerkUser?.id } })

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    let completedAchievement

    if(!user.completedAchievements.includes(7)){
        await prisma.user.update({where: { id: user.id }, data: {
            completedAchievements: [...user.completedAchievements, 7]
        }})
        completedAchievement = 7
        revalidatePath('/achievements')
    }

    await prisma.habit.update({
        where: {
            id: habitId
        },
        data: {
            startDay: new Date(),
            completedDates: [],
            forcedRestart: false,
            failedDates: [],
            completed: false,
            level: 1,
        }
    })

    return {
        message: "Habito Reiniciado Correctamente",
        completedAchievement
    }
}