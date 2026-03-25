import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://job-backend-1-6lf2.onrender.com/api/auth/login", // ✅ use deployed URL
        {
          email,
          password,
        }
      );

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // ✅ redirect based on role (IMPORTANT)
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      console.error(err);

      // ✅ show proper error message
      if (err.response && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;