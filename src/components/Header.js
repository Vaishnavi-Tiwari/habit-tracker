import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import "./header.css";
import $ from "jquery";
import { NavLink } from "react-router-dom";

function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light  navbar-fixed-top">
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        habit
      </NavLink>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {user?.result ? (
            <>
              <Avatar
                className="Avatar"
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <h5> {user?.result?.name}</h5>
            </>
          ) : (
            <></>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/home/habits" exact>
              <i className="far fa-address-book"></i>My habits
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home/form" exact>
              <i className="far fa-address-book"></i>Create Habit
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home/profile" exact>
              <i className="far fa-address-book"></i>Profile
            </NavLink>
          </li>
          {user?.result ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/home/events"
                exact
                onClick={logout}
              >
                <i className="far fa-copy"></i>Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth" exact>
                <i className="far fa-copy"></i>Sign up
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
