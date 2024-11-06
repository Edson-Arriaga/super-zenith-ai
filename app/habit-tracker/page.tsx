import { CgAdd } from "react-icons/cg";
import PageTitle from "@/components/ui/PageTitle";
import AppButton from "@/components/ui/AppButton";
import HabitsDisplay from "@/components/habit-tracker/HabitsDisplay";
import AIButton from "@/components/habit-tracker/AIButton";
import prisma from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

async function isAIButtonDisable(){
    const clerkUser = await currentUser()
    if(!clerkUser) throw new Error('Clerk User Not Found')
    const habitsLength = await prisma.habit.count({
        where: {
            user: {
                clerkId : clerkUser.id
            }
        }
    })
    return habitsLength < 2
}

export default async function HabitTrackerPage() {
    return (
        <div className="mb-10">
            <section className="flex flex-col lg:flex-row justify-between items-center lg:-mb-10 lg:mt-0 gap-5">
                <PageTitle>Habit Tracker</PageTitle>
                
                <div className="grid grid-cols-12 place-items-center gap-5 -mt-5">
                    <AppButton href="/create-habit" className="col-span-9 mx-5 lg:px-10">
                        <div className="flex items-center justify-center gap-1 h-full">
                            <CgAdd className="w-6 h-6" />
                            <p>crear nuevo hábito</p>
                        </div>
                    </AppButton>

                    <AIButton habitsIsEmpty={await isAIButtonDisable()}/>
                </div>
            </section>
                
            <HabitsDisplay />
        </div>
    )
}
