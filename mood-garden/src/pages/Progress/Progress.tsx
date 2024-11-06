import { useState } from 'react';
import Calendar from 'react-calendar';
import { NextPlant } from './components/NextPlant/NextPlant';
import 'react-calendar/dist/Calendar.css';
import '../../styles/progress.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Progress = () => {
  const [date, setDate] = useState<Value>(new Date());

  return (
    <>
      <div className="backgroundWrapper"></div>
      <div className="progressContainer">
        <div className="progressContent">
          <div className="calendarSection">
            <h2>Your Sleep Journey</h2>
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar"
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