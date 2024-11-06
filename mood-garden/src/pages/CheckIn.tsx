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