import { useState } from "react";
import Calendar from "react-calendar";
import { NextPlant } from "../components/NextPlant/NextPlant";
import "react-calendar/dist/Calendar.css";
import "../styles/progress.css";
import { View } from "react-calendar/dist/cjs/shared/types";
import { CheckInModal } from "../components/CheckInModal/CheckInModal";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Progress = () => {
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
      // Handle double click
      if (value instanceof Date) {
        setSelectedDate(value);
        setIsModalOpen(true);
      }
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
              onChange={() => { }}
              tileClassName={({ date, view }) => getTileStyle(date, view)}
            />
          </div>
          <div className="plantSection">
            <NextPlant />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CheckInModal
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};
