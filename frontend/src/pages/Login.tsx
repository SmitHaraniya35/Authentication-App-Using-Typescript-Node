import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext, type User } from "../contexts/AuthContext";
import { socket } from "../socket";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;

  const handleLogin = async () => {
    try{
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      
      console.log("login res:", res);

      const user: User = {
        id: res.data.data.userId,
        email: res.data.data.email,
        username: res.data.data.username
      };

      login(user, res.data.data.token);
      socket.emit("goingToHome", user.id);
      navigate('/home');
    } catch(err){
      console.error("Login error:", err);
      return;
    }
  };

  const handleRefreshToken = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/auth/refresh-token",
      { 
        withCredentials: true 
      }
    );
    localStorage.setItem("token", res.data.data.token);
    console.log("access token res:", res);
    navigate('/home');
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/> <br />
      <input type="password" placeholder="Password"
        onChange={e=>setPassword(e.target.value)} /> <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRefreshToken}>refresh token?</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
}
