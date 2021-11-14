import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./NavigationHeader.css";

// const [error, setError] = useState("")
// const { logout } = useAuth()
// const history = useHistory()

// async function handleLogout() {
//   setError("")

//   try {
//     await logout()
//     history.push("/login")
//   } catch {
//     setError("Failed to log out")
//   }
// }

export const NavigationHeader = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <header className="header-main-nav">
      <nav>
        <ul className="main-nav-list">
          <li className="main-nav-home">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="main-nav-complaints">
            <NavLink to="/complaint-list">Complaint</NavLink>
          </li>
          <li className="main-nav-polls">
            <NavLink to="/student-list">Student</NavLink>
          </li>
          <li className="main-nav-polls">
            <NavLink to="/outpass-list">Outpass</NavLink>
          </li>
          <li className="main-nav-profile">
            <NavLink to="/update-profile">Profile</NavLink>
          </li>
          <li className="main-nav-logout">
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
