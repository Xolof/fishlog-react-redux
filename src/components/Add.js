import AddMap from "./AddMap";
import { useState, useContext, useEffect } from "react";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { useNavigate, Link } from "react-router-dom";
import { successToast, infoToast, errorToast } from "../services/toastService";

const Add = () => {
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const [date, setDate] = useState("");
  const { fishCatches, setFishCatches, setIsLoading, setSearch } = useContext(DataContext);
  const username = localStorage.getItem("fishlog-userName");
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadImages.length < 1) return;
    setPreviewImageUrls(URL.createObjectURL(uploadImages));
  }, [uploadImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      infoToast("Please set the location by clicking on the map.");
      return;
    }

    const uploadImage = uploadImages;

    const data = {
      species,
      length,
      weight,
      uploadImage,
      username,
      location,
      date
    };

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    setIsLoading(true);
    try {
      const response = await api.post(
        "/api/create",
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
      setFishCatches([...fishCatches, response.data.data]);
      successToast("Catch added!");
      setSearch("");
      navigate(`/map/${response.data.data.id}`);
    } catch (err) {
      console.error(err)
      console.error(`Error: ${err.message}`);
      errorToast("Could not add catch, please check your data.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!localStorage.getItem("fishlog-token")) {
    return (
      <article>
        <p><Link to="/login">Login</Link> to be able to add a catch.</p>
      </article>
    )
  }

  return (
    <article>
      <p>Click the map to set position.</p>
      <AddMap location={location} setLocation={setLocation} />
      <form
        className="addForm"
        onSubmit={handleSubmit}
      >
        <label htmlFor="species">Species:</label>
        <input
          id="species"
          type="text" 
          required
          pattern="[a-zA-ZåäöÅÄÖ0-9]+"
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
          previewImageUrls.length > 0 ?
            <img src={previewImageUrls} alt="uploadPreviewImage" className="uploadPreviewImage" />
            : null
        }
        <button type="submit">Save</button>
      </form>
    </article>
  )
}

export default Add;