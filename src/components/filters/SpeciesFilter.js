import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterOnSpecies,
  setFilterOnSpecies,
} from "../../slices/dataSlice";

const SpeciesFilter = () => {
  const dispatch = useDispatch();
  const filterOnSpecies = useSelector(selectFilterOnSpecies);

  return (
    <div className="filterContainer">
      <label htmlFor="species">Species: </label>
      <input
        type="search"
        name="species"
        id="species"
        value={filterOnSpecies}
        onChange={(e) => {
          dispatch(setFilterOnSpecies(e.target.value));
        }}
      />
    </div>
  );
};

export default SpeciesFilter;
