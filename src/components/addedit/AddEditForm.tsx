import React, { ChangeEvent, FormEvent } from "react";
import getTodaysDate from "../../services/getTodaysDate";

type AddEditFormProps = {
  formRole: "add" | "edit";
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  species: string;
  setSpecies: (value: string) => void;
  length: string | number;
  setLength: (value: string) => void;
  weight: string | number;
  setWeight: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  setUploadImage: (file: File) => void;
  uploadImage: File|null;
  previewImageUrls: string[];
};

const AddEditForm: React.FC<AddEditFormProps> = ({
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
  setUploadImage,
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
        maxLength={30}
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <label htmlFor="length">Length (cm):</label>
      <input
        id="length"
        type="number"
        min={0}
        max={9999}
        required
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <label htmlFor="weight">Weight (g):</label>
      <input
        id="weight"
        type="number"
        min={0}
        max={9999999}
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
        id="uploadImage"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setUploadImage(e.target.files[0]);
          }
        }}
      />
      {previewImageUrls.length > 0 ? (
        <img
          src={previewImageUrls[0]}
          alt="uploadPreviewImage"
          className="uploadPreviewImage"
        />
      ) : null}
      <button type="submit">Save</button>
    </form>
  );
};

export default AddEditForm;
