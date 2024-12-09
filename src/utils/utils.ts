/**
 * Format date to string format DD/MM/YYYY
 * Example: 31/12/2024
 * @param date
 * @returns
 */
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Check if datestring is valid as Date
 * @param dateString
 * @returns
 */
export const isValidDate = (dateString: string): boolean => {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

/**
 * Parse date from string to Date format
 * Use month -1 because the Date month start from 0
 * @param dateString
 * @returns
 */
export const parseDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split("/").map(Number);
  if (isValidDate(dateString)) {
    return new Date(year, month - 1, day);
  }
  return null;
};

/**
 * Get part of "day" or "month" or "year"
 * From the cursor position start from 0
 * @param cursorPosition
 * @returns
 */
export const getCursorPart = (
  cursorPosition: number
): "day" | "month" | "year" => {
  if (cursorPosition <= 2) return "day";
  if (cursorPosition <= 5) return "month";
  return "year";
};

/**
 * Adjustment date for handle user keyboard ArrowUp or ArrowDown
 * The date will increase +1 or decrese -1 by the type increment
 * @param date
 * @param part
 * @param increment
 * @returns
 */
export const adjustDate = (
  date: Date,
  part: "day" | "month" | "year",
  increment: boolean
): Date => {
  const newDate = new Date(date);
  if (part === "day") {
    newDate.setDate(newDate.getDate() + (increment ? 1 : -1));
  } else if (part === "month") {
    newDate.setMonth(newDate.getMonth() + (increment ? 1 : -1));
  } else if (part === "year") {
    newDate.setFullYear(newDate.getFullYear() + (increment ? 1 : -1));
  }
  return newDate;
};

/**
 * Checking dates if previous and next date is equal or not
 * Example:
 * prevDate 31/12/2004 as Date Format
 * is equal to
 * nextDate 31/12/2004 as Date format
 * @param prevDate
 * @param nextDate
 * @returns
 */
export const isEqualDate = (prevDate: Date, nextDate: Date): boolean => {
  return (
    prevDate.getFullYear() === nextDate.getFullYear() &&
    prevDate.getMonth() === nextDate.getMonth() &&
    prevDate.getDate() === nextDate.getDate()
  );
};

/**
 * Get weeks days label in array
 * @returns
 */
export const getWeeksDays = (): string[] => {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
};

/**
 * Get list of years befor 10 years ago plus 30 years later
 * @param date
 * @returns
 */
export const getYears = (date: Date): number[] => {
  const nextYear = 10;
  const pastYear = 30;
  const currentYear = date.getFullYear();
  const years: number[] = [];
  for (let i = currentYear + nextYear; i > currentYear - pastYear; i--) {
    years.push(i);
  }
  return years;
};

/**
 * Generate days calendar by current date
 * @param date
 * @returns
 */
export const getCalendarDates = (date: Date): number[] => {
  const calendar: number[] = [];
  const currentMonth = new Date(date);
  currentMonth.setMonth(currentMonth.getMonth() + 1, 0);
  const prevMonth = new Date(date);
  prevMonth.setMonth(prevMonth.getMonth(), 0);
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 2, 0);
  const numberOfDaysInCurrentMonth = currentMonth.getDate();
  currentMonth.setDate(1);
  const totalDaysInPrevMonth = currentMonth.getDay();

  for (let i = totalDaysInPrevMonth - 1; i >= 0; i--) {
    calendar.push(0);
  }

  for (let i = 0; i < numberOfDaysInCurrentMonth; i++) {
    const day = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i + 1
    ).getDate();
    calendar.push(day);
  }

  const totalDaysInArray = 35;
  const daysLeftInArray = totalDaysInArray - calendar.length;

  for (let i = 0; i < daysLeftInArray; i++) {
    calendar.push(0);
  }

  return calendar;
};
