import { Home } from "./pages/Home";
import { Progress } from "./pages/Progress";
import { Profile } from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import SetTargetSleep from "./components/SetTargetSleep";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<SetTargetSleep />}>
            <Route index element={<Home />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
