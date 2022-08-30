import React, { useState, useEffect } from "react";
import classes from "./AddTrail.module.css";
import { storage } from "../../firebase";
import MessageTrailSubmit from "../MessageTrailSubmit";
import useValidation from '../hooks/use-validation';

const AddTrail = (props) => {
  const {
    enteredValue: trailName,
    valueIsValid: trailNameIsValid,
    hasError: trailNameHasError,
    valueChangeHandler: trailNameChangeHandler,
    valueBlurHandler: trailNameBlurHandler,
    reset: trailNameReset
  } = useValidation(value => value.trim() !== '');
  
  const {
    enteredValue: state,
    valueIsValid: stateIsValid,
    hasError: stateHasError,
    valueChangeHandler: stateChangeHandler,
    valueBlurHandler: stateBlurHandler,
    reset: stateReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: wildernessArea,
    valueIsValid: wildernessAreaIsValid,
    hasError: wildernessAreaHasError,
    valueChangeHandler: wildernessAreaChangeHandler,
    valueBlurHandler: wildernessAreaBlurHandler,
    reset: wildernessAreaReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: longitude,
    valueIsValid: longitudeIsValid,
    hasError: longitudeHasError,
    valueChangeHandler: longitudeChangeHandler,
    valueBlurHandler: longitudeBlurHandler,
    reset: longitudeReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: latitude,
    valueIsValid: latitudeIsValid,
    hasError: latitudeHasError,
    valueChangeHandler: latitudeChangeHandler,
    valueBlurHandler: latitudeBlurHandler,
    reset: latitudeReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: miles,
    valueIsValid: milesIsValid,
    hasError: milesHasError,
    valueChangeHandler: milesChangeHandler,
    valueBlurHandler: milesBlurHandler,
    reset: milesReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: scenery,
    valueIsValid: sceneryIsValid,
    hasError: sceneryHasError,
    valueChangeHandler: sceneryChangeHandler,
    valueBlurHandler: sceneryBlurHandler,
    reset: sceneryReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: solitude,
    valueIsValid: solitudeIsValid,
    hasError: solitudeHasError,
    valueChangeHandler: solitudeChangeHandler,
    valueBlurHandler: solitudeBlurHandler,
    reset: solitudeReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: difficulty,
    valueIsValid: difficultyIsValid,
    hasError: difficultyHasError,
    valueChangeHandler: difficultyChangeHandler,
    valueBlurHandler: difficultyBlurHandler,
    reset: difficultyReset,
  } = useValidation((value) => value.trim() !== "");

  const {
    enteredValue: description,
    valueIsValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    valueBlurHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useValidation((value) => value.trim() !== "");

  // const [trailName, setTrailName] = useState("");
  // const [state, setState] = useState("");
  // const [wilderness, setWilderness] = useState("");
  const [trailheadName, setTrailheadName] = useState("");
  const [seasonStart, setSeasonStart] = useState("");
  const [seasonEnd, setSeasonEnd] = useState("");
  const [season, setSeason] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [miles, setMiles] = useState("");
  // const [scenery, setScenery] = useState("");
  // const [solitude, setSolitude] = useState("");
  // const [difficulty, setDifficulty] = useState("");
  // const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [trailSubmited, setTrailSubmited] = useState(false);
  const [isUploading, setIsuploading] = useState(false);
  ///////// image upload state
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  // const nameInputChangeHandler = (e) => {
  //   setTrailName(e.target.value);
  // };

  // const stateInputChangeHandler = (e) => {
  //   setState(e.target.value);
  // };

  // const wildernessInputChangeHandler = (e) => {
  //   setWilderness(e.target.value);
  // };

  const trailheadNameInputChangeHandler = (e) => {
    setTrailheadName(e.target.value);
  };

  const seasonStartInputChangeHandler = (e) => {
    setSeasonStart(e.target.value);
  };

  const seasonEndInputChangeHandler = (e) => {
    setSeasonEnd(e.target.value);
  };

  useEffect(() => {
    setSeason([seasonStart, seasonEnd]);
  }, [seasonStart, seasonEnd]);

  // const longitudeInputChangeHandler = (e) => {
  //   setLongitude(e.target.value);
  // };

  // const latitudeInputChangeHandler = (e) => {
  //   setLatitude(e.target.value);
  // };

  // const milesInputChangeHandler = (e) => {
  //   setMiles(e.target.value);
  // };

  // const sceneryInputChangeHandler = (e) => {
  //   setScenery(e.target.value.toLowerCase());
  // };

  // const solitudeInputChangeHandler = (e) => {
  //   setSolitude(e.target.value);
  // };

  // const difficultyInputChangeHandler = (e) => {
  //   setDifficulty(e.target.value);
  // };

  // const descriptionInputChangeHandler = (e) => {
  //   setDescription(e.target.value);
  // };

  let formIsValid = false;
  
  if (trailNameIsValid && stateIsValid && wildernessAreaIsValid && longitudeIsValid && latitudeIsValid && milesIsValid && sceneryIsValid && solitudeIsValid && difficultyIsValid && descriptionIsValid) {
    formIsValid = true;
  }

  //// HANDLES FILE INPUT CHANGE FOR IMG UPLOAD
  const handleChange = function (e) {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  // SENDS TRAIL DATA TO FIREBASE REALTIME DATABASE
  const postTrail = async function (trail) {
    const response = await fetch(
      `https://trail-tracker-image-store-default-rtdb.firebaseio.com/trails.json`,
      {
        method: "POST",
        body: JSON.stringify({
          trail: trail,
        }),
      }
    );
    const data = await response.json();
    console.log("POSTED");
    setIsuploading(false);
    props.updateTrails();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return
    }
    setTrailSubmited(true);
    setIsuploading(true);

    // SENDS IMAGE TO FIREBASE STORAGE THEN UPLOADS trail to FIREBASE REALTIME DATABASE  /////////////////////

    const handleUpload = function () {
      let urlImages = [];
      const promises = [];

      /// Starts upload process for each selected image
      images.map((image, i) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                console.log(i);
                console.log(url);
                urlImages.push(url);
                console.log(urlImages);
              });
          }
        );
      });

      Promise.allSettled(promises)
        .then(() => {
          // TRAIL SUBMIT GOES IN HERRE

          setTimeout(() => {
            console.log("PROMISES", promises.length);
            console.log("URL ARRAY", urlImages.length);
            console.log(urlImages);
            console.log("IMAGES SET");

            const trailData = {
              id: Math.random() * 1000000,
              trailName: trailName,
              state: state,
              wildernessArea: wildernessArea,
              bestSeason: season,
              longitude: longitude,
              latitude: latitude,
              imageURL: urlImages,
              miles: miles,
              scenery: scenery,
              solitude: solitude,
              difficulty: difficulty,
              description: description,
            };

            postTrail(trailData);
          }, 1000);
        })
        .catch((err) => console.log(err));
    };

    handleUpload();

    // setTrailName("");
    trailNameReset();
    // setState("");
    stateReset();
    // setWilderness("");
    wildernessAreaReset();
    setSeasonStart("");
    setSeasonEnd("");
    setSeason("");
    // setLongitude("");
    longitudeReset();
    // setLatitude("");
    latitudeReset();
    // setMiles("");
    milesReset();
    // setScenery("");
    sceneryReset();
    // setSolitude("");
    solitudeReset();
    // setDifficulty("");
    difficultyReset();
    // setDescription("");
    descriptionReset();
    setImage("");
  };

  const closeModal = function () {
    setTrailSubmited((prevState) => !prevState);
  };

  const trailNameClasses = trailNameHasError
    ? `${classes['text-input-col']} ${classes['invalid']}`
    : classes["text-input-col"];
  
  const stateClasses = stateHasError
    ? `${classes["text-input-col"]} ${classes["invalid"]}`
    : classes["text-input-col"];
  
  const wildernessAreaClasses = wildernessAreaHasError
    ? `${classes["text-input-col"]} ${classes["invalid"]}`
    : classes["text-input-col"];
  
  const longitudeClasses = longitudeHasError
    ? `${classes["text-input-col"]} ${classes["invalid"]}`
    : classes["text-input-col"];
  
  const latitudeClasses = latitudeHasError
    ? `${classes["text-input-col"]} ${classes["invalid"]}`
    : classes["text-input-col"];
  
  const milesClasses = milesHasError
    ? `${classes["input-col"]} ${classes["invalid"]}`
    : classes["input-col"];
  
  const sceneryClasses = sceneryHasError
    ? `${classes["input-col"]} ${classes["invalid"]}`
    : classes["input-col"];
  
  const solitudeClasses = solitudeHasError
    ? `${classes["input-col"]} ${classes["invalid"]}`
    : classes["input-col"];
  
  const difficultyClasses = difficultyHasError
    ? `${classes["input-col"]} ${classes["invalid"]}`
    : classes["input-col"];
  
  const descriptionClasses = descriptionHasError
    ? `${classes["description-input"]} ${classes["invalid"]}`
    : classes["description-input"]; 

  return (
    <div className={classes["add-trail-section"]}>
      <h1>Enter Trail Information</h1>
      <form onSubmit={formSubmitHandler} className={classes["trail-form"]}>
        <div className={classes["text-row"]}>
          <div className={trailNameClasses}>
            <label htmlFor="trail-name">Trail Name</label>
            <input
              className={classes["trail-name"]}
              type="text"
              id="trail-name"
              onChange={trailNameChangeHandler}
              onBlur={trailNameBlurHandler}
              value={trailName}
              required
            />
            {trailNameHasError && (
              <p className={classes["error-text"]}>
                Please entere a valid trail name
              </p>
            )}
          </div>
          <div className={stateClasses}>
            <label htmlFor="state">State</label>
            <input
              className={classes["state"]}
              type="text"
              id="state"
              onChange={stateChangeHandler}
              onBlur={stateBlurHandler}
              value={state}
              required
            />
            {stateHasError && (
              <p className={classes["error-text"]}>
                Please entere a valid state (Oregon etc...)
              </p>
            )}
          </div>
        </div>
        <div className={classes["text-row"]}>
          <div className={wildernessAreaClasses}>
            <label htmlFor="wilderness-area">Wilderness Area</label>
            <input
              className={classes["wilderness-area"]}
              type="text"
              id="wilderness-area"
              onChange={wildernessAreaChangeHandler}
              onBlur={wildernessAreaBlurHandler}
              value={wildernessArea}
              required
            />
            {wildernessAreaHasError && (
              <p className={classes["error-text"]}>
                Please entere a valid wilderness area (Goat Rocks Wilderness
                etc...)
              </p>
            )}
          </div>
          <div className={classes["text-input-col"]}>
            <label htmlFor="trailhead-name">Trailhead Name (optional)</label>
            <input
              className={classes["trailhead-name"]}
              type="text"
              id="trailhead-name"
              onChange={trailheadNameInputChangeHandler}
              value={trailheadName}
            />
          </div>
        </div>
        <div className={classes["text-row"]}>
          <div className={classes["text-input-col"]}>
            <label htmlFor="season-start">Season Start (optional)</label>
            <select
              id="season-start"
              name="season-start"
              value={seasonStart}
              onChange={seasonStartInputChangeHandler}
            >
              <optgroup label="Month">
                <option value="1">January</option>
                <option value="2">Febuary</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </optgroup>
            </select>
          </div>

          <div className={classes["text-input-col"]}>
            <label htmlFor="season-start">Season End (optional)</label>
            <select
              id="season-end"
              name="season-end"
              value={seasonEnd}
              onChange={seasonEndInputChangeHandler}
            >
              <optgroup label="Month">
                <option value="1">January</option>
                <option value="2">Febuary</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className={classes["text-row"]}>
          <div className={longitudeClasses}>
            <label htmlFor="longitude">Longitude (trailhead)</label>
            <input
              className={classes["wilderness-area"]}
              type="text"
              id="longitude"
              onChange={longitudeChangeHandler}
              onBlur={longitudeBlurHandler}
              value={longitude}
              required
            />
            {longitudeHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid longitude (right click on trailhead in
                google maps)
              </p>
            )}
          </div>

          <div className={latitudeClasses}>
            <label htmlFor="latitude">Latitude (trailhead) </label>
            <input
              className={classes["season"]}
              type="text"
              id="latitude"
              onChange={latitudeChangeHandler}
              onBlur={latitudeBlurHandler}
              value={latitude}
            />
            {latitudeHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid latitude (right click on trailhead in
                google maps)
              </p>
            )}
          </div>
        </div>

        <div className={classes["number-group"]}>
          <div className={milesClasses}>
            <label htmlFor="miles">Miles </label>
            <input
              className={classes["number-input"]}
              type="number"
              id="miles"
              onChange={milesChangeHandler}
              onBlur={milesBlurHandler}
              value={miles}
              required
            />
            {milesHasError && (
              <p className={classes["error-text"]}>
                Please enter mileage of hike
              </p>
            )}
          </div>

          <div className={sceneryClasses}>
            <label htmlFor="scenery">Scenery (1-10)</label>
            <input
              className={classes["number-input"]}
              type="number"
              id="scenery"
              onChange={sceneryChangeHandler}
              onBlur={sceneryBlurHandler}
              value={scenery}
              required
            />
            {sceneryHasError && (
              <p className={classes["error-text"]}>
                Please rate scenery from 1 to 10
              </p>
            )}
          </div>
          <div className={solitudeClasses}>
            <label htmlFor="solitude">Solitude (1-10)</label>
            <input
              className={classes["number-input"]}
              type="number"
              id="solitude"
              onChange={solitudeChangeHandler}
              onBlur={solitudeBlurHandler}
              value={solitude}
              required
            />
            {solitudeHasError && (
              <p className={classes["error-text"]}>
                Please rate solitude from 1 to 10 (1=crowded, 10=alone)
              </p>
            )}
          </div>
          <div className={difficultyClasses}>
            <label htmlFor="difficulty">Difficulty (1-10)</label>
            <input
              className={classes["number-input"]}
              type="number"
              id="difficulty"
              onChange={difficultyChangeHandler}
              onBlur={difficultyBlurHandler}
              value={difficulty}
              required
            />
            {difficultyHasError && (
              <p className={classes["error-text"]}>
                Please rate difficulty from 1 to 10 (1=easy, 10=hard)
              </p>
            )}
          </div>
        </div>

        <div className={descriptionClasses}>
          <label htmlFor="description">Trail Description </label>
          <textarea
            className={"description"}
            type="text"
            id="description"
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            rows="10"
            cols="50"
            value={description}
            required
          />
          {descriptionHasError && (
            <p className={classes["error-text"]}>
              Please provide trail description
            </p>
          )}
        </div>

        <label htmlFor="image-upload">Upload Images (optional)</label>
        <input
          type="file"
          multiple
          onChange={handleChange}
          accept="image/jpg"
        />
        <progress value={progress} max="100" />
        <button type="submit">Submit Trail!</button>
      </form>
      {trailSubmited && (
        <MessageTrailSubmit onClose={closeModal} uploading={isUploading} />
      )}
    </div>
  );
};

export default AddTrail;
