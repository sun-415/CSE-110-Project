import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { NextPlant } from "../components/NextPlant/NextPlant";
import "react-calendar/dist/Calendar.css";
import "../styles/progress.css";
import { View } from "react-calendar/dist/cjs/shared/types";
import { CheckInModal } from "../components/CheckInModal/CheckInModal";
import { getQuestionnaireResponsesByUserId, getQuestionnaireResponseById } from "../api/questionnaireResponses";
import { useAuth } from "../context/AuthContext";
import { QuestionnaireResponse } from "../types/QuestionnaireResponse";
import { ResponseViewModal } from "../components/ResponseViewModal/ResponseViewModal";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Progress = () => {
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponseViewModalOpen, setIsResponseViewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, string>>({});
  const [selectedResponse, setSelectedResponse] = useState<QuestionnaireResponse | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (user) {
      getQuestionnaireResponsesByUserId(user._id).then((response) => {
        if (response.success) {
          setMarkedDates(response.data);
        }
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div id="please-log-in">
        <p> Please log in to view your progress.</p>
      </div>
    );
  }

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

  const onClickDay = async (value: Value) => {
    // Ensure value is a Date and not in the future
    if (!(value instanceof Date) || value > new Date()) {
      return;
    }

    const currentTime = new Date().getTime();
    if (lastClickTime && currentTime - lastClickTime < 300) {
      // Handle double click
      const dateString = value.toISOString().split("T")[0];
      const responseId = markedDates[dateString];

      if (responseId) {
        const response = await getQuestionnaireResponseById(responseId);
        if (response.success) {
          setSelectedResponse(response.data);
          setIsResponseViewModalOpen(true);
        }
      } else {
        setSelectedDate(value);
        setIsModalOpen(true);
      }
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
          onClose={() => {
            setIsModalOpen(false);
            setSelectedResponse(null);
          }}
          selectedDate={selectedDate}
        />
      )}
      {isResponseViewModalOpen && (
        <ResponseViewModal
          response={selectedResponse}
          onClose={() => setIsResponseViewModalOpen(false)}
        />
      )}
    </>
  );
};
