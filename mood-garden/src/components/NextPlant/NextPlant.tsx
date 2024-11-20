import { useContext, useState, useEffect } from "react";
import { PointsContext } from "../../context/PointsContext";

export const NextPlant = () => {
  // Placeholder data - will be connected to backend later
  const {totalScore, setTotalScore, lastNotifiedLevel, setLastNotifiedLevel} = useContext(PointsContext); // Context for total accumulated points so far
  const [pointsNeeded, setPointsNeeded] = useState(100);

  /* 
    TODO: what happens after user has reached the fifth plant, reaching/exceeding 500 points
    Everything resets back to initial state?
  */
  useEffect(() => {

    // Notify user if they completed a level
    const level = Math.floor(totalScore / 100); // Levels are multiples of 100 points
    if (level > lastNotifiedLevel && totalScore < 500) {
      setLastNotifiedLevel(level); // Update the last notified level
      alert(`You've completed Level ${level} (${level * 100} points) and received a new plant! \nNow you are on Level ${level + 1}.`);
    }
  
    //Notify user if they reached the last level
    if (totalScore >= 500) {
      alert("Congratulations! You have earned all the plants. \nThe point system will reset now.");
      setTotalScore(0); // Reset the points
      setPointsNeeded(100); // Reset the level
      setLastNotifiedLevel(0); // Reset level notification
      // Reset WIP plant?
      // Resets Garden UI?
    }
  }, [totalScore, lastNotifiedLevel, setTotalScore, setLastNotifiedLevel]);


  // Update to next level whenever user completes a level
  if(totalScore - pointsNeeded >= 0 && pointsNeeded <= 500){
    setPointsNeeded(pointsNeeded + 100);
  }

  // TODO: Update the WIP plant



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
    </div>
  );
}; 