import React from "react";
import classes from "./AboutSection.module.css";
import { Link} from "react-router-dom";

const AboutSection = () => {
  return (
    <section className={classes["about-section"]}>
      <div className={classes["about-container"]}>
        {/* <img src="/imgs/SWITCHBACK-HIKER.jpg" alt="Backpacker on a mountain trail" /> */}

        <div className={classes["about-text"]}>
          <h3>Discover the Wild</h3>
          <p>
            Trail Tracker makes it easy to find, track, and share your favorite
            trails. Discover new routes, upload photos, and explore detailed
            maps—all in one place. Whether hiking, backpacking or trail running, adventure starts
            here!
          </p>
          <Link className={"link-btn"} to="/about">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
