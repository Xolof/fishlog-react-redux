import { useSelector } from "react-redux";
import { selectAPI_URL } from "../../slices/dataSlice";

const MiniFishCatchCard = ({ fishCatch }) => {
  const API_URL = useSelector(selectAPI_URL);

  return (
    <section className="miniFishCatchCard">
      <div className="content">
        <p>{fishCatch.species} caught by {fishCatch.username}.</p>
        <img src={`${API_URL}${fishCatch.imageurl}`} alt={fishCatch.species} className="miniFishCatchCard-image" />
      </div>
    </section>
  );
};

export default MiniFishCatchCard;
