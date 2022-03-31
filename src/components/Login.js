import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { successToast, errorToast } from "../services/toastService";
import { setUserName } from "../slices/userSlice";
import { selectAPI_URL, setIsLoading } from "../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const dispatch = useDispatch();
  const API_URL = useSelector(selectAPI_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
      const response = await api.post("/api/login", {
        email,
        password: passWord,
      });

      if (response.data.error) {
        for (let key in response.data.error) {
          for (let message of response.data.error[key]) {
            errorToast(message);
          }
        }
        return;
      }

      if (response.data.token) {
        await response.data.token;
        localStorage.setItem("fishlog-token", response.data.token);
        const res = await api.get(
          `${API_URL}/api/get_user?token=${response.data.token}`
        );
        localStorage.setItem("fishlog-userName", res.data.user.name);
        dispatch(setUserName(res.data.user.name));
        successToast("You logged in!");
        navigate("/map/all");
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      errorToast("Login failed, please check username and password.");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <article>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="passWord">Password:</label>
        <input
          type="password"
          id="passWord"
          required
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        ></input>
        <button type="submit">Log in</button>
      </form>
      <p>
        <Link to="/signup">Create a new account</Link>
      </p>
    </article>
  );
};

export default Login;
