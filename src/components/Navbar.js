import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>JourneyLog</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>

        <li>
          <Link to="/travel-tips">Travel Tips</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
