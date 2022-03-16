import { useApplicationContext } from "../context/DataContext";
import useAxiosFetch from "../hooks/useAxiosFetch";
import FishCatchCard from "./FishCatchCard";

const StartPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  const { fetchError, isLoading, fishCatches } = useApplicationContext();

  return (
    <article className="startPage">
      <h2>Latest catches</h2>
      <div className="fishCatches">
        {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
        {fetchError && <p className="error">Could not get data</p>}
        {!isLoading &&
          !fetchError &&
          fishCatches
            .slice(0, 4)
            .map((fishCatch) => (
              <FishCatchCard fishCatch={fishCatch} key={fishCatch.id} />
            ))}
      </div>
      <h2>Your position</h2>
      <h2>Current weather</h2>
    </article>
  );
};

export default StartPage;
