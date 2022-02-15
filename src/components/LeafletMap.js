import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import FishCatchCard from './FishCatchCard';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DataContext from "../context/DataContext";

const LeafletMap = ({ fishCatches, setFishCatches, showId }) => {
    const { setFlashMessage } = useContext(DataContext);
    const navigate = useNavigate();

    // const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";

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
            setFishCatches(fishCatches.filter(item => item.id != id));
            setFlashMessage({
                message: "Catch deleted!",
                style: "success"
            });
            navigate(`/map/all`);
        } catch (err) {
            console.error(err)
            console.error(`Error: ${err.message}`);
            setFlashMessage({
                message: "Could not delete catch. Please check your data.",
                style: "error"
            });
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
                fishCatches ?
                fishCatches.map((fishCatch) => {
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
                                        >Edit</button>
                                        <button
                                            onClick={() => handleDelete(fishCatch.id)}
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
