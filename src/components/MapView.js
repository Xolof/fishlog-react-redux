import { useContext } from "react";
import DataContext from "../context/DataContext";
import LeafletMap from "./LeafletMap";
import { useParams, Link } from "react-router-dom";
import Search from "./Search";
import useAxiosFetch from "../hooks/useAxiosFetch";

const MapView = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    useAxiosFetch(`${API_URL}/api/public_fishcatch`);

    const { searchResults, fetchError, isLoading, fishCatches } = useContext(DataContext);

    const id = useParams().id;

    if (id != "all" && fishCatches.filter(item => parseInt(item.id) === parseInt(id)).length < 1) {
        return (
            <article>
                <h2>NotFound</h2>
                <Link to="/">Go to homepage</Link>
            </article>
        )
    };

    return (
        <article>
            <h1>Map</h1>
            <Search />
            {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
            {fetchError && <p className="error">Could not get data</p>}
            {!isLoading && !fetchError &&
                (searchResults.length ?
                <LeafletMap searchResults={searchResults} showId={parseInt(id)} /> :
                <p>Nothing found.</p>)
            }
        </article>
    )
}

export default MapView;
