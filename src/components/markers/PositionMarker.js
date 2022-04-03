import { Marker, useMapEvents } from "react-leaflet";
import {
  setMarkerLat,
  setMarkerLng,
  selectMarkerLat,
  selectMarkerLng,
} from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const PositionMarker = () => {
  const dispatch = useDispatch();
  const markerLat = useSelector(selectMarkerLat);
  const markerLng = useSelector(selectMarkerLng);

  useMapEvents({
    click(e) {
      dispatch(setMarkerLat(e.latlng.lat));
      dispatch(setMarkerLng(e.latlng.lng));
    },
  });

  let location = null;

  if (markerLat && markerLng) {
    location = [markerLat, markerLng];
  }

  return location ? <Marker position={location}></Marker> : null;
};

export default PositionMarker;
