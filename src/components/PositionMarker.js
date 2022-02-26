import { Marker, useMapEvents } from "react-leaflet";


const PositionMarker = ({ location, setLocation, markerLocation, setMarkerLocation }) => {
  useMapEvents({
    click(e) {
      setMarkerLocation(e.latlng);
      setLocation(`${e.latlng.lat},${e.latlng.lng}`);
    }
  });

  if (location && typeof location === "string") {
    const splitPosition = location.split(",");
    const lat = splitPosition[0];
    const lon = splitPosition[1];
    location = [lat, lon];
  }

  const position = markerLocation ?? location ?? null;

  return position ? (
    <Marker position={position}></Marker>
  ) : null;
}

export default PositionMarker;