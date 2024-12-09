import { useCallback, useEffect, useState } from "react";
import DatePickerCalendar from "./DatePickerCalendar";
import DatePickerInput from "./DatePickerInput";
import { formatDate, isValidDate, parseDate } from "../../utils/utils";
import { useClickOutside } from "../../hooks/useClickOutside";

interface DatePickerProps {
  date: string;
  setDate: (date: string) => void;
}

export default function DatePicker(props: DatePickerProps) {
  const dateInput = "DD/MM/YYYY";
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [dateInputValue, setDateInputValue] = useState<string>(dateInput);
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
  const [isShowYearCalendar, setIsShowYearCalendar] = useState<boolean>(false);
  const handleOnClickCalendarBtnIcon = () => {
    setIsShowCalendar(!isShowCalendar);
  };
  const ref = useClickOutside(() => {
    setIsShowCalendar(false);
    setIsShowYearCalendar(false);
  });
  const handleOnChangeDateTextInput = (date: string) => {
    setDateInputValue(date);
    props.setDate(date);
    const dateFormatted = parseDate(date);
    if (dateFormatted !== null) {
      setDate(dateFormatted);
    }
  };
  const handleOnClickTextInput = () => {
    if (isShowCalendar) {
      setIsShowCalendar(false);
      setIsShowYearCalendar(false);
    }
  };
  const handleOnChangeDateCalendar = useCallback((date: Date) => {
    setDate(date);
    props.setDate(formatDate(date));
    setIsShowCalendar(false);
    setIsShowYearCalendar(false);
    setDateInputValue(formatDate(date));
  }, []);

  /**
   * Set the date of datepicker if props is valid date
   */
  useEffect(() => {
    if (isValidDate(props.date)) {
      const parsedDate = parseDate(props.date);
      if (parsedDate !== null) {
        setDate(parsedDate);
        setDateInputValue(props.date);
      }
    }
  }, [props.date]);

  return (
    <div ref={ref} className="relative w-full" data-testid="datepicker">
      <DatePickerInput
        onClickCalendar={handleOnClickCalendarBtnIcon}
        onClickTextInput={handleOnClickTextInput}
        dateInputValue={dateInputValue}
        setDateInputValue={handleOnChangeDateTextInput}
      />
      <DatePickerCalendar
        isCalendarOpen={isShowCalendar}
        date={date}
        setDate={handleOnChangeDateCalendar}
        isCalendarYearOpen={isShowYearCalendar}
        setIsCalendarYearOpen={setIsShowYearCalendar}
        dateInputValue={dateInputValue}
      />
    </div>
  );
}
