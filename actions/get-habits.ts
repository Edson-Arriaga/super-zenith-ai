"use server";

import prisma from "@/src/lib/prisma";
import { isSameDay } from "@/src/utils/isSameDay";
import { currentUser } from "@clerk/nextjs/server";
import { Habit } from "@prisma/client";

export async function getHabits(todayClient: string, zoneOff: number) {
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

    const today = new Date(todayClient)

    await Promise.all(
        habits.map(async habit => {
            if (habit.completedDates.length + habit.failedDates.length === habit.plannedDays) {
                await prisma.habit.update({
                    where: { id: habit.id },
                    data: { completed: true }
                })
                return
            }
    
            if (!habit.completed || !habit.forcedRestart) {
                let failedDates : Habit['failedDates'] = []
                
                const startDate = new Date(habit.startDay)
                const timezoneOffset = zoneOff / 60;
                startDate.setHours(startDate.getHours() - timezoneOffset)
                
                const endDate = new Date(today)
                endDate.setDate(endDate.getDate() - 1)
                
                const dateAux = new Date(startDate)
                dateAux.setHours(0, 0, 0, 0)

                console.log(habit.title + ' ' + startDate)
                console.log(habit.title + ' ' + endDate)

                while (dateAux <= endDate) {
                    const isPlanned = habit.frequency === 'DAILY' || (habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(dateAux.getDay()));
                    
                    if (isPlanned && (!habit.completedDates.some(date => isSameDay(date, dateAux)))){
                        failedDates.push(new Date(dateAux.toISOString()))
                    }
                    console.log(failedDates)
                    if(failedDates.length === Math.floor(habit.plannedDays * 0.05)) {
                        habit.forcedRestart = true
                        break
                    }
                    
                    dateAux.setDate(dateAux.getDate() + 1)
                }
                
                
                if (failedDates.length !== habit.failedDates.length) {
                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: { failedDates, forcedRestart: habit.forcedRestart }
                    })
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

        const isCompletedA = a.completedDates.some(date => isSameDay(date, today))
        const isCompletedB = b.completedDates.some(date => isSameDay(date, today))

        if (isPlannedTodayA && !isPlannedTodayB) return -1
        if (!isPlannedTodayA && isPlannedTodayB) return 1

        if (!isCompletedA && isCompletedB) return -1
        if (isCompletedA && !isCompletedB) return 1

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });

    return newHabits
}