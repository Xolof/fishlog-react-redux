
import { useEffect } from "react";
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const UserMarker = () => {
  const { userPosition, setUserPosition } = useContext(DataContext);

  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      return;
    }
    map.locate().on("locationfound", function (e) {
      setUserPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  const userIcon = L.icon({
    iconUrl: require("../img/user.png"),
    iconSize: [25, 25]
  });

  return userPosition === null ? null : (
    <Marker position={userPosition} icon={userIcon}>
      <Popup><br />You are here. <br /></Popup>
    </Marker>
  );
}

export default UserMarker;