import {
  selectSearchResultsSelector,
  selectFetchError,
  selectIsLoading,
} from "../../slices/dataSlice";
import Feed from "./Feed";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import Filters from "../filters/Filters";
import { useSelector } from "react-redux";

const List = () => {
  const searchResults = useSelector(selectSearchResultsSelector);
  const fetchError = useSelector(selectFetchError);
  const isLoading = useSelector(selectIsLoading);

  const API_URL = import.meta.env.VITE_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  return (
    <article>
      <Filters />
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
