"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";

export async function deleteHabit(id: Habit['id']) {
    try {
        await prisma.habit.delete({
            where: {
                id
            }
        })
        return { success: true, message: 'Habito Eliminado Correctamente'}
    } catch (error) {
        return { success: false, message: 'Error Al Eliminar El Hábito'}
    }
}