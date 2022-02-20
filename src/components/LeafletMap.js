import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FishCatchCard from './FishCatchCard';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { successToast, errorToast } from "../services/toastService";

const LeafletMap = ({ searchResults, showId, darkTheme }) => {
    const { fishCatches, setFishCatches, setIsLoading } = useContext(DataContext);
    const navigate = useNavigate();
    
    const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const darkTileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
    const [tileUrl, setTileUrl] = useState(darkTheme ? darkTileUrl : lightTileUrl);
    useEffect(() => {
        setTileUrl(darkTheme ? darkTileUrl : lightTileUrl);
        const root = document.documentElement;
        root?.style.setProperty(
            "--map-tiles-filter",
            darkTheme ? "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)" : "none"
        );
    }, [darkTheme]);

    const showCatch = fishCatches.filter(item => parseInt(item.id) === parseInt(showId))[0];

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

    async function handleDelete (id) {
        setIsLoading(true);
        try {
            const response = await api.delete(
                `/api/delete/${id}`,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            await response.data;
            setFishCatches(fishCatches.filter(item => {
                return parseInt(item.id) !== parseInt(id)
            }));
            successToast("Catch deleted!");
            navigate(`/map/all`);
        } catch (err) {
            console.error(err)
            console.error(`Error: ${err.message}`);
            errorToast("Could not delete catch.");
        } finally {
            setIsLoading(false);
        }
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
                searchResults ?
                searchResults.map((fishCatch) => {
                    const splitPosition = fishCatch.location.split(",");
                    const lat = splitPosition[0];
                    const lon = splitPosition[1];

                    return (
                        <Marker position={[lat, lon]} key={fishCatch.id}>
                            <Popup>
                                <FishCatchCard fishCatch={fishCatch} />
                                {
                                    fishCatch.username === localStorage.getItem("userName") ?
                                    <>
                                        <button
                                            onClick={() => navigate(`/edit/${fishCatch.id}`)}
                                            className="editButton"
                                        >Edit</button>
                                        <button
                                            onClick={() => handleDelete(fishCatch.id)}
                                            className="deleteButton"
                                        >Delete</button>
                                    </>
                                    : null
                                }
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
