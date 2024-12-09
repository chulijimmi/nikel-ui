import { useState } from "react";
import "./App.css";
import DatePicker from "./component/datepicker/DatePicker";

function App() {
  const [dateSchedule, setDateSchedule] = useState<string>("");
  return (
    <div className="flex items-center justify-center">
      <div className="w-80 p-2 border border-gray-500">
        <h1 className="text-center font-bold mb-4">Demo DatePicker</h1>
        <DatePicker date={dateSchedule} setDate={setDateSchedule} />
      </div>
    </div>
  );
}

export default App;
