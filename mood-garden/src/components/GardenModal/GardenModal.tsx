import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PointsContext } from '../../context/PointsContext';
import './GardenModal.css';
import gardenBackground from '../../assets/garden/background/garden-background-shelf-1.jpg';
import plant1 from '../../assets/garden/plants/plant1.png';
import plant2 from '../../assets/garden/plants/plant2.png';
import plant3 from '../../assets/garden/plants/plant3.png';
import plant4 from '../../assets/garden/plants/plant4.png';
import plant5 from '../../assets/garden/plants/plant5.png';
import { Clock } from '../GardenModal/Clock';

interface GardenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GardenModal = ({ isOpen, onClose }: GardenModalProps) => {
  const { totalScore } = useContext(PointsContext);

  if (!isOpen) return null;

  const getVisiblePlants = () => {
    return [
      <div key={1} className="plantWrapper">
        <img
          src={plant1}
          alt="Plant 1"
          className={`plant plant1 ${totalScore < 100 ? 'plant-locked' : ''}`}
        />
        <div className="plantTooltip plant1-tooltip">
          {totalScore >= 100 ? 'Plant 1 (100 points)' : 'Unlock at 100 points'}
        </div>
      </div>,
      <div key={2} className="plantWrapper">
        <img
          src={plant2}
          alt="Plant 2"
          className={`plant plant2 ${totalScore < 200 ? 'plant-locked' : ''}`}
        />
        <div className="plantTooltip plant2-tooltip">
          {totalScore >= 200 ? 'Plant 2 (200 points)' : 'Unlock at 200 points'}
        </div>
      </div>,
      <div key={3} className="plantWrapper">
        <img
          src={plant3}
          alt="Plant 3"
          className={`plant plant3 ${totalScore < 300 ? 'plant-locked' : ''}`}
        />
        <div className="plantTooltip plant3-tooltip">
          {totalScore >= 300 ? 'Plant 3 (300 points)' : 'Unlock at 300 points'}
        </div>
      </div>,
      <div key={4} className="plantWrapper">
        <img
          src={plant4}
          alt="Plant 4"
          className={`plant plant4 ${totalScore < 400 ? 'plant-locked' : ''}`}
        />
        <div className="plantTooltip plant4-tooltip">
          {totalScore >= 400 ? 'Plant 4 (400 points)' : 'Unlock at 400 points'}
        </div>
      </div>,
      <div key={5} className="plantWrapper">
        <img
          src={plant5}
          alt="Plant 5"
          className={`plant plant5 ${totalScore < 500 ? 'plant-locked' : ''}`}
        />
        <div className="plantTooltip plant5-tooltip">
          {totalScore >= 500 ? 'Plant 5 (500 points)' : 'Unlock at 500 points'}
        </div>
      </div>
    ];
  };

  return createPortal(
    <div className="gardenModalOverlay" role="dialog">
      <div className="gardenModalContent">
        <button className="closeButton" onClick={onClose}>×</button>
        <div className="gardenContainer">
          <div className="imageWrapper">
            <img
              src={gardenBackground}
              alt="Garden Shelf"
              className="gardenBackground"
            />
            <div className="plantsContainer">
              <Clock />
              {getVisiblePlants()}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
