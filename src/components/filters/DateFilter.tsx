import { useDispatch, useSelector } from "react-redux";
import getTodaysDate from "../../services/getTodaysDate";
import {
  selectFilterOnDateFrom,
  setFilterOnDateFrom,
  selectFilterOnDateTo,
  setFilterOnDateTo,
} from "../../slices/dataSlice";

const DateFilter = () => {
  const filterOnDateFrom = useSelector(selectFilterOnDateFrom);
  const filterOnDateTo = useSelector(selectFilterOnDateTo);

  const dispatch = useDispatch();

  return (
    <>
      <div className="filterContainer">
        <label htmlFor="from-date">From date: </label>
        <input
          type="date"
          name="from-date"
          id="from-date"
          value={filterOnDateFrom}
          onChange={(e) => {
            dispatch(setFilterOnDateFrom(e.target.value));
          }}
        />
      </div>
      <div className="filterContainer">
        <label htmlFor="to-date">To date: </label>
        <input
          type="date"
          name="to-date"
          id="to-date"
          value={filterOnDateTo}
          max={getTodaysDate()}
          onChange={(e) => {
            dispatch(setFilterOnDateTo(e.target.value));
          }}
        />
      </div>
    </>
  );
};

export default DateFilter;
