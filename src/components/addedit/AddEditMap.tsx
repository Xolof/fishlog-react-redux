import { MapContainer, TileLayer } from "react-leaflet";
import UserMarker from "../markers/UserMarker";
import PositionMarker from "../markers/PositionMarker";
import { useSelector } from "react-redux";
import { selectUserLat, selectUserLng } from "../../slices/userSlice";
import { selectTileUrl } from "../../slices/themeSlice";

type AddEditMapProps = {
  center: number[] | null;
};

const AddEditMap: React.FC<AddEditMapProps> = () => {
  const userLat = useSelector(selectUserLat) as number | null;
  const userLng = useSelector(selectUserLng) as number | null;
  const tileUrl = useSelector(selectTileUrl) as string;

  let userCoordinates: [number, number] | null = null;
  if (typeof userLat === "number" && typeof userLng === "number") {
    userCoordinates = [userLat, userLng];
  }

  const mapCenter: [number, number] = userCoordinates ?? [56, 12.6];

  return (
    <>
      {/* @ts-expect-error Excluding Leaflet components from TypeScript. */}
      <MapContainer center={mapCenter} zoom={9}>
        {/* @ts-expect-error Excluding Leaflet components from TypeScript. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          className="map-tiles"
        />
        <UserMarker />
        <PositionMarker />
      </MapContainer>
    </>
  );
};

export default AddEditMap;
