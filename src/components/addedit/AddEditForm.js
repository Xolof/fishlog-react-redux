import getTodaysDate from "../../services/getTodaysDate";

const AddEditForm = ({
  formRole,
  handleSubmit,
  species,
  setSpecies,
  length,
  setLength,
  weight,
  setWeight,
  date,
  setDate,
  uploadImages,
  setUploadImages,
  previewImageUrls,
}) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
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
        max={getTodaysDate()}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="uploadImage" id="uploadImageLabel">
        {formRole === "add" ? "Add image" : "Change image"}
      </label>
      <input
        required={formRole === "add"}
        value={formRole === "add" ? uploadImages[0] : ""}
        id="uploadImage"
        type="file"
        onChange={(e) => {
          setUploadImages(...e.target.files);
        }}
      />
      {previewImageUrls.length > 0 ? (
        <img
          src={previewImageUrls}
          alt="uploadPreviewImage"
          className="uploadPreviewImage"
        />
      ) : null}
      <button type="submit">Save</button>
    </form>
  );
};

export default AddEditForm;
