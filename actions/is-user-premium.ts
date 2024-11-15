"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "@/src/lib/prisma"

export async function isUserPremium() {
    const {userId} = auth()
    if(!userId) return {success: 'false'}
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { plan: true }})
    if(!user) return {success: 'false'}
    return {success: 'true', isPremium: user.plan === 'PREMIUM'}
}