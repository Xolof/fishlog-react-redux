import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

const LeafletMap = ({ location, setLocation, center }) => {
    // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
    
    const [markerLocation, setMarkerLocation] = useState(null);
    const mapCenter = center ?? [56, 12.6];

    function PositionMarker() {
        const map = useMapEvents({
          click(e) {
            if (setLocation && setMarkerLocation) {
                setMarkerLocation(e.latlng);
                setLocation(`${e.latlng.lat},${e.latlng.lng}`);
            }
          }
        });

        if (location && typeof location === "string") {
            const splitPosition = location.split(",");
            const lat = splitPosition[0];
            const lon = splitPosition[1];
            location = [lat, lon];
        }

        const position = markerLocation ?? location ?? null;

        return position ? (
            <Marker position={position}></Marker>
        ) : null;
    }

    return (
        <>
            <MapContainer
                center={mapCenter} zoom={9}
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
