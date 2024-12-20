'use client';

import { useState, useMemo } from "react";
import { Habit } from "@prisma/client";
import { frequency_ES } from "@/src/locales/frequency";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

type MonthCalendarProps = {
  habit: Habit;
};

export default function MonthCalendar({ habit }: MonthCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 1. Cálculo de las fechas planificadas, completadas y fallidas
  const calendarData = useMemo(() => {
    const startDay = new Date(habit.startDay);
    const plannedDates = new Set<string>();
    const currentDate = new Date(startDay);
    let firstPlannedDate: Date | null = null;
    let lastPlannedDate: Date | null = null;
    let plannedDaysCount = 0;

    // Crear las fechas planificadas según la frecuencia del hábito
    while (plannedDaysCount < habit.plannedDays) {
      const isPlannedDay = habit.frequency === "DAILY" || 
        (habit.frequency === "WEEKLY" && habit.weeklyDays.includes(currentDate.getDay()));
      
      if (isPlannedDay) {
        const dateString = currentDate.toLocaleDateString('en-CA');
        plannedDates.add(dateString);

        if (!firstPlannedDate) firstPlannedDate = new Date(currentDate);
        lastPlannedDate = new Date(currentDate);
        plannedDaysCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      plannedDates: Array.from(plannedDates),
      completedDates: new Set(habit.completedDates.map(date => new Date(date).toLocaleDateString('en-CA'))),
      failedDates: new Set(habit.failedDates.map(date => new Date(date).toLocaleDateString('en-CA'))),
      firstPlannedDate,
      lastPlannedDate,
    };
  }, [habit]);

  // 2. Cálculo de los días del mes actual
  const monthDays = useMemo(() => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];
    const today = new Date();

    // Días del mes anterior
    for (let i = 0; i < firstDay.getDay(); i++) {
      const previousDate = new Date(firstDay);
      previousDate.setDate(firstDay.getDate() - (firstDay.getDay() - i));
      days.push({
        date: previousDate.getDate(),
        fullDate: previousDate.toISOString().split('T')[0],
        isPlanned: false,
        isCompleted: false,
        isFailed: false,
        isToday: false,
        isOtherMonth: true, // Indica que pertenece a otro mes
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      days.push({
        date: i,
        fullDate: dateString,
        isPlanned: calendarData.plannedDates.includes(dateString),
        isCompleted: calendarData.completedDates.has(dateString),
        isFailed: calendarData.failedDates.has(dateString),
        isToday: date.toDateString() === today.toDateString(),
        isOtherMonth: false,
      });
    }

    // Días del próximo mes
    for (let i = 1; days.length % 7 !== 0; i++) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(lastDay.getDate() + i);
      days.push({
        date: nextDate.getDate(),
        fullDate: nextDate.toISOString().split('T')[0],
        isPlanned: false,
        isCompleted: false,
        isFailed: false,
        isToday: false,
        isOtherMonth: true,
      });
    }

    return days;
  }, [currentDate, calendarData]);

  // 3. Función para cambiar el mes
  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  // 4. Formateo de las fechas para mostrar en el rango (ejemplo: "3 ene.")
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" }).replace(".", "");
  };

  // 5. Comprobación si el mes actual es el primer o último del rango planificado
  const isFirstMonth = useMemo(() => {
    if (!calendarData.firstPlannedDate) return true;
    return (
      currentDate.getFullYear() === calendarData.firstPlannedDate.getFullYear() &&
      currentDate.getMonth() === calendarData.firstPlannedDate.getMonth()
    );
  }, [currentDate, calendarData.firstPlannedDate]);

  const isLastMonth = useMemo(() => {
    if (!calendarData.lastPlannedDate) return true;
    return (
      currentDate.getFullYear() === calendarData.lastPlannedDate.getFullYear() &&
      currentDate.getMonth() === calendarData.lastPlannedDate.getMonth()
    );
  }, [currentDate, calendarData.lastPlannedDate]);

  // 6. Renderizado del componente de calendario
  return (
    <div>
      <div className="bg-white/5 rounded-lg p-4 z-40">
        {/* Controles de navegación entre meses */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => changeMonth(-1)} 
            className={`text-zenith-yellow w-8 h-8 flex items-center justify-center ${isFirstMonth ? 'invisible' : ''}`}
            disabled={isFirstMonth}
          >
            <BiSolidLeftArrow size={24} />
          </button>
          <h3 className="text-lg font-semibold text-zenith-yellow uppercase">
            {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </h3>
          <button 
            onClick={() => changeMonth(1)} 
            className={`text-zenith-yellow w-8 h-8 flex items-center justify-center ${isLastMonth ? 'invisible' : ''}`}
            disabled={isLastMonth}
          >
            <BiSolidRightArrow size={24} />
          </button>
        </div>

        {/* Frecuencia del hábito */}
        <p className="text-center text-sm text-zenith-yellow mb-2">{frequency_ES[habit.frequency]}</p>

        {/* Renderizado de los días del mes */}
        <div className="grid grid-cols-7 gap-1 place-items-center">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-zenith-yellow">
              {day}
            </div>
          ))}

          {/* Renderizado de cada día del mes (planeado, completado, fallido, etc.) */}
          {monthDays.map((day, index) =>
            day === null ? (
              <div key={index} className="h-8 w-8" />
            ) : (
              <div
                key={index}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${
                  day.isOtherMonth ? "opacity-50" : 
                  day.isCompleted
                    ? "bg-zenith-yellow text-zenith-purple"
                    : day.isFailed
                    ? "bg-red-600/50 text-white"
                    : day.isPlanned
                    ? "bg-black/20 text-zenith-yellow"
                    : "bg-white/10 text-white"
                } ${day.isToday ? "ring-2 ring-zenith-yellow" : ""}`}
              >
                {day.date}
              </div>
            )
          )}
        </div>

        {/* Información adicional: rango de días planificados */}
        <div className="mt-4 text-sm text-zenith-yellow flex justify-between items-center">
          <span>Días planificados: {habit.plannedDays}</span>
          <span>
            {formatDate(calendarData.firstPlannedDate)} - {formatDate(calendarData.lastPlannedDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
