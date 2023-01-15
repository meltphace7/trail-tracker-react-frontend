import React, { useState } from "react";
import classes from "./MobileNavigation.module.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const MobileNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [isChecked, setIsChecked] = useState(false);
  const [cartIsEmpty, setCartIsEmpty] = useState(true);

  const handleCheck = () => {
    setIsChecked((prevState) => !prevState);
  };

  const closeMenuHandler = () => {
    setIsChecked((prevState) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    localStorage.setItem("expiryDate", null);
    history.replace("/home");
  };

  return (
    <nav className={classes.nav}>
          <Link
              to="/home"
              className={classes.logo}>
        <h3>TRAIL TRACKER</h3>
      </Link>
      <div className={classes.navigation}>
        <input
          type="checkbox"
          className={classes["navigation__checkbox"]}
          id="navi-toggle"
          onChange={handleCheck}
          checked={isChecked}
        />
        <label htmlFor="navi-toggle" className={classes["navigation__button"]}>
          <span className={classes["navigation__icon"]}>&nbsp;</span>
        </label>
        <div className={classes["navigation__background"]}>&nbsp;</div>
        <nav className={classes["navigation__nav"]}>
          <ul className={classes["navigation__list"]}>
            <li className={classes["navigation__item"]}>
              <Link
                onClick={closeMenuHandler}
                className={classes["navigation__link"]}
                to="/"
              >
                Home
              </Link>
            </li>

            {!isAuth && (
              <li className={classes["navigation__item"]}>
                <Link
                  onClick={closeMenuHandler}
                  className={classes["navigation__link"]}
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            )}
            {isAuth && (
              <li className={classes["navigation__item"]}>
                <Link
                  onClick={closeMenuHandler}
                  className={classes["navigation__link"]}
                  to="/favorites"
                >
                  FAVORITES
                </Link>
              </li>
            )}
            {isAuth && (
              <li className={classes["navigation__item"]}>
                <Link
                  onClick={closeMenuHandler}
                  className={classes["navigation__link"]}
                  to="/addtrail"
                >
                  Add Trail
                </Link>
              </li>
            )}
            {isAuth && (
              <li className={classes["navigation__item"]}>
                <Link
                  onClick={closeMenuHandler}
                  className={classes["navigation__link"]}
                  to={`/account`}
                >
                  My Account
                </Link>
              </li>
            )}

            {isAuth && (
              <li className={classes["navigation__item"]}>
                <button
                  onClick={logoutHandler}
                  className={`${classes["navigation__link"]} ${classes["navigation__logout-btn"]}`}
                >
                  Logout
                </button>
              </li>
            )}
            {!isAuth && (
              <li className={classes["navigation__item"]}>
                <Link
                  onClick={closeMenuHandler}
                  className={classes["navigation__link"]}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default MobileNavigation;
