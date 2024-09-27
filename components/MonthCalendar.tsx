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

  const calendarData = useMemo(() => {
    const startDate = new Date(habit.createdAt);
    const plannedDates = new Set<string>();
    const endDate = new Date(startDate);
    let firstPlannedDate = null;
    let lastPlannedDate = null;

    for (let i = 0; i < habit.plannedDays; i++) {
      while (true) {
        const isPlannedDay = habit.frequency === "DAILY" || 
          (habit.frequency === "WEEKLY" && habit.weeklyDays.includes(endDate.getDay()));
        
        if (isPlannedDay) {
          const dateString = endDate.toLocaleDateString('en-CA');
          plannedDates.add(dateString);
          if (!firstPlannedDate) firstPlannedDate = new Date(endDate);
          lastPlannedDate = new Date(endDate);
          break;
        }
        endDate.setDate(endDate.getDate() + 1);
      }
      endDate.setDate(endDate.getDate() + 1);
    }

    return {
      plannedDates: Array.from(plannedDates),
      completedDates: new Set(habit.completedDates),
      failedDates: new Set(habit.failedDates),
      firstPlannedDate,
      lastPlannedDate,
    };
  }, [habit]);

  const monthDays = useMemo(() => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];
    const today = new Date();

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toLocaleDateString('en-CA');
      days.push({
        date: i,
        fullDate: dateString,
        isPlanned: calendarData.plannedDates.includes(dateString),
        isCompleted: calendarData.completedDates.has(dateString),
        isFailed: calendarData.failedDates.has(dateString),
        isToday: date.toDateString() === today.toDateString(),
      });
    }

    return days;
  }, [currentDate, calendarData]);

  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" }).replace(".", "");
  };

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

  return (
    <div>
      <div className="bg-white/5 rounded-lg p-4 z-40">
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
        <p className="text-center text-sm text-zenith-yellow mb-2">{frequency_ES[habit.frequency]}</p>
        <div className="grid grid-cols-7 gap-1 place-items-center">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-zenith-yellow">
              {day}
            </div>
          ))}
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