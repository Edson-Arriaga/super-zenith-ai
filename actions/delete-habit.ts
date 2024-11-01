"use server"

import prisma from "@/src/lib/prisma";
import { Habit } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteHabit(id: Habit['id']) {
    await prisma.habit.delete({
        where: {
            id
        }
    })

    revalidatePath('/habit-tracker')

    return 'Habito Eliminado Correctamente'
}