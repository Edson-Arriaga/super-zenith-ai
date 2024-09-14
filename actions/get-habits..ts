"use server"

import prisma from "@/src/lib/prisma"

export async function getHabits(){
    const habits = await prisma.habit.findMany({
        orderBy: {
            createdAt: "asc"
        }
    })
    return habits
}