import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const TrailMap = (props) => {
  const icon = L.icon({ iconUrl: "/imgs/marker-icon.png" });

  return (
    <div>
      <MapContainer center={props.coords} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
          // url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=AyMX0LXoTHHgR2du1wzC"
        />
        <ChangeView center={props.coords} zoom={13} />
        {props.trails.map((trail) => (
          <Marker
            icon={icon}
            position={[trail.latitude, trail.longitude]}
            key={trail._id}
          >
            <Popup>
              <Link to={`/trail-detail/${trail._id}`}>
                {`${trail.trailName}`}
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrailMap;
