"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Habit } from "@prisma/client";
import { CgAdd } from "react-icons/cg";
import { CiFilter } from "react-icons/ci";
import HabitCard from "@/components/HabitCard";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { getHabits } from "@/actions/get-habits";

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [isConfettiActive, setIsConfettiActive] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsConfettiActive(false);
        }, 4500);
        
        return () => clearTimeout(timeout);
    }, [isConfettiActive]);

    useEffect(() => {
        async function fetchHabits() {
            const habits = await getHabits();
            setHabits(habits);
        }
        fetchHabits();
    }, [refetch]);

    return (
        <div className="mx-5">
            <h1 className="text-zenith-yellow uppercase text-center font-bold text-5xl py-5">Habit Tracker</h1>
            <main className="max-w-5xl mx-auto">
                <section className="flex justify-between gap-5 cap max-w-3xl mx-auto">
                    <Link
                        href={'/create-habit'}
                        className="flex-grow capitalize text-zenith-purple bg-zenith-yellow py-2 rounded-lg text-center hover:bg-yellow-500 transition-colors"
                        type="button"
                    >
                        <div className="flex items-center justify-center gap-1">
                            <CgAdd className="w-6 h-6" />
                            <p className="font-black text-lg">crear nuevo hábito</p>
                        </div>
                    </Link>
                    <button
                        className="bg-zenith-light-purple px-8 capitalize rounded-lg text-white shadow-sm border-2 border-zenith-yellow"
                        type="button"
                    >  
                        <div className="flex items-center gap-1">
                            <CiFilter className="h-6 w-6" />
                            <p className="text-lg">filtrar</p>
                        </div>
                    </button>
                </section>
                
                <section className="mt-10">
                    <ul className="grid md:grid-cols-2 gap-14">
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
