import { toast } from "react-toastify";
import { GoTrash } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { PiCalendarCheckLight } from "react-icons/pi";
import { Habit } from "@prisma/client";
import MonthCalendar from "./MonthCalendar";
import { updateDatesCompleted } from "@/actions/update-day-mompleted";
import { Dispatch, SetStateAction, useState } from "react";
import { categories_ES } from "@/src/locales/categories";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { categoryIcons } from "@/src/dictionaries/categoryIcons";

type HabitCardProps = {
    habit: Habit, 
    setRefetch: Dispatch<SetStateAction<boolean>>, 
    setIsConfettiActive: Dispatch<SetStateAction<boolean>>
}

export default function HabitCard({habit, setRefetch, setIsConfettiActive} : HabitCardProps) {
    const today = new Date().toLocaleDateString('en-CA')

    const isCompleted = habit.completedDates.some(date => date === today)

    const [isCalendarActive, setIsCalendarActive] = useState(false)

    const UpdateDatesHandleClick = async () => {
        const response = await updateDatesCompleted(habit.id, habit.completedDates, today)
        toast.success(response.message, {
            icon: () => (
                <div className="scale-150">
                    <img src="/svg/logo.svg" alt="logo zenith" />
                </div>
            )
          });
        setRefetch(prev => !prev)
        if(!isCompleted){
            setIsConfettiActive(true)
        }
    }

    return (
        <div className={`${isCompleted && 'opacity-50 scale-95'} text-white bg-gradient-to-t from-zenith-purple to-zenith-dark-purple p-5 rounded-lg transition-all ease hover:scale-[1.05]`}>
            <div className="flex gap-3 items-center">
                <h1 className="flex-grow capitalize text-2xl font-black">{habit.title}</h1>
                <button 
                    className="px-4 py-2 bg-white/15 hover:bg-white/40 transition-colors rounded-lg"
                    onClick={UpdateDatesHandleClick}
                >
                    {isCompleted ? (
                        <RxCross2 className="w-5 h-5"/>
                    ) : (
                        <IoMdCheckmark className="w-5 h-5" />
                    )}
                </button>
                <button 
                    className="px-4 py-2 bg-red-500/50 hover:bg-red-500/80 transition-colors rounded-lg"
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
                        onClick={() => setIsCalendarActive(prev => !prev)}
                    >
                        <PiCalendarCheckLight className="w-5 h-5"/>
                </button>
            </div>
                    
            <div className="w-36 mx-auto pb-5 flex-grow">
                <CircularProgressbarWithChildren value={habit.completedDates.length} maxValue={66} styles={buildStyles({pathColor: '#fcc919', trailColor: '#7433ca'})}>
                    <img style={{ width: 40, marginTop: -5 }} src="/svg/logo.sv" alt="Logo Zenith" />
                    <div style={{ fontSize: 12, marginTop: 5 }}>
                        <strong>{habit.completedDates.length} / 66</strong> días
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        

            <MonthCalendar habit={habit} isCalendarActive={isCalendarActive} />
        </div>
    )
}
