import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import FishCatchCard from './FishCatchCard';

const LeafletMap = ({ fishCatches, location, setLocation }) => {
    // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
    
    const [markerLocation, setMarkerLocation] = useState(null);

    function PositionMarker() {
        const map = useMapEvents({
          click(e) {
            if (setLocation && setMarkerLocation) {
                setMarkerLocation(e.latlng);
                setLocation(`${e.latlng.lat},${e.latlng.lng}`);
            }
          }
        })

        if (!location) return null;
        
        return markerLocation === null ? null : (
          <Marker position={markerLocation}></Marker>
        )
    }

    return (
        <>
            <MapContainer
                center={[56, 12.6]} zoom={9}
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
            <PositionMarker />
            </MapContainer>
        </>
    )
}

export default LeafletMap;
