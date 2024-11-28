import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/AppLogo.png";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import NavProfile from "./NavProfile";

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="linksContainer">
      <div className="logoContainer">
        <img src={logo} alt="Mood Garden Logo" className="logoImg" />
        <h1 className="logoText">Mood Garden</h1>
      </div>
      <nav className="link">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/progress"
          className={location.pathname === "/progress" ? "active" : ""}
        >
          Progress
        </Link>
      </nav>
      <div style={{ paddingLeft: "30px", paddingRight: "50px" }}>
        {!isAuthenticated ? <Login /> : <NavProfile />}
      </div>
    </div>
  );
};
