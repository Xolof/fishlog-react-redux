import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useApplicationContext } from "../context/DataContext";
import { useUserContext } from "../context/UserContext";
import { successToast, errorToast } from "../services/toastService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const { API_URL, setIsLoading } = useApplicationContext();
  const { setUserName } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/api/login", {
        email,
        password: passWord
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
        const res = await api.get(`${API_URL}/api/get_user?token=${response.data.token}`);
        localStorage.setItem("fishlog-userName", res.data.user.name);
        setUserName(res.data.user.name);
        successToast("You logged in!");
        navigate("/map/all");
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
      errorToast("Login failed, please check username and password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <article>
      <form
        className="loginForm"
        onSubmit={handleSubmit}
      >
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
    </article>
  )
}

export default Login;
