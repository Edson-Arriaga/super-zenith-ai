"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";

export async function resetHabit(habitId : Habit['id'], utcDate: string){
    await prisma.habit.update({
        where: {
            id: habitId
        },
        data: {
            createdAt: utcDate,
            completedDates: [],
            forcedRestart: false,
            failedDays: [],
            completed: false,
            level: 1,
        }
    })

    return { message: 'Habito Reiniciado Correctamente'}
}