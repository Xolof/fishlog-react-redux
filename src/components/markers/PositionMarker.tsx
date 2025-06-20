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
    /* @ts-expect-error Excluding Leaflet from TypeScript. */
    click(e) {
      dispatch(setMarkerLat(e.latlng.lat));
      dispatch(setMarkerLng(e.latlng.lng));
    },
  });

  if (typeof markerLat === "number" && typeof markerLng === "number") {
    return <Marker position={[markerLat, markerLng]}></Marker>;
  }
};

export default PositionMarker;
