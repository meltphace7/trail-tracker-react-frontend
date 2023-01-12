import React from 'react';
import classes from './UserTrail.module.css';
import { Link } from 'react-router-dom';
import hostURL from '../hosturl'

const UserTrail = (props) => {
    const trailId = props.id;
    const trail = {
      _id: props.id,
      trailName: props.trailName,
      state: props.state,
      wildernessArea: props.wildernessArea,
      bestSeason: props.bestSeason,
      longitude: props.longitude,
      latitude: props.latitude,
      miles: props.miles,
      scenery: props.scenery,
      solitude: props.solitude,
      difficulty: props.difficulty,
      description: props.description,
      author: props.author,
      authorId: props.authorId,
      images: props.images,
    };

    const imageUrl = "https://trail-tracker-image-bucket.s3.us-west-2.amazonaws.com/03a124a5bf112e473afc80b58f84fcbae14b43e72ed0a65a47e6bba96152b208";

    console.log(imageUrl.slice(62))

     let difficulty;
     const calcDifficulty = function (diff) {
       if (+diff <= 3) difficulty = "easy";
       if (+diff > 3 && +diff < 7) difficulty = "moderate";
       if (+diff >= 7 && +diff <= 8) difficulty = "hard";
       if (+diff > 8) difficulty = "very-hard";
     };
    calcDifficulty(props.difficulty);

    const deleteTrailHandler = async () => {
        const token = localStorage.getItem('token')
        const trailData = {
            trailId: trailId,
            trailImages: trail.images
        }
        console.log(trailData)

        try {
            const response = await fetch(`${hostURL}/auth/delete-trail`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(trailData)
            })
            if (!response.ok) {
                throw new Error('Could not delete trail!')
            }
            const responseData = await response.json();
            console.log(responseData)
            props.onDelete();
        } catch (err) {
            console.log(err)
        }
    }

    return (
      <div className={classes["user-trail"]}>
        <h1 className={classes.title}>{trail.trailName}</h1>
        <h3>{`${trail.state} - ${trail.wildernessArea} `}</h3>
        <div className={classes["image-container"]}>
          {trail.images && <img src={trail.images[0]} />}
        </div>
        <div className={classes["miles-difficulty-container"]}>
          <h3>{`${trail.miles} miles roundtrip -`}&nbsp;</h3>
          <h3 className={classes[difficulty]}>
            {`Difficulty: ${trail.difficulty}/10`}
          </h3>
        </div>
        <div className={classes["description"]}>
          <p>{trail.description}</p>
        </div>
        <div className={classes["trail-controls"]}>
          <Link className={classes["edit-link"]} to={`/edit/${trail._id}`}>
            Edit
          </Link>
                <button
                    onClick={deleteTrailHandler}
                    className={classes["delete-btn"]}>Delete</button>
        </div>
      </div>
    );
}

export default UserTrail
