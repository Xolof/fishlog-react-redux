import {
  selectSearchResultsSelector,
  selectFishCatches,
} from "../../slices/dataSlice";
import { selectFetchError, selectIsLoading } from "../../slices/fetchStatusSlice";
import LeafletMap from "./LeafletMap";
import { useParams, Link } from "react-router-dom";
import Filters from "../filters/Filters";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { useSelector } from "react-redux";
import { FishCatch } from "../../types/FishCatch";

const MapView = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  const searchResults = useSelector(selectSearchResultsSelector);
  const fetchError = useSelector(selectFetchError);
  const isLoading = useSelector(selectIsLoading);
  const fishCatches = useSelector(selectFishCatches);

  const { id } = useParams<{ id?: string }>();
  const numericId = id ? Number(id) : NaN;

  if (numericId && !fishCatches.some((item: FishCatch) => item.id == numericId)) {
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
          /* @ts-expect-error Excluding Leaflet from TypeScript. */
          <LeafletMap searchResults={searchResults} showId={numericId} />
        )}
      </div>
    </article>
  );
};

export default MapView;
