"use client";

import { useEffect, useState } from "react";
import { Habit } from "@prisma/client";
import { CgAdd } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import HabitCard from "@/components/HabitCard";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { getHabits } from "@/actions/get-habits";
import { useUser } from "@clerk/nextjs";
import PageTitle from "@/components/PageTitle";
import AppButton from "@/components/AppButton";
import Loading from "@/components/Loading";

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [refetch, setRefetch] = useState(false)
    const [isConfettiActive, setIsConfettiActive] = useState(false)
    
    const {isLoaded} = useUser()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsConfettiActive(false);
        }, 4500);

        return () => clearTimeout(timeout);
    }, [isConfettiActive]);

    useEffect(() => {
        async function fetchHabits() {
            setIsLoading(true)
            const habits = await getHabits()
            setHabits(habits)
            setIsLoading(false)
        }
        fetchHabits()
    }, [refetch])
    
    if (isLoading || !isLoaded) {
        return <Loading />
    }
    
    return (
        <div className="mx-auto px-5 lg:px-10">
            <PageTitle>Habit Tracker</PageTitle>
            <main className="max-w-5xl mx-auto">
                <section className="flex flex-col lg:flex-row justify-between gap-5 max-w-3xl mx-auto">
                    <AppButton type="button" href="/create-habit">
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
                    <ul className="grid lg:grid-cols-2 gap-14">
                        {habits.map((habit, index) => (
                            <motion.li
                                key={habit.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <HabitCard
                                    habit={habit}
                                    setRefetch={setRefetch}
                                    setIsConfettiActive={setIsConfettiActive}
                                />
                            </motion.li>
                        ))}
                    </ul>
                </section>
            </main>

            {isConfettiActive && (
                <div className="fixed inset-0">
                    <Confetti recycle={false} numberOfPieces={300} wind={0.05}/>
                </div>
            )}
        </div>
    );
}
