import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DataContext from "../context/DataContext";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const { setUserName, setFlashMessage } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/api/login', {
                email,
                password: passWord
            });
            if (response.data.token) {
                await response.data.token;
                localStorage.setItem("token", response.data.token);
                const res = await api.get(`http://localhost:8000/api/get_user?token=${response.data.token}`);
                localStorage.setItem("userName", res.data.user.name);
                setUserName(res.data.user.name);
                setFlashMessage({
                    message: "You logged in!",
                    style: "success"
                });
                navigate('/');
            }
        } catch (err) {
            console.error(`Error: ${err.message}`);
            setFlashMessage({
                message: "Could not log in. Check your credentials.",
                style: "error"
            })
        }
    }

    return (
        <main className="login">
            <h2>Login</h2>
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
        </main>
    )
}

export default Login;
