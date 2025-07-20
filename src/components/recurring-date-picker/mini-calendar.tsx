"use client";

import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function MiniCalendar() {
  const { getRecurringDates } = useRecurringDateStore();
  const [currentMonth, setCurrentMonth] = useState(new Date(2000, 0, 1));
  
  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);
  
  const recurringDates = getRecurringDates(100);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isRecurringDate = (date: Date) => {
    return recurringDates.some(recurringDate => isSameDay(date, recurringDate));
  };

  const previousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Preview Calendar</h3>
        <div className="text-xs text-gray-500">
          {recurringDates.length} dates found
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={previousMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h4 className="font-medium text-gray-900">
            {format(currentMonth, "MMMM yyyy")}
          </h4>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month start */}
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8" />
          ))}
          
          {/* Month days */}
          {monthDays.map(day => {
            const isRecurring = isRecurringDate(day);
            const isTodayDate = isToday(day);
            
            return (
              <div
                key={day.toISOString()}
                className={`
                  h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium
                  transition-colors duration-150 relative
                  ${isRecurring 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : isTodayDate
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                title={isRecurring ? `Recurring date: ${format(day, 'PPP')}` : undefined}
              >
                {format(day, 'd')}
                {isTodayDate && !isRecurring && (
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-600">Recurring dates</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full border-2 border-blue-400" />
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}