import React, { useState, useEffect } from "react";
import classes from "./AddTrail.module.css";
import { storage } from "../../firebase";
import MessageTrailSubmit from "../MessageTrailSubmit";

const AddTrail = (props) => {
  const [trailName, setTrailName] = useState("");
  const [state, setState] = useState("");
  const [wilderness, setWilderness] = useState("");
  const [trailheadName, setTrailheadName] = useState("");
  const [seasonStart, setSeasonStart] = useState("");
  const [seasonEnd, setSeasonEnd] = useState("");
  const [season, setSeason] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [miles, setMiles] = useState("");
  const [scenery, setScenery] = useState("");
  const [solitude, setSolitude] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [trailSubmited, setTrailSubmited] = useState(false);
  const [isUploading, setIsuploading] = useState(false);
  ///////// image upload state
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const nameInputChangeHandler = (e) => {
    setTrailName(e.target.value);
  };

  const stateInputChangeHandler = (e) => {
    setState(e.target.value);
  };

  const wildernessInputChangeHandler = (e) => {
    setWilderness(e.target.value);
  };

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
  });

  const longitudeInputChangeHandler = (e) => {
    setLongitude(e.target.value);
  };

  const latitudeInputChangeHandler = (e) => {
    setLatitude(e.target.value);
  };

  const milesInputChangeHandler = (e) => {
    setMiles(e.target.value);
  };

  const sceneryInputChangeHandler = (e) => {
    setScenery(e.target.value.toLowerCase());
  };

  const solitudeInputChangeHandler = (e) => {
    setSolitude(e.target.value);
  };

  const difficultyInputChangeHandler = (e) => {
    setDifficulty(e.target.value);
  };

  const descriptionInputChangeHandler = (e) => {
    setDescription(e.target.value);
  };

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
              wildernessArea: wilderness,
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

    setTrailName("");
    setState("");
    setWilderness("");
    setSeasonStart("");
    setSeasonEnd("");
    setSeason("");
    setLongitude("");
    setLatitude("");
    setMiles("");
    setScenery("");
    setSolitude("");
    setDifficulty("");
    setDescription("");
    setImage("");
  };

  const closeModal = function () {
    setTrailSubmited((prevState) => !prevState);
  };

  return (
    <div className={classes["add-trail-section"]}>
      <h1>Enter Trail Information</h1>
      <form onSubmit={formSubmitHandler} className={classes["trail-form"]}>
        <div className={classes["text-row"]}>
          <div className={classes["text-input-col"]}>
            <label htmlFor="trail-name">Trail Name</label>
            <input
              className={classes["trail-name"]}
              type="text"
              id="trail-name"
              onChange={nameInputChangeHandler}
              value={trailName}
              required
            />
          </div>
          <div className={classes["text-input-col"]}>
            <label htmlFor="state">State</label>
            <input
              className={classes["state"]}
              type="text"
              id="state"
              onChange={stateInputChangeHandler}
              value={state}
              required
            />
          </div>
        </div>
        <div className={classes["text-row"]}>
          <div className={classes["text-input-col"]}>
            <label htmlFor="wilderness-area">Wilderness Area</label>
            <input
              className={classes["wilderness-area"]}
              type="text"
              id="wilderness-area"
              onChange={wildernessInputChangeHandler}
              value={wilderness}
              required
            />
          </div>
          <div className={classes["text-input-col"]}>
            <label htmlFor="trailhead-name">Trailhead Name</label>
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
            <label htmlFor="season-start">Season Start</label>
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
            <label htmlFor="season-start">Season End</label>
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
          <div className={classes["text-input-col"]}>
            <label htmlFor="longitude">Longitude (trailhead)</label>
            <input
              className={classes["wilderness-area"]}
              type="text"
              id="longitude"
              onChange={longitudeInputChangeHandler}
              value={longitude}
            />
          </div>

          <div className={classes["text-input-col"]}>
            <label htmlFor="latitude">Latitude (trailhead) </label>
            <input
              className={classes["season"]}
              type="text"
              id="latitude"
              onChange={latitudeInputChangeHandler}
              value={latitude}
            />
          </div>
        </div>

        <div className={classes["number-group"]}>
          <div className={classes["input-col"]}>
            <label htmlFor="miles">Miles </label>
            <input
              className={classes["number-input"]}
              type="number"
              id="miles"
              onChange={milesInputChangeHandler}
              value={miles}
              required
            />
          </div>

          <div className={classes["input-col"]}>
            <label htmlFor="scenery">Scenery (1-10)</label>
            <input
              className={classes["number-input"]}
              type="number"
              id="scenery"
              onChange={sceneryInputChangeHandler}
              value={scenery}
              required
            />
          </div>
          <div className={classes["input-col"]}>
            <label htmlFor="solitude">Solitude (1-10)</label>
            <input
              className={classes["number-input"]}
              type="number"
              id="solitude"
              onChange={solitudeInputChangeHandler}
              value={solitude}
              required
            />
          </div>
          <div className={classes["input-col"]}>
            <label htmlFor="difficulty">Difficulty (1-10)</label>
            <input
              className={classes["number-input"]}
              type="number"
              id="difficulty"
              onChange={difficultyInputChangeHandler}
              value={difficulty}
              required
            />
          </div>
        </div>

        <label htmlFor="description">Trail Description </label>
        <textarea
          className={"description"}
          type="text"
          id="description"
          onChange={descriptionInputChangeHandler}
          rows="10"
          cols="50"
          value={description}
          required
        />

        <label htmlFor="image-upload">Upload Images</label>
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