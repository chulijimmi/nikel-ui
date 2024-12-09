import { Dispatch, SetStateAction } from "react";
import ArrowLeftIcon from "../icon/ArrowLeftIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import DatePickerDropdown from "./DatePickerDropdown";
import { getYears } from "../../utils/utils";

interface DatePickerCalendarToolbarProps {
  date: Date;
  currentDate: Date;
  onClickNextMonth: () => void;
  onClickPrevMonth: () => void;
  onClickYear: (year: number) => void;
  isCalendarYearOpen: boolean;
  setIsCalendarYearOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DatePickerCalendarToolbar(
  props: DatePickerCalendarToolbarProps
) {
  let years = getYears(props.currentDate);

  const handleClickYearButton = () => {
    props.setIsCalendarYearOpen(!props.isCalendarYearOpen);
  };

  return (
    <div tabIndex={0} className="relative flex justify-between w-full">
      <div className="flex justify-center items-center p-1">
        <button
          className="p-1 hover:bg-gray-200 rounded-sm"
          onClick={handleClickYearButton}
          data-testid="datepicker-calendar-toolbar-year-btn"
        >
          {props.currentDate.toLocaleString("default", { month: "long" })}{" "}
          {props.currentDate.getFullYear()}
        </button>
      </div>
      <div className="flex justify-center items-center p-1">
        <button
          onClick={props.onClickPrevMonth}
          className="p-1 hover:bg-gray-200 rounded-sm"
          data-testid="datepicker-calendar-toolbar-prevmonth-btn"
        >
          <ArrowLeftIcon />
        </button>
        <button
          onClick={props.onClickNextMonth}
          className="p-1 hover:bg-gray-200 rounded-sm"
          data-testid="datepicker-calendar-toolbar-nextmonth-btn"
        >
          <ArrowRightIcon />
        </button>
      </div>
      <DatePickerDropdown
        date={props.date}
        isOpen={props.isCalendarYearOpen}
        setIsOpen={props.setIsCalendarYearOpen}
        years={years}
        onClickYear={props.onClickYear}
      />
    </div>
  );
}
