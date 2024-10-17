import { Habit, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

type calcAchievementsPorps = {
    user: {
        completedHabits: number;
        completedAchievements: number[];
    },
    habit: Habit
} 

export async function calcAchievements({user, habit} : calcAchievementsPorps){
    const newAchievements : User['completedAchievements'] = [];

    switch (user.completedHabits) {
        case 0:
            if(!user.completedAchievements.includes(1))
                newAchievements.push(1)
            break
        case 4:
            if(!user.completedAchievements.includes(8))
                newAchievements.push(8)
            break
        case 9:
            if(!user.completedAchievements.includes(9))
                newAchievements.push(9)
            break
    }

    switch (habit.plannedDays) {
        case 30: 
            if(!user.completedAchievements.includes(2)){
                newAchievements.push(2)
            }
            break;
        case 45:
            if(!user.completedAchievements.includes(3)){
                newAchievements.push(3)
            }
            break;
        case 66:
            if(!user.completedAchievements.includes(4)){
                newAchievements.push(4)
            }
            break;
    }

    switch (habit.frequency) {
        case 'DAILY': 
            if(!user.completedAchievements.includes(5)){
               newAchievements.push(5)
            }
            break;
        case 'WEEKLY':
            if(!user.completedAchievements.includes(6)){
                newAchievements.push(6)
            }
            break;
    }

    const completedAchievements = [...user.completedAchievements, ...newAchievements]

    await prisma.user.update({
        where: { id: habit.userId },
        data: {
            completedAchievements,
            completedHabits: user.completedHabits + 1
        }
    })
    revalidatePath('/achievements')

    return newAchievements
}