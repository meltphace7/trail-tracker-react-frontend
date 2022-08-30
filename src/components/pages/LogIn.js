import React, { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./LogIn.module.css";
import { Link, useHistory } from "react-router-dom";

const LogIn = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [emailInput, setEmailNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState('');

  const emailChangeHandler = (event) => {
    setEmailNameInput(event.currentTarget.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordInput(event.currentTarget.value);
  };

  const loginUser = async function () {
    const WEB_API_KEY = "AIzaSyAn9setska2fITb1v9zCbqfFm8FA4wg99c";

    setIsLoading(true);
    try {
      const resFirebase = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      // ERROR
      if (!resFirebase.ok) {
        const dataFirebase = await resFirebase.json();
        let errorMessage = "Problem Logging in!";
        if (dataFirebase && dataFirebase.error && dataFirebase.error.message) {
          errorMessage = dataFirebase.error.message;
        }
        console.log(dataFirebase.error.message);
        throw new Error(errorMessage);
      }
      // SUCCESS
      const dataFirebase = await resFirebase.json();
      console.log(dataFirebase.idToken);
      const expirationTime = new Date(
        new Date().getTime() + +dataFirebase.expiresIn * 1000
      );
      authCtx.login(dataFirebase.idToken, expirationTime.toISOString());
      history.replace("/");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
    
    const loginSubmitHandler = (event) => {
      event.preventDefault();
      
      loginUser();

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
