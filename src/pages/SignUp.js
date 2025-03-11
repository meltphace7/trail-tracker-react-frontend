import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from '../components/notifications/LoadingScreen';
import hostURL from "../hosturl";
import useValidation from "../hooks/use-validation";
import ModalMessage from "../components/notifications/ModalMessage";

export const SignUp = () => {
  const navigate = useNavigate();
  const [isMessage, setIsMessage] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
// Validates user input with custom hook
  const {
    enteredValue: userName,
    valueIsValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    valueBlurHandler: userNameBlurHandler,
    reset: userNameReset,
  } = useValidation((value) => value.trim() !== "" && isNaN(+value));

  const {
    enteredValue: firstName,
    valueIsValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useValidation((value) => value.trim() !== "" && isNaN(+value));

  const {
    enteredValue: lastName,
    valueIsValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useValidation((value) => value.trim() !== "" && isNaN(+value));

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
  } = useValidation((value) => value.trim() !== "" && value.length > 5);
// Input styles change depending on error state from validation hook
  const firstNameClasses = firstNameHasError
    ? `${classes["signup-input"]} ${classes["invalid"]}`
    : classes["signup-input"];

  const lastNameClasses = lastNameHasError
    ? `${classes["signup-input"]} ${classes["invalid"]}`
    : classes["signup-input"];

  const emailClasses = emailHasError
    ? `${classes["signup-input"]} ${classes["invalid"]}`
    : classes["signup-input"];

  const passwordClasses = passwordHasError
    ? `${classes["signup-input"]} ${classes["invalid"]}`
    : classes["signup-input"];

  let formIsValid = false;

  if (
    userNameIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid
  ) {
    formIsValid = true;
  }

  //CREATES USER ACCOUNT IN MONGODB
  const signupHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      setIsMessage(true);
      setIsErrorMessage(true);
      setMessage("Form info is invalid!");
      return;
    }

    const signupData = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    setIsLoading(true);
    try {
      const response = await fetch(`${hostURL}/auth/signup`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        throw new Error("Could not sign up user!");
      }
      const responseData = await response.json();
      console.log(responseData);
      setIsMessage(true);
      setMessage("Account created succesfully!");

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsErrorMessage(true);
      setMessage("Could Not Sign up!");
      console.log(err);
    }
    // CLEAR INPUTS
    userNameReset();
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
  };

  const closeModalHandler = () => {
    if (!isErrorMessage) {
      setIsMessage(false);
      setMessage("");
       navigate("/login", { replace: true });
    } else {
      setIsMessage(false);
      setIsErrorMessage(false);
      setMessage("");
    }
  };

  return (
    <div className={classes["sign-up"]}>
      <form onSubmit={signupHandler} className={classes["sign-up-form"]}>
        <h2 className={classes["sign-up-header"]}>Create Your Free Account!</h2>
        {userNameHasError && <p>Please enter a user name!</p>}
        <input
          className={firstNameClasses}
          id="user-name"
          type="text"
          placeholder="user name"
          value={userName}
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
          required
        />
        {firstNameHasError && <p>Please enter a valid name!</p>}
        <input
          className={firstNameClasses}
          id="first-name"
          type="text"
          placeholder="first name"
          value={firstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          required
        />
        {lastNameHasError && <p>Please enter a valid name!</p>}
        <input
          className={lastNameClasses}
          id="last-name"
          type="text"
          placeholder="last name"
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          required
        />
        {emailHasError && <p>Please enter a valid email!</p>}
        <input
          className={emailClasses}
          id="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          required
        />
        {passwordHasError && <p>Please enter a valid password!</p>}
        <input
          className={passwordClasses}
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          required
        />

        {!isLoading && (
          <button className={classes.button} type="submit">
            Sign Up
          </button>
        )}
        {isLoading && <p className={classes.loading}>LOADING.....</p>}

        <h3>
          Already have an account?&nbsp;
          <Link className={classes["login"]} to="/login">
            Login
          </Link>
        </h3>
      </form>
      {isMessage && (
        <ModalMessage onCloseModal={closeModalHandler} message={message} />
      )}
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default SignUp;
