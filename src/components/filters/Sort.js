import {
  selectSortOrder,
  setSortOrder,
  selectSortBy,
  setSortBy,
} from "../../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const Sort = () => {
  const sortOrder = useSelector(selectSortOrder);
  const sortBy = useSelector(selectSortBy);

  const dispatch = useDispatch();

  return (
    <div className="sortContainer">
      <h3 className="sortHeader">Sort by</h3>
      <span>
        <label htmlFor="sortBy">Sort by:</label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(e) => {
            dispatch(setSortBy(e.target.value));
          }}
        >
          <option value="species">Species</option>
          <option value="username">User</option>
          <option value="weight">Weight</option>
          <option value="length">Length</option>
          <option value="date">Date</option>
        </select>
      </span>
      <span>
        <label htmlFor="sortOrder">Order:</label>
        <select
          name="sortOrder"
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => {
            dispatch(setSortOrder(e.target.value));
          }}
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </span>
    </div>
  );
};

export default Sort;
