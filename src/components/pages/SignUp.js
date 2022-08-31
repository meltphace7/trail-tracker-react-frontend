import React, { useState, useContext } from "react";
import AuthContext from '../../store/auth-context'
import classes from "./SignUp.module.css";
import { Link, useHistory } from "react-router-dom";

export const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const signupUser = async function () {
    const WEB_API_KEY = "AIzaSyAn9setska2fITb1v9zCbqfFm8FA4wg99c";
    
    setIsLoading(true);
    try {
      const resFirebase = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`,
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
      if (!resFirebase.ok) {
        const dataFirebase = await resFirebase.json();
        let errorMessage = "Problem signing up!";
        if (dataFirebase && dataFirebase.error && dataFirebase.error.message) {
          errorMessage = dataFirebase.error.message;
        }
        console.log(dataFirebase.error.message);
        throw new Error(errorMessage)
      }
      const dataFirebase = await resFirebase.json();
      console.log(dataFirebase.idToken);
      const expirationTime = new Date(new Date().getTime() + (+dataFirebase.expiresIn * 1000));
      authCtx.login(dataFirebase.idToken, expirationTime.toISOString());
      history.replace('/');
      
    } catch (err) {
      alert(err)
      console.log(err);
    }
  }

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    signupUser();

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
          placeholder="first name"
          value={firstNameInput}
          onChange={firstNameChangeHandler}
          required
        />

        <input
          className={classes["sign-up-input"]}
          id="last-name"
          type="text"
          placeholder="last name"
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

        {!isLoading && <button className={classes.button} type="submit">
          Sign Up
        </button>}
        {isLoading && <p className={classes.loading}>LOADING.....</p> }

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


// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error("Problem getting location data");
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error("Problem getting country");
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };







// const WEB_API_KEY =
//           'AIzaSyAn9setska2fITb1v9zCbqfFm8FA4wg99c';

   
//         fetch(
//             `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`, {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     email: emailInput,
//                     password: passwordInput,
//                     returnSecureToken: true
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//           }
//         ).then(res => {
//             if (res.ok) {
//                 res.json().then(data => {
//                     alert('SUCCESS!')
//                     console.log(data);
//                 })
//             } else {
//                 res.json().then(data => {
//                     alert('Something went wrong')
//                     console.log(data);
//                 });
//             }
//         });