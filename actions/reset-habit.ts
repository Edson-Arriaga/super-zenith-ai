"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";

export async function resetHabit(habitId : Habit['id'], localDate: string){
    await prisma.habit.update({
        where: {
            id: habitId
        },
        data: {
            createdAt: new Date(localDate),
            completedDates: [],
            forcedRestart: false,
            failedDays: [],
            level: 1,
            streak: 0
        }
    })

    return { message: 'Habito Reiniciado Correctamente'}
}