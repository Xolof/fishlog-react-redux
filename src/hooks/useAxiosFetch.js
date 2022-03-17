import { useEffect } from "react";
import axios from "axios";
import { useApplicationContext } from "../context/DataContext";

const useAxiosFetch = (dataUrl) => {
  const { setData, setFetchError, setIsLoading } = useApplicationContext();

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      try {
        const res = await axios.get(url, {
          cancelToken: source.token,
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
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);
};

export default useAxiosFetch;
