"use server"

import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUser(){
    const {userId} = await auth()
    if(!userId) throw new Error('clerkUser is required')
    const user = await prisma.user.findUnique( { where: { clerkId: userId } } )
    if(!user) throw new Error('user not found')
    return user
}