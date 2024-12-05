import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./PopUpModal.css";

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
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <p>You can find the tutorial in the "i" button anytime & update your sleep goal in the 'Profile' section!</p>
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
