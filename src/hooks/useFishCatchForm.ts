import {
  useState,
  useEffect,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { FishCatch } from "../types/FishCatch";

import {
  selectFishCatches,
  setFishCatches,
  setFilterOnSpecies,
  setFilterOnUser,
  setFilterOnWeightMin,
  setFilterOnWeightMax,
  setFilterOnLengthMin,
  setFilterOnLengthMax,
  selectAPI_URL,
} from "../slices/dataSlice";

import { setIsLoading } from "../slices/fetchStatusSlice";

import {
  setMarkerLat,
  setMarkerLng,
  selectMarkerLat,
  selectMarkerLng,
} from "../slices/userSlice";

import {
  successToast,
  warningToast,
  errorToast,
} from "../services/toastService";

type Mode = "add" | "edit";

type UseFishCatchFormReturn = {
  species: string;
  setSpecies: Dispatch<SetStateAction<string>>;
  length: string;
  setLength: Dispatch<SetStateAction<string>>;
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  uploadImage: File | null;
  setUploadImage: Dispatch<SetStateAction<File | null>>;
  previewImageUrls: string[];
  mapCenter: number[] | null;
  error: unknown;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const useFishCatchForm = (
  mode: Mode = "add",
  id: number | string | null = null
): UseFishCatchFormReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fishCatches = useSelector(selectFishCatches) as FishCatch[];
  const markerLat = useSelector(selectMarkerLat) as number | null;
  const markerLng = useSelector(selectMarkerLng) as number | null;
  const username = localStorage.getItem("fishlog-userName") || "";

  const [species, setSpecies] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const [mapCenter, setMapCenter] = useState<number[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const API_URL = useSelector(selectAPI_URL) as string;

  useEffect(() => {
    dispatch(setMarkerLat(null));
    dispatch(setMarkerLng(null));
  }, [dispatch]);

  useEffect(() => {
    if (uploadImage === null) return;
    setPreviewImageUrls([URL.createObjectURL(uploadImage)]);
  }, [uploadImage]);

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    async function fetchCatch() {
      dispatch(setIsLoading(true));
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
        const [lat, lon] = res.data.location.split(",").map(parseFloat);
        setMapCenter([lat, lon]);
        dispatch(setMarkerLat(lat));
        dispatch(setMarkerLng(lon));
        setPreviewImageUrls([`${API_URL}${res.data.imageurl}`]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          console.error("Unknown error", err);
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    }
    fetchCatch();
  }, [mode, id, dispatch, API_URL]);

  const resetFilters = () => {
    dispatch(setFilterOnSpecies(""));
    dispatch(setFilterOnUser(""));
    dispatch(setFilterOnWeightMin(0));
    dispatch(setFilterOnWeightMax(10000));
    dispatch(setFilterOnLengthMin(0));
    dispatch(setFilterOnLengthMax(500));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!markerLat || !markerLng) {
      warningToast("Please set the location by clicking on the map.");
      return;
    }

    const location = `${markerLat},${markerLng}`;

    const data = {
      species,
      length,
      weight,
      location,
      date,
      username,
      ...(mode === "edit" && { id }),
      uploadImage,
    };

    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    dispatch(setIsLoading(true));
    try {
      const url = mode === "add" ? "/api/create" : `/api/update/${id}`;
      const response = await api.post(url, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("fishlog-token"),
        },
      });

      const newCatch = response.data.data as FishCatch;
      newCatch.username = username;

      if (mode === "add") {
        dispatch(setFishCatches([...fishCatches, newCatch]));
      } else {
        const updatedFishCatches = fishCatches.map((item) => {
          return parseInt(item.id as string) === parseInt(newCatch.id as string)
            ? newCatch
            : item;
        });
        dispatch(setFishCatches(updatedFishCatches));
      }

      successToast(mode === "add" ? "Catch added!" : "Catch updated!");
      resetFilters();
      navigate(`/map/${newCatch.id}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        const errors = err.response?.data?.error || ["An error occurred"];
        errors.forEach((error: string) => errorToast(error));
      } else {
        console.error(`Unknown Error: ${err}`);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return {
    species,
    setSpecies,
    length,
    setLength,
    weight,
    setWeight,
    date,
    setDate,
    uploadImage,
    setUploadImage,
    previewImageUrls,
    mapCenter,
    error,
    handleSubmit,
  };
};

export default useFishCatchForm;
