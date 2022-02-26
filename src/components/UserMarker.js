
import { useEffect } from "react";
import L from "leaflet";
import { useMap, Marker, Popup } from "react-leaflet";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const UserMarker = () => {
  const { userPosition, setUserPosition } = useContext(DataContext);

  const map = useMap();

  let positionSet = false;

  useEffect(() => {
    map.locate({ watch:true });

    function onLocationFound(e) {
      console.log(e.latlng);
      if (!positionSet) {
        map.flyTo(e.latlng, map.getZoom());
      }
      positionSet = true;
      setUserPosition(e.latlng);
    }

    map.on("locationfound", onLocationFound);
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