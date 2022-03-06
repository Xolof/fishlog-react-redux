import { MapContainer, TileLayer } from "react-leaflet";
import { useApplicationContext } from "../context/DataContext";
import { useThemeContext } from "../context/ThemeContext";
import UserMarker from "./UserMarker";
import PositionMarker from "./PositionMarker";

const AddEditMap = ({ location, setLocation, center }) => {
  const { userPosition } = useApplicationContext();
  const { tileUrl } = useThemeContext();

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

export default AddEditMap;
