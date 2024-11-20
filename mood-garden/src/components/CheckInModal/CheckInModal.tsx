import { FC } from 'react';
import { CheckIn } from '../../pages/CheckIn';
import './CheckInModal.css';

interface CheckInModalProps {
  onClose: () => void;
  selectedDate: Date | null;
}

export const CheckInModal: FC<CheckInModalProps> = ({ onClose, selectedDate }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <CheckIn isModal={true} selectedDate={selectedDate} onClose={onClose} />
      </div>
    </div>
  );
};