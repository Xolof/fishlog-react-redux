import { Marker, useMapEvents } from "react-leaflet";
import { setMarkerLocation } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectMarkerLocation } from "../../slices/userSlice";

const PositionMarker = ({ location, setLocation }) => {
  const dispatch = useDispatch();

  useMapEvents({
    click(e) {
      dispatch(setMarkerLocation(e.latlng));
      setLocation(`${e.latlng.lat},${e.latlng.lng}`);
    },
  });

  if (location && typeof location === "string") {
    const splitPosition = location.split(",");
    location = [splitPosition[0], splitPosition[1]];
  }

  const markerLocation = useSelector(selectMarkerLocation);

  const position = markerLocation ?? location ?? null;

  return position ? <Marker position={position}></Marker> : null;
};

export default PositionMarker;
