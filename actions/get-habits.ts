"use server";

import prisma from "@/src/lib/prisma";
import { calcAchievements } from "@/src/utils/calcAchievements";
import { isSameDay } from "@/src/utils/isSameDay";
import { Habit } from "@prisma/client";
import { getUser } from "./get-user";
import updateCompletedHabitHistory from "./update-completed-habit-history";

export async function getHabits(today: Date, zoneOff: number) {
    const user = await getUser()

    const habits = await prisma.habit.findMany({
        where: {
            userId: user.id
        }
    })

    let newAchievements : number[] = []

    const newHabits = await Promise.all(
        habits.map(async habit => {
            if (!habit.completed && !habit.forcedRestart) {
                let failedDates : Habit['failedDates'] = []
                let forcedRestart : Habit['forcedRestart'] = false
                
                const timezoneOffset = zoneOff / 60

                const startDate = new Date(today)
                startDate.setDate(startDate.getDate() - 1)
 
                const endDate = new Date(habit.startDay)
                endDate.setHours(endDate.getHours() - timezoneOffset)

                while (startDate >= endDate) {
                    const isPlanned = habit.frequency === 'DAILY' || (habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(startDate.getDay()));

                    if (isPlanned && !habit.completedDates.some(date => isSameDay(date, startDate))) {
                        failedDates.push(new Date(startDate))
                    }
                    
                    if(failedDates.length === Math.floor((habit.plannedDays * 0.05) + 1)) {
                        forcedRestart = true
                        break
                    }
                    
                    startDate.setDate(startDate.getDate() - 1)
                }
                
                if ((habit.completedDates.length + failedDates.length) === habit.plannedDays && !forcedRestart){
                    newAchievements = await calcAchievements({user, habit})

                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: {
                            completed: true,
                            failedDates,
                            longestStreak: habit.plannedDays,
                            level: 5,
                            completedDates: []
                        }
                    })

                    await updateCompletedHabitHistory(habit)

                    return {...habit, failedDates, completed : true}
                }

                if (failedDates.length !== habit.failedDates.length) {
                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: { failedDates, forcedRestart }
                    })
                    return {...habit, failedDates, forcedRestart}
                }
            }
            return habit
        })
    )

    //SORT HABITS
    const weekDay = today.getDay()

    newHabits.sort((a, b) => {
        const isPlannedTodayA = a.frequency === 'DAILY' || a.weeklyDays.includes(weekDay)
        const isPlannedTodayB = b.frequency === 'DAILY' || b.weeklyDays.includes(weekDay)

        // const isCompletedTodayA = a.completedDates.some(date => isSameDay(date, today))
        // const isCompletedTodayB = b.completedDates.some(date => isSameDay(date, today))

        if (!a.completed && b.completed) return -1
        if (a.completed && !b.completed) return 1
        
        if(!a.forcedRestart && b.forcedRestart) return -1
        if(a.forcedRestart && !b.forcedRestart) return 1

        if (isPlannedTodayA && !isPlannedTodayB) return -1
        if (!isPlannedTodayA && isPlannedTodayB) return 1

        // if (!isCompletedTodayA && isCompletedTodayB) return -1
        // if (isCompletedTodayA && !isCompletedTodayB) return 1

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    
    return {
        newHabits,
        newAchievements
    }
}