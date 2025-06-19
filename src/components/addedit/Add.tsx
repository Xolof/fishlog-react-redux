import AddEditMap from "./AddEditMap";
import AddEditForm from "./AddEditForm";
import NotFoundAddEdit from "./NotFoundAddEdit";
import useFishCatchForm from "../../hooks/useFishCatchForm";

const Add = () => {
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
    handleSubmit,
  } = useFishCatchForm("add");

  if (!localStorage.getItem("fishlog-token")) {
    return <NotFoundAddEdit />;
  }

  return (
    <article>
      <p>Click the map to set position.</p>
      <AddEditMap />
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
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        previewImageUrls={previewImageUrls}
      />
    </article>
  );
};

export default Add;