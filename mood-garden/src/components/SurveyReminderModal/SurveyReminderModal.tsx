import { FC } from 'react';
import './SurveyReminderModal.css';

interface SurveyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSurvey: () => void;
}

export const SurveyReminderModal: FC<SurveyReminderModalProps> = ({
  isOpen,
  onClose,
  onStartSurvey
}) => {
  if (!isOpen) return null;

  return (
    <div className="survey-reminder-content">
      <div className="survey-reminder-body">
        <h2>Ready for your daily check-in?</h2>
        <p>Track your sleep to help your garden grow!</p>
        <div className="survey-reminder-buttons">
          <button className="primary-button" onClick={onStartSurvey}>
            Start Survey
          </button>
        </div>
      </div>
    </div>
  );
};
