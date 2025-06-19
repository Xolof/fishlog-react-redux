import { useEffect } from "react";
{/* @ts-ignore */}
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserLat,
  selectUserLng,
  setUserLat,
  setUserLng,
} from "../../slices/userSlice";

type UserMarkerProps = {
  positionAlreadySet?: boolean;
};

const UserMarker: React.FC<UserMarkerProps> = ({ positionAlreadySet }) => {
  const dispatch = useDispatch();
  const userLat = useSelector(selectUserLat) as number | null;
  const userLng = useSelector(selectUserLng) as number | null;
  const map = useMap();

  // Use ref to keep positionSet between renders
  let positionSet = false;

  useEffect(() => {
    map.locate({ watch: true });

    function onLocationFound(e: L.LocationEvent) {
      if ((!userLat || !userLng) && !positionSet && !positionAlreadySet) {
        map.flyTo(e.latlng, map.getZoom());
      }
      positionSet = true;
      dispatch(setUserLat(e.latlng.lat));
      dispatch(setUserLng(e.latlng.lng));
    }

    map.on("locationfound", onLocationFound);

    return () => {
      map.off("locationfound", onLocationFound);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, userLat, userLng, positionAlreadySet, dispatch]);

  const userIcon = L.icon({
    iconUrl: require("../../img/user.png"),
    iconSize: [25, 25],
  });

  return userLat === null || userLng === null ? null : (
    /* @ts-ignore */
    <Marker position={[userLat, userLng]} icon={userIcon}>
      <Popup>
        <br />
        You are here. <br />
      </Popup>
    </Marker>
  );
};

export default UserMarker;
