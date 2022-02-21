import AddMap from "./AddMap";
import NotFound from "./NotFound";
import { useState, useContext, useEffect } from "react";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { successToast, infoToast, errorToast } from "../services/toastService";

const Edit = () => {
    const [location, setLocation] = useState("");
    const [species, setSpecies] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeight] = useState("");
    const [error, setError] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);
    const [uploadImages, setUploadImages] = useState([]);
    const [previewImageUrls, setPreviewImageUrls] = useState([]);
    const [date, setDate] = useState("");
    const { fishCatches, setFishCatches, API_URL, setIsLoading } = useContext(DataContext);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        setIsLoading(true);
        async function fetchCatch () {
            try {
                const res = await api.get(
                    `/api/fishcatch/${id}`,                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("fishlog-token")
                    }
                });
                setSpecies(res.data.species);
                setLength(res.data.length);
                setWeight(res.data.weight);
                setDate(res.data.date);
                setLocation(res.data.location);
                const splitPosition = res.data.location.split(",");
                const lat = parseFloat(splitPosition[0]);
                const lon = parseFloat(splitPosition[1]);
                setLocation([lat, lon]);
                setMapCenter([lat, lon]);
                const imageUrl = `${API_URL}${res.data.imageurl}`;
                setPreviewImageUrls([imageUrl]);
            } catch (err) {
                setError(err)
    
            } finally {
                setIsLoading(false)
            }
        }
        fetchCatch();        
    }, []);

    useEffect(() => {
        if (uploadImages.length < 1) return;
        setPreviewImageUrls(URL.createObjectURL(uploadImages));
    }, [uploadImages]);

    if (error) {
        return (
            <NotFound />
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!location) {
            infoToast("Please set the location by clicking on the map.");
            return;
        }

        const data = {
            id,
            species,
            length,
            weight,
            location,
            date
        };

        if (uploadImages.size) {
            data.uploadImage = uploadImages;        
        }

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
            const response = await api.post(
                `/api/update/${id}`,
                formData,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("fishlog-token")
                    }
                }
            );

            await response.data;
            const newCatch = response.data.data;
            newCatch.username = localStorage.getItem("fishlog-userName");

            setFishCatches(fishCatches.map(item => {
                    return parseInt(item.id) === parseInt(newCatch.id) ? newCatch : item;
                }));

            successToast("Catch updated");
            navigate(`/map/${response.data.data.id}`);
        } catch (err) {
            console.error(err)
            console.error(`Error: ${err.message}`);
            errorToast("Could not update catch, please check your data.");

        }
    }

    if (!localStorage.getItem("fishlog-token")) {
        return (
            <article>
                <h1>Edit</h1>
                <p><Link to="/login">Login</Link> to be able to edit a catch.</p>
            </article>
        )
    }

    return (
        mapCenter ?
            <article>
                <h2>Edit</h2>
                <p>Click the map to set position.</p>
                <AddMap location={location} setLocation={setLocation} center={mapCenter} />
                <form
                    className="addForm"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="species">Species:</label>
                    <input
                        id="species"
                        type="text"
                        required
                        pattern="[a-zA-Z0-9]+"
                        maxLength="30"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                    />
                    <label htmlFor="length">Length (cm):</label>
                    <input
                        id="length"
                        type="number" 
                        min="0"
                        max="9999"
                        required
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                    <label htmlFor="weight">Weight (g):</label>
                    <input
                        id="weight"
                        type="number"
                        min="0"
                        max="9999999"
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="uploadImage" id="uploadImageLabel">Change image</label>
                    <input
                        id="uploadImage"
                        type="file"
                        onChange={(e) => {
                            setUploadImages(...e.target.files)
                        }}
                    />
                    <img src={previewImageUrls} alt="Catch image" className="uploadPreviewImage" />
                    <button type="submit">Save</button>
                </form>
            </article>
        : <p>Loading...</p>
    )
}

export default Edit;