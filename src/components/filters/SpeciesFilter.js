import { useApplicationContext } from "../../context/DataContext";

const SpeciesFilter = () => {
  const { search, setSearch } = useApplicationContext();

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        type="search"
        name="search"
        id="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </>
  );
};

export default SpeciesFilter;
