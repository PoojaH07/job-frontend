import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  // fetch jobs + get role
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data));

    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    }
  }, []);

  // apply job
  const apply = async (id) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/jobs/${id}/apply`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Applied!");
  };

  const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  await axios.delete(
    `http://localhost:5000/api/jobs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Job deleted!");

  // reload jobs
  const res = await axios.get("http://localhost:5000/api/jobs");
  setJobs(res.data);
  };

  // create job (admin)
  const createJob = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/jobs",
      { company, position, type, location },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Job created!");

    // reload jobs
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  return (
    <div>
      <h2>Jobs</h2>

      {/* ADMIN CREATE JOB FORM */}
      {role === "admin" && (
        <div style={{ border: "2px solid green", padding: "10px", margin: "10px" }}>
          <h3>Create Job</h3>

          <input placeholder="Company" onChange={(e) => setCompany(e.target.value)} />
          <br />
          <input placeholder="Position" onChange={(e) => setPosition(e.target.value)} />
          <br />
          <input placeholder="Type" onChange={(e) => setType(e.target.value)} />
          <br />
          <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
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
        </div>
      ))}
    </div>
  );
}

export default Jobs;