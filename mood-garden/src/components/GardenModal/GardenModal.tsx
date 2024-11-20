import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { PointsContext } from '../../context/PointsContext';
import './GardenModal.css';
import gardenBackground from '../../assets/images/garden-background-shelf-1.jpg';

interface GardenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GardenModal = ({ isOpen, onClose }: GardenModalProps) => {
  const { totalScore } = useContext(PointsContext);

  if (!isOpen) return null;

  return createPortal(
    <div className="gardenModalOverlay" role="dialog">
      <div className="gardenModalContent">
        <button className="closeButton" onClick={onClose}>×</button>
        <div className="gardenContainer">
          <img
            src={gardenBackground}
            alt="Garden Shelf"
            className="gardenBackground"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
