"use client"

import { User } from "@prisma/client"
import { useRouter } from "next/navigation"

export default function InitialRedirect({userPlan} : {userPlan: User['plan']}) {

    const router = useRouter()

    if(userPlan === 'PREMIUM'){
        router .push('/habit-tracker')
    } else if(userPlan === 'FREE') {
        router.push('/plans')
    }

    return null
}
