import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FishCatchCard from './FishCatchCard';

const LeafletMap = ({ fishCatches, showId }) => {

    // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";

    const showCatch = fishCatches.filter(item => item.id === showId)[0];

    let mapPosition = [];
    let zoom;

    if (showCatch) {
        const splitPosition = showCatch.location.split(",");
        const lat = splitPosition[0];
        const lon = splitPosition[1];
        mapPosition = [lat, lon];
        zoom = 14;
    } else {
        mapPosition = [55.8, 12.5];
        zoom = 8;
    }

    return (
        <>
            <MapContainer
                center={mapPosition} zoom={zoom}
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={tileUrl}
                className="map-tiles"
            />
            {
                fishCatches ?
                fishCatches.map((fishCatch) => {
                    const splitPosition = fishCatch.location.split(",");
                    const lat = splitPosition[0];
                    const lon = splitPosition[1];

                    return (
                        <Marker position={[lat, lon]} key={fishCatch.id}>
                            <Popup>
                                <FishCatchCard fishCatch={fishCatch} />
                            </Popup>
                        </Marker>
                    )
                }) : null
            }
            </MapContainer>
        </>
    )
}

export default LeafletMap;
