import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [userName, setUserName] = useState(localStorage.getItem("userName"));

    const [fishCatches, setFishCatches] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:8000/api/public_fishcatch");

    useEffect(() => {
        setFishCatches(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = fishCatches.filter(fishCatch => {
            return ((fishCatch.species).toLowerCase()).includes(search.toLowerCase())
        });
    setSearchResults(filteredResults);
    }, [fishCatches, search]);

    return (
        <DataContext.Provider 
            value={
                {
                    search, setSearch,
                    searchResults, fetchError, isLoading,
                    fishCatches, setFishCatches,
                    userName, setUserName
                }
            }
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;