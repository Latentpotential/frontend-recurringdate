"use client";

import { Button } from "@/components/ui/button";
import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store";
import type { WeekDay } from "@/components/lib/types";

const weekDays: Array<{ value: WeekDay; label: string; short: string }> = [
  { value: 0, label: 'Sunday', short: 'Su' },
  { value: 1, label: 'Monday', short: 'Mo' },
  { value: 2, label: 'Tuesday', short: 'Tu' },
  { value: 3, label: 'Wednesday', short: 'We' },
  { value: 4, label: 'Thursday', short: 'Th' },
  { value: 5, label: 'Friday', short: 'Fr' },
  { value: 6, label: 'Saturday', short: 'Sa' },
];

export function WeekdaySelector() {
  const { config, updateConfig } = useRecurringDateStore();

  const toggleWeekday = (day: WeekDay) => {
    const newWeekDays = config.weekDays.includes(day)
      ? config.weekDays.filter(d => d !== day)
      : [...config.weekDays, day].sort();
    
    updateConfig({ weekDays: newWeekDays });
  };

  if (config.type !== 'weekly') return null;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Select Days</h4>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map(({ value, short, label }) => (
          <Button
            key={value}
            variant={config.weekDays.includes(value) ? "default" : "outline"}
            size="sm"
            className={`h-10 w-10 p-0 text-xs transition-all duration-200 ${
              config.weekDays.includes(value)
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
            }`}
            onClick={() => toggleWeekday(value)}
            title={label}
          >
            {short}
          </Button>
        ))}
      </div>
      {config.weekDays.length === 0 && (
        <p className="text-xs text-red-500">Please select at least one day</p>
      )}
    </div>
  );
}