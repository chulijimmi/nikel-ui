import { getCalendarDates, getWeeksDays } from "../../utils/utils";
import DatePickerCalendarDayButton from "./DatePickerCalendarDayButton";

interface DatePickerCalendarBodyProps {
  date: Date;
  dateInputValue: string;
  currentDate: Date;
  selectedDate: Date;
  onClickDate: (date: Date) => void;
}

export default function DatePickerCalendarBody(
  props: DatePickerCalendarBodyProps
) {
  const weeks = getWeeksDays();
  const calendar = getCalendarDates(props.currentDate);

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 w-fit h-fit gap-y-1">
        {weeks.map((week) => {
          return (
            <div
              key={week}
              className="text-center w-10 h-8 font-semibold text-sm text-gray-700 flex justify-center items-center"
            >
              {week}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 w-fit h-fit gap-y-1">
        {calendar.map((day, index) => (
          <div
            key={index}
            className="text-center w-10 h-10 font-semibold text-sm text-gray-700 flex justify-center items-center"
          >
            <DatePickerCalendarDayButton day={day} {...props} />
          </div>
        ))}
      </div>
    </div>
  );
}
