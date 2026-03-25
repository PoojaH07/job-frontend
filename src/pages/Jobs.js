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

  // fetch jobs + get role
  useEffect(() => {
    fetchJobs();

    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    }
  }, []);

  // reusable fetch
  const fetchJobs = async () => {
    const res = await axios.get(`${API}/api/jobs`);
    setJobs(res.data);
  };

  // apply job
  const apply = async (id) => {
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
  };

  // delete job (admin)
  const deleteJob = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/api/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Job deleted!");
    fetchJobs();
  };

  // create job (admin)
  const createJob = async () => {
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

    // clear inputs
    setCompany("");
    setPosition("");
    setType("");
    setLocation("");

    fetchJobs();
  };

  return (
    <div>
      <h2>Jobs</h2>

      {/* ADMIN CREATE JOB FORM */}
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
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <p>
            {job.company || "Company"} - {job.position || "Role"}
          </p>

          <button onClick={() => apply(job.id)}>Apply</button>

          {/* DELETE BUTTON FOR ADMIN */}
          {role === "admin" && (
            <button
              onClick={() => deleteJob(job.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Jobs;