import { useSelector } from "react-redux";
import { selectAPI_URL } from "../../slices/dataSlice";
import { FishCatch } from "../../types/FishCatch";

type FCCProps = {
  fishCatch: FishCatch
};

const MiniFishCatchCard: React.FC<FCCProps> = ({ fishCatch }) => {
  const API_URL = useSelector(selectAPI_URL);

  return (
    <section className="miniFishCatchCard">
      <a href={`/map/${fishCatch.id}`}>
        <div className="content">
          <p>{fishCatch.species} caught by {fishCatch.username}.</p>
          <div className="imageWrapper">
            <img src={`${API_URL}${fishCatch.imageurl}`} alt={fishCatch.species} className="miniFishCatchCard-image" />
          </div>
        </div>
      </a>
    </section>
  );
};

export default MiniFishCatchCard;
