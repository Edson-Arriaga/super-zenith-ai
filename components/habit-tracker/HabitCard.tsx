"use client"

import { GoTrash } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { Habit } from "@prisma/client";
import MonthCalendar from "./MonthCalendar";
import { useState } from "react";
import { categories_ES } from "@/src/locales/categories";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { categoryIcons } from "@/src/dictionaries/categoryIcons";
import AppButton from "../ui/AppButton";
import ConfettiDecor from "../ui/ConfettiDecor";
import Loading from "../ui/Loading";
import WarningResetHabit from "./WarningResetHabit";
import { isSameDay } from "@/src/utils/isSameDay";
import AchievementModal from "./AchievementModal";
import HabitDetailsModal from "./HabitDetailsModal";
import DeleteModal from "./DeleteModal";
import useHabitActions from "@/src/hooks/useHabitActions";
import Image from "next/image";
import getToday from "@/src/utils/getToday";

export default function HabitCard({ habit } : {habit: Habit}) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isHabitDetailsModalOpen, setHabitDetailsModalOpen] = useState(false)

    const {
        updateDatesCompletedMutate,
        deleteHabitMutate,
        resetHabitMutate,
        isPending,
        isConfettiActive,
        setIsConfettiActive,
        newAchievements,
    } = useHabitActions(habit)

    const today = getToday()
 
    const isTodayCompleted = habit.completedDates.some(date => isSameDay(date, today))
    const isPlannedToday = habit.frequency === 'DAILY' || habit.weeklyDays.includes(today.getDay())

    if(isPending) return <Loading />

    return (
        <>
            <div className={`
                text-white p-5 rounded-lg lg:hover:scale-[1.02] duration-300 shadow-lg transition-all
                ${(!isPlannedToday && !habit.completed && !habit.forcedRestart) && 'opacity-50 scale-95 lg:hover:scale-100'}
                ${isTodayCompleted ? ' bg-green-600/40' : 'bg-purple-500/10'}
                ${habit.completed && ' bg-yellow-600/90'}`}
            >
                <section className="grid grid-cols-6">
                    <article className="space-y-5 col-span-4">
                        <h1 className={`${habit.completed && 'text-zenith-yellow'} flex-grow capitalize text-2xl font-black`}>{habit.title}</h1>
                        <div className="flex items-center gap-4">
                            {categoryIcons[habit.category]}
                            
                            <p className="text-zenith-yellow font-black">{categories_ES[habit.category]}</p>
                        </div>
                    </article>

                    <article className="col-span-2 text-end ml-auto">
                        <div className="grid grid-cols-2 gap-2 w-28">
                            <div className="text-end">
                                <button
                                    className="px-4 py-2 bg-white/15 hover:bg-white/25 transition-colors rounded-lg disabled:cursor-not-allowed "
                                    onClick={() => updateDatesCompletedMutate()}
                                    disabled={!isPlannedToday || habit.completed}
                                >
                                    {isTodayCompleted ? (
                                        <RxCross2 className="w-5 h-5"/>
                                    ) : (
                                        <IoMdCheckmark className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            <div className="text-end">
                                <button
                                    className="px-4 py-2 bg-red-500/50 hover:bg-red-500/80 transition-colors rounded-lg"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                <GoTrash className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="col-start-2 text-end">
                                <button
                                    className="px-4 py-2 bg-white/15 hover:bg-white/25 transition-colors rounded-lg"
                                    onClick={() => setHabitDetailsModalOpen(true)}
                                >
                                    <CgMenuGridO className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    </article>
                </section>
                        
                <div className="w-36 mx-auto pb-5 flex-grow mt-3">
                    <CircularProgressbarWithChildren value={
                        (habit.completed)
                        ? habit.plannedDays
                        : habit.completedDates.length + habit.failedDates.length
                    }
                        maxValue={habit.plannedDays} 
                        styles={buildStyles({pathColor: '#fcc919', trailColor: '#380e6a'})}
                    >
                        <div className="relative w-10 h-10">
                            <Image fill src="/images/zenith-logo.png" alt="Logo Zenith" />
                        </div>
                        <div className="mt-2 text-sm">
                            <strong>{
                                (habit.completed)
                                ? habit.plannedDays
                                : habit.completedDates.length + habit.failedDates.length
                            } / {habit.plannedDays}</strong> días
                        </div>
                    </CircularProgressbarWithChildren>
                </div>    
            
                {habit.forcedRestart ? (
                    <WarningResetHabit resetHabitMutate={resetHabitMutate} />
                ) : (
                    <>
                        {habit.completed ? (
                            <div className="space-y-5">
                                <p className="uppercase text-2xl text-center text-zenith-yellow mt-5 font-black">¡FELICIDADES! Has completado este hábito.</p>
                                <AppButton onClick={resetHabitMutate} type="button">Volver a comenzar este hábito</AppButton>
                            </div>
                        ) : (
                            <MonthCalendar habit={habit} />
                        )}
                    </>
                )}
            </div>
            
            <DeleteModal 
                isDeleteModalOpen={isDeleteModalOpen} 
                setIsDeleteModalOpen={setIsDeleteModalOpen} 
                deleteHabitMutate={deleteHabitMutate}
            />

            <HabitDetailsModal 
                isHabitDetailsModalOpen={isHabitDetailsModalOpen}
                setHabitDetailsModalOpen={setHabitDetailsModalOpen}
                habit={habit}
            />

            {isConfettiActive && (
                <ConfettiDecor isConfettiActive={isConfettiActive} setIsConfettiActive={setIsConfettiActive}/>
            )}
        
            {newAchievements && <AchievementModal/>}
        </>
    )
}
