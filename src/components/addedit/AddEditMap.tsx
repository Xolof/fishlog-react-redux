import { MapContainer, TileLayer } from "react-leaflet";
import UserMarker from "../markers/UserMarker";
import PositionMarker from "../markers/PositionMarker";
import { useSelector } from "react-redux";
import { selectUserLat, selectUserLng } from "../../slices/userSlice";
import { selectTileUrl } from "../../slices/themeSlice";
import { selectFishCatches } from "../../slices/dataSlice";
import { useParams } from "react-router-dom";
import { FishCatch } from "../../types/FishCatch";

type AddEditMapProps = {
  center: number[] | null;
};

const AddEditMap: React.FC<AddEditMapProps> = () => {
  const userLat = useSelector(selectUserLat) as number | null;
  const userLng = useSelector(selectUserLng) as number | null;
  const tileUrl = useSelector(selectTileUrl) as string;
  const fishCatches = useSelector(selectFishCatches);

  let userCoordinates: [number, number] | null = null;
  if (typeof userLat === "number" && typeof userLng === "number") {
    userCoordinates = [userLat, userLng];
  }

  let mapCenter: [number, number] = userCoordinates ?? [56, 12.6];
  let zoom = 9;

  const { id } = useParams<{ id?: string }>();

  if (id) {
    zoom = 14;

    const numericId = Number(id);

    const currentFishCatch = fishCatches.filter(
      (item: FishCatch) => item.id == numericId
    )[0];

    if (currentFishCatch) {
      const splitLocation = currentFishCatch.location.split(",");
      const lat = parseFloat(splitLocation[0]);
      const lon = parseFloat(splitLocation[1]);
      mapCenter = [lat, lon];
    }
  }

  return (
    <>
      {/* @ts-expect-error Excluding Leaflet components from TypeScript. */}
      <MapContainer center={mapCenter} zoom={zoom}>
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
