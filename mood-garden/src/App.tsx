import React from "react";
import { Home } from "./pages/Home";
import { CheckIn } from "./pages/CheckIn";
import { Progress } from "./pages/Progress";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </div>
  );
}

export default App;
