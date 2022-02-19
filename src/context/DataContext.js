import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const [fishCatches, setFishCatches] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setFishCatches(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = fishCatches.filter(fishCatch => {
            return ((fishCatch.species).toLowerCase()).includes(search.toLowerCase());
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
                    userName, setUserName,
                    data, setData,
                    fetchError, setFetchError,
                    isLoading, setIsLoading,
                    API_URL
                }
            }
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;