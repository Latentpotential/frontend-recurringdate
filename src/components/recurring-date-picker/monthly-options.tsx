"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store";
import type { WeekDay } from "@/components/lib/types";

const weekDays = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const weekPositions = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: -1, label: 'Last' },
];

export function MonthlyOptions() {
  const { config, updateConfig } = useRecurringDateStore();

  if (config.type !== 'monthly') return null;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Monthly Pattern</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Button
            variant={config.monthlyPattern === 'date' ? "default" : "outline"}
            size="sm"
            onClick={() => updateConfig({ monthlyPattern: 'date' })}
            className="flex-1"
          >
            On Day
          </Button>
          <Button
            variant={config.monthlyPattern === 'day' ? "default" : "outline"}
            size="sm"
            onClick={() => updateConfig({ monthlyPattern: 'day' })}
            className="flex-1"
          >
            On Weekday
          </Button>
        </div>

        {config.monthlyPattern === 'date' ? (
          <div className="space-y-2">
            <Label htmlFor="dayOfMonth" className="text-sm">Day of Month</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">On the</span>
              <Input
                id="dayOfMonth"
                type="number"
                min="1"
                max="31"
                value={config.dayOfMonth || 1}
                onChange={(e) => updateConfig({ dayOfMonth: parseInt(e.target.value) || 1 })}
                className="w-20 text-center"
              />
              <span className="text-sm text-gray-600">of every month</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Week Position</Label>
                <Select
                  value={config.weekOfMonth?.toString() || "1"}
                  onValueChange={(value) => updateConfig({ weekOfMonth: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekPositions.map(({ value, label }) => (
                      <SelectItem key={value} value={value.toString()}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm">Day of Week</Label>
                <Select
                  value={config.weekDays[0]?.toString() || "1"}
                  onValueChange={(value) => updateConfig({ weekDays: [parseInt(value) as WeekDay] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map(({ value, label }) => (
                      <SelectItem key={value} value={value.toString()}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              {config.weekOfMonth === -1 ? 'Last' : weekPositions.find(p => p.value === config.weekOfMonth)?.label || 'First'} {' '}
              {weekDays.find(d => d.value === config.weekDays[0])?.label || 'Monday'} of every month
            </p>
          </div>
        )}
      </div>
    </div>
  );
}