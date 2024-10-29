import { CgAdd } from "react-icons/cg";
import PageTitle from "@/components/ui/PageTitle";
import AppButton from "@/components/ui/AppButton";
import HabitsDisplay from "@/components/habit-tracker/HabitsDisplay";
import AIButton from "@/components/habit-tracker/AIButton";

export default function HabitTrackerPage() {
    
    return (
        <main>
            <PageTitle>Habit Tracker</PageTitle>
            
                <div className="grid grid-cols-10 mx-auto max-w-52 md:max-w-96 gap-5">
                    <AppButton href="/create-habit" className="col-span-8">
                        <div className="flex items-center justify-center gap-1 h-full">
                            <CgAdd className="w-6 h-6" />
                            <p>crear nuevo hábito</p>
                        </div>
                    </AppButton>

                    <AIButton />
                </div>
                
                <HabitsDisplay />
        </main>
    )
}
