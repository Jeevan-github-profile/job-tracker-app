import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";

export default function App() {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({
    company: "",
    position: "",
    status: "Applied",
    dateApplied: new Date().toISOString().split("T")[0],
  });
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Handle Firebase Anonymous Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setIsAuthReady(true);
        console.log("User signed in:", user.uid);
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Auth error:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch job applications
  useEffect(() => {
    if (!userId) return;

    const applicationsCollectionRef = collection(
      db,
      `users/${userId}/jobApplications`
    );
    const q = query(applicationsCollectionRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(apps);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleAddApplication = async (e) => {
    e.preventDefault();
    if (!newApplication.company || !newApplication.position) return;

    try {
      const applicationsCollectionRef = collection(
        db,
        `users/${userId}/jobApplications`
      );
      await addDoc(applicationsCollectionRef, {
        ...newApplication,
        timestamp: serverTimestamp(),
      });
      setNewApplication({
        company: "",
        position: "",
        status: "Applied",
        dateApplied: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding application:", error);
    }
  };

  const handleUpdateApplication = async (id, newStatus) => {
    try {
      const applicationRef = doc(
        db,
        `users/${userId}/jobApplications`,
        id
      );
      await updateDoc(applicationRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      const applicationRef = doc(
        db,
        `users/${userId}/jobApplications`,
        id
      );
      await deleteDoc(applicationRef);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Job Application Tracker
        </h1>

        {/* Add Application Form */}
        <form onSubmit={handleAddApplication} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Company"
              value={newApplication.company}
              onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={newApplication.position}
              onChange={(e) => setNewApplication({ ...newApplication, position: e.target.value })}
              className="border rounded p-2"
              required
            />
            <select
              value={newApplication.status}
              onChange={(e) => setNewApplication({ ...newApplication, status: e.target.value })}
              className="border rounded p-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              type="date"
              value={newApplication.dateApplied}
              onChange={(e) => setNewApplication({ ...newApplication, dateApplied: e.target.value })}
              className="border rounded p-2"
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Application
          </button>
        </form>

        {/* Application List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{app.position}</h3>
                  <p className="text-gray-600">{app.company}</p>
                  <p className="text-sm text-gray-500">Applied on: {app.dateApplied}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateApplication(app.id, e.target.value)}
                    className="border rounded p-2"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDeleteApplication(app.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
