import { useApplicationContext } from "../context/DataContext";
import { successToast, errorToast } from "../services/toastService";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const FishCatchCard = ({ fishCatch }) => {
  const navigate = useNavigate();
  const { API_URL } = useApplicationContext();
  const splitPosition = fishCatch.location.split(",");
  const lat = splitPosition[0].slice(0, 4);
  const lon = splitPosition[1].slice(0, 4);
  const { fishCatches, setFishCatches, setIsLoading } = useApplicationContext();

  async function handleDelete(id) {
    setIsLoading(true);
    try {
      const response = await api.delete(`/api/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("fishlog-token"),
        },
      });

      await response.data;
      setFishCatches(
        fishCatches.filter((item) => {
          return parseInt(item.id) !== parseInt(id);
        })
      );
      successToast("Catch deleted!");
      navigate("/map/all");
    } catch (err) {
      console.error(err);
      console.error(`Error: ${err.message}`);
      errorToast("Could not delete catch.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="fishCatchCard">
      <h3>{fishCatch.species}</h3>
      <p>{fishCatch.length} cm</p>
      <p>{fishCatch.weight} g</p>
      <p>
        {lat} {lon}
      </p>
      <p className="postDate">{fishCatch.date}</p>
      <p>Caught by {fishCatch.username}</p>
      <img src={`${API_URL}${fishCatch.imageurl}`} alt={fishCatch.species} />
      {fishCatch.username === localStorage.getItem("fishlog-userName") ? (
        <>
          <button
            onClick={() => navigate(`/edit/${fishCatch.id}`)}
            className="editButton"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(fishCatch.id)}
            className="deleteButton"
          >
            Delete
          </button>
        </>
      ) : null}
    </section>
  );
};

export default FishCatchCard;
