import { useState } from "react";
import "../styles/checkin.css";

export const CheckIn = () => {
    const [formData, setFormData] = useState({
        sleepHours: "",
        sleepQuality: "",
        sleepiness: "",
        productivity: "",
        energyLevels: ""
    });

    const [totalPoints, setTotalPoints] = useState(0); // State to store total points

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
        const total =
            sleepHoursPoints +
            sleepQualityPoints +
            sleepinessPoints +
            productivityPoints +
            energyLevelsPoints;
        
        setTotalPoints(total); // Update the state with the total points
        console.log("Total Points:", total); // Log the total points (for debugging)
        alert("Your questionnaire has been submitted! Total points for today: " + total + 
             "\nNavigate to the Progress page to see your overall growth!");

        // Clear the form
        setFormData({
            sleepHours: "",
            sleepQuality: "",
            sleepiness: "",
            productivity: "",
            energyLevels: "",
      });
    };

    return (
        <>
            <div className="backgroundWrapper"></div>
            <div className="checkInContainer">
                <div className="formBox">
                    <h1>Daily Sleep Check-In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="questionGroup">
                            <label>How many hours did you sleep last night?</label>
                            <input
                                type="number"
                                name="sleepHours"
                                min="0"
                                max="24"
                                step="0.5"
                                value={formData.sleepHours}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {["sleepQuality", "sleepiness", "productivity", "energyLevels"].map((field) => (
                            <div key={field} className="questionGroup">
                                <label>
                                    {field === "sleepQuality" && "How was the quality of your sleep?"}
                                    {field === "sleepiness" && "How sleepy did you feel throughout the day?"}
                                    {field === "productivity" && "How was your productivity today?"}
                                    {field === "energyLevels" && "How were your energy levels throughout the day?"}
                                </label>
                                <div className="ratingGroup">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <label key={num} className="ratingLabel">
                                            <input
                                                type="radio"
                                                name={field}
                                                value={num}
                                                checked={formData[field as keyof typeof formData] === `${num}`} // Tie checked property to formData
                                                onChange={handleChange}
                                                required
                                            />
                                            <span>{num}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button type="submit" className="submitButton">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

