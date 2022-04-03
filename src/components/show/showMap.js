import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FishCatchCard from "../items/FishCatchCard";
import UserMarker from "../markers/UserMarker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserLat, selectUserLng } from "../../slices/userSlice";
import { selectTileUrl } from "../../slices/themeSlice";
import { selectFishCatches } from "../../slices/dataSlice";

const LeafletMap = ({ searchResults, showId }) => {
  const fishCatches = useSelector(selectFishCatches);
  const userLat = useSelector(selectUserLat);
  const userLng = useSelector(selectUserLng);
  const [currentFishCatch, setCurrentFishCatch] = useState(null);
  const tileUrl = useSelector(selectTileUrl);

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
    mapPosition = userLat && userLng ? [userLat, userLng] : [55.8, 12.5];
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
