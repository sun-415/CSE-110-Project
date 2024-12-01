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
    <div className="survey-reminder-overlay">
      <div className="survey-reminder-content">
        <button className="survey-reminder-close" onClick={onClose}>&times;</button>
        <div className="survey-reminder-body">
          <h2>Daily Sleep Check-In Reminder</h2>
          <p>You haven't completed your sleep survey for today. Track your sleep to grow your garden!</p>
          <div className="survey-reminder-buttons">
            <button className="primary-button" onClick={onStartSurvey}>
              Complete Survey Now
            </button>
            <button className="secondary-button" onClick={onClose}>
              Remind Me Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
