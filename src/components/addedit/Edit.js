// src/components/Edit.js
import { useParams } from "react-router-dom";
import AddEditMap from "./AddEditMap";
import AddEditForm from "./AddEditForm";
import NotFound from "../NotFound";
import NotFoundAddEdit from "./NotFoundAddEdit";
import useFishCatchForm from "../../hooks/useFishCatchForm";

const Edit = () => {
  const { id } = useParams();
  const {
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
  } = useFishCatchForm("edit", id);

  if (!localStorage.getItem("fishlog-token")) {
    return <NotFoundAddEdit />;
  }

  if (error) {
    return <NotFound />;
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
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        previewImageUrls={previewImageUrls}
      />
    </article>
  ) : (
    <p>Loading...</p>
  );
};

export default Edit;
