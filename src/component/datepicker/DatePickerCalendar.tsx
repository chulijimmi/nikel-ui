import { twMerge } from "tailwind-merge";
import DatePickerCalendarToolbar from "./DatePickerCalendarToolbar";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { isEqualDate } from "../../utils/utils";
import DatePickerCalendarBody from "./DatePickerCalendarBody";

interface DatePickerCalendar {
  date: Date;
  setDate: (date: Date) => void;
  isCalendarOpen: boolean;
  isCalendarYearOpen: boolean;
  setIsCalendarYearOpen: Dispatch<SetStateAction<boolean>>;
  dateInputValue: string;
}
export default function DatePickerCalendar(props: DatePickerCalendar) {
  const defaultValue = new Date(); // default date
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState<Date>(defaultValue); // current date source
  const [selectedDate, setSelectedDate] = useState<Date>(defaultValue); // user navigate keyboard date
  const handleClickPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };
  const handleClickNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const handleClickYear = useCallback((year: number) => {
    setCurrentDate((prevDate: Date) => {
      const nextDate = new Date(prevDate);
      nextDate.setFullYear(year);
      return nextDate;
    });
  }, []);

  const handleClickDate = (date: Date) => {
    setCurrentDate(date);
    props.setDate(date);
  };

  /**
   * Anticipate if currentDate is changing but the day did not clicked
   */
  useEffect(() => {
    if (!isEqualDate(props.date, currentDate)) {
      setCurrentDate(props.date);
    }
  }, [props.isCalendarOpen]);

  /**
   * Force to focus when calendar is open
   */
  useEffect(() => {
    if (props.isCalendarOpen) {
      calendarRef.current?.focus();
    }
  }, [props.isCalendarOpen]);

  const handleArrowNavigation = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!props.isCalendarYearOpen) {
      e.preventDefault();
      const movedDate = new Date(currentDate);
      switch (e.key) {
        case "ArrowRight":
          movedDate.setDate(currentDate.getDate() + 1);
          break;
        case "ArrowLeft":
          movedDate.setDate(currentDate.getDate() - 1);
          break;
        case "ArrowUp":
          movedDate.setDate(currentDate.getDate() - 7);
          break;
        case "ArrowDown":
          movedDate.setDate(currentDate.getDate() + 7);
          break;
        case "Enter":
          handleClickDate(movedDate);
          break;
        default:
          break;
      }
      setSelectedDate(movedDate);
      setCurrentDate(movedDate);
    }
  };

  return (
    <div
      tabIndex={0}
      className={twMerge(
        "absolute flex flex-col items-center gap-2 shadow-md bg-white transition-all z-50 p-2",
        props.isCalendarOpen
          ? "max-h-96 opacity-100 -translate-y-0 scale-100"
          : "max-h-0 opacity-0 -translate-y-6 scale-0"
      )}
      ref={calendarRef}
      onKeyDown={handleArrowNavigation}
      data-testid="datepicker-calendar"
    >
      <DatePickerCalendarToolbar
        date={props.date}
        currentDate={currentDate}
        onClickNextMonth={handleClickNextMonth}
        onClickPrevMonth={handleClickPrevMonth}
        onClickYear={handleClickYear}
        isCalendarYearOpen={props.isCalendarYearOpen}
        setIsCalendarYearOpen={props.setIsCalendarYearOpen}
      />
      <DatePickerCalendarBody
        date={props.date}
        dateInputValue={props.dateInputValue}
        currentDate={currentDate}
        selectedDate={selectedDate}
        onClickDate={handleClickDate}
      />
    </div>
  );
}
