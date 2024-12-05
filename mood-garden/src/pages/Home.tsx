import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";
import { useState, useEffect } from "react";
import TutorialModal from "../components/TutorialModal/TutorialModal";

export const Home = () => {
  const [time, setTime] = useState(new Date());
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const openModal = () => setIsTutorialOpen(true);
  const closeModal = () => setIsTutorialOpen(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="backgroundWrapper"></div>
      <div className="homeContainer">
        <section className="mainSection">
          <div className="clockDisplay">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <div className="welcomeBox">
            <button
              className="infoButton"
              onClick={openModal}
              data-testid="infoButton"
            >
              {" "}
              i{" "}
            </button>
            <h1>Plant the Seeds of Better Sleep</h1>
            <p>
              Track your sleep, tend to your garden, and watch your healthy
              habits bloom.
            </p>
            <div style={{ height: "40px" }}>
              {!isAuthenticated ? <Login /> : <div>Welcome, {user?.name}!</div>}
            </div>
          </div>
        </section>
        <TutorialModal isOpen={isTutorialOpen} onClose={closeModal} />
      </div>
    </>
  );
};
