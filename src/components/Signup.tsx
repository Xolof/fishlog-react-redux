import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { successToast, errorToast } from "../services/toastService";
import { setIsLoading } from "../slices/dataSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
      const response = await api.post("/api/register", {
        name,
        email,
        password: passWord,
      });

      if (response.data.error) {
        for (const key in response.data.error) {
          for (const message of response.data.error[key]) {
            errorToast(message);
          }
        }
        return;
      }

      if (response.data.success) {
        await response.data.token;
        successToast("You signed up!");
        navigate("/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error: ${err.message}`);
        errorToast("Signup failed.");
      } else {
        console.error("Unknown error", err);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <article>
      <h2>Create an account</h2>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign up</button>
      </form>
    </article>
  );
};

export default Signup;
