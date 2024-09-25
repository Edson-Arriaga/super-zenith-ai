import { toast } from "react-toastify";
import { GoTrash } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { Habit } from "@prisma/client";
import MonthCalendar from "./MonthCalendar";
import { updateDatesCompleted } from "@/actions/update-day-mompleted";
import { Dispatch, SetStateAction } from "react";
import { categories_ES } from "@/src/locales/categories";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { categoryIcons } from "@/src/dictionaries/categoryIcons";
import { deleteHabit } from "@/actions/delete-habit";
import WarningResetHabit from "./WarningResetHabit";
import AppButton from "./AppButton";
import { resetHabit } from "@/actions/reset-habit";
import NotificationIcon from "./NotificationIcon";

type HabitCardProps = {
    habit: Habit, 
    setRefetch: Dispatch<SetStateAction<boolean>>, 
    setIsConfettiActive: Dispatch<SetStateAction<boolean>>
}

export default function HabitCard({habit, setRefetch, setIsConfettiActive} : HabitCardProps) {
    
    const weekDay = new Date().getDay()
    const today = new Date().toLocaleDateString('en-CA')

    const isTodayCompleted = habit.completedDates.includes(today)
    const isPlannedToday = habit.frequency === 'DAILY' || habit.weeklyDays.includes(weekDay);

    const updateDatesCompletedHandleClick = async () => {
        const res = await updateDatesCompleted(habit.id, habit, today)
        if(res.success){
            toast.success(res.message, { icon: () => <NotificationIcon />})
            setRefetch(prev => !prev)
            if(!isTodayCompleted) setIsConfettiActive(true)
        } else {
            toast.error(res.message)
        }  
    }

    const deleteHabitHandleClick = async () => {
        const res = await deleteHabit(habit.id)
        if(res.success){
            toast.success(res.message, { icon: () => <NotificationIcon />});
            setRefetch(prev => !prev)
        } else {
            toast.error(res.message)
        }
    }

    const ResetHabithandleClick = async () => {
        const res = await resetHabit(habit.id, new Date().toISOString())
        if(res.success){
            toast.success(res.message, { icon: () => <NotificationIcon />});
            setRefetch(prev => !prev)
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div
            className={`
                ${!isPlannedToday && 'opacity-50 scale-95 hover:scale-[0.98]'}
                ${isTodayCompleted ? 'border-green-600 bg-green-600/20' : 'border-zenith-yellow'}
                ${habit.completed && 'border-zenith-yellow bg-yellow-600/90'}
                text-white p-5 rounded-lg transition-all ease hover:scale-[1.03] border-x-2`}>
            <div className="flex gap-3 items-center">
                <h1 className={`${habit.completed && 'text-zenith-yellow'} flex-grow capitalize text-2xl font-black`}>{habit.title}</h1>
                <button 
                    className="px-4 py-2 bg-white/15 hover:bg-white/40 transition-colors rounded-lg disabled:cursor-not-allowed"
                    onClick={updateDatesCompletedHandleClick}
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
                    onClick={deleteHabitHandleClick}
                >
                    <GoTrash className="w-5 h-5" />
                </button>
            </div>
            <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-4">
                    <div className="scale-150">
                        {categoryIcons[habit.category]}
                    </div>
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
                <WarningResetHabit habitId={habit.id} setRefetch={setRefetch} />
            ) : (
                <>
                    {habit.completed ? (
                        <div className="space-y-5">
                            <p className="uppercase text-2xl text-center text-zenith-yellow mt-5 font-black">¡FELICIDADES! Has completado este hábito.</p>
                            <AppButton onClick={ResetHabithandleClick} type="button">Volver a comenzar este hábito</AppButton>
                        </div>
                    ) : (
                        <MonthCalendar habit={habit} />
                    )}
                </>
            )}

            
        </div>
    )
}
