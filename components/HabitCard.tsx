"use client"

import { toast } from "react-toastify";
import { GoTrash } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { Habit } from "@prisma/client";
import { motion } from "framer-motion";
import MonthCalendar from "./MonthCalendar";
import { updateDatesCompleted } from "@/actions/update-day-mompleted";
import { useState } from "react";
import { categories_ES } from "@/src/locales/categories";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { categoryIcons } from "@/src/dictionaries/categoryIcons";
import { deleteHabit } from "@/actions/delete-habit";
import WarningResetHabit from "./WarningResetHabit";
import AppButton from "./AppButton";
import { resetHabit } from "@/actions/reset-habit";
import NotificationIcon from "./NotificationIcon";
import Modal from "./Modal";
import ConfettiDecor from "./ConfettiDecor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";

type HabitCardProps = {
    habit: Habit, 
}

export default function HabitCard({ habit } : HabitCardProps) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isConfettiActive, setIsConfettiActive] = useState(false)

    const weekDay = new Date().getDay()
    const today = new Date().toLocaleDateString('en-CA')
    const isTodayCompleted = habit.completedDates.includes(today)
    const isPlannedToday = habit.frequency === 'DAILY' || habit.weeklyDays.includes(weekDay);

    const queryClient = useQueryClient()

    const { mutate : updateDatesCompletedMutate, isPending : isPendingUpdate } = useMutation({
        mutationFn: () => updateDatesCompleted(habit),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data, { icon: () => <NotificationIcon />})
            if(!isTodayCompleted) setIsConfettiActive(true)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutate : deleteHabitMutate, isPending : isPendingDelete } = useMutation({
        mutationFn: () => deleteHabit(habit.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data, { icon: () => <NotificationIcon />});
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutate : ResetHabitMutate, isPending : isPendingReset} = useMutation({
        mutationFn: () => resetHabit(habit.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['habits']})
            toast.success(data, { icon: () => <NotificationIcon />});
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    if(isPendingUpdate || isPendingDelete || isPendingReset) return <Loading />;

    return (
        <>
            <motion.li
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1, duration: 0.5 }}
                className={`
                    ${!isPlannedToday && 'opacity-50 scale-95 lg:hover:scale-[0.98]'}
                    ${isTodayCompleted ? 'border-green-600 bg-green-600/20' : 'border-zenith-yellow'}
                    ${habit.completed && 'border-zenith-yellow bg-yellow-600/90'}
                    text-white p-5 rounded-lg transition-all lg:hover:scale-[1.02] ease border-x-2`}
            >
                <div className="flex gap-3 items-center">
                    <h1 className={`${habit.completed && 'text-zenith-yellow'} flex-grow capitalize text-2xl font-black`}>{habit.title}</h1>
                    <button 
                        className="px-4 py-2 bg-white/15 hover:bg-white/40 transition-colors rounded-lg disabled:cursor-not-allowed"
                        onClick={() => updateDatesCompletedMutate()}
                        disabled={!isPlannedToday || habit.completed}
                    >
                        {isTodayCompleted ? (
                            <RxCross2 className="w-5 h-5"/>
                        ) : (
                            <IoMdCheckmark className="w-5 h-5" />
                        )}
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-500/50 hover:bg-red-500/80 transition-colors rounded-lg"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        <GoTrash className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-4">
                
                        {categoryIcons[habit.category]}
                        
                        <p className="text-zenith-yellow font-black">{categories_ES[habit.category]}</p>
                    </div>
                    <button 
                            className="px-4 py-2 bg-white/15 hover:bg-white/40 transition-colors rounded-lg"
                        >
                            <CgMenuGridO className="w-5 h-5"/>
                    </button>
                </div>
                        
                <div className="w-36 mx-auto pb-5 flex-grow">
                    <CircularProgressbarWithChildren value={habit.completedDates.length} maxValue={habit.plannedDays} styles={buildStyles({pathColor: '#fcc919', trailColor: '#380e6a'})}>
                        <img width={40} height={40} src="/images/zenith-logo.png" alt="Logo Zenith" />
                        <div className="mt-2 text-sm">
                            <strong>{habit.completedDates.length} / {habit.plannedDays}</strong> días
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            
                {habit.forcedRestart ? (
                    <WarningResetHabit habitId={habit.id} />
                ) : (
                    <>
                        {habit.completed ? (
                            <div className="space-y-5">
                                <p className="uppercase text-2xl text-center text-zenith-yellow mt-5 font-black">¡FELICIDADES! Has completado este hábito.</p>
                                <AppButton onClick={ResetHabitMutate} type="button">Volver a comenzar este hábito</AppButton>
                            </div>
                        ) : (
                            <MonthCalendar habit={habit} />
                        )}
                    </>
                )}
            </motion.li>

            <Modal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen}>
                <div className="flex flex-col gap-5 w-full">
                    <p className="text-zenith-yellow font-bold pr-6 text-xl">¿Estás seguro que quieres eliminar el hábito?</p>
                    <AppButton
                        type="button" 
                        onClick={() => {
                            setIsDeleteModalOpen(false)
                            deleteHabitMutate()
                        }}
                    >
                        Eliminar
                    </AppButton>
                </div>
            </Modal>
            {isConfettiActive && <ConfettiDecor isConfettiActive={isConfettiActive} setIsConfettiActive={setIsConfettiActive}/>}
        </>
    )
}
