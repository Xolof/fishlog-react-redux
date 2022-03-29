import AddEditMap from "./AddEditMap";
import AddEditForm from "./AddEditForm";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { useApplicationContext } from "../../context/DataContext";
import { useNavigate, Link } from "react-router-dom";
import {
  successToast,
  infoToast,
  errorToast,
} from "../../services/toastService";
import { setMarkerLocation } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

const Add = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [uploadImages, setUploadImages] = useState([]);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const [date, setDate] = useState("");
  const {
    fishCatches,
    setFishCatches,
    setIsLoading,
    setFilterOnSpecies,
    setFilterOnUser,
    setFilterOnWeight,
    setFilterOnLength,
  } = useApplicationContext();
  const username = localStorage.getItem("fishlog-userName");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setMarkerLocation(null));
  }, []);

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
      date,
    };

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    setIsLoading(true);
    try {
      const response = await api.post("/api/create", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("fishlog-token"),
        },
      });

      await response.data;
      const newCatch = response.data.data;
      newCatch.username = localStorage.getItem("fishlog-userName");
      setFishCatches([...fishCatches, response.data.data]);
      successToast("Catch added!");
      setFilterOnSpecies("");
      setFilterOnUser("");
      setFilterOnWeight({
        min: 0,
        max: 10000,
      });
      setFilterOnLength({
        min: 0,
        max: 500,
      });
      navigate(`/map/${response.data.data.id}`);
    } catch (err) {
      console.log(err);
      errorToast("Could not add catch, please check your data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!localStorage.getItem("fishlog-token")) {
    return (
      <article>
        <p>
          <Link to="/login">Login</Link> to be able to add a catch.
        </p>
        <p>
          Or <Link to="/signup">create an account.</Link>
        </p>
      </article>
    );
  }

  return (
    <article>
      <p>Click the map to set position.</p>
      <AddEditMap location={location} setLocation={setLocation} />
      <AddEditForm
        formRole="add"
        handleSubmit={handleSubmit}
        species={species}
        setSpecies={setSpecies}
        length={length}
        setLength={setLength}
        weight={weight}
        setWeight={setWeight}
        date={date}
        setDate={setDate}
        uploadImages={uploadImages}
        setUploadImages={setUploadImages}
        previewImageUrls={previewImageUrls}
      />
    </article>
  );
};

export default Add;
