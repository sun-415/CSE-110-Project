import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";
import { useState, useEffect } from "react";

export const Profile = () => {

  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <div className="background"></div>
      <div className="profileContainer">
        <p> hello hello...</p>
      </div>
    </>
  );
};
