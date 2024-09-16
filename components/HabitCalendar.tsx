"use client";

import { useState, useEffect } from "react";
import { Habit } from "@prisma/client";

const DAYS_TO_SHOW = 7; // Por defecto, muestra los últimos 7 días

export default function HabitCalendar({ habit, daysToShow = DAYS_TO_SHOW }: { habit: Habit; daysToShow?: number }) {
    const [days, setDays] = useState<{ date: Date; day: string; isCompleted: boolean }[]>([]);

    useEffect(() => {
        const today = new Date();
        const calculatedDays = Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - i - 1); // Excluir el día actual (i + 1)

            // Convertir la fecha a formato YYYY-MM-DD para comparar con completedDates
            const formattedDate = date.toISOString().split('T')[0];

            // Checar si el día está completado buscando en habit.completedDates
            const isCompleted = habit.completedDates?.includes(formattedDate);

            return {
                date,
                day: date.toLocaleDateString('es-ES', { weekday: 'short' }),
                isCompleted: !!isCompleted
            };
        }).reverse(); // Invertimos para mostrar la fecha más reciente a la derecha

        setDays(calculatedDays);
    }, [habit, daysToShow]);

    return (
        <div className="flex justify-between mt-2">
            {days.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                    <span className="text-xs mb-1">{day.day}</span>
                    <div
                        className={`w-6 h-6 rounded-full border-2 border-[#f5c924] ${
                        day.isCompleted ? 'bg-[#f5c924]' : 'bg-transparent'
                        }`}
                    />
                </div>
            ))}
        </div>
    );
}
