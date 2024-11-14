'use server'

import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function getHabitsLength(){
    const {userId} = auth()
    
    const habitsLength = await prisma.habit.count({
        where: { user: { clerkId: userId! } }
    })
    return habitsLength
}