import { useRef } from "react";
import CalendarIcon from "../icon/CalendarIcon";
import {
  adjustDate,
  formatDate,
  getCursorPart,
  parseDate,
} from "../../utils/utils";

interface DatePickerInputProps {
  onClickCalendar: () => void;
  onClickTextInput: () => void;
  dateInputValue: string;
  setDateInputValue: (date: string) => void;
}

export default function DatePickerInput(props: DatePickerInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const setCursorPosition = (part: "day" | "month" | "year") => {
    const input = inputRef.current;
    if (!input) return;
    let start = 0;
    let end = 0;
    if (part === "day") {
      start = 0;
      end = 2;
    } else if (part === "month") {
      start = 3;
      end = 5;
    } else if (part === "year") {
      start = 6;
      end = 10;
    }
    input.setSelectionRange(start, end);
  };
  const handleOnClickCalendar = () => {
    props.onClickCalendar();
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const increment = e.key === "ArrowUp";
    const input = inputRef.current;
    const currentDate = parseDate(props.dateInputValue) || new Date();
    const cursorPosition = input?.selectionStart || 0;
    const part = getCursorPart(cursorPosition);
    const newDate = adjustDate(currentDate, part, increment);
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
      case "ArrowDown":
        props.setDateInputValue(formatDate(newDate));
        setTimeout(() => setCursorPosition(part), 0);
        break;
      case "ArrowRight":
        if (part === "day") {
          setTimeout(() => input?.setSelectionRange(3, 5));
        } else {
          setTimeout(() => input?.setSelectionRange(6, 10));
        }
        break;
      case "ArrowLeft":
        if (part === "year") {
          setTimeout(() => input?.setSelectionRange(3, 5));
        } else {
          setTimeout(() => input?.setSelectionRange(0, 2));
        }
        break;
      case "Enter":
        console.log("Enter DatePickerInput");
        break;
      default:
        break;
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = /^[0-9/]*$/.test(value) && value.length <= 10;
    if (isValid) {
      props.setDateInputValue(value);
    }
    if (value === "") {
      props.setDateInputValue(formatDate(new Date()));
    }
  };
  const handleOnBlur = () => {
    // Validate and format input value on blur
    const parsedDate = parseDate(props.dateInputValue);
    if (parsedDate) {
      props.setDateInputValue(formatDate(parsedDate));
    }
  };

  return (
    <div className="relative w-ful flex justify-center items-center">
      <input
        ref={inputRef}
        value={props.dateInputValue}
        type="text"
        className="p-2 w-full border border-gray-300 rounded-md"
        placeholder="dd/mm/yyyy"
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onClick={() => props.onClickTextInput()}
        data-testid="datepicker-input"
      />
      <button
        onClick={handleOnClickCalendar}
        className="absolute right-2 rounded-full hover:bg-gray-100 p-1"
        data-testid="datepicker-input-calendar-btn"
      >
        <CalendarIcon />
      </button>
    </div>
  );
}
