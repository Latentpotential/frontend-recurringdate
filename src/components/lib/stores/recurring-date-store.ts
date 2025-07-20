import { create } from 'zustand';
import { 
  addDays, 
  addWeeks, 
  addMonths, 
  addYears, 
  isBefore, 
  isAfter, 
  getDay, 
  startOfDay,
  getDate,
  setDate,
  getWeeksInMonth,
  lastDayOfMonth,
  isSameDay
} from 'date-fns';
import type { RecurrenceConfig, RecurringDateStore, WeekDay } from "@/components/lib/types"

const defaultConfig: RecurrenceConfig = {
  type: 'weekly',
  interval: 1,
  weekDays: [1], // Monday
  monthlyPattern: 'date',
  dayOfMonth: 1,
  weekOfMonth: 1,
  startDate: new Date(2000, 0, 1),
  endDate: undefined,
};

export const useRecurringDateStore = create<RecurringDateStore>((set, get) => ({
  config: {
    ...defaultConfig,
    startDate: typeof window !== 'undefined' ? new Date() : defaultConfig.startDate,
  },
  
  updateConfig: (updates) => {
    set((state) => ({
      config: { ...state.config, ...updates }
    }));
  },
  
  resetConfig: () => {
    set({ 
      config: { 
        ...defaultConfig, 
        startDate: typeof window !== 'undefined' ? new Date() : defaultConfig.startDate 
      } 
    });
  },
  
  getRecurringDates: (limit = 50) => {
    const { config } = get();
    const dates: Date[] = [];
    let currentDate = startOfDay(config.startDate);
    const endDate = config.endDate ? startOfDay(config.endDate) : null;
    
    // Add the start date if it matches the pattern
    if (matchesPattern(currentDate, config)) {
      dates.push(new Date(currentDate));
    }
    
    let iterations = 0;
    const maxIterations = limit * 10; // Prevent infinite loops
    
    while (dates.length < limit && iterations < maxIterations) {
      iterations++;
      
      // Calculate next occurrence based on recurrence type
      switch (config.type) {
        case 'daily':
          currentDate = addDays(currentDate, config.interval);
          break;
        case 'weekly':
          currentDate = addWeeks(currentDate, config.interval);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, config.interval);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, config.interval);
          break;
      }
      
      // Stop if we've passed the end date
      if (endDate && isAfter(currentDate, endDate)) {
        break;
      }
      
      // Check if this date matches our pattern
      if (matchesPattern(currentDate, config)) {
        dates.push(new Date(currentDate));
      }
    }
    
    return dates;
  },
}));

function matchesPattern(date: Date, config: RecurrenceConfig): boolean {
  switch (config.type) {
    case 'daily':
      return true; // Daily pattern always matches
      
    case 'weekly':
      const dayOfWeek = getDay(date) as WeekDay;
      return config.weekDays.includes(dayOfWeek);
      
    case 'monthly':
      if (config.monthlyPattern === 'date') {
        // Match specific date of month
        return config.dayOfMonth ? getDate(date) === config.dayOfMonth : false;
      } else {
        // Match specific day of week in specific week
        const dayOfWeek = getDay(date) as WeekDay;
        if (!config.weekDays.includes(dayOfWeek)) return false;
        
        // Calculate which week of the month this date is in
        const dayOfMonth = getDate(date);
        const weekOfMonth = Math.ceil(dayOfMonth / 7);
        
        if (config.weekOfMonth === -1) {
          // Last occurrence of this weekday in the month
          const lastDay = lastDayOfMonth(date);
          const daysFromEnd = getDate(lastDay) - dayOfMonth;
          return daysFromEnd < 7;
        }
        
        return weekOfMonth === config.weekOfMonth;
      }
      
    case 'yearly':
      return true; // Yearly pattern matches the same date each year
      
    default:
      return false;
  }
}