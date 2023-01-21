import { useState, useEffect, useCallback } from "react";
import Navigation from "./components/Navigation";
import MobileNavigation from "./components/MobileNavigation";
import AddTrail from "./components/pages/AddTrail";
import EditTrail from "./components/pages/EditTrail";
import Footer from "./components/Footer";
import TrailDetail from "./components/pages/TrailDetail";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TrailSearchResults from "./components/pages/TrailSearchResults";
import ScrollToTop from "./components/ScrollToTop";
import Favorites from "./components/pages/Favorites";
import Account from "./components/pages/Account";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthData } from "./store/auth-actions";
import { sendAuthData } from "./store/auth-actions";
import hostURL from "./hosturl";
import { authActions } from "./store/auth-slice";

let isInitial = true;
let render = 1;

function App() {
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

  /// Get faves depending on auth status
  useEffect(() => {
    if (isAuth) return;
    dispatch(authActions.setFavoritesFromLocalStorage());
}, [isAuth,])

  ///

  // FETCHES TRAILS FROM BACKEND
  const fetchTrails = useCallback(async () => {
    console.log("FETCHING TRAILS from APP");
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

  ////////////////// FILTER-RESULTS //////////////////////////
  // Gets filter from TrailSearchResultsComponent
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

  return (
    <div className="App">
      <MobileNavigation />
      <Navigation />
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage
            trails={trails}
            onFilterSelect={getFilter}
            trailFilter={filter}
          />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        {isAuth && (
          <Route path="/addtrail">
            <AddTrail onAddTrail={fetchTrails} />
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
            filteredTrails={filteredTrails}
            trails={trails}
            trailFilter={filter}
            onFilterSelect={getFilter}
          />
        </Route>
        <Route path="/trail-detail/:trailId">
          <TrailDetail trails={filteredTrails} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
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
