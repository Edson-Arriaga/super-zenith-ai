"use client";

import { useState, useEffect } from "react";
import { Habit } from "@prisma/client";
import { frequency_ES } from "@/src/locales/frequency";

type MonthCalendarProps = {
  habit: Habit
  isCalendarActive: boolean
}

export default function MonthCalendar({ habit, isCalendarActive }: MonthCalendarProps) {
  const daysToShow = isCalendarActive ? 66 : 20
  const [days, setDays] = useState<{ date: number; month: string; fullDate: string }[]>([]);
  const [startDayOfWeek, setStartDayOfWeek] = useState<number>(0); // Día de la semana del primer día del mes

  useEffect(() => {
    const startDate = new Date(habit.createdAt); // Usar la fecha de creación del hábito como fecha de inicio
    const calculatedDays = Array.from({ length: daysToShow }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0]; // Formato ISO para compararlo con completedDates
      const month = date.toLocaleDateString('es-ES', { month: 'short' }); // Nombre del mes (Ene, Feb, etc.)
      return {
        date: date.getDate(),
        month: month,
        fullDate: formattedDate,
      };
    });
    setDays(calculatedDays);

    // Determinar el día de la semana del primer día del período
    const firstDay = new Date(startDate);
    firstDay.setDate(startDate.getDate()); // Primero del mes actual
    setStartDayOfWeek(firstDay.getDay()); // Día de la semana (0=Dom, 1=Lun, etc.)
  }, [habit.createdAt, isCalendarActive]);

  // Crear celdas vacías para los días anteriores al primer día del período
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);

  return (
    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-zenith-yellow">
          {`${days[0]?.date} ${days[0]?.month} - ${days[daysToShow - 1]?.date} ${days[daysToShow - 1]?.month}`}
        </h3>
        <p>{frequency_ES[habit.frequency]}</p>
      </div>
      <div className="grid grid-cols-7 gap-1 place-items-center">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-zenith-yellow">{day}</div>
        ))}
        {emptyDays.map((_, index) => (
          <div key={index} className="h-8 w-8 rounded-full flex items-center justify-center text-xs bg-white/10 text-white"></div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${
              habit.completedDates.includes(day.fullDate)
                ? 'bg-zenith-yellow text-zenith-purple' 
                : 'bg-white/10 text-white'
            }`}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
}
