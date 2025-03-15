import { useState, useEffect, useCallback } from "react";
import Navigation from "./components/layout/Navigation";
import MobileNavigation from "./components/layout/MobileNavigation";
import AddTrail from "./pages/AddTrail";
import EditTrail from "./pages/EditTrail";
import Footer from "./components/layout/Footer";
import TrailDetail from "./pages/TrailDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrailSearchResults from "./pages/TrailSearchResults";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthData } from "./store/auth-actions";
import { sendAuthData } from "./store/auth-actions";
import hostURL from "./hosturl";
import { authActions } from "./store/auth-slice";
import { useRef } from "react";

import { useMemo } from "react";

let isInitial = true;

function App() {
  const didFetchTrails = useRef(false);
  const dispatch = useDispatch();

  const reduxType = useSelector((state) => state.trails.currentQueryType);
  const reduxQuery = useSelector((state) => state.trails.currentSearchQuery);

  const userFavorites = useSelector((state) => state.auth.favorites);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [trails, setTrails] = useState([]);

  //FETCH AUTH DATA IF CURRENT USER IS AUTHENTICATED
  useEffect(() => {
    dispatch(fetchAuthData());
    if (isInitial) {
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    // PREVENTS AUTH UPDATE ON FIRST RENDER

    if (isInitial) {
      isInitial = false;
      return;
    }

    // IF USER AUTHENTICATED, UPDATE FAVORITES ON FAVORITES CHANGE
    dispatch(sendAuthData(userFavorites));
  }, [userFavorites, dispatch]);

  /// Get faves depending on auth status
  useEffect(() => {
    if (isAuth) return;
    dispatch(authActions.setFavoritesFromLocalStorage());
  }, [isAuth, dispatch]);

  ///////// FETCHES TRAILS FROM BACKEND ////////
  const fetchTrails = useCallback(async () => {
    try {
      const response = await fetch(`${hostURL}/trails/trails`);
      if (!response.ok) {
        throw new Error("Could not fetch trails");
      }
      const responseData = await response.json();
      const fetchedTrails = responseData.trails;

      const alphaSortedTrails = fetchedTrails.sort((a, b) =>
        a.trailName.localeCompare(b.trailName)
      );
      setTrails(alphaSortedTrails);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!didFetchTrails.current) {
      fetchTrails();
      didFetchTrails.current = true;
    }
  }, [fetchTrails]);

  ////////////////// FILTER-RESULTS //////////////////////////

  const filteredTrails = useMemo(() => {
    if (reduxType === "search") {
      const regex = new RegExp(reduxQuery, "i");
      return trails.filter(
        (trail, index, self) =>
          (regex.test(trail.trailName) || regex.test(trail.description)) &&
          self.findIndex((t) => t.trailName === trail.trailName) === index
      );
    }
    if (reduxType === "All") {
      return trails;
    }
    if (reduxType === "by-state") {
      return trails.filter((trail) => trail.state === reduxQuery);
    }
    if (reduxType === "by-wilderness") {
      return trails.filter((trail) => trail.wildernessArea === reduxQuery);
    }
    if (reduxType === "by-season") {
      const invertedDateHikes = trails.filter(
        (trail) => +trail.bestSeason[0] > +trail.bestSeason[1]
      );
      const standardDateHikes = trails.filter(
        (trail) => +trail.bestSeason[0] < +trail.bestSeason[1]
      );
      const matchingInvertedHikes = invertedDateHikes.filter(
        (trail) =>
          (+reduxQuery >= +trail.bestSeason[0] && 12) ||
          +reduxQuery <= +trail.bestSeason[1]
      );
      const matchingStandardHikes = standardDateHikes.filter(
        (trail) =>
          +reduxQuery >= +trail.bestSeason[0] &&
          +reduxQuery <= +trail.bestSeason[1]
      );
      return [...matchingInvertedHikes, ...matchingStandardHikes];
    }
    return [];
  }, [trails, reduxType, reduxQuery]);

  return (
    <div className="App">
      <MobileNavigation />
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<HomePage trails={trails} />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />

        {isAuth && (
          <Route
            path="/addtrail"
            element={<AddTrail onAddTrail={fetchTrails} />}
          />
        )}
        {isAuth && (
          <Route
            path="/edit-trail/:trailId"
            element={<EditTrail onEditTrail={fetchTrails} />}
          />
        )}
        {isAuth && (
          <Route
            path="/account"
            element={<Account onDeleteTrail={fetchTrails} />}
          />
        )}
        <Route
          path="/trails"
          element={
            <TrailSearchResults
              filteredTrails={filteredTrails}
              trails={trails}
            />
          }
        />

        <Route
          path="/trail-detail/:trailId"
          element={<TrailDetail trails={filteredTrails} />}
        />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;