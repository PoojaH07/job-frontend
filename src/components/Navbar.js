import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ ONLY ONE logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    navigate("/login"); // redirect
  };

  return (
    <div style={{ padding: "10px", borderBottom: "2px solid black" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Jobs</Link>

      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;