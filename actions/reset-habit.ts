"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUser } from "./get-user";

export async function resetHabit(habitId : Habit['id']){

    const user = await getUser()

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