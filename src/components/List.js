import { useContext } from "react";
import DataContext from "../context/DataContext";
import Feed from "./Feed";
import Search from "./Search";
import useAxiosFetch from "../hooks/useAxiosFetch";

const List = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);

  const API_URL = process.env.REACT_APP_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  return (
    <article>
      <Search />
      {isLoading && !fetchError && <p className="statusMsg">Loading posts...</p>}
      {fetchError && <p className="statusMsg" style={{color: "red"}}>Could not get data</p>}
      {!isLoading && !fetchError &&
                (searchResults.length ?
                  <Feed fishCatches={searchResults} /> :
                  <p>Nothing found.</p>)
      }
    </article>
  )
}

export default List;

