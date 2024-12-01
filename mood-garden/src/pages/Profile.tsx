import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";
import { useState, useEffect } from "react";
import { createUser, getUserById, updateUser } from "../api/users";

export const Profile = () => {

  const { isAuthenticated, user } = useAuth();
  const [editingSleepTarget, setEditingSleepTarget] = useState(false);
  const [newSleepTarget, setNewSleepTarget] = useState(user?.targetSleepTime || 8);
  const [localUser, setLocalUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <div id="please-log-in">
    <p> Please log in to view your profile.</p>
    </div>
  }

  const handleSleepTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSleepTarget(Number(e.target.value));
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
        <div
          id="icon"
          style={{ backgroundImage: `url(${localUser?.profilePicture})` }}
        ></div>

        <div className="profile-details">
          <h1>{localUser?.name}</h1>
          <p>Email: {localUser?.email}</p>
          <p>Score: {localUser?.score}</p>

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
                  disabled={loading} // Disable input while loading
                />
                <button onClick={handleSaveSleepTarget} disabled={loading}>
                  Save
                </button>
                <button
                  onClick={() => setEditingSleepTarget(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="sleep-target-display">
                <span>{localUser?.targetSleepTime} hours</span>
                <button onClick={() => setEditingSleepTarget(true)}>Edit</button>
              </div>
            )}
          </div>

          {/* Display loading or error messages */}
          {loading && <p>Saving...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};
