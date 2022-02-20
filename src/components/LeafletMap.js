import { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import FishCatchCard from './FishCatchCard';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { successToast, errorToast } from "../services/toastService";

const LeafletMap = ({ searchResults, showId }) => {
    const { fishCatches, setFishCatches, setIsLoading, tileUrl } = useContext(DataContext);
    const navigate = useNavigate();

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

    const [userPosition, setUserPosition] = useState(null);
    function UserMarker() {
        const map = useMap();
    
        useEffect(() => {
          map.locate().on("locationfound", function (e) {
            setUserPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
          });
        }, [map]);
    
        return userPosition === null ? null : (
          <Marker position={userPosition}>
            <Popup><br />You are here. <br /></Popup>
          </Marker>
        );
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
            <UserMarker />
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
