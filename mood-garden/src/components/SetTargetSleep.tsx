import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PopUpModal from "./PopUpModal/PopUpModal";
import { Outlet } from "react-router-dom";

const SetTargetSleep = () => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user?.targetSleepTime === -1) {
      setShowPopup(true);
    }
  }, [user]);

  return (
    <div>
      <Outlet />
      {showPopup && (
        <PopUpModal
          userId={user?._id || ""}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default SetTargetSleep;
