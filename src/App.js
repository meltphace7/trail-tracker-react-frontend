import './App.css';
import Navigation from './components/Navigation'
import AddTrail from "./components/AddTrail";
import Footer from "./components/Footer";
import MainPage from './components/MainPage';
import {Switch, Route} from 'react-router-dom'



const DUMMY_DATA = [
  {
    id: 1,
    trailName: "Hells Canyon Bench Trail",
    state: "Oregon",
    wildernessArea: "Hells Canyon Recreation Area",
    bestSeason: "April-July",
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
    bestSeason: "June-October",
    longitude: 123,
    latitude: 123,
    miles: 22,
    scenery: 10,
    solitude: 3,
    difficulty: 6,
    description: `A popular and incredibly scenic trail that passes through one of the most beautiful areas in the High Sierra.  Part of this loop follows the famous John Muir Trail.  `,
  },
];

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/">
          <MainPage trails={DUMMY_DATA} />
        </Route>
        <Route path="/AddTrail" exact>
          <AddTrail />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
