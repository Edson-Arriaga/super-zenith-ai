import { CgAdd } from "react-icons/cg";
import PageTitle from "@/components/ui/PageTitle";
import AppButton from "@/components/ui/AppButton";
import HabitsDisplay from "@/components/habit-tracker/HabitsDisplay";

export default function HabitTrackerPage() {
    
    return (
        <main>
            <PageTitle>Habit Tracker</PageTitle>
            
                <div className="flex mx-auto max-w-52 md:max-w-64">
                    <AppButton href="/create-habit">
                        <div className="flex items-center justify-center gap-1">
                            <CgAdd className="w-6 h-6" />
                            <p>crear nuevo hábito</p>
                        </div>
                    </AppButton>
                </div>
                
                <HabitsDisplay />
        </main>
    );
}
