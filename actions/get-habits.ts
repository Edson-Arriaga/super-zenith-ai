"use server";

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getHabits() {

    const clerkUser = await currentUser()

    const user = await prisma.user.findUnique(
        {
            where: { clerkId: clerkUser?.id }
        }
    )

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    const habits = await prisma.habit.findMany({
        where: {
            userId: user.id
        }
    });

    const weekDay = new Date().getDay()
    const today = new Date().toLocaleDateString('en-CA')

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
