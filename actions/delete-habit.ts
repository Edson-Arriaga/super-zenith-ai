"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";

export async function deleteHabit(id: Habit['id']) {
    await prisma.habit.delete({
        where: {
            id
        }
    })
    return 'Habito Eliminado Correctamente'
}