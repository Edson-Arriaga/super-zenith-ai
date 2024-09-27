"use server";

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { exit } from "process";

export async function getHabits() {
    try {
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
        const todayDateString = today.toLocaleDateString('en-CA')
        
        habits.map(async habit => {
            if(!habit.completed){ 
                let failedDates = habit.failedDates
                                
                const startDate = new Date(today)
                startDate.setDate(startDate.getDate() - 1)
                
                const timeZoneOffset = today.getTimezoneOffset()
                const endDate = new Date(habit.startDay)
                endDate.setMinutes(endDate.getMinutes() + timeZoneOffset)

                let dateAux = new Date(startDate)

                while(dateAux.getDate() >= endDate.getDate()){
                    const isoDateString = dateAux.toLocaleDateString('en-CA')

                    /**
                     * Break because if it coincides with a failed day, 
                     * the process of calculating the failed days prior to that day 
                     * will have already been done before.
                     */
                    if(failedDates.includes(isoDateString)) break 

                    const isPlanned = habit.frequency === 'DAILY' || (habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(dateAux.getDay()))
                    
                    if (isPlanned
                        && (!habit.completedDates.includes(isoDateString)) //Verify if the Date isn't in completedDates
                        && (failedDates.length < Math.floor(habit.plannedDays * 0.05)) //Verify if the error has less than 5% error
                    ) {
                        failedDates.push(isoDateString)
                    }

                    dateAux.setDate(dateAux.getDate() - 1);
                }

                let forcedRestart = habit.forcedRestart
                if(failedDates.length >= Math.floor(habit.plannedDays * 0.05)){
                    forcedRestart = true
                }

                if ((failedDates.length !== habit.failedDates.length || forcedRestart !== habit.forcedRestart)) {
                    await prisma.habit.update({
                        where: { id: habit.id },
                        data: { failedDates, forcedRestart }
                    });
                }
            }
        });

        //SORT HABITS
        const weekDay = today.getDay()

        habits.sort((a, b) => {
            const isPlannedTodayA = a.frequency === 'DAILY' || a.weeklyDays.includes(weekDay)
            const isPlannedTodayB = b.frequency === 'DAILY' || b.weeklyDays.includes(weekDay)

            const isCompletedA = a.completedDates.includes(todayDateString)
            const isCompletedB = b.completedDates.includes(todayDateString)
            
            if (isPlannedTodayA && !isPlannedTodayB) return -1
            if (!isPlannedTodayA && isPlannedTodayB) return 1

            if (!isCompletedA && isCompletedB) return -1
            if (isCompletedA && !isCompletedB) return 1

            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });

        return { success: true, data: habits}
    } catch (error) {
        return { success: false, message: 'Error Al Obtener Los Hábitos'}
    }
}