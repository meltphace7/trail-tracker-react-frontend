import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link, useHistory } from "react-router-dom";
import hostURL from "../../hosturl";
import ModalMessage from "../notifications/ModalMessage";
import LoadingScreen from "../notifications/LoadingScreen";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import useValidation from "../../hooks/use-validation";

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
// User Input validated with custom hook
  const {
    enteredValue: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useValidation((value) => value.trim() !== "" && value.includes("@"));

  const {
    enteredValue: password,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useValidation((value) => value.trim() !== "" && value.length > 4);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    localStorage.setItem("expiryDate", null);
    history.replace("/home");
  };

  // LOGINS IN USER
  const loginHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      setIsError(true);
      setErrorMessage("Your email or password is invalid!");
      return;
    }
    setIsLoading(true);

    const userLoginInput = {
      email,
      password,
    };

    try {
      const response = await fetch(`${hostURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginInput),
      });
      if (!response.ok || response.status === 422) {
        throw new Error("Could not authenticate you!");
      }
      const resData = await response.json();
      setIsLoading(false);
      // const isAdmin = resData.isAdmin;
      const token = resData.token;
      const favorites = resData.favorites;
      const userName = resData.userName;
      const loginData = {
        userName,
        favorites,
      };
      dispatch(authActions.login(loginData));
      // if (isAdmin) {
      //   dispatch(authActions.adminLogin());
      // }
      localStorage.setItem("token", token);
      localStorage.setItem("userId", resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      // AUTO LOGOUT ///
      setAutoLogout(remainingMilliseconds);
      ///////////
      history.push("/home");
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message);
      setIsError(true);
      console.log();
    }
    emailReset();
    passwordReset();
  };

  const setAutoLogout = (milliseconds) => {
    console.log("AUTO LOG TIMER STARTED");
    setTimeout(() => {
      logoutHandler();
      console.log("AUTO LOG OUT");
    }, milliseconds);
  };
// Input styles change depending on error state from validation hook
  const emailClasses = emailHasError
    ? `${classes["login-input"]} ${classes["invalid"]}`
    : classes["login-input"];

  const passwordClasses = passwordHasError
    ? `${classes["login-input"]} ${classes["invalid"]}`
    : classes["login-input"];

  const closeModalHandler = () => {
    setIsError(false);
  };

  return (
    <div className={classes["login"]}>
      <form onSubmit={loginHandler} className={classes["log-in-form"]}>
        <h2 className={classes["log-in-header"]}>Log In and Explore!</h2>
        {emailHasError && <p>Please enter a valid email!</p>}
        <input
          className={emailClasses}
          id="email"
          type="text"
          placeholder="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
          required
        />
        {passwordHasError && <p>Please enter a valid password!</p>}
        <input
          className={passwordClasses}
          id="password"
          type="password"
          placeholder="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={password}
          required
        />

        <button className={classes.button} type="submit">
          Log In
        </button>

        <h3>
          Don't have an account?&nbsp;
          <Link className={classes["sign-up-link"]} to="/signup">
            Sign Up
          </Link>
        </h3>
      </form>
      {isError && (
        <ModalMessage message={errorMessage} onCloseModal={closeModalHandler} />
      )}
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default Login;
