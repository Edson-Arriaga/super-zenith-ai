"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";

export async function resetHabit(habitId : Habit['id']){
    try {
        await prisma.habit.update({
            where: {
                id: habitId
            },
            data: {
                startDay: new Date().toLocaleDateString('en-CA'),
                completedDates: [],
                forcedRestart: false,
                failedDates: [],
                completed: false,
                level: 1,
            }
        })
        return { success: true, message: 'Habito Reiniciado Correctamente'}

    } catch (error) {
        return { success: false, message: 'Error Al Reiniciar El Hábito'}
    }
}