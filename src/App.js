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

let isInitial = true;
let render = 1;

function App() {
  const didFetchTrails = useRef(false);

  const [trails, setTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  const userFavorites = useSelector((state) => state.auth.favorites);
  const isAuth = useSelector((state) => state.auth.isAuth);

  //FETCH AUTH DATA IF CURRENT USER IS AUTHENTICATED
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
    // PREVENTS AUTH UPDATE ON FIRST RENDER
    // if (isInitial || !isAuth) return;
    if (isInitial) {
      isInitial = false;
      render = 2;
      return;
    }
  
    // IF USER AUTHENTICATED, UPDATE FAVORITES ON FAVORITES CHANGE
    dispatch(sendAuthData(userFavorites));
  
  }, [userFavorites, dispatch, isAuth]);

  /// Get faves depending on auth status
  useEffect(() => {
    if (isAuth) return;
    dispatch(authActions.setFavoritesFromLocalStorage());
  }, [isAuth, dispatch]);

  ///

  // FETCHES TRAILS FROM BACKEND
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
      console.log('TRAILS FETCHED')
      setTrails(alphaSortedTrails);
      // setFilteredTrails(alphaSortedTrails);
    } catch (err) {
      console.log(err);
    }
  }, []);


  useEffect(() => {
      if (!didFetchTrails.current) {
        fetchTrails();
        didFetchTrails.current = true;
      }

    // fetchTrails();
  }, [fetchTrails]);

  ////////////////// FILTER-RESULTS //////////////////////////
  // Gets filter from TrailSearchResultsComponent
  const getFilter = (filterSetting) => {
    setFilter(filterSetting);
  };

  // useEffect(() => {
  //   setFilteredTrails(trails);
  //   console.log('SET FILTERED TRAILS')
  // }, [trails]);

  // FILTERS TRAILS BASED ON FILTER TYPE AND FILTER QUERY
  useEffect(() => {
    // if (filter === undefined || filter.filterType === "") {
    //   setFilteredTrails(trails);
    //   return;
    // }
    // SEARCH BY NAME - USER TEXT INPUT
    if (filter.filterType === "search") {
      const regex = new RegExp(filter.filterQuery, "i");
      // const filteredTrails = trails.filter((trail) =>
      //   regex.test(trail.trailName)
      // );
      const filteredTrails = trails.filter(
        (trail, index, self) =>
          (regex.test(trail.trailName) || regex.test(trail.description)) &&
          self.findIndex((t) => t.trailName === trail.trailName) === index
      );
      setFilteredTrails(filteredTrails);
    }
    // ALL TRAILS
    if (filter.filterType === "All") {
      setFilteredTrails(trails);
    }
    // FILTERING BY STATE
    if (filter.filterType === "by-state") {
      const filterTrails = trails.filter(
        (trail) => trail.state === filter.filterQuery
      );
      setFilteredTrails(filterTrails);
    }
    // FILTERING BY WILDERNESS AREA
    if (filter.filterType === "by-wilderness") {
      const filterTrails = trails.filter(
        (trail) => trail.wildernessArea === filter.filterQuery
      );
      setFilteredTrails(filterTrails);
    }
    // FILTERING BY BEST SEASON TO HIKE
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

  let trailsLoaded = false;
  if (trails.length > 0) {
    trailsLoaded = true;
  } 
 

console.log('APP RENDER, TRAILS-LOADED=', trailsLoaded)
  return (
    <div className="App">
      <MobileNavigation />
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route
          path="/home"
          element={
            <HomePage
              trails={trails}
              onFilterSelect={getFilter}
              trailFilter={filter}
            />
          }
        />
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
              trailFilter={filter}
              onFilterSelect={getFilter}
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
