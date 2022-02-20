import { useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import DataContext from "../context/DataContext";
import L from 'leaflet';

const LeafletMap = ({ location, setLocation, center }) => {
    const { tileUrl, userPosition, setUserPosition } = useContext(DataContext);

    const [markerLocation, setMarkerLocation] = useState(null);

    let userCoordinates = null;
    if (userPosition) {
        userCoordinates = [userPosition.lat, userPosition.lng];
    }

    const mapCenter = center ?? userCoordinates ?? [56, 12.6];

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

    function UserMarker() {
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
            <UserMarker />
            <PositionMarker />
            </MapContainer>
        </>
    )
}

export default LeafletMap;
