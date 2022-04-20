import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import AddTrail from "./components/AddTrail";
import Footer from "./components/Footer";
import MainPage from './components/MainPage';
import { Switch, Route, Redirect } from 'react-router-dom'

let DUMMY_DATA = [
  {
    id: 1,
    trailName: "Hells Canyon Bench Trail",
    state: "Oregon",
    wildernessArea: "Hells Canyon Recreation Area",
    bestSeason: ["4", "7"],
    imageURL: "/imgs/Klonoqua-lakes-1.jpg",
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
    imageURL: "/imgs/thousand-island-lake-loop-1.jpg",
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
    imageURL: "/imgs/tin-cup-trail-1.jpg",
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
    imageURL: "/imgs/timberline-trail-1.jpg",
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
    imageURL: "/imgs/wonderland-trail-1.jpg",
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
    imageURL: "/imgs/goat-rocks-1.jpg",
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
    imageURL: "/imgs/rae-lakes.jpg",
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
    imageURL: "/imgs/Klonoqua-lakes-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 20,
    scenery: 7,
    solitude: 1,
    difficulty: 4,
    description: `A beautiful hike through the Sitka Spruce forests and beaches of Oregon.`,
  },
  {
    id: 9,
    trailName: "Tatoosh Lake Trail",
    state: "Washington",
    wildernessArea: "Tatoosh Wilderness",
    bestSeason: ["5", "10"],
    imageURL: "/imgs/tatoosh-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 6,
    scenery: 7,
    solitude: 4,
    difficulty: 7,
    description: `A steep yet rewarding hike to the high country of the small Tatoosh mountain range.  Featuring beautiful views of nearby Mt. Rainier.`,
  },
  {
    id: 10,
    trailName: "Spectacle Lake via PCT/Kendall Catwalk",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["6", "10"],
    imageURL: "/imgs/spectacle-lake-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 15,
    scenery: 10,
    solitude: 4,
    difficulty: 7,
    description: `A long and incredibly scenic trail in the Alpine Lakes Wilderness. Featuring expansive views of many lakes and mountains, this hike is one of personal favorites of Washington.  You will lose track of how long the hike is as a result of the stunning views.`,
  },

  {
    id: 12,
    trailName: "Castle Lake via Windy Ridge Observatory",
    state: "Washington",
    wildernessArea: "Mt. St. Helens Volcanic Monument",
    bestSeason: ["5", "10"],
    imageURL: "/imgs/mt-st-helens-2.jpg",
    longitude: 123,
    latitude: 123,
    miles: 20,
    scenery: 8,
    solitude: 9,
    difficulty: 8,
    description: `A long trek through volcanic aftermath of the Mt. St. Helens explosion leads to a remote and newly formed lake.  This hike showcases the awesome destructive force of nature and also it's ability to regenerate.`,
  },
  {
    id: 13,
    trailName: "Big Heart Lake via West Foss Creek Trail",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["5", "10"],
    imageURL: "/imgs/west-foss-creek-trail-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 7,
    scenery: 8,
    solitude: 2,
    difficulty: 7,
    description: `This steep hike features more than 6 beautiful alpine lakes.  The trail officialy stops at Big Heart Lake but a goat trail can be followed North to even more beatiful alpine lakes.`,
  },
  {
    id: 14,
    trailName: "Indian Heaven via PCT",
    state: "Washington",
    wildernessArea: "Indian Heaven Wilderness",
    bestSeason: ["6", "10"],
    imageURL: "/imgs/indian-heaven.jpg",
    longitude: 123,
    latitude: 123,
    miles: 15,
    scenery: 6,
    solitude: 3,
    difficulty: 6,
    description: `This hike follows the PCT through the length of the Indian Heaven Wilderness and features many trail side lakes.  This hike can get crowded in the peak summer months.`,
  },
  {
    id: 15,
    trailName: "Castle Lake via Blue Lake Trailhead",
    state: "Washington",
    wildernessArea: "Mt. St. Helens Volcanic Monument",
    bestSeason: ["5", "10"],
    imageURL: "/imgs/mt-st-helens-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 9,
    scenery: 7,
    solitude: 10,
    difficulty: 7,
    description: `This long hike begins in an old growth forest on the Western shoulder of Mt. St. Helens and eventually takes you to the remote Castle Lake.  The last section of this hike is bascially off trail but it's ruggedness is rewarded with solitude.`,
  },
  {
    id: 16,
    trailName: "White Clouds Loop",
    state: "Idaho",
    wildernessArea: "Sawtooth National Forest",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/Klonoqua-lakes-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 35,
    scenery: 10,
    solitude: 4,
    difficulty: 7,
    description: `A beautiful and rugged hike through the White Cloud mountains in Idaho.  This scenic features several medium sized and alpine lakes and provides plenty of peaks to scramble.  An often overlooked alernative to the nearby Sawtooth range.`,
  },
  {
    id: 17,
    trailName: "Elk Horn Crest Trail",
    state: "Oregon",
    wildernessArea: "Elkhorn Wilderness",
    bestSeason: ["5", "10"],
    imageURL: "/imgs/elkhorn-trail-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 32,
    scenery: 7,
    solitude: 9,
    difficulty: 7,
    description: `A high traverse through the Elk Horn mountain range in Eastern Oregon.  This hike features huge sweeping views, ample solitude and several beautiful alpine lakes.  I could choice to escape from the crowds.`,
  },
  {
    id: 18,
    trailName: "Glacier Lake Loop",
    state: "Oregon",
    wildernessArea: "Eagle Cap Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/glacier-lake-loop-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 36,
    scenery: 10,
    solitude: 3,
    difficulty: 7,
    description: `An exceptionally beautiful loop through the Wallowa Mountains.  This loop includes most of the highlights of the unique mountain range.  Full of beautiful alpine lakes, meadows and massive granite peaks.`,
  },
  {
    id: 19,
    trailName: "Francis Lake Trail",
    state: "Oregon",
    wildernessArea: "Eagle Cap Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/francis-lake-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 8,
    scenery: 8,
    solitude: 3,
    difficulty: 8,
    description: `A steep but rewarding climb to a beatiful glaciated valley containing the beautiful Francis Lake. `,
  },
  {
    id: 20,
    trailName: "Echo Lake",
    state: "Oregon",
    wildernessArea: "Eagle Cap Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/Klonoqua-lakes-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 8,
    scenery: 8,
    solitude: 3,
    difficulty: 8,
    description: `A short yet very rewarding hike to Echo Lake in the Wallowa Mountains. `,
  },
  {
    id: 21,
    trailName: "Beaten Path Trail",
    state: "Montana",
    wildernessArea: "Absaroka-Beartooth Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/beaten-path-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 27,
    scenery: 10,
    solitude: 6,
    difficulty: 8,
    description: `A stunning hike through the Beartooth mountain range.  This hike takes you up through the forests and into wind swept alipine terrain.  It features waterfalls, stunning mountain vistas and many alpine lakes. `,
  },
  {
    id: 22,
    trailName: "Lizard Head Trail",
    state: "Wyoming",
    wildernessArea: "Wind River Range",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/lizard-head-trail-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 32,
    scenery: 10,
    solitude: 7,
    difficulty: 8,
    description: `A gorgeous journey through the Winds, featuring massive granite peaks, wind swept alpine meadows, and many scenic alpine lakes including the popular Lonesome lake.  This hike is a must do in Winds. `,
  },
  {
    id: 23,
    trailName: "Tuck and Robin Lakes",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/tuck-robin-lake-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 9,
    scenery: 9,
    solitude: 3,
    difficulty: 8,
    description: `A tough hike that yields ample rewards.  Features several beautiful scenic high alpine lakes and a great view of Mt. Daniel, the highest point in the Alpine Lakes Wilderness.`,
  },
  {
    id: 24,
    trailName: "Peggy's Pond, Mt. Daniel",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/cathedral-rock.jpg",
    longitude: 123,
    latitude: 123,
    miles: 7,
    scenery: 9,
    solitude: 3,
    difficulty: 8,
    description: `This hike takes you to a high alpine pond on the shoulder of Cathedral Rock.  From there the summit of Mt. Daniel, the highest point in the Alpine Lakes Wilderness, is only a couple hours climb.`,
  },
  {
    id: 25,
    trailName: "Spade and Venus Lake",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/spade-lake-1.jpg",
    latitude: 47.4095,
    longitude: -121.1068,
    miles: 14,
    scenery: 9,
    solitude: 7,
    difficulty: 8,
    description: `This lengthy trek follow the source of the Cle Elum river to Waptus Lake.  From there you follow a series of steep switch backs to a beautiful high alpine basin, where you find the gorgeous Spade Lake. A short hike up a goat trail takes you to Venus Lake.`,
  },
  {
    id: 26,
    trailName: "Williams, La Bohn Lakes",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/williams-labohn-2.jpg",
    longitude: 123,
    latitude: 123,
    miles: 14,
    scenery: 9,
    solitude: 7,
    difficulty: 10,
    description: `This long trek takes you past Waptus lake, and up the Dutch Miller gap to Williams Lake.  From there you scramble up a steep boulder field, past an abandoned gold mine, toLa Bohn lakes.  This is a grueling yet rewarding trip which features countless views and historic mines.`,
  },
  {
    id: 27,
    trailName: "Klonoqua Lakes",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/Klonoqua-lakes-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 14,
    scenery: 9,
    solitude: 7,
    difficulty: 7,
    description: `A great lesser known hike in the Alpine Lakes Wilderness that features large twin alpine lakes.  This trip offers a bit more solitude from the often bust, more popular destinations in the Alpine Lakes Wilderness.`,
  },
  {
    id: 28,
    trailName: "Chiwaukum, Larch Lakes",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/larch-lake.jpg",
    longitude: 123,
    latitude: 123,
    miles: 14,
    scenery: 7,
    solitude: 7,
    difficulty: 7,
    description: `A uncrowded trek that takes you to some high alipine larches.  Great trek for the fall.`,
  },
  {
    id: 29,
    trailName: "Necklace Valley, Tank Lakes",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["7", "10"],
    imageURL: "/imgs/tank-lakes.jpg",
    longitude: 123,
    latitude: 123,
    miles: 14,
    scenery: 7,
    solitude: 5,
    difficulty: 7,
    description: `A long and gorgeous hike through lush forests that takes you way up to a granite bench where the Tank Lakes lie.`,
  },
  {
    id: 30,
    trailName: "Lake Dorothy, Snoqualmie Lake",
    state: "Washington",
    wildernessArea: "Alpine Lakes Wilderness",
    bestSeason: ["5", "10"],
    imageURL: "/imgs/dorothy-lake.jpg",
    longitude: 123,
    latitude: 123,
    miles: 6,
    scenery: 7,
    solitude: 5,
    difficulty: 7,
    description: `A relatively easy and short hike to the beautiful shore of Lake Dorothy, and to Snoqualmie lake beyond.  The first part of this hike can be done relatively early in the season depending on snow pack.`,
  },
  {
    id: 31,
    trailName: "Cougar Lake",
    state: "Washington",
    wildernessArea: "William O Douglas Wilderness",
    bestSeason: ["6", "10"],
    imageURL: "/imgs/cougar-lake.jpg",
    longitude: 123,
    latitude: 123,
    miles: 9,
    scenery: 7,
    solitude: 8,
    difficulty: 7,
    description: `An uncrowded lake that takes you at the sandy shores of beautiful Cougar Lake.`,
  },
  {
    id: 32,
    trailName: "Twin Sisters Lake",
    state: "Washington",
    wildernessArea: "William O Douglas Wilderness",
    bestSeason: ["6", "10"],
    imageURL: "/imgs/twin-sisters-lake-1.jpg",
    longitude: 123,
    latitude: 123,
    miles: 9,
    scenery: 6,
    solitude: 6,
    difficulty: 5,
    description: `A short and relativeley easy hike to a forested plateau featuring the Twin Sisters Lakes.  Theses lakes are the largest and most scenic in the area.  Area is also abundant with elk and mosquitoes.`,
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
