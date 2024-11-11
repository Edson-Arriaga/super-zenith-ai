import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import Modal from "../ui/Modal";
import { Habit } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type HabitDetailsModalProps = {
    isHabitDetailsModalOpen: boolean
    setHabitDetailsModalOpen: Dispatch<SetStateAction<boolean>>
    habit: Habit
}

export default function HabitDetailsModal({isHabitDetailsModalOpen, setHabitDetailsModalOpen, habit}: HabitDetailsModalProps) {
    return (
        <Modal isModalOpen={isHabitDetailsModalOpen} setIsModalOpen={setHabitDetailsModalOpen}>
            <div className="flex flex-col gap-5">
                <h1 className="font-bold text-zenith-yellow capitalize text-xl">{habit.title}</h1>
                <div className="bg-black/30 p-4 rounded-lg">
                    <h2 className="text-white">Descripción:</h2>
                    <p className="text-zenith-yellow text-justify">{habit.description}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg flex items-center justify-between">
                    <p className="text-red-500 font-black text-lg">Fallos cometidos: </p>
                    <div className="w-24">
                        <CircularProgressbarWithChildren value={habit.failedDates.length} maxValue={Math.floor((habit.plannedDays * 0.05 + 1))} styles={buildStyles({pathColor: '#dc2626', trailColor: '#28094f'})}>
                            <div className="text-red-500 text-2xl">
                                <strong>{habit.failedDates.length} / {Math.floor((habit.plannedDays * 0.05) + 1)}</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
                <div className="flex justify-between bg-black/30 p-4 rounded-lg">
                    <h2 className="text-white capitalize">Racha máxima alcanzada: </h2>
                    <p className="font-black text-zenith-yellow">{habit.longestStreak}</p>
                </div>
                <div className="flex justify-between bg-black/30 p-4 rounded-lg">
                    <h2 className="text-white capitalize">Duración: </h2>
                    <p className="font-black text-zenith-yellow">{habit.plannedDays} días</p>
                </div>
            </div>
        </Modal>
    )
}
