import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

const LeafletMap = ({ location, setLocation }) => {

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
            <PositionMarker />
            </MapContainer>
        </>
    )
}

export default LeafletMap;
