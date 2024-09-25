"use client";

import { useEffect, useState } from "react";
import { Habit } from "@prisma/client";
import { CgAdd } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import HabitCard from "@/components/HabitCard";
import { motion } from "framer-motion";
import { getHabits } from "@/actions/get-habits";
import { useUser } from "@clerk/nextjs";
import PageTitle from "@/components/PageTitle";
import AppButton from "@/components/AppButton";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import ConfettiDecor from "@/components/ConfettiDecor";

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState<Habit[]>([])
    const [refetch, setRefetch] = useState(false)
    const [isConfettiActive, setIsConfettiActive] = useState(false)
    
    const {isLoaded} = useUser()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchHabits() {
            setIsLoading(true)
            const res = await getHabits()
            if(res.success && res.data){
                setHabits(res.data)
                setIsLoading(false)
            } else {
                toast.error(res.message) 
            }
        }
        fetchHabits()
    }, [refetch])
    
    if (isLoading || !isLoaded) return <Loading />
    
    return (
        <main>
            <PageTitle>Habit Tracker</PageTitle>
            <div>
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
                    <ul className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-5 xl:gap-8 xl:grid-cols-3">
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
            </div>

            {isConfettiActive && <ConfettiDecor isConfettiActive={isConfettiActive} setIsConfettiActive={setIsConfettiActive}/>}
        </main>
    );
}
