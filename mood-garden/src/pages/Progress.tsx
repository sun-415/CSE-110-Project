import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { NextPlant } from "../components/NextPlant/NextPlant";
import "react-calendar/dist/Calendar.css";
import "../styles/progress.css";
import { View } from "react-calendar/dist/cjs/shared/types";
import { CheckInModal } from "../components/CheckInModal/CheckInModal";
import { getQuestionnaireResponsesByUserId } from "../api/questionnaireResponses";
import { useAuth } from "../context/AuthContext";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Progress = () => {
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, string>>({});
  const { user } = useAuth();

  // TODO: Populate with backend data
  // const markedDates: Record<string, boolean> = {
  //   "2024-11-12": true,
  //   "2024-11-13": true,
  // };

  useEffect(() => {
    if (user) {
      getQuestionnaireResponsesByUserId(user._id).then((response) => {
        if (response.success) {
          setMarkedDates(response.data);
        }
      });
    }
  }, [user]);

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
    // Ensure value is a Date and not in the future
    if (!(value instanceof Date) || value > new Date()) {
      return;
    }

    const currentTime = new Date().getTime();
    if (lastClickTime && currentTime - lastClickTime < 300) {
      // Handle double click
      setSelectedDate(value);
      setIsModalOpen(true);
    }

    setLastClickTime(currentTime);
  };

  const handleStartSurvey = () => {
    const today = new Date();
    setSelectedDate(today);
    setIsModalOpen(true);
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
            <NextPlant onStartSurvey={handleStartSurvey} />
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
