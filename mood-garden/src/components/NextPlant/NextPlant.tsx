import { useContext, useState } from "react";
import { PointsContext } from "../../context/PointsContext";
import { GardenModal } from "../GardenModal/GardenModal";

export const NextPlant = () => {
  const { totalScore } = useContext(PointsContext); // Context for total accumulated points so far
  const [isGardenOpen, setIsGardenOpen] = useState(false);

  // Placeholder data - will be connected to backend later
  const currentPoints = 75;
  const pointsNeeded = 1000;

  return (
    <div className="nextPlantContainer">
      <h2>Next Plant</h2>
      <div className="plantPreview">
        🌱
      </div>
      <div className="progressBarContainer">
        <div
          className="progressBarFill"
          style={{ width: `${(totalScore / pointsNeeded) * 100}%` }}
        />
        <span className="progressText">
          {totalScore}/{pointsNeeded} points
        </span>
      </div>
      <p className="plantDescription">
        Keep tracking your sleep to grow your next plant!
      </p>
      <button
        className="viewGardenButton"
        onClick={() => setIsGardenOpen(true)}
      >
        View Garden
      </button>
      <GardenModal
        isOpen={isGardenOpen}
        onClose={() => setIsGardenOpen(false)}
      />
    </div>
  );
}; 