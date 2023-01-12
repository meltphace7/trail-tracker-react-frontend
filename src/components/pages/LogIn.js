import React, { useState } from "react";
import classes from "./LogIn.module.css";
import { Link, useHistory } from "react-router-dom";
import hostURL from '../../hosturl'
import ModalMessage from '../notifications/ModalMessage'
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import useValidation from '../../hooks/use-validation';

const LogIn = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
 const {
    enteredValue: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useValidation(
    (value) => value.trim() !== "" && value.includes("@")
  );

  const {
    enteredValue: password,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useValidation((value) => value.trim() !== "" && value.length > 4);

  // const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
   const loginHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      setIsError(true);
      setErrorMessage("Your email or password is invalid!");
      return;
    }

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

      // SAVE RETURNED AUTH TOKEN IN LOCAL STORAGE
      console.log(resData);
      // const isAdmin = resData.isAdmin;
      const token = resData.token;
      dispatch(authActions.login(resData.userName));
      // if (isAdmin) {
      //   dispatch(authActions.adminLogin());
      // }
      localStorage.setItem("token", token);
      localStorage.setItem("userId", resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      // props.onLogin();
      history.push("/home");
    } catch (err) {
      setErrorMessage(err.message);
      setIsError(true);
      console.log();
    }
    emailReset();
    passwordReset();
   };
  
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
    </div>
  );
};

export default LogIn;
