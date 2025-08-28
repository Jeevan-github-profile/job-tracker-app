import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = collection(db, "users", auth.currentUser.uid, "jobApplications");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [auth.currentUser]);

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>{job.title}</li>
      ))}
    </ul>
  );
}
