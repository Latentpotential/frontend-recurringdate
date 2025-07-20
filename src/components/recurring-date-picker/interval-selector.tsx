"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store"

export function IntervalSelector() {
  const { config, updateConfig } = useRecurringDateStore();

  const getIntervalLabel = () => {
    switch (config.type) {
      case 'daily': return config.interval === 1 ? 'day' : 'days';
      case 'weekly': return config.interval === 1 ? 'week' : 'weeks';
      case 'monthly': return config.interval === 1 ? 'month' : 'months';
      case 'yearly': return config.interval === 1 ? 'year' : 'years';
      default: return 'intervals';
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="interval" className="text-sm font-medium text-gray-700">
        Frequency
      </Label>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Every</span>
        <Input
          id="interval"
          type="number"
          min="1"
          max="999"
          value={config.interval}
          onChange={(e) => updateConfig({ interval: parseInt(e.target.value) || 1 })}
          className="w-20 text-center"
        />
        <span className="text-sm text-gray-600">{getIntervalLabel()}</span>
      </div>
    </div>
  );
}