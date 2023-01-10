import React, { useState, useContext } from "react";
import AuthContext from '../../store/auth-context'
import classes from "./SignUp.module.css";
import { Link, useHistory } from "react-router-dom";
import hostURL from '../../hosturl';
import useValidation from "../../hooks/use-validation";
import ModalMessage from '../notifications/ModalMessage';

export const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
   const [isMessage, setIsMessage] = useState(false);
   const [isErrorMessage, setIsErrorMessage] = useState(false);
   const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  // const firstNameChangeHandler = (event) => {
  //   setFirstNameInput(event.currentTarget.value);
  // };

  // const lastNameChangeHandler = (event) => {
  //   setLastNameInput(event.currentTarget.value);
  // };

  // const emailChangeHandler = (event) => {
  //   setEmailNameInput(event.currentTarget.value);
  // };

  // const passwordChangeHandler = (event) => {
  //   setPasswordInput(event.currentTarget.value);
  // };


  //NODEJS REST API
  const signupHandler = async (event) => {
    event.preventDefault();
    const signupData = {
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
      setIsErrorMessage(true);
      setMessage("Could Not Sign up!");
      console.log(err);
    }
    // CLEAR INPUTS
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
  }

  const closeModalHandler = () => {
    if (!isErrorMessage) {
      setIsMessage(false);
      setMessage("");
      history.push("/login");
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
          type="text"
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
    </div>
  );
};

export default SignUp;
