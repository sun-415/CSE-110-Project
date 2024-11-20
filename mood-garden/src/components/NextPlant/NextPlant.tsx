import { useContext, useState, useEffect } from "react";
import { PointsContext } from "../../context/PointsContext";
import { GardenModal } from "../GardenModal/GardenModal";

export const NextPlant = () => {
  const [isGardenOpen, setIsGardenOpen] = useState(false);

  // Placeholder data - will be connected to backend later
  const { totalScore, setTotalScore, lastNotifiedLevel, setLastNotifiedLevel } = useContext(PointsContext); // Context for total accumulated points so far
  const [pointsNeeded, setPointsNeeded] = useState(100);

  const handleTestPoints = () => {
    const points = prompt("Enter test points (0-500):");
    if (points === null) return;

    const newPoints = Math.min(Math.max(0, parseInt(points) || 0), 500);
    setTotalScore(newPoints);
  };

  useEffect(() => {
    // Notify user if they completed a level
    const level = Math.floor(totalScore / 100); // Levels are multiples of 100 points
    if (level > lastNotifiedLevel && totalScore < 500) {
      setLastNotifiedLevel(level); // Update the last notified level
      alert(`You've completed Level ${level} (${level * 100} points) and received a new plant! \nNow you are on Level ${level + 1}.`);
    }

    // Notify user when they've unlocked all plants
    if (totalScore >= 500 && lastNotifiedLevel < 5) {
      setLastNotifiedLevel(5); // Set to max level
      alert("Congratulations! You have earned all the plants!");
    }
  }, [totalScore, lastNotifiedLevel, setLastNotifiedLevel]);

  // Update to next level whenever user completes a level (but cap at 500)
  if (totalScore - pointsNeeded >= 0 && pointsNeeded < 500) {
    setPointsNeeded(pointsNeeded + 100);
  }

  // TODO: Update the WIP plant and garden UI whenever user completes a level



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
      <button
        className="viewGardenButton"
        style={{ marginTop: '10px', backgroundColor: '#666' }}
        onClick={handleTestPoints}
      >
        Test Points
      </button>
      <GardenModal
        isOpen={isGardenOpen}
        onClose={() => setIsGardenOpen(false)}
      />
    </div>
  );
}; 