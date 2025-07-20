"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store"
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useState } from "react";

export function DateRangePicker() {
  const { config, updateConfig } = useRecurringDateStore();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Start Date</label>
          <Popover open={startOpen} onOpenChange={setStartOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(config.startDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={config.startDate}
                onSelect={(date) => {
                  if (date) {
                    updateConfig({ startDate: date });
                    setStartOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">End Date (Optional)</label>
            {config.endDate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateConfig({ endDate: undefined })}
                className="h-auto p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Popover open={endOpen} onOpenChange={setEndOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {config.endDate ? format(config.endDate, "PPP") : "No end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={config.endDate}
                onSelect={(date) => {
                  updateConfig({ endDate: date });
                  setEndOpen(false);
                }}
                disabled={(date) => date < config.startDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}