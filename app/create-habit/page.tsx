import CreateHabitForm from "@/components/create-habit/CreateHabitForm"
import PageTitle from "@/components/ui/PageTitle"

export default async function CreateHabitPage() {

    return (
        <div className="mb-10">
            <PageTitle>Crea un hábito nuevo</PageTitle>
            <CreateHabitForm />
        </div>
    )
}
