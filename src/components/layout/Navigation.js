import React from "react";
import classes from "./Navigation.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import Logo from '../logo/Logo'

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const isLoggedIn = isAuth;

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    localStorage.setItem("expiryDate", null);
    // localStorage.setItem("favorite-trails", []);
    navigate("/home", { replace: true });
  };

  return (
    <nav className={classes.nav}>
      <div className={classes["logo-container"]}>
        <Link className={classes["nav-link"]} to="/home">
          <Logo />
        </Link>
      </div>
      <ul className={classes["nav-menu"]}>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.active : classes["nav-link"]
            }
            to="/home"
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.active : classes["nav-link"]
            }
            to="/about"
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.active : classes["nav-link"]
            }
            to="/favorites"
          >
            FAVORITES
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes["nav-link"]
              }
              to="/signup"
            >
              SIGN UP
            </NavLink>
          </li>
        )}
        <li>
          {isLoggedIn && (
            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes["nav-link"]
              }
              to="/addtrail"
            >
              ADD TRAIL
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes["nav-link"]
              }
              to="/login"
            >
              LOG IN
            </NavLink>
          )}
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes["nav-link"]
              }
              to="/account"
            >
              ACCOUNT
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button
              onClick={logoutHandler}
              className={classes["logout-button"]}
            >
              LOG OUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
