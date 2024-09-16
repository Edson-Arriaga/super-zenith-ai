"use client";

import { useState, useEffect } from "react";
import { Habit } from "@prisma/client";
import { frequency_ES } from "@/src/locales/frequency";

type MonthCalendarProps = {
  habit: Habit;
  isCalendarActive: boolean;
};

export default function MonthCalendar({ habit, isCalendarActive }: MonthCalendarProps) {
  const defaultDaysToShow = 20; // Mostrar 20 días por defecto
  const [daysToShow, setDaysToShow] = useState<number>(defaultDaysToShow); // Inicialmente 20 días
  const [days, setDays] = useState<{ date: number; month: string; fullDate: string; dayOfWeek: number }[]>([]);
  const [startDayOfWeek, setStartDayOfWeek] = useState<number>(0); // Día de la semana del primer día del mes

  useEffect(() => {
    // Calcular días a mostrar en base a la frecuencia y si el calendario está activo
    if (isCalendarActive) {
      if (habit.frequency === 'DAILY') {
        setDaysToShow(66); // Si es diario y el calendario está activo, mostrar 66 días
      } else if (habit.frequency === 'WEEKLY') {
        const weeklyDaysCount = habit.weeklyDays.length; // Contar los días planificados por semana
        const weeksNeeded = Math.ceil(66 / weeklyDaysCount); // Calcular semanas necesarias para 66 días
        const totalDays = weeksNeeded * 7; // Calcular los días totales a mostrar
        setDaysToShow(totalDays); // Ajustar los días a mostrar
      }
    } else {
      setDaysToShow(defaultDaysToShow); // Si no está activo, mostrar solo 20 días
    }

    const startDate = new Date(habit.createdAt); // Usar la fecha de creación del hábito como fecha de inicio
    const calculatedDays = Array.from({ length: daysToShow }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0]; // Formato ISO para compararlo con completedDates
      const month = date.toLocaleDateString('es-ES', { month: 'short' }); // Nombre del mes (Ene, Feb, etc.)
      const dayOfWeek = date.getDay(); // Obtener el día de la semana (0=Dom, 1=Lun, etc.)
      return {
        date: date.getDate(),
        month: month,
        fullDate: formattedDate,
        dayOfWeek: dayOfWeek,
      };
    });
    setDays(calculatedDays);

    // Determinar el día de la semana del primer día del período
    const firstDay = new Date(startDate);
    firstDay.setDate(startDate.getDate()); // Primero del mes actual
    setStartDayOfWeek(firstDay.getDay()); // Día de la semana (0=Dom, 1=Lun, etc.)
  }, [habit.createdAt, isCalendarActive, daysToShow]);

  // Crear celdas vacías para los días anteriores al primer día del período
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);

  // Obtener la fecha actual en formato 'yyyy-mm-dd'
  const currentDate = new Date().toLocaleDateString('en-CA');

  // Función para determinar si un día es parte de los días planificados (para frecuencia semanal)
  const isPlannedDay = (dayOfWeek: number) => {
    return habit.frequency === 'WEEKLY' && habit.weeklyDays.includes(dayOfWeek);
  };

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
                ? 'bg-zenith-yellow text-zenith-purple'  // Días completados
                : (habit.frequency === 'DAILY' || isPlannedDay(day.dayOfWeek))
                ? 'bg-black/20 text-zenith-yellow'  // Días planificados o frecuencia diaria
                : 'bg-white/10 text-white'
            } ${ day.fullDate === currentDate
                ? 'ring-2 ring-zenith-yellow'  // Día actual con borde diferenciado
                : ''
            }`}
          >
            {day.date}
          </div>
        ))}

      </div>
    </div>
  );
}
