import { Marker, useMapEvents } from "react-leaflet";
import { useContext } from "react";
import DataContext from "../context/DataContext";


const PositionMarker = ({ location, setLocation }) => {

  const { markerLocation, setMarkerLocation } = useContext(DataContext);

  useMapEvents({
    click(e) {
      setMarkerLocation(e.latlng);
      setLocation(`${e.latlng.lat},${e.latlng.lng}`);
    }
  });

  if (location && typeof location === "string") {
    const splitPosition = location.split(",");
    location = [splitPosition[0], splitPosition[1]];
  }

  const position = markerLocation ?? location ?? null;

  return position ? (
    <Marker position={position}></Marker>
  ) : null;
}

export default PositionMarker;