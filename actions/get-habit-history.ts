'use server'

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function getHabitHistory(){
    const clerkUser = await currentUser()
    if(!clerkUser) throw new Error('Clerk User Not Found')

    const habitHistory = await prisma.completedHabitHistory.findMany({
        where: {
            user: {
                clerkId: clerkUser.id
            } 
        }
    })

    return habitHistory
}