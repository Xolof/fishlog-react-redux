import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DataContext from "../context/DataContext";
import UserMarker from "./UserMarker";
import PositionMarker from "./PositionMarker";

const AddMap = ({ location, setLocation, center }) => {
  const { tileUrl, userPosition } = useContext(DataContext);

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
          location={location}
          setLocation={setLocation}
        />
      </MapContainer>
    </>
  )
}

export default AddMap;
