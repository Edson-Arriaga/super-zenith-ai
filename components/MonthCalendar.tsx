"use client";

import { useState, useMemo } from "react";
import { Habit } from "@prisma/client";
import { frequency_ES } from "@/src/locales/frequency";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

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
    const currentDate = new Date(startDate);
    let firstPlanned: Date | null = null;
    let lastPlanned: Date | null = null;
    let plannedDaysCount = 0;
   
    const isCreationDayPlanned = habit.frequency === "DAILY" || 
      (habit.frequency === "WEEKLY" && habit.weeklyDays.includes(startDate.getDay()));
    
    if (isCreationDayPlanned) {
      const dateString = startDate.toISOString().split("T")[0];
      plannedDatesSet.add(dateString);
      firstPlanned = new Date(startDate);
      lastPlanned = new Date(startDate);
      plannedDaysCount++;
    }

    while (plannedDaysCount < habit.plannedDays) {
      currentDate.setDate(currentDate.getDate() + 1);
      const isPlannedDay = habit.frequency === "DAILY" || 
        (habit.frequency === "WEEKLY" && habit.weeklyDays.includes(currentDate.getDay()));
      
      if (isPlannedDay) {
        const dateString = currentDate.toISOString().split("T")[0];
        plannedDatesSet.add(dateString);
        firstPlanned = firstPlanned || new Date(currentDate);
        lastPlanned = new Date(currentDate);
        plannedDaysCount++;
      }
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
        isToday: date.getDate() === today.getDate() &&
                 date.getMonth() === today.getMonth() &&
                 date.getFullYear() === today.getFullYear(),
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

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" }).replace(".", "");
  };

  const isFirstMonth = useMemo(() => {
    if (!firstPlannedDate) return true;
    return currentYear === firstPlannedDate.getFullYear() && currentMonth === firstPlannedDate.getMonth();
  }, [currentMonth, currentYear, firstPlannedDate]);

  const isLastMonth = useMemo(() => {
    if (!lastPlannedDate) return true;
    return currentYear === lastPlannedDate.getFullYear() && currentMonth === lastPlannedDate.getMonth();
  }, [currentMonth, currentYear, lastPlannedDate]);

  return (
    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth} 
          className={`text-zenith-yellow w-8 h-8 flex items-center justify-center ${isFirstMonth ? 'invisible' : ''}`}
          disabled={isFirstMonth}
        >
          <BiSolidLeftArrow size={24} />
        </button>
        <h3 className="text-lg font-semibold text-zenith-yellow uppercase">
          {new Date(currentYear, currentMonth).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h3>
        <button 
          onClick={handleNextMonth} 
          className={`text-zenith-yellow w-8 h-8 flex items-center justify-center ${isLastMonth ? 'invisible' : ''}`}
          disabled={isLastMonth}
        >
          <BiSolidRightArrow size={24} />
        </button>
      </div>
      <p className="text-center text-sm text-zenith-yellow mb-2">{frequency_ES[habit.frequency]}</p>
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
      <div className="mt-4 text-sm text-zenith-yellow flex justify-between items-center">
        <span>Días planificados: {habit.plannedDays}</span>
        <span>{formatDate(firstPlannedDate)} - {formatDate(lastPlannedDate)}</span>
      </div>
    </div>
  );
}