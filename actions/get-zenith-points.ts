"use server"

import prisma from "@/src/lib/prisma";
import { getUser } from "./get-user";

export default async function getZenithPoints(today: Date){
    const user = await getUser()
    let userPoints = user.zenithPoints

    if(user.zenithPointsLastDepletionDate){
        if((today.getDate() !== user.zenithPointsLastDepletionDate.getDate())){
            userPoints = 3

            await prisma.user.update({
                where: {
                    clerkId: user.clerkId
                },
                data: {
                    zenithPoints: userPoints,
                    zenithPointsLastDepletionDate: null
                }
            })
        }
    }

    return userPoints
}