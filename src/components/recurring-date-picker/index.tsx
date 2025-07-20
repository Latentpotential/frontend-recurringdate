"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecurrenceTypeSelector } from "./recurrence-type-selector"
import { IntervalSelector } from "./interval-selector";
import { WeekdaySelector } from "./weekday-selector";
import { MonthlyOptions } from "./monthly-options";
import { DateRangePicker } from "./date-range-picker";
import { MiniCalendar } from "./mini-calendar";
import { Button } from "@/components/ui/button";
import { useRecurringDateStore } from "@/components/lib/stores/recurring-date-store";
import { RotateCcw } from "lucide-react";

export function RecurringDatePicker() {
  const { resetConfig, getRecurringDates } = useRecurringDateStore();
  const recurringDates = getRecurringDates(10);

  const handleReset = () => {
    resetConfig();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Recurring Date Picker
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <RecurrenceTypeSelector />
              
              <Separator />
              
              <div className="space-y-4">
                <IntervalSelector />
                <WeekdaySelector />
                <MonthlyOptions />
              </div>
              
              <Separator />
              
              <DateRangePicker />
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <MiniCalendar />
              
              {/* Next Occurrences */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Next Occurrences</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  {recurringDates.length > 0 ? (
                    <div className="space-y-2">
                      {recurringDates.slice(0, 10).map((date, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-200"
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {date.toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="text-xs text-gray-500">
                            #{index + 1}
                          </span>
                        </div>
                      ))}
                      {recurringDates.length > 10 && (
                        <div className="text-center py-2">
                          <span className="text-xs text-gray-500">
                            +{recurringDates.length - 10} more dates...
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No recurring dates found</p>
                      <p className="text-xs mt-1">Please check your configuration</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}