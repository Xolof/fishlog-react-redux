import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setFishCatches,
} from "../slices/dataSlice";
import { setFetchError, setIsLoading } from "../slices/fetchStatusSlice";

const useAxiosFetch = (dataUrl: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url: string) => {
      try {
        const res = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          dispatch(setFishCatches(res.data));
          dispatch(setFetchError(null));
        }
      } catch (err) {
        if (err instanceof Error) {
          if (isMounted) {
            dispatch(setFetchError(err.message));
            dispatch(setFishCatches([]));
          }
        } else {
          console.error("Unknown error", err);
        }
      } finally {
        if (isMounted) {
          dispatch(setIsLoading(false));
        }
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl, dispatch]);
};

export default useAxiosFetch;
