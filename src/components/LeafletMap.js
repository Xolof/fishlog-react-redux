import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FishCatchCard from './FishCatchCard';

const LeafletMap = ({ fishCatches }) => {
    return (
        <>
            <MapContainer center={[56, 12.6]} zoom={9}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
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
                })
            }
            </MapContainer>
        </>
    )
}

export default LeafletMap;
