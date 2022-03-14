import SpeciesFilter from "./SpeciesFilter";
import UserFilter from "./UserFilter";
import WeightFilter from "./WeightFilter";
import LengthFilter from "./LengthFilter";
import DateFilter from "./DateFilter";

const Filters = () => {
  return (
    <>
      <h3>Filters</h3>
      <SpeciesFilter />
      <UserFilter />
      <WeightFilter />
      <LengthFilter />
      <DateFilter />
    </>
  );
};

export default Filters;
