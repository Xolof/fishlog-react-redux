import { useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import MiniFishCatchCard from "./items/MiniFishCatchCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserLat,
  selectUserLng,
  setUserLat,
  setUserLng,
} from "../slices/userSlice";
import {
  selectFishCatches,
  selectFetchError,
  selectIsLoading,
} from "../slices/dataSlice";

const getTime = () => {
  const now = new Date();
  return {
    day: new Intl.DateTimeFormat("en-us", { weekday: "long" }).format(now),
    date: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
    seconds: now.getSeconds(),
    minutes: now.getMinutes(),
    hours: now.getHours(),
  };
};

const padZero = (num) => {
  const s = "0" + num;
  return s.slice(-2);
};

const StartPage = () => {
  const dispatch = useDispatch();

  const userLat = useSelector(selectUserLat);
  const userLng = useSelector(selectUserLng);

  const API_URL = process.env.REACT_APP_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  const fishCatches = useSelector(selectFishCatches);
  const fetchError = useSelector(selectFetchError);
  const isLoading = useSelector(selectIsLoading);

  const [time, setTime] = useState(getTime());

  const showPosition = (position) => {
    const { latitude, longitude } = position.coords;
    dispatch(setUserLat(latitude));
    dispatch(setUserLng(longitude));
  };

  useEffect(() => {
    let isMounted = true;
    setInterval(() => {
      if (isMounted) {
        setTime(getTime());
      }
    }, 1000);

    if ((!userLat || !userLng) && isMounted) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(showPosition);
      }
    }

    const cleanUp = () => {
      isMounted = false;
    };

    return cleanUp;
  }, []);

  return (
    <article className="startPage">
      <h3>
        {`${padZero(time.hours)}:${padZero(time.minutes)}:${padZero(
          time.seconds
        )} ${time.day} ${time.year}-${padZero(time.month + 1)}-${padZero(
          time.date
        )}`}
      </h3>
      <h2>Latest catches</h2>
      <div className="fishCatches">
        {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
        {fetchError && <p className="error">Could not get data</p>}
        {!isLoading &&
          !fetchError &&
          fishCatches
            .slice(0, 4)
            .sort((a, b) => {
              const aTime = new Date(a.date).getTime();
              const bTime = new Date(b.date).getTime();
              return parseInt(bTime) - parseInt(aTime);
            })
            .map((fishCatch) => (
              <MiniFishCatchCard fishCatch={fishCatch} key={fishCatch.id} />
            ))}
      </div>
      <h3>There are {fishCatches.length} catches.</h3>
      {userLat && userLng && (
        <>
          <h2>Your position:</h2>
          <p>
            {userLat} {userLng}
          </p>
        </>
      )}
    </article>
  );
};

export default StartPage;
