import { useState, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DataContext from "../context/DataContext";
import UserMarker from "./UserMarker";
import PositionMarker from "./PositionMarker";

const LeafletMap = ({ location, setLocation, center }) => {
  const { tileUrl, userPosition } = useContext(DataContext);

  const [markerLocation, setMarkerLocation] = useState(null);

  let userCoordinates = null;
  if (userPosition) {
    userCoordinates = [userPosition.lat, userPosition.lng];
  }

  const mapCenter = center ?? userCoordinates ?? [56, 12.6];

  return (
    <>
      <MapContainer
        center={mapCenter} zoom={9}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          className="map-tiles"
        />
        <UserMarker />
        <PositionMarker
          markerLocation={markerLocation}
          setMarkerLocation={setMarkerLocation}
          location={location}
          setLocation={setLocation}
        />
      </MapContainer>
    </>
  )
}

export default LeafletMap;
