"use server"

import prisma from "@/src/lib/prisma";
import { getUser } from "./get-user";
import { isSameDay } from "@/src/utils/isSameDay";

export default async function getZenithPoints(timezoneOffset : number){
    const user = await getUser()
    let userPoints = user.zenithPoints
    const lastDepletionDate = user.zenithPointsLastDepletionDate
    
    if(lastDepletionDate){
        const today = new Date()
        today.setHours(today.getHours() - (timezoneOffset / 60))

        lastDepletionDate.setHours(lastDepletionDate.getHours() - (timezoneOffset / 60))

        if(!isSameDay(today, lastDepletionDate)){
            if(user.plan === 'PREMIUM'){
                userPoints = 10
            } else {
                userPoints = 3
            }

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