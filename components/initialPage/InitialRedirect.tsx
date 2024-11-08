"use client"

import { User } from "@prisma/client"
import { useRouter } from "next/navigation"

export default function InitialRedirect({userPlan} : {userPlan: User['plan']}) {
    
    const router = useRouter()

    if(userPlan === 'PREMIUM'){
        router.push('/habit-tracker')
    } else {
        router.push('/plans')
    }

    return null
}
