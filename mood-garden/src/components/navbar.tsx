import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/checkin">CheckIn</Link>
        <Link to="/progress">Progress</Link>
      </nav>
    </div>
  );
};