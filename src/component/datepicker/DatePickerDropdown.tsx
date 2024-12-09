import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface DatePickerDropdownProps {
  date: Date;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  years: number[];
  onClickYear: (item: number) => void;
}

export default function DatePickerDropdown(props: DatePickerDropdownProps) {
  const handleOnClickItem = (item: number) => {
    props.onClickYear(item), props.setIsOpen(!props.isOpen);
  };

  const isCurrentYearEqualToPropsDate = (year: number) => {
    return props.date && props.date.getFullYear() === year;
  };

  return (
    <div
      tabIndex={0}
      className={twMerge(
        "absolute w-full bg-white top-14 grid grid-cols-4 h-80 shadow-md overflow-auto gap-2 transition-all",
        props.isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}
    >
      {props.years.map((year) => {
        return (
          <div className="flex items-center justify-center" key={year}>
            <button
              onClick={() => handleOnClickItem(year)}
              className={twMerge(
                "px-2 py-1 rounded-md hover:bg-gray-200",
                isCurrentYearEqualToPropsDate(year) && "bg-blue-500 text-white"
              )}
            >
              {year}
            </button>
          </div>
        );
      })}
    </div>
  );
}
