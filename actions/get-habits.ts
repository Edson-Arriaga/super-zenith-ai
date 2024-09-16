"use server";

import prisma from "@/src/lib/prisma";

export async function getHabits() {
    const weekDay = new Date().getDay()
    const today = new Date().toLocaleDateString('en-CA'); // Fecha actual en formato yyyy-mm-dd

    const habits = await prisma.habit.findMany();

    habits.sort((a, b) => {
        const isPlannedTodayA = a.frequency === 'DAILY' || a.weeklyDays.includes(weekDay)
        const isPlannedTodayB = b.frequency === 'DAILY' || b.weeklyDays.includes(weekDay)

        const isCompletedA = a.completedDates.includes(today);
        const isCompletedB = b.completedDates.includes(today);

        if(isPlannedTodayA && !isPlannedTodayB) return -1
        if(!isPlannedTodayA && isPlannedTodayB) return 1

        if (!isCompletedA && isCompletedB) return -1
        if (isCompletedA && !isCompletedB) return 1;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return habits;
}
