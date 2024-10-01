"use client"

import { motion } from "framer-motion";
import HabitCard from "@/components/habit-tracker/HabitCard";
import { toast } from 'react-toastify';
import Loading from '../ui/Loading';
import { getHabits } from '@/actions/get-habits';
import { useQuery } from '@tanstack/react-query';

export default function HabitsDisplay() {

    const { data , isLoading, isError } = useQuery({
        queryKey: ['habits'],
        queryFn: () => getHabits()
    })
    
    if (isLoading) return <Loading />
    if (isError) toast.error('Error al obtener los hábitos')

    if(data) return (
        <section className="mt-10">
            {data.length ? (
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
            ) : (
                <p className="text-zenith-yellow font-bold text-center">No tienes hábitos planificados aún.</p>
            )}
        </section>
    )
}
