import { CgAdd } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import PageTitle from "@/components/ui/PageTitle";
import AppButton from "@/components/ui/AppButton";
import HabitsDisplay from "@/components/habit-tracker/HabitsDisplay";

export default function HabitTrackerPage() {
    
    return (
        <>
            <PageTitle>Habit Tracker</PageTitle>
            <div>
                <section className="flex flex-col lg:flex-row justify-between gap-5 max-w-3xl mx-auto">
                    <AppButton href="/create-habit">
                        <div className="flex items-center justify-center gap-1">
                            <CgAdd className="w-6 h-6" />
                            <p>crear nuevo hábito</p>
                        </div>
                    </AppButton>

                    <AppButton type="button">
                        <div className="flex items-center gap-1 justify-center">
                            <CiFilter className="h-6 w-6" />
                            <p>filtrar</p>
                        </div>
                    </AppButton>
                </section>
                
                <HabitsDisplay />
            </div>
        </>
    );
}
