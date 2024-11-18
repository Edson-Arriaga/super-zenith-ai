import getZenithPoints from "@/actions/get-zenith-points"
import { isUserPremium } from "@/actions/is-user-premium"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function usePointsAndRedirect(pathName: string) {
    
    const {data : userPremium } = useQuery({
        queryKey: ['is-user-premium'],
        queryFn: async () => isUserPremium()
    })
    
    const router = useRouter()
    if(pathName === '/'){
        if(userPremium?.isPremium){
            router.push('/habit-tracker')
        } else {
            router.push('/plans')
        }
    }

    const {data : zenithPoints, refetch } = useQuery({
        queryKey: ['zenith-points'],
        queryFn: async () => getZenithPoints(new Date().getTimezoneOffset())
    })

    return {
        zenithPoints,
        refetchZenithPoints: refetch
    }
}
