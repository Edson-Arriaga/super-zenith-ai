"use client"

import { CgAdd } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import HabitCard from "@/components/HabitCard";
import { getHabits } from "@/actions/get-habits";
import PageTitle from "@/components/PageTitle";
import AppButton from "@/components/AppButton";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function HabitTrackerPage() {

    const { data , isLoading, isError } = useQuery({
        queryKey: ['habits'],
        queryFn: () => getHabits()
    })
    
    if (isLoading) return <Loading />
    if (isError) toast.error('Error al obtener los hábitos')
    
    if(data) return (
        <main>
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

                <section className="mt-10">
                    <ul className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-5 xl:gap-8 xl:grid-cols-3">
                        {data.map((habit, i) => (
                            <motion.li
                                key={habit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                />
                            </motion.li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}
