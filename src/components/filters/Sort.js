import { useApplicationContext } from "../../context/DataContext";

const Sort = () => {
  const { sortBy, setSortBy } = useApplicationContext();
  const { sortOrder, setSortOrder } = useApplicationContext();

  return (
    <>
      <label htmlFor="sortBy">Sort by:</label>
      <select
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
      >
        <option value="species">Species</option>
        <option value="username">User</option>
        <option value="weight">Weight</option>
        <option value="length">Length</option>
        <option value="date">Date</option>
      </select>
      <label htmlFor="sortOrder">Order:</label>
      <select
        name="sortOrder"
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => {
          setSortOrder(e.target.value);
        }}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </>
  );
};

export default Sort;
