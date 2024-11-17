import getZenithPoints from "@/actions/get-zenith-points"
import { isUserPremium } from "@/actions/is-user-premium"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function initialRedirect(pathName: string) {
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

    const {data : zenithPoints } = useQuery({
        queryKey: ['zenith-points'],
        queryFn: () => getZenithPoints(new Date().getTimezoneOffset()),
        placeholderData: 0
    })

    return zenithPoints
}
