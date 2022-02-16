import AddMap from "./AddMap";
import NotFound from "./NotFound";
import { useState, useContext, useEffect } from "react";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const Edit = () => {
    const [location, setLocation] = useState("");
    const [species, setSpecies] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeight] = useState("");
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [mapCenter, setMapCenter] = useState(null);
    const [uploadImages, setUploadImages] = useState([]);
    const [previewImageUrls, setPreviewImageUrls] = useState([]);
    const [date, setDate] = useState("");
    const { setFlashMessage, fishCatches, setFishCatches } = useContext(DataContext);
    const username = localStorage.getItem("userName");
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        api.get(
            `/api/fishcatch/${id}`,                {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
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
            // setUploadImages([res.data.imageurl]);
        }).catch(err => {
            setError(err)
        });
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
            setFlashMessage({
                message: "Please set the location by clicking on  the map.",
                style: "error"
            });
            return;
        }

        const uploadImage = uploadImages;

        const data = {
            id,
            species,
            length,
            weight,
            uploadImage,
            location,
            date
        };

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
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            await response.data;
            const newCatch = response.data.data;
            newCatch.username = localStorage.getItem("userName");

            setFishCatches(fishCatches.map(item => {
                    return parseInt(item.id) === parseInt(newCatch.id) ? newCatch : item;
                }));

            setFlashMessage({
                message: "Catch updated!",
                style: "success"
            });
            navigate(`/map/${response.data.data.id}`);
        } catch (err) {
            console.error(err)
            console.error(`Error: ${err.message}`);
            setFlashMessage({
                message: "Could not add catch. Please check your data.",
                style: "error"
            });
        }
    }

    if (!localStorage.getItem("token")) {
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
                    <label htmlFor="uploadImage" id="uploadImageLabel">Add image</label>
                    <input
                        id="uploadImage"
                        type="file"
                        value={uploadImages[0]}
                        onChange={(e) => {
                            setUploadImages(...e.target.files)
                        }}
                    />
                    {
                        previewImageUrls.length > 0 ?
                        <img src={previewImageUrls} alt="uploadPreviewImage" className="uploadPreviewImage" />
                        : null
                    }
                    <button type="submit">Save</button>
                </form>
            </article>
        : <p>Loading...</p>
    )
}

export default Edit;