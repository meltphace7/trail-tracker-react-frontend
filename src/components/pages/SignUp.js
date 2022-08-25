import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const firstNameChangeHandler = (event) => {
    setFirstNameInput(event.currentTarget.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastNameInput(event.currentTarget.value);
  };

  const emailChangeHandler = (event) => {
    setEmailNameInput(event.currentTarget.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordInput(event.currentTarget.value);
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    const signUpData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      password: passwordInput,
    };

    console.log(signUpData);

    setFirstNameInput("");
    setLastNameInput("");
    setEmailNameInput("");
    setPasswordInput("");
  };

  return (
    <div className={classes["sign-up"]}>
      <form onSubmit={signupSubmitHandler} className={classes["sign-up-form"]}>
        <h2 className={classes["sign-up-header"]}>Create Your Free Account!</h2>

        <input
          className={classes["sign-up-input"]}
          id="first-name"
          type="text"
          placeholder="first-name"
          value={firstNameInput}
          onChange={firstNameChangeHandler}
          required
        />

        <input
          className={classes["sign-up-input"]}
          id="last-name"
          type="text"
          placeholder="last-name"
          value={lastNameInput}
          onChange={lastNameChangeHandler}
          required
        />

        <input
          className={classes["sign-up-input"]}
          id="email"
          type="text"
          placeholder="email"
          value={emailInput}
          onChange={emailChangeHandler}
          required
        />

        <input
          className={classes["sign-up-input"]}
          id="password"
          type="password"
          placeholder="password"
          value={passwordInput}
          onChange={passwordChangeHandler}
          required
        />

        <button className={classes.button} type="submit">
          Sign Up
        </button>

        <h3>
          Already have an account?&nbsp;
          <Link className={classes["login"]} to="/login">
            Login
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
