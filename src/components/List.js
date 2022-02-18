import { useContext } from "react";
import DataContext from "../context/DataContext";
import Feed from "./Feed";
import Search from "./Search";

const List = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext);

    return (
        <article>
            <h1>List</h1>
            <Search />
            {isLoading && !fetchError && <p className="statusMsg">Loading posts...</p>}
            {fetchError && <p className="statusMsg" style={{color: "red"}}>Could not get data</p>}
            {!isLoading && !fetchError &&
                (searchResults.length ?
                <Feed fishCatches={searchResults} /> :
                <p>No posts</p>)
            }
        </article>
    )
}

export default List;

