"use server";

import prisma from "@/src/lib/prisma";
import { calcAchievements } from "@/src/utils/calcAchievements";
import { isSameDay } from "@/src/utils/isSameDay";
import { currentUser } from "@clerk/nextjs/server";
import { Habit } from "@prisma/client";

export async function getHabits(today: Date, zoneOff: number) {
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

    let newAchievements : number[] = []

    await Promise.all(
        habits.map(async habit => {
            if (!habit.completed || !habit.forcedRestart) {
                let failedDates : Habit['failedDates'] = []
                
                const timezoneOffset = zoneOff / 60;

                const startDate = new Date(today)
                startDate.setDate(startDate.getDate() - 1)
                startDate.setHours(startDate.getHours() - timezoneOffset)
                startDate.setHours(timezoneOffset, 0, 0, 0)
    
                const endDate = new Date(habit.startDay)
                endDate.setHours(endDate.getHours() - timezoneOffset)
                endDate.setHours(timezoneOffset, 0, 0, 0)

                while (startDate >= endDate) {
                    const isPlanned = habit.frequency === 'DAILY' || (habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(startDate.getDay()));

                    if (isPlanned && !habit.completedDates.some(date => isSameDay(date, startDate))) {
                        failedDates.push(new Date(startDate))
                    }
                    
                    if(failedDates.length === Math.floor(habit.plannedDays * 0.05)) {
                        habit.forcedRestart = true
                        break
                    }
                    
                    startDate.setDate(startDate.getDate() - 1)
                }
                
                if (habit.completedDates.length + failedDates.length === habit.plannedDays && !habit.forcedRestart && !habit.completed){
                    newAchievements = await calcAchievements({user, habit})

                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: { failedDates, completed: true }
                    })
                    return
                }

                if (failedDates.length !== habit.failedDates.length) {
                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: { failedDates, forcedRestart: habit.forcedRestart }
                    })
                }
            }
        })
    )

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

        if(!a.forcedRestart && b.forcedRestart) return -1
        if(a.forcedRestart && !b.forcedRestart) return 1

        if (!isCompletedA && isCompletedB) return -1
        if (isCompletedA && !isCompletedB) return 1

        if (isPlannedTodayA && !isPlannedTodayB) return -1
        if (!isPlannedTodayA && isPlannedTodayB) return 1

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return {
        newHabits,
        newAchievements
    }
}