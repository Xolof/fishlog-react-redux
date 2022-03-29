import { MapContainer, TileLayer } from "react-leaflet";
import UserMarker from "../markers/UserMarker";
import PositionMarker from "../markers/PositionMarker";
import { useSelector } from "react-redux";
import { selectUserPosition } from "../../slices/userSlice";
import { selectDarkTheme } from "../../slices/themeSlice";
import { useEffect, useState } from "react";

const AddEditMap = ({ location, setLocation, center }) => {
  const userPosition = useSelector(selectUserPosition);
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
  if (userPosition) {
    userCoordinates = [userPosition.lat, userPosition.lng];
  }

  const mapCenter = center ?? userCoordinates ?? [56, 12.6];

  return (
    <>
      <MapContainer center={mapCenter} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          className="map-tiles"
        />
        <UserMarker />
        <PositionMarker location={location} setLocation={setLocation} />
      </MapContainer>
    </>
  );
};

export default AddEditMap;
