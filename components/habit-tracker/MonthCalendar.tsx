"use client";

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
    // Obtener la fecha de inicio del hábito
    const startDay = new Date(habit.startDay);

    const plannedDates = new Set<string>();
    const currentDate = new Date(startDay);
    let firstPlannedDate = null;
    let lastPlannedDate = null;
    let plannedDaysCount = 0;

    // Crear las fechas planificadas según la frecuencia del hábito
    while (plannedDaysCount < habit.plannedDays) {
      const isPlannedDay = habit.frequency === "DAILY" || 
        (habit.frequency === "WEEKLY" && habit.weeklyDays.includes(currentDate.getUTCDay()));

      if (isPlannedDay) {
        // Generar la fecha en formato ISO
        const dateString = currentDate.toISOString().split('T')[0];
        plannedDates.add(dateString);
 
        if (!firstPlannedDate) firstPlannedDate = new Date(currentDate);
        lastPlannedDate = new Date(currentDate);
        plannedDaysCount++;
      }

      // Avanzar al siguiente día
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return {
      plannedDates: Array.from(plannedDates),
      completedDates: new Set(habit.completedDates.map(date => date.toISOString().split('T')[0])),
      failedDates: new Set(habit.failedDates.map(date => date.toISOString().split('T')[0])),
      firstPlannedDate,
      lastPlannedDate,
    };
  }, [habit]);

  // 2. Cálculo de los días del mes actual
  const monthDays = useMemo(() => {
    const firstDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
    const lastDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0));
    const days = [];
    const today = new Date();

    // Rellenar con `null` los días hasta el primer día del mes
    for (let i = 0; i < firstDay.getUTCDay(); i++) {
      days.push(null);
    }

    // Rellenar con información cada día del mes
    for (let i = 1; i <= lastDay.getUTCDate(); i++) {
      const date = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), i));
      const dateString = date.toISOString().split('T')[0];
      
      days.push({
        date: i,
        fullDate: dateString,
        isPlanned: calendarData.plannedDates.includes(dateString),
        isCompleted: calendarData.completedDates.has(dateString),
        isFailed: calendarData.failedDates.has(dateString),
        isToday: date.toISOString().split('T')[0] === today.toISOString().split('T')[0],
      });
    }

    return days;
  }, [currentDate, calendarData]);

  // 3. Función para cambiar el mes
  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setUTCMonth(newDate.getUTCMonth() + increment);
      return newDate;
    });
  };

  // 4. Formateo de las fechas para mostrar en el rango (ejemplo: "3 ene.")
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short", timeZone: 'UTC' }).replace(".", "");
  };

  // 5. Comprobación si el mes actual es el primer o último del rango planificado
  const isFirstMonth = useMemo(() => {
    if (!calendarData.firstPlannedDate) return true;
    return (
      currentDate.getUTCFullYear() === calendarData.firstPlannedDate.getUTCFullYear() &&
      currentDate.getUTCMonth() === calendarData.firstPlannedDate.getUTCMonth()
    );
  }, [currentDate, calendarData.firstPlannedDate]);

  const isLastMonth = useMemo(() => {
    if (!calendarData.lastPlannedDate) return true;
    return (
      currentDate.getUTCFullYear() === calendarData.lastPlannedDate.getUTCFullYear() &&
      currentDate.getUTCMonth() === calendarData.lastPlannedDate.getUTCMonth()
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
            {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric", timeZone: 'UTC' })}
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