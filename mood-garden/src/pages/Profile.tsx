import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";
import { useState, useEffect } from "react";

export const Profile = () => {

  const { isAuthenticated, user } = useAuth();
  const [editingSleepTarget, setEditingSleepTarget] = useState(false);
  const [newSleepTarget, setNewSleepTarget] = useState(user?.targetSleepTime || 8);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  const handleSleepTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSleepTarget(Number(e.target.value));
  };

  const handleSaveSleepTarget = () => {
  };

  return (
    <>
      <div className="background"></div>
      <div className="profileContainer">
      <div id="icon" style={{ backgroundImage: `url(${user?.profilePicture})` }}></div>

        <div className="profile-details">
          <h1>{user?.name}</h1>
          <p>Email: {user?.email}</p>
          <p>Score: {user?.score}</p>

          <div className="sleep-target">
            <h3>Target Sleep Time: </h3>
          </div>

          <div>
          {editingSleepTarget ? (
              <div className="sleep-target-edit">
                <input
                  type="number"
                  value={newSleepTarget}
                  onChange={handleSleepTargetChange}
                />
                <button onClick={handleSaveSleepTarget}>Save</button>
                <button onClick={() => setEditingSleepTarget(false)}>Cancel</button>
              </div>
            ) : (
              <div className="sleep-target-display">
                <span>{user?.targetSleepTime} hours</span>
                <button onClick={() => setEditingSleepTarget(true)}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
