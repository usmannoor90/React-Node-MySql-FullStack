import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light navbar-dark  flex items-center justify-between px-6">
        <div>
          <img src="" alt="" />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink
              className="btn btn-light btn-outline-primary"
              to="/department"
            >
              Department
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink
              className="btn btn-light btn-outline-primary"
              to="/employee"
            >
              Employee
            </NavLink>
          </li>
        </ul>
        <div className="gap-1">
          <button className="btn" onClick={() => navigate("/")}>
            login
          </button>
          <button className="btn" onClick={() => navigate("/signup")}>
            signup
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
