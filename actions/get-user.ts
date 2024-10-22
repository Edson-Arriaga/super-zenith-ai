"use server"

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUser(){
    const clerkUser = await currentUser()
    if(!clerkUser) throw new Error('Clerk User not founded')
    const user = await prisma.user.findUnique({where: {clerkId: clerkUser.id}})
    if(!user) throw new Error('User not founded')
    return user
}