"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store";
import type { RecurrenceType } from "@/components/lib/types";
import { Calendar, Clock, RotateCcw, Repeat } from "lucide-react";

const recurrenceTypes: Array<{
  type: RecurrenceType;
  label: string;
  icon: React.ReactNode;
  description: string;
}> = [
  {
    type: 'daily',
    label: 'Daily',
    icon: <Clock className="w-4 h-4" />,
    description: 'Every day or every few days'
  },
  {
    type: 'weekly',
    label: 'Weekly', 
    icon: <Calendar className="w-4 h-4" />,
    description: 'Specific days of the week'
  },
  {
    type: 'monthly',
    label: 'Monthly',
    icon: <Repeat className="w-4 h-4" />,
    description: 'Same date or day each month'
  },
  {
    type: 'yearly',
    label: 'Yearly',
    icon: <RotateCcw className="w-4 h-4" />,
    description: 'Once per year'
  }
];

export function RecurrenceTypeSelector() {
  const { config, updateConfig } = useRecurringDateStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Recurrence Pattern</h3>
      <div className="grid grid-cols-2 gap-3">
        {recurrenceTypes.map(({ type, label, icon, description }) => (
          <Card 
            key={type}
            className={`relative cursor-pointer transition-all duration-200 hover:shadow-md ${
              config.type === type 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => updateConfig({ type })}
          >
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`${config.type === type ? 'text-blue-600' : 'text-gray-600'}`}>
                  {icon}
                </div>
                <span className={`font-medium ${config.type === type ? 'text-blue-900' : 'text-gray-900'}`}>
                  {label}
                </span>
              </div>
              <p className={`text-xs ${config.type === type ? 'text-blue-700' : 'text-gray-500'}`}>
                {description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}