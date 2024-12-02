import { useState, useEffect } from "react";
import { GardenModal } from "../GardenModal/GardenModal";
import { useAuth } from "../../context/AuthContext";
import { levels } from "../../constants/levels";
import { SurveyReminderModal } from "../SurveyReminderModal/SurveyReminderModal";

export const NextPlant = ({ onStartSurvey }: { onStartSurvey: () => void }) => {
  const [isGardenOpen, setIsGardenOpen] = useState(false);

  const { user, updateScore } = useAuth();
  const [currLevel, setCurrLevel] = useState(0);
  const [WIPplant, setWIPplant] = useState(levels[0].plant);
  const [pointsNeeded, setPointsNeeded] = useState(levels[0].requiredScore);

  const [initializationDone, setInitializationDone] = useState(false);
  const [showSurveyReminder, setShowSurveyReminder] = useState(false);

  useEffect(() => {
    if (user) {
      levels.forEach((level, index) => {
        if (user.score >= level.requiredScore) {
          setCurrLevel(level.num);
          setWIPplant(levels[Math.min(index + 1, levels.length - 1)].plant);
          setPointsNeeded(
            levels[Math.min(index + 1, levels.length - 1)].requiredScore
          );
        }
      });
      setInitializationDone(true);
    }
  }, [user]);

  useEffect(() => {
    if (initializationDone && user?.score) {
      for (let i = currLevel; i < levels.length - 1; i++) {
        if (user.score >= levels[i].requiredScore) {
          setCurrLevel(i + 1);
          alert(
            `You've also completed Level ${currLevel} (${levels[i].requiredScore
            } points) and onto Level ${currLevel + 1
            }! \nDon't forget to check out your new plant in your garden.`
          );
          setWIPplant(levels[i + 1].plant);
          setPointsNeeded(levels[i + 1].requiredScore);
        } else {
          break;
        }
      }
      if (
        currLevel === levels.length - 1 &&
        user.score >= levels[levels.length - 1].requiredScore
      ) {
        setCurrLevel(currLevel + 1);
        alert("Congratulations! You have earned all the plants!");
      }
    }
  }, [user?.score, currLevel, initializationDone]);

  // // Placeholder data - will be connected to backend later
  // const { totalScore, setTotalScore, lastNotifiedLevel, setLastNotifiedLevel } =
  //   useContext(); // Context for total accumulated points so far
  // const plantImages = [plant1, plant2, plant3, plant4, plant5];

  const handleTestPoints = () => {
    const points = prompt("Enter test points (0-500):");
    if (points === null) return;

    const newPoints = Math.min(Math.max(0, parseInt(points) || 0), 500);
    updateScore(newPoints);
  };

  // useEffect(() => {
  //   // Notify user if they completed a level
  //   const level = Math.floor(totalScore / 100); // Levels are multiples of 100 points
  //   if (level > lastNotifiedLevel && totalScore < 500) {
  //     setLastNotifiedLevel(level); // Update the last notified level
  //     alert(
  //       `You've also completed Level ${level} (${
  //         level * 100
  //       } points) and onto Level ${
  //         level + 1
  //       }! \nDon't forget to check out your new plant in your garden.`
  //     );
  //     setWIPplant(plantImages[level]);
  //   }

  //   // Notify user when they've unlocked all plants
  //   if (totalScore >= 500 && lastNotifiedLevel < 5) {
  //     setWIPplant(plantImages[4]); // Set the WIP plant as the last plant
  //     setLastNotifiedLevel(5); // Set to max level
  //     alert("Congratulations! You have earned all the plants!");
  //   }
  // }, [totalScore, lastNotifiedLevel, setLastNotifiedLevel]);

  // // Update to next level whenever user completes a level (but cap at 500)
  // if (totalScore - pointsNeeded >= 0 && pointsNeeded < 500) {
  //   setPointsNeeded(pointsNeeded + 100);
  // }

  const handleStartSurvey = () => {
    onStartSurvey();
    setShowSurveyReminder(false);
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const hasAnsweredToday = false; // TODO: Get this from your questionnaire responses
    if (!hasAnsweredToday) {
      setShowSurveyReminder(true);
    }
  }, []);

  return (
    <div className="nextPlantContainer">
      <SurveyReminderModal
        isOpen={showSurveyReminder}
        onClose={() => setShowSurveyReminder(false)}
        onStartSurvey={handleStartSurvey}
      />
      <h2>{currLevel === 5 ? "Last Plant" : "Next Plant"}</h2>
      <div className="plantPreview">
        <img src={WIPplant} alt={"Next Plant"} className={"WIP-plant"} />
      </div>
      <div className="progressBarContainer">
        <div
          className="progressBarFill"
          style={{ width: `${((user?.score || 0) / pointsNeeded) * 100}%` }}
        />
        <span className="progressText">
          {user?.score || 0}/{pointsNeeded} points
        </span>
      </div>
      <p className="plantDescription">
        {currLevel == 5
          ? "You have earned all the plants!"
          : "Keep tracking your sleep to grow your next plant!"}
      </p>
      <button
        className="viewGardenButton"
        onClick={() => setIsGardenOpen(true)}
      >
        View Garden
      </button>
      <button
        className="viewGardenButton"
        style={{ marginTop: "10px", backgroundColor: "#666" }}
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
