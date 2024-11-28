import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/navprofile.css";
import { Link, useLocation } from "react-router-dom";

const NavProfile = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isTrayOpen, setTrayOpen] = useState(false);

  const trayRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trayRef.current &&
        !trayRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setTrayOpen(false); // Close tray if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTray = () => {
    setTrayOpen(!isTrayOpen);
  };

  const handleLogout = () => {
    logout();
    setTrayOpen(false);
  };

  return (
    <div className="nav-profile">
      {/* Profile section in navbar */}
      <div className="profile-info" ref={profileRef} onClick={toggleTray}>
        <span className={location.pathname === "/profile" ? "active" : ""}>
          {user?.name}
        </span>
        <img
          src={user?.profilePicture} // Default image if no profile picture
          alt="Profile"
          className="profile-picture"
        />
      </div>

      {/* Tray for profile options */}
      {isTrayOpen && (
        <div className="tray" ref={trayRef}>
          <ul>
            <li>
              <Link
                className="tray-link"
                to={"/profile"}
                onClick={() => setTrayOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavProfile;
