import React, { useState } from "react";
import classes from "./LogIn.module.css";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [emailInput, setEmailNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailChangeHandler = (event) => {
    setEmailNameInput(event.currentTarget.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordInput(event.currentTarget.value);
  };
    
    const loginSubmitHandler = (event) => {
        event.preventDefault();

        const loginData = {
            email: emailInput,
            password: passwordInput
        }

        console.log(loginData);

        setEmailNameInput('');
        setPasswordInput('');
    }

  return (
    <div className={classes["login"]}>
      <form onSubmit={loginSubmitHandler} className={classes["log-in-form"]}>
        <h2 className={classes["log-in-header"]}>Log In and Explore!</h2>

        <input
          className={classes["log-in-input"]}
          id="email"
          type="text"
          placeholder="email"
          value={emailInput}
                  onChange={emailChangeHandler}
                  required
        />

        <input
          className={classes["log-in-input"]}
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
          Don't have an account?&nbsp;
          <Link className={classes["sign-up-link"]} to="/signup">
            Sign Up
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default LogIn;
