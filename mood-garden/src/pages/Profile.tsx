import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";
import { useState } from "react";
import { getUserById, updateUser } from "../api/users";

export const Profile = () => {

  const { isAuthenticated, user } = useAuth();
  const [editingSleepTarget, setEditingSleepTarget] = useState(false);
  const [newSleepTarget, setNewSleepTarget] = useState(user?.targetSleepTime);
  const [localUser, setLocalUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <div id="please-log-in">
    <p> Please log in to view your profile.</p>
    </div>
  }

  const handleSleepTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const sleepGoal = Number(e.target.value); 

    if (sleepGoal < -1 || sleepGoal > 24) {
      setError(`Sleep goal must be between ${0} and ${24}.`);
    } else {
      setError(null); 
      setNewSleepTarget(sleepGoal);
    }
  };


  const handleSaveSleepTarget = async () => {
    setLoading(true);
    setError(null);

    if (!localUser) {
      setError("User not found");
      setLoading(false);
      return;
    }
  
    try {
      const result = await updateUser(localUser?._id, { targetSleepTime: newSleepTarget });
      
      if (result.success) {
       
        const refreshedUser = await getUserById(localUser?._id);
        if (refreshedUser.success) {
          setLocalUser({
            ...result.data,
            profilePicture: localUser.profilePicture,
          });
        }
        setEditingSleepTarget(false); 
      } else {
        throw new Error(result.error || "Failed to update sleep target");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
<>
      <div className="background"></div>
        <div className="profileContainer">
          <div className="profile-header">
            <div
              id="icon"
              style={{ backgroundImage: `url(${localUser?.profilePicture})` }}
            ></div>
            <h1>{localUser?.name}</h1>
          </div>
          <div className="profile-details">
            <div className="detail-box">
              <p>Email: {localUser?.email}</p>
            </div>
            <div className="detail-box">
              <p>Score: {localUser?.score}</p>
            </div>
            <div className="detail-box">
              <h3>Target Sleep Time:</h3>
              {editingSleepTarget ? (
                <div className="sleep-target-edit">
                  <input
                    type="number"
                    value={newSleepTarget}
                    onChange={handleSleepTargetChange}
                    disabled={loading}
                  />
                  <button className="button" onClick={handleSaveSleepTarget} disabled={loading}>
                    Save
                  </button>
                  <button className="cancel-button"
                    onClick={() => setEditingSleepTarget(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
          </div>
        ) : (
          <div className="sleep-target-display">
            <div id = "targetTime">
            <span>{localUser?.targetSleepTime} hours</span>
            </div>

            <div>
            <button className="button" onClick={() => setEditingSleepTarget(true)}>Edit</button>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </>
  );
};
