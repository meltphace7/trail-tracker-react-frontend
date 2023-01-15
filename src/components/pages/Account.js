import React, { useCallback, useEffect, useState } from "react";
import classes from "./Account.module.css";
import { useSelector } from "react-redux";
import UserTrail from '../UserTrail';
import hostURL from '../../hosturl'

const Account = (props) => {
    const [usersTrails, setUsersTrails] = useState([]);

  const userName = useSelector((state) => state.auth.userName);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token');

  const fetchUserTrails = useCallback(async () => {
    try {
      const response = await fetch(`${hostURL}/auth/fetch-user-trails`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Could not find users trails!");
      }
      const responseData = await response.json();
        setUsersTrails(responseData.submittedTrails)
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchUserTrails();
  }, [fetchUserTrails]);

  return (
    <div className={classes.account}>
      <h1 className={classes.title}>Your Account</h1>
      <div className={classes["user-info"]}>
        <h2>{`User Name: ${userName}`}</h2>
      </div>
      <h1>Your Submitted Trails</h1>
      <p>{`${usersTrails.length} trails`}</p>
      <ul className={classes["user-trails-container"]}>
        {usersTrails.map((trail) => {
          return (
            <UserTrail
              key={trail._id}
              id={trail._id}
              trailName={trail.trailName}
              state={trail.state}
              wildernessArea={trail.wildernessArea}
              miles={trail.miles}
              difficulty={trail.difficulty}
              description={trail.description}
              images={trail.images}
              onDeleteTrail={props.onDeleteTrail}
              onDelete={fetchUserTrails}
            />
          );
        })}
        {usersTrails.length === 0 && <h3>YOU HAVE NOT SUBMITTED ANY TRAILS YET</h3>}
      </ul>
    </div>
  );
};

export default Account;
