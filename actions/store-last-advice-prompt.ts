"use server"

import prisma from "@/src/lib/prisma";
import { HabitsAdvice } from "@/src/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function storeLastAdvicePrompt(lastAdvicePrompt: HabitsAdvice){
    const clerkUser = await currentUser()
    if(!clerkUser) throw new Error('Clerk User Not Found')

    await prisma.user.update({
        where: {
            clerkId: clerkUser.id
        },
        data: {
            lastAdvicePrompt
        }
    })

    return 'Se ha guardado tu último prompt correctamente'
}