import { useApplicationContext } from "../../context/DataContext";

const UserFilter = () => {
  const { filterOnUser, setFilterOnUser } = useApplicationContext();

  return (
    <>
      <label htmlFor="user">User: </label>
      <input
        type="search"
        name="user"
        id="user"
        value={filterOnUser}
        onChange={(e) => {
          setFilterOnUser(e.target.value);
        }}
      />
    </>
  );
};

export default UserFilter;
