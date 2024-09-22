"use client";

import { useState, useMemo } from "react";
import { Habit } from "@prisma/client";
import { frequency_ES } from "@/src/locales/frequency";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type MonthCalendarProps = {
  habit: Habit;
};

export default function MonthCalendar({ habit }: MonthCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { plannedDates, completedDates, failedDates, firstPlannedDate, lastPlannedDate } = useMemo(() => {
    const startDate = new Date(habit.createdAt);
    const plannedDatesSet = new Set<string>();
    const failedDatesSet = new Set(habit.failedDays);
    let currentDate = new Date(startDate);
    let firstPlanned: Date | null = null;
    let lastPlanned: Date | null = null;

    for (let i = 0; i < habit.plannedDays; i++) {
      const isPlannedDay = habit.frequency === "DAILY" || (habit.frequency === "WEEKLY" && habit.weeklyDays.includes(currentDate.getDay()));
      if (isPlannedDay) {
        const dateString = currentDate.toISOString().split("T")[0];
        plannedDatesSet.add(dateString);
        firstPlanned = firstPlanned || new Date(currentDate);
        lastPlanned = new Date(currentDate);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      plannedDates: Array.from(plannedDatesSet),
      completedDates: new Set(habit.completedDates),
      failedDates: failedDatesSet,
      firstPlannedDate: firstPlanned,
      lastPlannedDate: lastPlanned,
    };
  }, [habit]);

  const days = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDayOfWeek = firstDay.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: daysInMonth + startDayOfWeek }, (_, i) => {
      if (i < startDayOfWeek) return null;
      const date = new Date(currentYear, currentMonth, i - startDayOfWeek + 1);
      const fullDate = date.toISOString().split("T")[0];
      return {
        date: date.getDate(),
        fullDate,
        isPlanned: plannedDates.includes(fullDate),
        isCompleted: completedDates.has(fullDate),
        isFailed: failedDates.has(fullDate),
        isToday: date.getTime() === today.getTime(),
      };
    });
  }, [currentMonth, currentYear, plannedDates, completedDates, failedDates]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
    setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        {firstPlannedDate && new Date(currentYear, currentMonth, 1) > firstPlannedDate && (
          <button onClick={handlePrevMonth} className="text-zenith-yellow">
            <AiOutlineLeft size={24} />
          </button>
        )}
        <h3 className="text-lg font-semibold text-zenith-yellow">
          {new Date(currentYear, currentMonth).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h3>
        {lastPlannedDate && new Date(currentYear, currentMonth + 1, 0) < lastPlannedDate && (
          <button onClick={handleNextMonth} className="text-zenith-yellow">
            <AiOutlineRight size={24} />
          </button>
        )}
        <p>{frequency_ES[habit.frequency]}</p>
      </div>
      <div className="grid grid-cols-7 gap-1 place-items-center">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-zenith-yellow">
            {day}
          </div>
        ))}

        {days.map((day, index) =>
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
      <div className="mt-4 text-sm text-zenith-yellow">
        Días planificados: {habit.plannedDays}
      </div>
    </div>
  );
}
