'use server'

import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function getHabitHistory(){
    const { userId } = await auth()

    const habitHistory = await prisma.completedHabitHistory.findMany({
        where: {
            user: {
                clerkId: userId!
            } 
        }
    })

    return habitHistory
}