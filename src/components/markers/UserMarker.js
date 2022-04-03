import { useEffect } from "react";
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import {
  selectUserLat,
  selectUserLng,
  setUserLat,
  setUserLng,
} from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const UserMarker = () => {
  const dispatch = useDispatch();
  const userLat = useSelector(selectUserLat);
  const userLng = useSelector(selectUserLng);
  const map = useMap();

  let positionSet = false;

  useEffect(() => {
    map.locate({ watch: true });

    function onLocationFound(e) {
      if ((!userLat || !userLng) && !positionSet) {
        map.flyTo(e.latlng, map.getZoom());
      }
      positionSet = true;
      dispatch(setUserLat(e.latlng.lat));
      dispatch(setUserLng(e.latlng.lng));
    }

    map.on("locationfound", onLocationFound);
  }, [map]);

  const userIcon = L.icon({
    iconUrl: require("../../img/user.png"),
    iconSize: [25, 25],
  });

  return userLat === null ? null : (
    <Marker position={[userLat, userLng]} icon={userIcon}>
      <Popup>
        <br />
        You are here. <br />
      </Popup>
    </Marker>
  );
};

export default UserMarker;
