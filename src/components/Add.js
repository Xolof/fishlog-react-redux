import LeafletMap from "./LeafletMap";
import { useState, useContext, useEffect } from "react";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [location, setLocation] = useState("");
    const [species, setSpecies] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeight] = useState("");
    const [uploadImages, setUploadImages] = useState([]);
    const [date, setDate] = useState("");
    const { setFlashMessage, fishCatches, setFishCatches } = useContext(DataContext);
    const username = localStorage.getItem("userName");
    const navigate = useNavigate();
    // const previewImage = URL.createObjectURL(uploadImage);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const uploadImage = uploadImages;

        const data = {
            species,
            length,
            weight,
            uploadImage,
            username,
            location,
            date,
            id: parseInt(fishCatches.sort((a, b) => a.id - b.id)[fishCatches.length - 1].id) + 1
        };

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
            const response = await api.post(
                '/api/create',
                formData,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            await response.data;
            console.log(response.data);
            setFishCatches([...fishCatches, data]);
            setFlashMessage({
                message: "Catch added!",
                style: "success"
            });
            navigate('/map');
        } catch (err) {
            console.error(err)
            console.error(`Error: ${err.message}`);
            setFlashMessage({
                message: "Could not add the catch.",
                style: "error"
            })
        }
    }

    return (
        <article>
            <h1>Add</h1>
            <LeafletMap location={location} setLocation={setLocation}/>
            {
                location ?
                <p>{location.lat} {location.lng}</p>
                : null 
            }

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
                <label htmlFor="length">Length:</label>
                <input
                    id="length"
                    type="number" 
                    required
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <label htmlFor="weight">Weight:</label>
                <input
                    id="weight"
                    type="number" 
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
                    required
                    value={uploadImages[0]}
                    onChange={(e) => {
                        setUploadImages(...e.target.files)
                    }}
                />
                {
                    uploadImages ?
                    <img src={uploadImages[0]} alt="uploadImage" />
                    : null
                }
                <button type="submit">Save</button>
            </form>
        </article>
    )
}

export default Add;