import { Marker, useMapEvents } from "react-leaflet";
import { useUserContext } from "../context/UserContext";

const PositionMarker = ({ location, setLocation }) => {
  const { markerLocation, setMarkerLocation } = useUserContext();

  useMapEvents({
    click(e) {
      setMarkerLocation(e.latlng);
      setLocation(`${e.latlng.lat},${e.latlng.lng}`);
    },
  });

  if (location && typeof location === "string") {
    const splitPosition = location.split(",");
    location = [splitPosition[0], splitPosition[1]];
  }

  const position = markerLocation ?? location ?? null;

  return position ? <Marker position={position}></Marker> : null;
};

export default PositionMarker;
