import { useApplicationContext } from "../context/DataContext";
import Feed from "./Feed";
import SpeciesFilter from "./filters/SpeciesFilter";
import UserFilter from "./filters/UserFilter";
import useAxiosFetch from "../hooks/useAxiosFetch";

const List = () => {
  const { searchResults, fetchError, isLoading } = useApplicationContext();

  const API_URL = process.env.REACT_APP_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  return (
    <article>
      <SpeciesFilter />
      <UserFilter />
      {isLoading && !fetchError && (
        <p className="statusMsg">Loading posts...</p>
      )}
      {fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          Could not get data
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults.length ? (
          <Feed fishCatches={searchResults} />
        ) : (
          <p>Nothing found.</p>
        ))}
    </article>
  );
};

export default List;
