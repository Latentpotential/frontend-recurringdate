"use client";

import { RecurringDatePicker } from "@/components/recurring-date-picker";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recurring Date Picker
          </h1>
        </div>
        
        <RecurringDatePicker />
        
      </div>
    </div>
  );
}