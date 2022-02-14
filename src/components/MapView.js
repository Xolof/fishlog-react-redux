import { useContext } from "react";
import DataContext from "../context/DataContext";
import LeafletMap from "./LeafletMap";
import { useParams, Link } from "react-router-dom";

const MapView = () => {
    const { searchResults, fetchError, isLoading, fishCatches } = useContext(DataContext);

    const id = parseInt(useParams().id);

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
            {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
            {fetchError && <p className="statusMsg" style={{color: "red"}}>Could not get data</p>}
            {!isLoading && !fetchError &&
                (searchResults.length ?
                <LeafletMap fishCatches={searchResults} position={null} showId={id} /> :
                <p>No posts</p>)
            }
        </article>
    )
}

export default MapView;
