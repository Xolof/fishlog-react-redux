import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FishCatchCard from "../items/FishCatchCard";
import UserMarker from "../markers/UserMarker";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUserLat, selectUserLng } from "../../slices/userSlice";
import { selectTileUrl } from "../../slices/themeSlice";
import { selectFishCatches, selectSearchResults } from "../../slices/dataSlice";
import { CSSTransition } from "react-transition-group";
import { FishCatch } from "../../types/FishCatch";

type LeafletMapType = {
  searchResults: [];
  showId: number;
};

const LeafletMap: React.FC<LeafletMapType> = ({ searchResults, showId }) => {
  const fishCatches = useSelector(selectFishCatches);
  const userLat = useSelector(selectUserLat);
  const userLng = useSelector(selectUserLng);
  const [currentFishCatch, setCurrentFishCatch] = useState<FishCatch | null>(
    null
  );
  const tileUrl = useSelector(selectTileUrl);
  const [showPopup, setShowPopup] = useState(false);
  const nodeRef = useRef(null);
  let positionAlreadySet = false;

  useEffect(() => {
    currentFishCatch ? setShowPopup(true) : setShowPopup(false);
  }, [currentFishCatch]);

  const showCatch = fishCatches.find(
    (item: FishCatch) => item.id == showId
  );

  let mapPosition = [];
  let zoom;

  if (showCatch) {
    const splitPosition = showCatch.location.split(",");
    const lat = splitPosition[0];
    const lon = splitPosition[1];
    mapPosition = [lat, lon];
    zoom = 14;
    positionAlreadySet = true;
  } else {
    mapPosition = userLat && userLng ? [userLat, userLng] : [55.8, 12.5];
    zoom = 8;
  }

  return (
    <>
      {/* @ts-ignore */}
      <MapContainer center={mapPosition} zoom={zoom}>
        <TileLayer
          /* @ts-ignore */
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          className="map-tiles"
        />
        <UserMarker positionAlreadySet={positionAlreadySet} />
        {searchResults
          ? searchResults.map((fishCatch: FishCatch) => {
              const splitPosition = fishCatch.location.split(",");
              const lat = splitPosition[0];
              const lon = splitPosition[1];

              return (
                <Marker
                  position={[lat, lon]}
                  key={fishCatch.id}
                  eventHandlers={{
                    click: () => {
                      const copyOfFishCatch = { ...fishCatch };
                      setCurrentFishCatch(copyOfFishCatch);
                    },
                  }}
                ></Marker>
              );
            })
          : null}
      </MapContainer>

      <CSSTransition
        in={showPopup}
        timeout={200}
        classNames="fade"
        unmountOnExit
        nodeRef={nodeRef}
      >
        {currentFishCatch ? (
          <div className="fishCatchPopup" ref={nodeRef}>
            <button
              className="closeButton"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              &#10005;
            </button>
            <FishCatchCard fishCatch={currentFishCatch} />
          </div>
        ) : (
          <></>
        )}
      </CSSTransition>
    </>
  );
};

export default LeafletMap;
