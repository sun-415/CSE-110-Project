import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/AppLogo.png";

export const Navbar = () => {
  const location = useLocation();
  return (
    <div className="linksContainer">
      <div className="logoContainer">
        <img src={logo} alt="Mood Garden Logo" className="logoImg" />
        <h1 className="logoText">Mood Garden</h1>

      </div>
      <nav className="link">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>Progress</Link>
      </nav>
    </div>
  );
};