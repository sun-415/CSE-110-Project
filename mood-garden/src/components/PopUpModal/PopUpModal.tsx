import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./PopUpModal.css";
import { levels } from "../../constants/levels";

interface PopupProps {
  userId: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ 
  onClose
}) => {
  const { user, updateSleepTarget } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sleepGoal, setSleepGoal] = useState<number | null>(0);

  const handleNextSlide = () => setCurrentSlide((prev) => prev + 1);
  const handlePrevSlide = () => setCurrentSlide((prev) => prev - 1);

  const handleSaveSleepGoal = async () => {
    if (sleepGoal === null || sleepGoal < 0 || sleepGoal > 24) {
      alert("Sleep goal must be between 0 and 24 hours.");
      return;
    }

    if (user?._id) {
      updateSleepTarget(sleepGoal);
      handleNextSlide(); 

    }
  };

  const slides = [
    <div className="slide">
      <h2>Welcome to Mood Garden!</h2>
      <p>Learn how to use the app to track your sleep and grow your garden.</p>
      <button onClick={handleNextSlide} className="button-next">
        Next
      </button>
    </div>,
       <div className="slide">
       <h2>How to Use Mood Garden</h2>
        <ol className="instructions">
          <li>
            <strong>Log In:</strong> Click on either <b>Sign in with Google</b>{" "}
            buttons to log in and access your personalized experience.
          </li>
          <li>
            <strong>Fill Out the Daily Check-In Form:</strong>
            <ul>
              <li>
                Navigate to the <b>Progress</b> page using the navbar.
              </li>
              <li>
                Double-click on today’s calendar date to open the Check-In form.
              </li>
              <li>
                Answer questions about your sleep, productivity, and energy
                levels.
              </li>
              <li>Submit the form to earn points!</li>
            </ul>
          </li>
          <li>
            <strong>Track Your Progress:</strong>
            <ul>
              <li>
                The <b>Progress Bar</b> shows how close you are to earning the
                next plant. Each completed check-in adds points toward your
                progress.
              </li>
              <li>
                Check the calendar for dates you've completed the form, which
                will be highlighted.
              </li>
            </ul>
          </li>
          <li>
            <strong>Grow Your Garden:</strong> Earn points by completing the
            Check-In form daily. Each plant is unlocked as you reach specific
            milestones:
            <ul>
              {levels.map((level) => (
                <li>{`Plant ${level.num}: ${level.requiredScore} points`}</li>
              ))}
            </ul>
            Once all plants are unlocked, you’ve mastered the garden!
          </li>
          <li>
            <strong>Set Your Sleep Goal:</strong> Navigate to the{" "}
            <b>User Profile</b> section to set or update your sleep goal. This
            helps track your progress more effectively.
          </li>
        </ol>
        <p>
          Remember to log in daily and complete your Check-In form to see your
          garden flourish!
        </p>
       <div className="button-group">
         <button onClick={handlePrevSlide} className="button-prev">
           Back
         </button>
         <button onClick={handleNextSlide} className="button-next">
           Next
         </button>
       </div>
     </div>,
    <div className="slide">
      <h2>Set Your Sleep Goal</h2>
      <p>What is your target sleep time (in hours)?</p>
      <input
        type="number"
        value={sleepGoal || ""}
        onChange={(e) => setSleepGoal(Number(e.target.value))}
        placeholder="Enter hours"
        className="input-field"
      />
      <div className="button-group">
        <button onClick={handlePrevSlide} className="button-prev">
          Back
        </button>
        <button
          onClick={handleSaveSleepGoal}
          className="button-next"
        >
          Save
        </button>
      </div>
    </div>,
    <div className="slide">
      <h2>You're All Set!</h2>
      <p>You can find the tutorial via "i" button anytime on the 'Home' page & update your sleep goal in the 'Profile' section!</p>
      <button onClick={onClose} className="button-next">
        Finish
      </button>
    </div>,
  ];

  return (
    <div className="popup-overlay">
      <div className="popup-content">{slides[currentSlide]}</div>
    </div>
  );
};

export default Popup;
