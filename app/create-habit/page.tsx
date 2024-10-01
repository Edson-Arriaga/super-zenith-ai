import CreateHabitForm from "@/components/create-habit/CreateHabitForm"
import PageTitle from "@/components/ui/PageTitle"


export default function CreateHabitPage() {
    return (
        <main>
            <PageTitle>Crea un hábito nuevo</PageTitle>
            <CreateHabitForm />
        </main>
    )
}
