import { useApplicationContext } from "../../context/DataContext";

const SpeciesFilter = () => {
  const { filterOnSpecies, setFilterOnSpecies } = useApplicationContext();

  return (
    <>
      <label htmlFor="species">Species: </label>
      <input
        type="search"
        name="species"
        id="species"
        value={filterOnSpecies}
        onChange={(e) => {
          setFilterOnSpecies(e.target.value);
        }}
      />
    </>
  );
};

export default SpeciesFilter;
