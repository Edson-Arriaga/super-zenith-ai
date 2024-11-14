"use server"

import prisma from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getUser(){
    const {userId} = auth()
    if(!userId) return redirect('/sign-in')
    const user = await prisma.user.findUnique({where: {clerkId: userId}})
    if(!user) return redirect('/sign-in')
    
    return user
}