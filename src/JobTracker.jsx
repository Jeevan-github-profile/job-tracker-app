import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function JobTracker({ user }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [jobs, setJobs] = useState([]);

  // Fetch jobs in real-time for logged-in user
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "jobApplications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    });

    return () => unsubscribe();
  }, [user]);

  const addJob = async () => {
    if (!company || !position || !status) return;

    await addDoc(collection(db, "users", user.uid, "jobApplications"), {
      company,
      position,
      status,
      userId: user.uid,
      createdAt: new Date(),
    });

    setCompany("");
    setPosition("");
    setStatus("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Track Your Job Applications</h2>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={addJob}>Add Job</button>

      <h3>Your Applications</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.company} - {job.position} ({job.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobTracker;
