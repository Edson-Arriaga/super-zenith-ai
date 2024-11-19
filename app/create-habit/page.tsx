import { isUserPremium } from "@/actions/is-user-premium"
import CreateHabitForm from "@/components/create-habit/CreateHabitForm"
import PageTitle from "@/components/ui/PageTitle"

export default async function CreateHabitPage() {

    const user = await isUserPremium()

    return (
        <div className="mb-10">
            <PageTitle>Crea un hábito nuevo</PageTitle>
            <CreateHabitForm isUserPremium={user.isPremium!} />
        </div>
    )
}
