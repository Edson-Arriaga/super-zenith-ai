import { isUserPremium } from "@/actions/is-user-premium";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRedirect(pathName: string) {
    const router = useRouter()

    const { data: userPremium, isFetched } = useQuery({
        queryKey: ["is-user-premium"],
        queryFn: async () => isUserPremium(),
    })

    useEffect(() => {
        if (isFetched && pathName === "/") {
            if (userPremium?.isPremium) {
                router.push("/habit-tracker")
            } else {
                router.push("/plans")
            }
        }
    }, [pathName, userPremium, isFetched, router])
}
