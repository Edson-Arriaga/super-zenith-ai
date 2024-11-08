"use server"

import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getUser(){
    const clerkUser = await currentUser()
    const user = await prisma.user.findUnique({where: {clerkId: clerkUser!.id}})
    if(!user) return redirect('/sign-in')
    
    return user
}