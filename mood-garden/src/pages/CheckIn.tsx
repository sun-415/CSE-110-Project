import { useState, FC } from "react";
import "../styles/checkin.css";
import { useAuth } from "../context/AuthContext";
import { createQuestionnaireResponse } from "../api/questionnaireResponses";

interface CheckInProps {
  isModal?: boolean;
  selectedDate?: Date | null;
  onClose?: () => void;
}

export const CheckIn: FC<CheckInProps> = ({
  isModal,
  selectedDate,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    sleepHours: "",
    sleepQuality: "",
    sleepiness: "",
    productivity: "",
    energyLevels: "",
  });

  const { isAuthenticated, user, updateScore } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("here");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // For now, just log the data

    // Calculate points
    const sleepHoursPoints = parseFloat(formData.sleepHours) * 10 || 0;
    const sleepQualityPoints = parseInt(formData.sleepQuality) * 10 || 0;
    const sleepinessPoints = parseInt(formData.sleepiness) * 10 || 0;
    const productivityPoints = parseInt(formData.productivity) * 10 || 0;
    const energyLevelsPoints = parseInt(formData.energyLevels) * 10 || 0;
    const newPoints =
      sleepHoursPoints +
      sleepQualityPoints +
      sleepinessPoints +
      productivityPoints +
      energyLevelsPoints;

    if (isAuthenticated && user && selectedDate) {
      createQuestionnaireResponse({
        userId: user._id,
        date: formatDate(selectedDate),
        responses: Object.values(formData).map((value) => parseFloat(value)),
      }).then((response) => {
        if (response.success) {
          const newScore = user.score + newPoints; // Update total accumulated points
          updateScore(newScore);
          alert(
            "Your questionnaire has been submitted! Points earned today: " +
              newPoints
          );
        } else {
          alert(response.error);
        }
      });
    }

    // Clear the form
    setFormData({
      sleepHours: "",
      sleepQuality: "",
      sleepiness: "",
      productivity: "",
      energyLevels: "",
    });

    if (isModal && onClose) {
      onClose();
    }
  };

  const content = (
    <div className="formBox">
      <h1 style={{ justifySelf: "center" }}>
        Daily Sleep Check-In{" "}
        {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="questionGroup">
          <label>How many hours did you sleep last night?</label>
          <input
            type="number"
            name="sleepHours"
            data-testid="q1"
            min="0"
            max="24"
            step="0.5"
            value={formData.sleepHours}
            onChange={handleChange}
            required
            style={{ width: "280px" }}
          />
        </div>

        {["sleepQuality", "sleepiness", "productivity", "energyLevels"].map(
          (field) => (
            <div key={field} className="questionGroup">
              <label>
                {field === "sleepQuality" &&
                  "How was the quality of your sleep?"}
                {field === "sleepiness" &&
                  "How sleepy did you feel throughout the day?"}
                {field === "productivity" && "How was your productivity today?"}
                {field === "energyLevels" &&
                  "How were your energy levels throughout the day?"}
              </label>
              <div className="ratingGroup">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} className="ratingLabel">
                    <input
                      type="radio"
                      name={field}
                      value={num}
                      data-testid={`${field}-${num}`} // Add specific data-testid
                      checked={
                        formData[field as keyof typeof formData] === `${num}`
                      } // Tie checked property to formData
                      onChange={handleChange}
                      required
                    />
                    <span>{num}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        )}

        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </div>
  );

  if (isModal) {
    return content;
  }

  return (
    <>
      <div className="backgroundWrapper"></div>
      <div className="checkInContainer">{content}</div>
    </>
  );
};
