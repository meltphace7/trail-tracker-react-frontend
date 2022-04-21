import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const TrailMap = (props) => {
  const icon = L.icon({ iconUrl: "/imgs/marker-icon.png" });

  return (
    <div>
      <MapContainer
        center={props.coords}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=AyMX0LXoTHHgR2du1wzC"
        />
        <ChangeView center={props.coords} zoom={14} />
        {props.trails.map((trail) => (
          <Marker
            icon={icon}
            position={[trail.latitude, trail.longitude]}
            key={trail.id}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrailMap;
