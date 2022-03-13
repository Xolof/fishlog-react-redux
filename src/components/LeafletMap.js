import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FishCatchCard from "./FishCatchCard";
import { useApplicationContext } from "../context/DataContext";
import { useThemeContext } from "../context/ThemeContext";
import UserMarker from "./UserMarker";
import { useState } from "react";

const LeafletMap = ({ searchResults, showId }) => {
  const { fishCatches, userPosition } = useApplicationContext();
  const { tileUrl } = useThemeContext();
  const [currentFishCatch, setCurrentFishCatch] = useState(null);

  const showCatch = fishCatches.filter(
    (item) => parseInt(item.id) === parseInt(showId)
  )[0];

  let mapPosition = [];
  let zoom;

  if (showCatch) {
    const splitPosition = showCatch.location.split(",");
    const lat = splitPosition[0];
    const lon = splitPosition[1];
    mapPosition = [lat, lon];
    zoom = 14;
  } else {
    mapPosition = userPosition
      ? [userPosition.lat, userPosition.lng]
      : [55.8, 12.5];
    zoom = 8;
  }

  return (
    <>
      <MapContainer center={mapPosition} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          className="map-tiles"
        />
        <UserMarker />
        {searchResults
          ? searchResults.map((fishCatch) => {
            const splitPosition = fishCatch.location.split(",");
            const lat = splitPosition[0];
            const lon = splitPosition[1];

            return (
              <Marker
                position={[lat, lon]}
                key={fishCatch.id}
                eventHandlers={{
                  click: () => {
                    setCurrentFishCatch(fishCatch);
                  },
                }}
              ></Marker>
            );
          })
          : null}
      </MapContainer>
      {currentFishCatch && (
        <>
          <div className="fishCatchPopup">
            <div
              className="closeButton"
              onClick={() => {
                setCurrentFishCatch(null);
              }}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
            </div>
            <FishCatchCard fishCatch={currentFishCatch} />
          </div>
        </>
      )}
    </>
  );
};

export default LeafletMap;
