"use server"

import prisma from "@/src/lib/prisma";
import { HabitsAdvice } from "@/src/schema";
import { auth } from "@clerk/nextjs/server";

export async function storeLastAdvicePrompt(lastAdvicePrompt: HabitsAdvice){
    const {userId} = await auth()

    await prisma.user.update({
        where: { clerkId: userId! },
        data: {
            lastAdvicePrompt
        }
    })

    return 'Se ha guardado tu último prompt correctamente'
}