"use server";

import prisma from "@/src/lib/prisma";

export async function getHabits() {
    const today = new Date().toLocaleDateString('en-CA'); // Fecha actual en formato yyyy-mm-dd

    const habits = await prisma.habit.findMany({
        orderBy: {
            createdAt: "asc"
        }
    });

    // Ordenar los hábitos: los no completados hoy primero, luego los completados hoy
    habits.sort((a, b) => {
        const isCompletedA = a.completedDates.includes(today);
        const isCompletedB = b.completedDates.includes(today);

        // Primero los que no están completados hoy
        if (!isCompletedA && isCompletedB) return -1;
        if (isCompletedA && !isCompletedB) return 1;

        // Si ambos están en el mismo estado (completados o no completados hoy), ordenar por fecha de creación
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return habits;
}
