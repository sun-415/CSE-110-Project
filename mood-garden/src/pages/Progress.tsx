import { useState } from "react";
import Calendar from "react-calendar";
import { NextPlant } from "../components/NextPlant/NextPlant";
import "react-calendar/dist/Calendar.css";
import "../styles/progress.css";
import { View } from "react-calendar/dist/cjs/shared/types";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Progress = () => {
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);

  // TODO: Populate with backend data
  const markedDates: Record<string, boolean> = {
    "2024-11-12": true,
    "2024-11-13": true,
  };

  const hasAnsweredQuestionnaire = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    return markedDates[dateString];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  const getTileStyle = (date: Date, view: View) => {
    if (view === "month") {
      if (hasAnsweredQuestionnaire(date)) {
        return "answered-tile";
      } else if (isToday(date)) {
        return "today-tile";
      }
    }
    return null;
  };

  const onClickDay = (value: Value) => {
    const currentTime = new Date().getTime();

    if (lastClickTime && currentTime - lastClickTime < 300) {
      // TODO: Check date and open modal
      console.log("Double-clicked on date:", value);
    } else {
      console.log("Single-clicked on date:", value);
    }

    setLastClickTime(currentTime);
  };

  return (
    <>
      <div className="backgroundWrapper"></div>
      <div className="progressContainer">
        <div className="progressContent">
          <div className="calendarSection">
            <h2>Your Sleep Journey</h2>
            <Calendar
              className="custom-calendar"
              onClickDay={onClickDay}
              onChange={() => {}}
              tileClassName={({ date, view }) => getTileStyle(date, view)}
            />
          </div>
          <div className="plantSection">
            <NextPlant />
          </div>
        </div>
      </div>
    </>
  );
};
