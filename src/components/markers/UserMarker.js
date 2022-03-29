import { useEffect } from "react";
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { selectUserPosition, setUserPosition } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const UserMarker = () => {
  const dispatch = useDispatch();
  const userPosition = useSelector(selectUserPosition);
  const map = useMap();

  let positionSet = false;

  useEffect(() => {
    map.locate({ watch: true });

    function onLocationFound(e) {
      if (!userPosition && !positionSet) {
        map.flyTo(e.latlng, map.getZoom());
      }
      positionSet = true;
      dispatch(setUserPosition(e.latlng));
    }

    map.on("locationfound", onLocationFound);
  }, [map]);

  const userIcon = L.icon({
    iconUrl: require("../../img/user.png"),
    iconSize: [25, 25],
  });

  return userPosition === null ? null : (
    <Marker position={userPosition} icon={userIcon}>
      <Popup>
        <br />
        You are here. <br />
      </Popup>
    </Marker>
  );
};

export default UserMarker;
