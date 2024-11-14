"use client"

import { getUser } from "@/actions/get-user"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function InitialRedirect() {
    
    const router = useRouter()

    const {data : user} = useQuery({
        queryFn: getUser,
        queryKey: ['user']
    })

    if(user?.plan === 'PREMIUM'){
        router.push('/habit-tracker')
    } else {
        router.push('/plans')
    }

    return null
}
