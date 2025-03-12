import React from 'react'
import classes from './About.module.css'
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={classes["about-page"]}>
      <div className={classes["about-page__banner"]}>
        <h1>
          Getting Into Nature
          <br />
          Has Never Been Easier
        </h1>
      </div>
      <section className={classes["about-split"]}>
        <div className={classes["about-split__text"]}>
          <h2>Made For Exploration</h2>
          <p>
            Hi, I'm Brock! I created Trail Tracker after years of backpacking and exploring the
            outdoors. I wanted a way to track the amazing wilderness locations I’ve been, categorize
            the trails I’ve hiked, and easily share them with others. Trail
            Tracker makes it simple to document adventures, discover new routes,
            and connect with fellow outdoor enthusiasts.
          </p>
        </div>
        <img src="/imgs/HELLS-CANYON-BROCK-VIEWPOINT.jpg" alt="Brock Dallman, Creator of Trail Tracker" />
      </section>

      <section className={classes["overlay-split"]}>
        <img src="/imgs/EVOLUTION-LAKE.jpg" alt="Alpine Lake in The Sierras" />
        <div className={classes["overlay-split__text"]}>
          <h2>Discover New Trails</h2>
          <p>
            Trail Tracker makes it easy to find your next adventure. Explore a
            growing collection of trails with detailed mileage, difficulty
            ratings, descriptions, weather reports and photos. See the best
            seasons to hike, get trailhead directions, and view interactive maps
            to plan your journey. Whether you're looking for a challenging
            summit or a casual day hike, Trail Tracker helps you find the
            perfect trail for your next outdoor adventure.
          </p>
        </div>
      </section>

      <section className={classes["about-split"]}>
        <div className={classes["about-split__text"]}>
          <h2>A New Adventure Awaits</h2>
          <p>
            Search Trails by State, Wilderness Area or Best Season to hike. You
            can also select a trail by clicking one of the pindrops on the
            interactive map on the homepage. Your next adventure is just a click
            away!
          </p>
          <Link className="link-btn" to="/trails">
            Find Your Trail
          </Link>
        </div>
        <img className={classes['find-trail-img']} src="/imgs/PARADISE-LAKE.jpg" alt="Alpine Lake In Kings Canyon National Park" />
      </section>

      <section className={classes["sign-up-overlay"]}>
        <div className={classes["sign-up-overlay__text"]}>
          <h2>Join The Party</h2>
          <p>
            Sign up today to submit your own trails, and become part of the
            Trail Tracker community.
          </p>
          <Link className="link-btn" to="/signup">
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About