import { useContext, useState, useEffect } from "react";
import { PointsContext } from "../../context/PointsContext";
import { GardenModal } from "../GardenModal/GardenModal";
import plant1 from '../../assets/garden/plants/plant1.png';
import plant2 from '../../assets/garden/plants/plant2.png';
import plant3 from '../../assets/garden/plants/plant3.png';
import plant4 from '../../assets/garden/plants/plant4.png';
import plant5 from '../../assets/garden/plants/plant5.png';


export const NextPlant = () => {
  const [isGardenOpen, setIsGardenOpen] = useState(false);

  // Placeholder data - will be connected to backend later
  const { totalScore, setTotalScore, lastNotifiedLevel, setLastNotifiedLevel } = useContext(PointsContext); // Context for total accumulated points so far
  const [pointsNeeded, setPointsNeeded] = useState(100);
  const plantImages = [plant1, plant2, plant3, plant4, plant5];
  const [WIPplant, setWIPplant] = useState(plantImages[0]);
  


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
      alert(`You've also completed Level ${level} (${level * 100} points) and onto Level ${level + 1}! \nDon't forget to check out your new plant in your garden.`);
      setWIPplant(plantImages[level]);
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



  return (
    <div className="nextPlantContainer">
      <h2>Next Plant</h2>
      <div className="plantPreview">
        <img src={WIPplant} alt={"Next Plant"} className={"WIP-plant"} />
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
        {lastNotifiedLevel == 5 ? "You have earned all the plants!": "Keep tracking your sleep to grow your next plant!"}
        
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