import { useState } from "react";
import SpeciesFilter from "./SpeciesFilter";
import UserFilter from "./UserFilter";
import WeightFilter from "./WeightFilter";
import LengthFilter from "./LengthFilter";
import DateFilter from "./DateFilter";
import Sort from "./Sort";
import { useLocation } from "react-router-dom";
import "../../css/filters.scss";

const Filters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();

  return (
    <section className="filters">
      <div className="filterHeaderWrapper">
        <div className="filterHeaderContainer">
          <h3 className="filterHeader">Filters</h3>
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
        {!location.pathname.includes("map") ? <Sort /> : null}
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
