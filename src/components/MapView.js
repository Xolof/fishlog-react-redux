import { useContext } from "react";
import DataContext from "../context/DataContext";
import LeafletMap from "./LeafletMap";

const MapView = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);

    return (
        <article>
            <h1>Map</h1>
            {isLoading && !fetchError && <p className="statusMsg">Loading posts...</p>}
            {fetchError && <p className="statusMsg" style={{color: "red"}}>Could not get data</p>}
            {!isLoading && !fetchError &&
                (searchResults.length ?
                <LeafletMap fishCatches={searchResults} /> :
                <p>No posts</p>)
            }
        </article>
    )
}

export default MapView;
