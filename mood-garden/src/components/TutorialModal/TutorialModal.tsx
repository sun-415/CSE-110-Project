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
        ×
        </button>
        <h2>How to Use Mood Garden</h2>
        <ol className="instructions">
          <li>
            <strong>Log In:</strong> Click on either <b>Sign in with Google</b> buttons to log in and
            access your personalized experience.
          </li>
          <li>
            <strong>Fill Out the Daily Check-In Form:</strong> 
            <ul>
              <li>Navigate to the <b>Progress</b> page using the navbar.</li>
              <li>Double-click on today’s calendar date to open the Check-In form.</li>
              <li>Answer questions about your sleep, productivity, and energy levels.</li>
              <li>Submit the form to earn points!</li>
            </ul>
          </li>
          <li>
            <strong>Track Your Progress:</strong>
            <ul>
              <li>The <b>Progress Bar</b> shows how close you are to earning the next plant. Each completed check-in adds points toward your progress.</li>
              <li>Check the calendar for dates you've completed the form, which will be highlighted.</li>
            </ul>
          </li>
          <li>
            <strong>Grow Your Garden:</strong> Earn points by completing the Check-In form daily. Each plant is unlocked as you reach specific milestones:
            <ul>
              <li>Plant 1: 100 points</li>
              <li>Plant 2: 200 points</li>
              <li>Plant 3: 300 points</li>
              <li>Plant 4: 400 points</li>
              <li>Plant 5: 500 points</li>
            </ul>
            Once all plants are unlocked, you’ve mastered the garden!
          </li>
          <li>
            <strong>Set Your Sleep Goal:</strong> Navigate to the <b>User Profile</b> section to set or update your sleep goal. This helps track your progress more effectively.
          </li>
        </ol>
        <p>
          Remember to log in daily and complete your Check-In form to see your garden flourish!
        </p>

      </div>
    </div>
  );
};

export default TutorialModal;
