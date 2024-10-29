"use server"

import prisma from "@/src/lib/prisma";
import { getUser } from "./get-user";

export default async function substractZenithPoint(){
    const user = await getUser()

    let newPoints 

    if(user.zenithPoints > 0){
        newPoints = user.zenithPoints - 1

        await prisma.user.update({
            where: {
                clerkId: user.clerkId
            },
            data: {
                zenithPoints: newPoints,
                zenithPointsLastDepletionDate: newPoints === 0 ? new Date() : null
            }
        })
    } else {
        newPoints = 0
    }

    return user.zenithPoints
}