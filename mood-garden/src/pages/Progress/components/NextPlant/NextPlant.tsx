export const NextPlant = () => {
  // Placeholder data - will be connected to backend later
  const currentPoints = 75;
  const pointsNeeded = 100;

  return (
    <div className="nextPlantContainer">
      <h2>Next Plant</h2>
      <div className="plantPreview">
        🌱
      </div>
      <div className="progressBarContainer">
        <div
          className="progressBarFill"
          style={{ width: `${(currentPoints / pointsNeeded) * 100}%` }}
        />
        <span className="progressText">
          {currentPoints}/{pointsNeeded} points
        </span>
      </div>
      <p className="plantDescription">
        Keep tracking your sleep to grow your next plant!
      </p>
    </div>
  );
}; 