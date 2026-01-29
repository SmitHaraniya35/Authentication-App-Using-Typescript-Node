import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Signup() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup",
      { username, email, password },
      { withCredentials: true }
    );
    navigate("/");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e=>setUsername(e.target.value)} /> <br />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} /> <br />
      <input type="password" placeholder="Password"
        onChange={e=>setPassword(e.target.value)} /> <br />
      <button onClick={handleSignup}>Signup</button> <br />

      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}
