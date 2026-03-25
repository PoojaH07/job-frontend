import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ for redirect

  const handleSignup = async () => {
    try {
      await axios.post(`${API}/api/auth/signup`, {
        email,
        password,
      });

      alert("Signup successful ✅");

      // 👉 redirect to login page
      navigate("/login");
    } catch (error) {
      alert("Signup failed ❌");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;