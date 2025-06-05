import {
  selectSearchResults,
  selectFetchError,
  selectIsLoading,
  selectFishCatches,
} from "../../slices/dataSlice";
import LeafletMap from "./leafletMap";
import { useParams, Link } from "react-router-dom";
import Filters from "../filters/Filters";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { useSelector } from "react-redux";

const MapView = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  const searchResults = useSelector(selectSearchResults);
  const fetchError = useSelector(selectFetchError);
  const isLoading = useSelector(selectIsLoading);
  const fishCatches = useSelector(selectFishCatches);

  const id = useParams().id;

  if (
    id != "all" &&
    fishCatches.filter((item) => parseInt(item.id) === parseInt(id)).length < 1
  ) {
    return (
      <article>
        <h2>NotFound</h2>
        <Link to="/">Go to homepage</Link>
      </article>
    );
  }

  return (
    <article>
      <Filters />
      {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
      {fetchError && <p className="error">Could not get data</p>}
      <div className="mapWrapper">
        {!isLoading && searchResults.length < 1 && (
          <p className="noResults">No results.</p>
        )}
        {!isLoading && !fetchError && (
          <LeafletMap searchResults={searchResults} showId={parseInt(id)} />
        )}
      </div>
    </article>
  );
};

export default MapView;
