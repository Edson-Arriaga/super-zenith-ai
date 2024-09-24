"use server";

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getHabits() {
    const clerkUser = await currentUser();

    const user = await prisma.user.findUnique({
        where: { clerkId: clerkUser?.id }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const habits = await prisma.habit.findMany({
        where: {
            userId: user.id
        }
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Promise.all(habits.map(async (habit) => {
        if(!habit.completed){ 
            let failedDays = [];
            // One days before today until Created At 
            const startDate = new Date(today);
            startDate.setDate(startDate.getDate() - 1);

            const endDate = new Date(habit.createdAt);
            endDate.setHours(0, 0, 0, 0);
            let dateAux = new Date(startDate);

            while(dateAux >= endDate) {
                const isoDateString = dateAux.toISOString().split('T')[0];

                const isPlanned = habit.frequency === 'DAILY' || (habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(dateAux.getDay()));

                if (isPlanned && (!habit.completedDates.includes(isoDateString)) && (failedDays.length < Math.floor(habit.plannedDays * 0.05))) {
                    failedDays.push(isoDateString);
                }

                dateAux.setDate(dateAux.getDate() - 1);
            }

            let forcedRestart = habit.forcedRestart;
            if(failedDays.length >= Math.floor(habit.plannedDays * 0.05)){
                forcedRestart = true;
            }

            if ((failedDays.length !== habit.failedDays.length || forcedRestart !== habit.forcedRestart)) {
                await prisma.habit.update({
                    where: { id: habit.id },
                    data: { failedDays, forcedRestart }
                });
            }
        }
    }));

    //SORT HABITS
    const isoTodayString = today.toISOString().split('T')[0];
    const weekDay = today.getDay();

    habits.sort((a, b) => {
        const isPlannedTodayA = a.frequency === 'DAILY' || a.weeklyDays.includes(weekDay);
        const isPlannedTodayB = b.frequency === 'DAILY' || b.weeklyDays.includes(weekDay);

        const isCompletedA = a.completedDates.includes(isoTodayString);
        const isCompletedB = b.completedDates.includes(isoTodayString);
        
        if (isPlannedTodayA && !isPlannedTodayB) return -1;
        if (!isPlannedTodayA && isPlannedTodayB) return 1;

        if (!isCompletedA && isCompletedB) return -1;
        if (isCompletedA && !isCompletedB) return 1;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return habits;
}