import { useEffect, useContext } from "react";
import axios from "axios";
import DataContext from "../context/DataContext";

const useAxiosFetch = (dataUrl) => {
  const { setData, setFetchError, setIsLoading } = useContext(DataContext);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const res = await axios.get(url, {
          cancelToken: source.token
        });
        if (isMounted) {
          setData(res.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }

    return cleanUp;
  }, [dataUrl]);
}

export default useAxiosFetch;