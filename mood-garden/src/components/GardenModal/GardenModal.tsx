import { createPortal } from "react-dom";
import "./GardenModal.css";
import gardenBackground from "../../assets/garden/background/garden-background-shelf-1.jpg";
import { levels } from "../../constants/levels";
import { useAuth } from "../../context/AuthContext";

interface GardenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GardenModal = ({ isOpen, onClose }: GardenModalProps) => {
  const { user } = useAuth();
  const totalScore = user?.score || 0;

  if (!isOpen) return null;

  const getVisiblePlants = () => {
    return [
      levels.map((level) => (
        <div key={level.num} className="plantWrapper">
          <img
            src={level.plant}
            alt={`Plant ${level.num}`}
            className={`plant plant${level.num} ${
              totalScore < level.requiredScore ? "plant-locked" : ""
            }`}
          />
          <div className={`plantTooltip plant${level.num}-tooltip`}>
            {totalScore >= level.requiredScore
              ? `Plant ${level.num} (${level.requiredScore} points)`
              : `Unlock at ${level.requiredScore} points`}
          </div>
        </div>
      )),
    ];
  };

  return createPortal(
    <div className="gardenModalOverlay" role="dialog">
      <div className="gardenModalContent">
        <button className="closeButton" onClick={onClose}>
          ×
        </button>
        <div className="gardenContainer">
          <div className="imageWrapper">
            <img
              src={gardenBackground}
              alt="Garden Shelf"
              className="gardenBackground"
            />
            <div className="plantsContainer">{getVisiblePlants()}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
