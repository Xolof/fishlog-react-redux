import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FishCatchCard from "../items/FishCatchCard";
import { useApplicationContext } from "../../context/DataContext";
import UserMarker from "../markers/UserMarker";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserPosition } from "../../slices/userSlice";
import { selectDarkTheme } from "../../slices/themeSlice";

const LeafletMap = ({ searchResults, showId }) => {
  const { fishCatches } = useApplicationContext();
  const userPosition = useSelector(selectUserPosition);
  const [currentFishCatch, setCurrentFishCatch] = useState(null);
  const darkTheme = useSelector(selectDarkTheme);

  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  const [tileUrl, setTileUrl] = useState(
    darkTheme ? darkTileUrl : lightTileUrl
  );

  useEffect(() => {
    setTileUrl(darkTheme ? darkTileUrl : lightTileUrl);
    const root = document.documentElement;
    root?.style.setProperty(
      "--map-tiles-filter",
      darkTheme
        ? "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)"
        : "none"
    );
  }, [darkTheme]);

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
            <button
              className="closeButton"
              onClick={() => {
                setCurrentFishCatch(null);
              }}
            >
              &#10005;
            </button>
            <FishCatchCard fishCatch={currentFishCatch} />
          </div>
        </>
      )}
    </>
  );
};

export default LeafletMap;
