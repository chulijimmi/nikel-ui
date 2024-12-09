import { expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DatePicker from "../DatePicker";
import { formatDate } from "../../../utils/utils";
test("Load date picker", async () => {
  const date = "";
  const setDate = vi.fn();
  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");

  // ASSERT
  expect(screen.getByTestId("datepicker-input")).toBeInTheDocument();
  expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
});

test("User able to set date using keyboard on input component", async () => {
  const date = "";
  const setDate = vi.fn();
  const dataTestIdInput = "datepicker-input";
  const nextMonth = new Date();
  const expectedDate = formatDate(new Date(nextMonth));

  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");
  /**
   * TODO
   * fireEvent.keyDown position always start from end of selection range
   */
  fireEvent.click(screen.getByTestId(dataTestIdInput));
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowUp",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowDown",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowLeft",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowUp",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowDown",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowLeft",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowUp",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowDown",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowRight",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdInput), {
    key: "ArrowRight",
  });
  fireEvent.blur(screen.getByTestId(dataTestIdInput));

  // ASSERT
  expect(setDate).toBeCalled();
  expect(screen.getByTestId(dataTestIdInput)).toBeInTheDocument();
  expect(screen.getByTestId(dataTestIdInput)).toHaveValue(expectedDate);
});

test("User able to set date using keyboard on calendar component", async () => {
  const date = "";
  const setDate = vi.fn();
  const today = new Date();
  const formattedToday = formatDate(today);
  const dataTestIdInput = "datepicker-input";
  const dataTestIdInputCalendarBtn = "datepicker-input-calendar-btn";
  const dataTestIdCalendar = "datepicker-calendar";

  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");
  fireEvent.click(screen.getByTestId(dataTestIdInputCalendarBtn));
  fireEvent.keyDown(screen.getByTestId(dataTestIdCalendar), {
    key: "ArrowLeft",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdCalendar), {
    key: "ArrowRight",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdCalendar), {
    key: "ArrowUp",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdCalendar), {
    key: "ArrowDown",
  });
  fireEvent.keyDown(screen.getByTestId(dataTestIdCalendar), {
    key: "Enter",
  });

  // ASSERT
  expect(setDate).toBeCalled();
  expect(screen.getByTestId(dataTestIdInput)).toHaveValue(formattedToday);
});

test("User able to click calendar button on input text then click the date button in calendar component", async () => {
  const date = "";
  const setDate = vi.fn();
  const today = new Date();
  const formattedToday = formatDate(today);
  const dataTestIdInput = "datepicker-input";
  const dataTestIdCalendarBtn = "datepicker-input-calendar-btn";
  const dataTestIdCalendar = "datepicker-calendar";
  const dateTestIdCalendarDayBtn = `datepicker-calendar-day-btn-${today.getDate()}`;

  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");
  fireEvent.click(screen.getByTestId(dataTestIdCalendarBtn));
  fireEvent.click(screen.getByTestId(dateTestIdCalendarDayBtn));

  // ASSERT
  expect(setDate).toBeCalled();
  expect(screen.getByTestId(dataTestIdCalendar)).toBeInTheDocument();
  expect(screen.getByTestId(dataTestIdInput)).toHaveValue(formattedToday);
});

test("User able to click calendar previous month button", async () => {
  const date = "";
  const setDate = vi.fn();
  const today = new Date();
  const prevMonth = today.setMonth(today.getMonth() - 1);
  const expectedTextContext = `${new Date(prevMonth).toLocaleString("default", {
    month: "long",
  })} ${new Date(prevMonth).getFullYear()}`;

  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");
  fireEvent.click(screen.getByTestId("datepicker-input-calendar-btn"));
  fireEvent.click(
    screen.getByTestId("datepicker-calendar-toolbar-prevmonth-btn")
  );

  // ASSERT
  expect(
    screen.getByTestId("datepicker-calendar-toolbar-year-btn")
  ).toHaveTextContent(expectedTextContext);
});

test("User able to click calendar next month button", async () => {
  const date = "";
  const setDate = vi.fn();
  const today = new Date();
  const nextMonth = today.setMonth(today.getMonth() + 1);
  const expectedTextContext = `${new Date(nextMonth).toLocaleString("default", {
    month: "long",
  })} ${new Date(nextMonth).getFullYear()}`;

  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");
  fireEvent.click(screen.getByTestId("datepicker-input-calendar-btn"));
  fireEvent.click(
    screen.getByTestId("datepicker-calendar-toolbar-nextmonth-btn")
  );

  // ASSERT
  expect(
    screen.getByTestId("datepicker-calendar-toolbar-year-btn")
  ).toHaveTextContent(expectedTextContext);
});

test("User not able press disallowed char keyboard", async () => {
  const date = "";
  const setDate = vi.fn();
  const today = new Date();
  const formattedToday = formatDate(today);
  const dataTestIdInput = "datepicker-input";
  render(<DatePicker date={date} setDate={setDate} />);

  // ACT
  await screen.findAllByTestId("datepicker");
  fireEvent.click(screen.getByTestId(dataTestIdInput));
  fireEvent.change(screen.getByTestId(dataTestIdInput), {
    target: { value: "" },
  });

  // ASSERT
  expect(screen.getByTestId(dataTestIdInput)).toHaveValue(formattedToday);

  // ACT
  fireEvent.change(screen.getByTestId(dataTestIdInput), {
    target: { value: formattedToday },
  });

  // ASSERT
  expect(screen.getByTestId(dataTestIdInput)).toHaveValue(formattedToday);
  expect(setDate).toBeCalledTimes(2);
});
