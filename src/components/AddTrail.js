import React from 'react'
import classes from "./AddTrail.module.css";

const AddTrail = () => {
    return (
      <div className={classes["add-trail-section"]}>
        <h1>Enter Trail Information</h1>
        <form className={classes["trail-form"]}>
          <div className={classes["text-row"]}>
            <div className={classes["text-input-col"]}>
              <label htmlFor="trail-name">Trail Name</label>
              <input
                className={classes["trail-name"]}
                type="text"
                id="trail-name"
              />
            </div>
            <div className={classes["text-input-col"]}>
              <label htmlFor="state">State</label>
              <input className={classes["state"]} type="text" id="state" />
            </div>
          </div>
          <div className={classes["text-row"]}>
            <div className={classes["text-input-col"]}>
              <label htmlFor="wilderness-area">Wilderness Area</label>
              <input
                className={classes["wilderness-area"]}
                type="text"
                id="wilderness-area"
              />
            </div>

            <div className={classes["text-input-col"]}>
              <label htmlFor="season">Best Season </label>
              <input className={classes["season"]} type="text" id="season" />
            </div>
          </div>
          <div className={classes["text-row"]}>
            <div className={classes["text-input-col"]}>
              <label htmlFor="wilderness-area">Longitude (trailhead)</label>
              <input
                className={classes["wilderness-area"]}
                type="text"
                id="wilderness-area"
              />
            </div>

            <div className={classes["text-input-col"]}>
              <label htmlFor="season">Latitude (trailhead) </label>
              <input className={classes["season"]} type="text" id="season" />
            </div>
          </div>

          <div className={classes["number-group"]}>
            <div className={classes["input-col"]}>
              <label htmlFor="scenery">Miles </label>
              <input
                className={classes["number-input"]}
                type="number"
                id="miles"
              />
            </div>

            <div className={classes["input-col"]}>
              <label htmlFor="scenery">Scenery (1-10)</label>
              <input
                className={classes["number-input"]}
                type="number"
                id="scenery"
              />
            </div>
            <div className={classes["input-col"]}>
              <label htmlFor="scenery">Solitude (1-10)</label>
              <input
                className={classes["number-input"]}
                type="number"
                id="scenery"
              />
            </div>
            <div className={classes["input-col"]}>
              <label htmlFor="difficulty">Difficulty (1-10)</label>
              <input
                className={classes["number-input"]}
                type="number"
                id="difficulty"
              />
            </div>
          </div>

          <label htmlFor="description">Trail Description </label>
          <textarea
            className={"description"}
            type="text"
            id="description"
            rows="10"
            cols="50"
          />

          <button type="submit">Submit Trail!</button>
        </form>
      </div>
    );
}

export default AddTrail
