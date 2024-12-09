import React from "react";
import { twMerge } from "tailwind-merge";

interface DatePickerCalendarDayButton {
  date: Date;
  dateInputValue: string;
  currentDate: Date;
  selectedDate: Date;
  day: number;
  onClickDate: (date: Date) => void;
}

function DatePickerCalendarDayButton(props: DatePickerCalendarDayButton) {
  const handleClickDate = () => {
    const year = props.currentDate.getFullYear();
    const month = props.currentDate.getMonth();
    const date = new Date(year, month, props.day);
    props.onClickDate(date);
  };

  const isCurrentDateEqualToPropsDate = (day: number): boolean => {
    return (
      props.dateInputValue !== "DD/MM/YYYY" &&
      props.date &&
      props.date.getDate() === day &&
      props.date.getMonth() === props.currentDate.getMonth() &&
      props.date.getFullYear() === props.currentDate.getFullYear()
    );
  };

  const isInputDateHasNotChanged = (day: number) => {
    return (
      props.dateInputValue === "DD/MM/YYYY" &&
      props.date &&
      props.date.getDate() === day &&
      props.date.getMonth() === props.currentDate.getMonth() &&
      props.date.getFullYear() === props.currentDate.getFullYear()
    );
  };

  const isSelectedDateEqualToCurrentDate = (day: number) => {
    return (
      props.selectedDate &&
      props.selectedDate.getDate() === day &&
      props.selectedDate.getDate() === props.currentDate.getDate() &&
      props.selectedDate.getMonth() === props.currentDate.getMonth() &&
      props.selectedDate.getFullYear() === props.currentDate.getFullYear()
    );
  };

  if (props.day === 0) return;
  return (
    <button
      className={twMerge(
        "hover:bg-gray-200 text-black w-10 h-10 rounded-full",
        isInputDateHasNotChanged(props.day) &&
          "border border-spacing-1 border-gray-400 bg-gray-100",
        isSelectedDateEqualToCurrentDate(props.day) && "bg-blue-100",
        isCurrentDateEqualToPropsDate(props.day) &&
          "bg-blue-500 text-white hover:bg-blue-500"
      )}
      onClick={handleClickDate}
      data-testid={`datepicker-calendar-day-btn-${props.day}`}
    >
      {props.day}
    </button>
  );
}

export default React.memo(DatePickerCalendarDayButton);
