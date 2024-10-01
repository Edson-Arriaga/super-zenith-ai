"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";

export async function resetHabit(habitId : Habit['id']){
    await prisma.habit.update({
        where: {
            id: habitId
        },
        data: {
            startDay: new Date().toISOString(),
            completedDates: [],
            forcedRestart: false,
            failedDates: [],
            completed: false,
            level: 1,
        }
    })

    return 'Habito Reiniciado Correctamente'
}