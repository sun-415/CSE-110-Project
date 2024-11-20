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

interface GardenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GardenModal = ({ isOpen, onClose }: GardenModalProps) => {
  const { totalScore } = useContext(PointsContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = () => {
    const container = containerRef.current;
    if (!container) return;

    const scaleX = container.clientWidth / 1920;
    const scaleY = container.clientHeight / 1080;
    const scale = Math.min(scaleX, scaleY);

    container.style.setProperty('--scale-factor', scale.toString());
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  if (!isOpen) return null;

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
              <img src={plant1} alt="Plant 1" className="plant plant1" />
              <img src={plant2} alt="Plant 2" className="plant plant2" />
              <img src={plant3} alt="Plant 3" className="plant plant3" />
              <img src={plant4} alt="Plant 4" className="plant plant4" />
              <img src={plant5} alt="Plant 5" className="plant plant5" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
