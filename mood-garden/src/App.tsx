import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { CheckIn } from "./pages/CheckIn";
import { Progress } from "./pages/Progress";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";
//import Login from "./components/Login";
import { PointsProvider } from "./context/PointsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="130824139626-b0tcvptr6rr7ka9l8c0ipmvfik3fc2e5.apps.googleusercontent.com">
        <PointsProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </PointsProvider>
      </GoogleOAuthProvider>
    </div>
  );
}



export default App;
