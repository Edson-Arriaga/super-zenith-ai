"use server";

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Habit } from "@prisma/client";

export async function getHabits() {
    
    const clerkUser = await currentUser()

    const user = await prisma.user.findUnique({
        where: { clerkId: clerkUser?.id }
    })

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    const habits = await prisma.habit.findMany({
        where: {
            userId: user.id
        }
    })


    const today = new Date()
    const todayString = today.toLocaleDateString('en-CA');
    
    await Promise.all(
        habits.map(async habit => {
            if (habit.completedDates.length + habit.failedDates.length === habit.plannedDays) {
                await prisma.habit.update({
                    where: { id: habit.id },
                    data: { completed: true }
                });
                return;
            }
    
            if (!habit.completed || !habit.forcedRestart) {
                let failedDates : Habit['failedDates'] = [];
                const startDate = new Date(today);
                startDate.setHours(0, 0, 0 , -1); // Comenzar desde el día anterior
                
                const endDate = new Date(habit.startDay);

                let dateAux = new Date(startDate);
                
                while (dateAux >= endDate) {
                    // Verificar si la fecha es pasada
                    const isPlanned = habit.frequency === 'DAILY' || (habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(dateAux.getDay()));
                
                    if (isPlanned
                        && (!habit.completedDates.some(date => date.toLocaleDateString() === dateAux.toLocaleDateString())) // Verifica que no esté en completedDates
                        && (failedDates.length < Math.floor(habit.plannedDays * 0.05)) // Verifica que el error sea menor al 5%
                    ) {
                        failedDates.push(new Date(dateAux));
                    }

                    dateAux.setDate(dateAux.getDate() - 1);
                }

    
                let forcedRestart = failedDates.length >= Math.floor(habit.plannedDays * 0.05);
                
                // Actualizar solo si hay cambios en failedDates
                if (failedDates.length !== habit.failedDates.length) {
                    console.log('act')
                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: { failedDates, forcedRestart }
                    });
                }
            }
        })
    );
    

    const newHabits = await prisma.habit.findMany({
        where: {
            userId: user.id
        }
    })
    

    //SORT HABITS
    const weekDay = today.getDay()

    newHabits.sort((a, b) => {
        const isPlannedTodayA = a.frequency === 'DAILY' || a.weeklyDays.includes(weekDay)
        const isPlannedTodayB = b.frequency === 'DAILY' || b.weeklyDays.includes(weekDay)

        const isCompletedA = a.completedDates.some(date => date.toLocaleDateString('en-CA') === todayString)
        const isCompletedB = b.completedDates.some(date => date.toLocaleDateString('en-CA') === todayString)

        if (isPlannedTodayA && !isPlannedTodayB) return -1
        if (!isPlannedTodayA && isPlannedTodayB) return 1

        if (!isCompletedA && isCompletedB) return -1
        if (isCompletedA && !isCompletedB) return 1

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });

    //console.log(newHabits)
    return newHabits
}