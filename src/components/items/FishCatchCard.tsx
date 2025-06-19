import { useDispatch, useSelector } from "react-redux";
import {
  selectAPI_URL,
  selectFishCatches,
  setFishCatches,
  setIsLoading,
} from "../../slices/dataSlice";
import { successToast, errorToast } from "../../services/toastService";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const FishCatchCard = ({ fishCatch }) => {
  const navigate = useNavigate();
  const splitPosition = fishCatch.location.split(",");
  const lat = splitPosition[0].slice(0, 4);
  const lon = splitPosition[1].slice(0, 4);
  const API_URL = useSelector(selectAPI_URL);
  const fishCatches = useSelector(selectFishCatches);
  const dispatch = useDispatch();

  async function handleDelete(id) {
    dispatch(setIsLoading(true));
    try {
      const response = await api.delete(`/api/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("fishlog-token"),
        },
      });

      await response.data;
      const updatedFishCatches = fishCatches.filter((item) => {
        return parseInt(item.id) !== parseInt(id);
      });
      dispatch(setFishCatches(updatedFishCatches));
      successToast("Catch deleted!");
      navigate("/map/all");
    } catch (err) {
      console.error(err);
      console.error(`Error: ${err.message}`);
      errorToast("Could not delete catch.");
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return (
    <section className="fishCatchCard">
      <div className="content">
        <table className="catchInfo">
          <thead>
            <tr>
              <th>Species:</th>
              <th>{fishCatch.species}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Length:</td>
              <td>{fishCatch.length} cm</td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>{fishCatch.weight} g</td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>
                {lat}, {lon}
              </td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{fishCatch.date}</td>
            </tr>
            <tr>
              <td>User:</td>
              <td>{fishCatch.username}</td>
            </tr>
          </tbody>
        </table>
        <img src={`${API_URL}${fishCatch.imageurl}`} alt={fishCatch.species} />
      </div>
      {fishCatch.username === localStorage.getItem("fishlog-userName") ? (
        <div className="buttons">
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
        </div>
      ) : null}
    </section>
  );
};

export default FishCatchCard;
