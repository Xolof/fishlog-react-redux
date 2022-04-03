import { MapContainer, TileLayer } from "react-leaflet";
import UserMarker from "../markers/UserMarker";
import PositionMarker from "../markers/PositionMarker";
import { useSelector } from "react-redux";
import {
  selectUserLat,
  selectUserLng,
  selectMarkerLat,
  selectMarkerLng,
} from "../../slices/userSlice";
import { selectTileUrl } from "../../slices/themeSlice";

const AddEditMap = ({ center }) => {
  const userLat = useSelector(selectUserLat);
  const userLng = useSelector(selectUserLng);
  const tileUrl = useSelector(selectTileUrl);

  let userCoordinates = null;
  if (userLat && userLng) {
    userCoordinates = [userLat, userLng];
  }

  const mapCenter = center ?? userCoordinates ?? [56, 12.6];

  const markerLat = useSelector(selectMarkerLat);
  const markerLng = useSelector(selectMarkerLng);

  return (
    <>
      <MapContainer center={mapCenter} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          className="map-tiles"
        />
        <UserMarker />
        <PositionMarker location={[markerLat, markerLng]} />
      </MapContainer>
    </>
  );
};

export default AddEditMap;
