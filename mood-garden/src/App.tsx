import React from "react";
import { Home } from "./pages/Home";
import { CheckIn } from "./pages/CheckIn";
import { Progress } from "./pages/Progress";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";
import { PointsProvider } from "./context/PointsContext";

function App() {
  return (
    <div>
      <PointsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </PointsProvider>
    </div>
  );
}

export default App;
