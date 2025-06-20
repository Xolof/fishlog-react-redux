import { selectFilterOnUser, setFilterOnUser } from "../../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const UserFilter = () => {
  const filterOnUser = useSelector(selectFilterOnUser);
  const dispatch = useDispatch();

  return (
    <div className="filterContainer">
      <label htmlFor="user">User: </label>
      <input
        type="search"
        name="user"
        id="user"
        value={filterOnUser}
        onChange={(e) => {
          dispatch(setFilterOnUser(e.target.value));
        }}
      />
    </div>
  );
};

export default UserFilter;
