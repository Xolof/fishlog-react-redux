import SpeciesFilter from "./SpeciesFilter";
import UserFilter from "./UserFilter";
import WeightFilter from "./WeightFilter";
import LengthFilter from "./LengthFilter";
import DateFilter from "./DateFilter";

const Filters = () => {
  return (
    <>
      <SpeciesFilter />
      <UserFilter />
      <WeightFilter />
      <LengthFilter />
      <DateFilter />
    </>
  );
};

export default Filters;
