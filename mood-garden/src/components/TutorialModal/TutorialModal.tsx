import React from "react";
import './TutorialModal.css';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>About This App</h2>
        <p>
          Welcome to Mood Garden! This app helps you track your sleep, productivity, and energy
          levels while rewarding your progress with beautiful plants for your garden.
        </p>
        <p>Sign in to get started and see your progress bloom!</p>
      </div>
    </div>
  );
};

export default TutorialModal;
