import AddEditMap from "./AddEditMap";
import AddEditForm from "./AddEditForm";
import NotFound from "../NotFound";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  successToast,
  infoToast,
  errorToast,
} from "../../services/toastService";
import {
  setMarkerLat,
  setMarkerLng,
  selectMarkerLat,
  selectMarkerLng,
} from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFishCatches,
  selectAPI_URL,
  setFishCatches,
  setIsLoading,
  setFilterOnSpecies,
  setFilterOnUser,
  setFilterOnWeightMax,
  setFilterOnWeightMin,
  setFilterOnLengthMax,
  setFilterOnLengthMin,
} from "../../slices/dataSlice";

const Edit = () => {
  const [species, setSpecies] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [uploadImages, setUploadImages] = useState([]);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const fishCatches = useSelector(selectFishCatches);
  const API_URL = useSelector(selectAPI_URL);
  const markerLat = useSelector(selectMarkerLat);
  const markerLng = useSelector(selectMarkerLng);

  useEffect(() => {
    dispatch(setMarkerLat(null));
    dispatch(setMarkerLng(null));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCatch() {
      try {
        const res = await api.get(`/api/fishcatch/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("fishlog-token"),
          },
        });
        setSpecies(res.data.species);
        setLength(res.data.length);
        setWeight(res.data.weight);
        setDate(res.data.date);
        const splitPosition = res.data.location.split(",");
        const lat = parseFloat(splitPosition[0]);
        const lon = parseFloat(splitPosition[1]);
        setMapCenter([lat, lon]);
        dispatch(setMarkerLat(lat));
        dispatch(setMarkerLng(lon));
        const imageUrl = `${API_URL}${res.data.imageurl}`;
        setPreviewImageUrls([imageUrl]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCatch();
  }, []);

  useEffect(() => {
    if (uploadImages.length < 1) return;
    setPreviewImageUrls(URL.createObjectURL(uploadImages));
  }, [uploadImages]);

  if (error) {
    return <NotFound />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let location = null;

    if (markerLat && markerLng) {
      location = markerLat.toString() + "," + markerLng.toString();
    }

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
      date,
    };

    if (uploadImages.size) {
      data.uploadImage = uploadImages;
    }

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await api.post(`/api/update/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("fishlog-token"),
        },
      });

      await response.data;
      const newCatch = response.data.data;
      newCatch.username = localStorage.getItem("fishlog-userName");

      const updatedFishCatches = fishCatches.map((item) => {
        return parseInt(item.id) === parseInt(newCatch.id) ? newCatch : item;
      });

      dispatch(setFishCatches(updatedFishCatches));

      successToast("Catch updated");
      setFilterOnSpecies("");
      setFilterOnUser("");
      setFilterOnWeightMin(0);
      setFilterOnWeightMax(10000);
      setFilterOnLengthMin(0);
      setFilterOnLengthMax(500);
      navigate(`/map/${response.data.data.id}`);
    } catch (err) {
      console.error(err);
      const errors = err.response.data.error;
      errors.forEach(error => {
        errorToast(error);
      });
    }
  };

  if (!localStorage.getItem("fishlog-token")) {
    return (
      <article>
        <h1>Edit</h1>
        <p>
          <Link to="/login">Login</Link> to be able to edit a catch.
        </p>
      </article>
    );
  }

  return mapCenter ? (
    <article>
      <h2>Edit</h2>
      <p>Click the map to set position.</p>
      <AddEditMap center={mapCenter} />
      <AddEditForm
        formRole="edit"
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
  ) : (
    <p>Loading...</p>
  );
};

export default Edit;
