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
import { selectDarkTheme } from "../../slices/themeSlice";
import { useEffect, useState } from "react";

const AddEditMap = ({ center }) => {
  const userLat = useSelector(selectUserLat);
  const userLng = useSelector(selectUserLng);
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
