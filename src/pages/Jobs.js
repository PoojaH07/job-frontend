import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchJobs();

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
  }, []);

  // ✅ FIXED fetch (handles all response formats)
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/api/jobs`);

      console.log("API RESPONSE:", res.data); // 🔥 DEBUG

      // 🔥 HANDLE ALL CASES
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (res.data.rows) {
        setJobs(res.data.rows);
      } else if (res.data.data) {
        setJobs(res.data.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    }
  };

  // APPLY JOB
  const apply = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/api/jobs/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied!");
    } catch (err) {
      console.error("Apply error:", err);
    }
  };

  // DELETE JOB
  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job deleted!");
      fetchJobs();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // CREATE JOB
  const createJob = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API}/api/jobs`,
        { company, position, type, location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job created!");

      setCompany("");
      setPosition("");
      setType("");
      setLocation("");

      fetchJobs();
    } catch (err) {
      console.error("Create job error:", err);
    }
  };

  return (
    <div>
      <h2>Jobs</h2>

      {/* ADMIN CREATE JOB */}
      {role === "admin" && (
        <div style={{ border: "2px solid green", padding: "10px", margin: "10px" }}>
          <h3>Create Job</h3>

          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <br />

          <input
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <br />

          <input
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <br />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />

          <button onClick={createJob}>Create Job</button>
        </div>
      )}

      {/* JOB LIST */}
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
          >
            <p>
              {job.company || "Company"} - {job.position || "Role"}
            </p>

            <button onClick={() => apply(job.id)}>Apply</button>

            {role === "admin" && (
              <button
                onClick={() => deleteJob(job.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Jobs;