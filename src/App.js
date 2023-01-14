import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import MobileNavigation from './components/MobileNavigation';
import AddTrail from "./components/pages/AddTrail";
import EditTrail from "./components/pages/EditTrail";
import Footer from "./components/Footer";
import TrailDetail from "./components/pages/TrailDetail";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TrailSearchResults from "./components/pages/TrailSearchResults";
import ScrollToTop from "./components/ScrollToTop";
import Favorites from "./components/pages/Favorites";
import Account from './components/pages/Account';
import SignUp from "./components/pages/SignUp";
import LogIn from "./components/pages/LogIn";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthData } from "./store/auth-actions";
import { sendAuthData } from "./store/auth-actions";
import hostURL from "./hosturl";

let isInitial = true;
let render = 1;

function App() {
  // const [loadedTrails, setLoadedTrails] = useState([]);
  const dispatch = useDispatch();
  const userFavorites = useSelector((state) => state.auth.favorites);
  const currentTrailQuery = useSelector(
    (state) => state.trails.currentSearchQuery
  );

  const isAuth = useSelector((state) => state.auth.isAuth);
  const [trails, setTrails] = useState([]);

  //LOAD FAVORITES from local storage
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorite-trails")
      ? JSON.parse(localStorage.getItem("favorite-trails"))
      : []
  );
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [filter, setFilter] = useState("");

  const favoriteToggleHandler = function () {
    setFavorites(JSON.parse(localStorage.getItem("favorite-trails")));
  };

  //FETCH CART DATA IF CURRENT USER IS AUTHENTICATED
  useEffect(() => {
    dispatch(fetchAuthData());
    if (isInitial) {
      return;
    }

    if (render === 2) {
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    // PREVENTS CART UPDATE ON FIRST RENDER
    if (isInitial) {
      isInitial = false;
      render = 2;
      return;
    }

    if (render === 2) {
      render = 3;
      return;
    }

    // IF USER AUTHENTICATED, UPDATE FAVORITES ON FAVORITES CHANGE
    dispatch(sendAuthData(userFavorites));
  }, [userFavorites, dispatch]);
  

  // FETCHES TRAILS FROM BACKEND
  const fetchTrails = useCallback(async () => {
    console.log('FETCHING TRAILS from APP')
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
    fetchTrails();
  }, [fetchTrails]);

  //updates loaded trails on trail submission in AddTrails.js
  const upDateLoadedTrailsHandler = function () {
    fetchTrails();
    console.log("TRAILS UPDATED");
  };

  const trailID = localStorage.getItem("selectedTrail");
  const [selectTrail] = trails.filter((trail) => trail._id === trailID);
  const [selectedTrail, setSelectedTrail] = useState(selectTrail);

  ////////////////////////////////////////////////
  // const getAddTrailData = (trailData) => {
  //   setTrails((prevState) => {
  //     return [...prevState, trailData];
  //   });
  // };

  const getFilter = (filterSetting) => {
    setFilter(filterSetting);
  };

  useEffect(() => {
    setFilteredTrails(trails);
  }, [trails]);

  // FILTERS TRAILS BASED ON FILTER TYPE AND FILTER QUERY
  useEffect(() => {
    if (filter === undefined || filter.filterType === "") {
      setFilteredTrails(trails);
      return;
    }
    if (filter.filterType === "All") {
      setFilteredTrails(trails);
    }
    if (filter.filterType === "by-state") {
      const filterTrails = trails.filter(
        (trail) => trail.state === filter.filterQuery
      );
      setFilteredTrails(filterTrails);
    }
    if (filter.filterType === "by-wilderness") {
      const filterTrails = trails.filter(
        (trail) => trail.wildernessArea === filter.filterQuery
      );
      setFilteredTrails(filterTrails);
    }
    if (filter.filterType === "by-season") {
      // FIND Inverted Date Hikes(where start month numbers > end month numbers)
      const invertedDateHikes = trails.filter(
        (trail) => +trail.bestSeason[0] > +trail.bestSeason[1]
      );
      // Filter Inverted Date hikes from standard
      const standardDateHikes = trails.filter(
        (trail) => +trail.bestSeason[0] < +trail.bestSeason[1]
      );
      // Apply Filter logic to Inverted Date hikes
      const matchingInvertedHikes = invertedDateHikes.filter(
        (trail) =>
          (+filter.filterQuery >= +trail.bestSeason[0] && 12) ||
          +filter.filterQuery <= +trail.bestSeason[1]
      );
      // Apply Filter Login to Standard Date Hikes
      const matchingStandardHikes = standardDateHikes.filter(
        (trail) =>
          +filter.filterQuery >= +trail.bestSeason[0] &&
          +filter.filterQuery <= +trail.bestSeason[1]
      );
      const seasonFilteredHikes = [
        ...matchingInvertedHikes,
        ...matchingStandardHikes,
      ];
      setFilteredTrails(seasonFilteredHikes);
    }
  }, [filter, trails]);

  // // GETS Indiviual Trail data for TrailDetail rendering
  const getSelectedTrail = function (id) {
    const [selectTrail] = trails.filter((trail) => trail._id === id);
    setSelectedTrail(selectTrail);
    localStorage.setItem("selectedTrail", id);
  };

  // console.log("RENDER");

  return (
    <div className="App">
      <MobileNavigation />
      <Navigation
      // trails={trails}
      // onFilterSelect={getFilter}
      />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage
            trails={trails}
            onFilterSelect={getFilter}
            onTrailSelect={getSelectedTrail}
            trailFilter={filter}
          />
        </Route>
        {isAuth && (
          <Route path="/favorites">
            <Favorites
              onTrailSelect={getSelectedTrail}
              onFavoriteToggle={favoriteToggleHandler}
              favorites={favorites}
            />
          </Route>
        )}
        {isAuth && (
          <Route path="/addtrail">
            <AddTrail
              // onAddTrail={getAddTrailData}
              onAddTrail={fetchTrails}
              updateTrails={upDateLoadedTrailsHandler}
            />
          </Route>
        )}
        {isAuth && (
          <Route path="/edit-trail/:trailId">
            <EditTrail onEditTrail={fetchTrails} />
          </Route>
        )}
        {isAuth && (
          <Route path="/account">
            <Account onDeleteTrail={fetchTrails} />
          </Route>
        )}
        <Route path="/trails">
          <TrailSearchResults
            onTrailSelect={getSelectedTrail}
            filteredTrails={filteredTrails}
            trails={trails}
            trailFilter={filter}
            onFilterSelect={getFilter}
            onFavoriteToggle={favoriteToggleHandler}
            favorites={favorites}
          />
        </Route>
        <Route path="/trail-detail/:trailId">
          <TrailDetail
            trail={selectedTrail}
            trails={filteredTrails}
            onFavoriteToggle={favoriteToggleHandler}
          />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
