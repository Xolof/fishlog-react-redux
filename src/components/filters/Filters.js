import { useState } from "react";
import SpeciesFilter from "./SpeciesFilter";
import UserFilter from "./UserFilter";
import WeightFilter from "./WeightFilter";
import LengthFilter from "./LengthFilter";
import DateFilter from "./DateFilter";
import "../../css/filters.scss";

const Filters = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="filters">
      <div className="filterHeaderWrapper">
        <h3 className="filterHeader">Options</h3>
        <button
          className={
            showFilters
              ? "toggleFiltersButton chevronUp"
              : "toggleFiltersButton chevronDown"
          }
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        ></button>
      </div>
      <div
        className={
          showFilters ? "filterWrapper fullHeight" : "filterWrapper zeroHeight"
        }
      >
        <SpeciesFilter />
        <UserFilter />
        <WeightFilter />
        <LengthFilter />
        <DateFilter />
      </div>
    </section>
  );
};

export default Filters;
