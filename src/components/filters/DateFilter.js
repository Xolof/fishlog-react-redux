import { useApplicationContext } from "../../context/DataContext";

const DateFilter = () => {
  const { filterOnDateFrom, setFilterOnDateFrom } = useApplicationContext();
  const { filterOnDateTo, setFilterOnDateTo } = useApplicationContext();

  return (
    <>
      <label htmlFor="from-date">From date: </label>
      <input
        type="date"
        name="from-date"
        id="from-date"
        value={filterOnDateFrom}
        onChange={(e) => {
          setFilterOnDateFrom(e.target.value);
        }}
      />
      <label htmlFor="to-date">To date: </label>
      <input
        type="date"
        name="to-date"
        id="to-date"
        value={filterOnDateTo}
        onChange={(e) => {
          console.log(e.target.value);
          setFilterOnDateTo(e.target.value);
        }}
      />
    </>
  );
};

export default DateFilter;
