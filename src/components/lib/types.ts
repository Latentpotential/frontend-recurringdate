export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sunday = 0, Monday = 1, etc.

export type MonthlyPattern = 'date' | 'day'; // "15th of every month" vs "2nd Tuesday of every month"

export interface RecurrenceConfig {
  type: RecurrenceType;
  interval: number; // Every X days/weeks/months/years
  weekDays: WeekDay[]; // For weekly recurrence
  monthlyPattern: MonthlyPattern;
  weekOfMonth?: number; // 1-4 for "nth week", -1 for last week
  dayOfMonth?: number; // 1-31 for specific date
  startDate: Date;
  endDate?: Date;
}

export interface RecurringDateStore {
  config: RecurrenceConfig;
  updateConfig: (updates: Partial<RecurrenceConfig>) => void;
  getRecurringDates: (limit?: number) => Date[];
  resetConfig: () => void;
}