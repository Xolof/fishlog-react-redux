import { useEffect } from "react";
{/* @ts-expect-error Excluding Leaflet from TypeScript. */}
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserLat,
  selectUserLng,
  setUserLat,
  setUserLng,
} from "../../slices/userSlice";
import userIconFile from "../../img/user.png";

type UserMarkerProps = {
  positionAlreadySet?: boolean;
};

const UserMarker: React.FC<UserMarkerProps> = ({ positionAlreadySet }) => {
  const dispatch = useDispatch();
  const userLat = useSelector(selectUserLat) as number | null;
  const userLng = useSelector(selectUserLng) as number | null;
  const map = useMap();

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
     
  }, [map, userLat, userLng, positionAlreadySet, dispatch]);

  const userIcon = L.icon({
    iconUrl: userIconFile,
    iconSize: [25, 25],
  });

  return userLat === null || userLng === null ? null : (
    <Marker position={[userLat, userLng]} icon={userIcon}>
      <Popup>
        <br />
        You are here. <br />
      </Popup>
    </Marker>
  );
};

export default UserMarker;
