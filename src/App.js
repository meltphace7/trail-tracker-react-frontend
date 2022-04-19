import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import AddTrail from "./components/AddTrail";
import Footer from "./components/Footer";
import MainPage from './components/MainPage';
import { Switch, Route, Redirect} from 'react-router-dom'



let DUMMY_DATA = [
  {
    id: 1,
    trailName: "Hells Canyon Bench Trail",
    state: "Oregon",
    wildernessArea: "Hells Canyon Recreation Area",
    bestSeason: ["4", "7"],
    longitude: 123,
    latitude: 123,
    miles: 61,
    scenery: 8,
    solitude: 10,
    difficulty: 7,
    description: `'A rustic trail hugging the Oregon side of Hell's canyon.  Provides solitude and wide sweeping views of Hell's canyon.`,
  },
  {
    id: 2,
    trailName: "Thousand Island Lake Loop",
    state: "California",
    wildernessArea: "Ansel Adams Wilderness",
    bestSeason: ["6", "10"],
    longitude: 123,
    latitude: 123,
    miles: 22,
    scenery: 10,
    solitude: 3,
    difficulty: 6,
    description: `A popular and incredibly scenic trail that passes through one of the most beautiful areas in the High Sierra.  Part of this loop follows the famous John Muir Trail.  `,
  },
  {
    id: 3,
    trailName: "Tin Cup Loop",
    state: "Idaho",
    wildernessArea: "Sawtooth Wilderness",
    bestSeason: ["7", "10"],
    longitude: 123,
    latitude: 123,
    miles: 19,
    scenery: 10,
    solitude: 4,
    difficulty: 5,
    description: ` A gorgeous hike through the heart of the Sawtooth Range, featuring multiple lakes and a scenic high pass.  Alice lake is a main feature of this hike and is perhaps the most beautiful of the Sawtooth mountains.`,
  },
  {
    id: 4,
    trailName: "Timberline Trail",
    state: "Oregon",
    wildernessArea: "Mt Hood National Forest",
    bestSeason: ["6", "10"],
    longitude: 123,
    latitude: 123,
    miles: 52,
    scenery: 7,
    solitude: 3,
    difficulty: 7,
    description: `An alpine trail which circles the tallest strato volcano in Oregon, Mt Hood.  This hike takes around 4 days to complete and is features wide open sweeping views of the slopes of Mt. Hood.`,
  },
  {
    id: 5,
    trailName: "Wonderland Trail",
    state: "Washington",
    wildernessArea: "Mt. Rainier National Park",
    bestSeason: ["6", "10"],
    longitude: 123,
    latitude: 123,
    miles: 91,
    scenery: 10,
    solitude: 4,
    difficulty: 8,
    description: `A wonder inspiring trail which circles the Pacific Northwest's most magnificent mountain.  The wonderland trail is a long and scenery packed route which traverses many ridges and valleys.`,
  },
  {
    id: 6,
    trailName: "Goatrocks via Coyote Trail",
    state: "Washington",
    wildernessArea: "Goat Rocks Wilderness",
    bestSeason: ["6", "10"],
    longitude: 123,
    latitude: 123,
    miles: 21,
    scenery: 8,
    solitude: 6,
    difficulty: 9,
    description: `A long buy scenic route up a long glaciated valley into the goat rocks wilderness area.  The route features Packwood Lake, the Knifes edge and Ol' Snowy Mountain.`,
  },
  {
    id: 7,
    trailName: "Rae Lakes Loop",
    state: "California",
    wildernessArea: "Kings Canyon National Park",
    bestSeason: ["6", "10"],
    longitude: 123,
    latitude: 123,
    miles: 25,
    scenery: 10,
    solitude: 4,
    difficulty: 8,
    description: `An exceptional loop hike through the most scenic area of King's Canyon National Park.  This trail takes you into the Heart of the beautiful Rae Lakes Basin.`,
  },
  {
    id: 8,
    trailName: "Oregon Coast Trail, Seaside to Manzanita",
    state: "Oregon",
    wildernessArea: "Oregon Coast",
    bestSeason: ["10", "6"],
    longitude: 123,
    latitude: 123,
    miles: 20,
    scenery: 7,
    solitude: 1,
    difficulty: 4,
    description: `A beautiful hike through the Sitka Spruce forests and beaches of Oregon.`,
  },
];

function App() {
  const [trails, setTrails] = useState(DUMMY_DATA);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [filter, setFilter] = useState('');

  const getAddTrailData = (trailData) => {
    setTrails(prevState => {
      return [...prevState, trailData]
    })
  }

  const getFilter = (filterSetting) => {
    setFilter(filterSetting);
  }

  useEffect(() => {
    setFilteredTrails(trails)
  }, [])
  
  // FILTERS TRAILS BASED ON FILTER TYPE AND FILTER QUERY
  useEffect(() => {
    console.log(filter);
    if (filter === undefined) {
      setFilteredTrails(trails);
      return;
    }
    if (filter.filterType === "all-trails") {
      setFilteredTrails(trails);
    }
    if (filter.filterType === 'by-state') {
      const filterTrails = trails.filter(trail => trail.state === filter.filterQuery);
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
      const seasonFilteredHikes = [...matchingInvertedHikes, ...matchingStandardHikes]
      setFilteredTrails(seasonFilteredHikes);
    }
  }, [filter, trails])

  console.log('RENDER');
      
  return (
    <div className="App">
      <Navigation trails={trails} onFilterSelect={getFilter} />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
          <MainPage trails={filteredTrails} />
          </Route>
          <Route path="/addtrail" >
            <AddTrail onAddTrail={getAddTrailData} />
          </Route>
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
