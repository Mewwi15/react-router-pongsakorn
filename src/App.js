import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Student from "./Student";
import Education from "./pages/Education";
import Activity from "./pages/Activity";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TCTForm from "./pages/TCTForm";
import Login from "./pages/Login";

// --- ✨ สร้าง Component ยามหน้าด่าน (ProtectedRoute) ---
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // ถ้ายังไม่ล็อกอิน ให้ Alert แจ้งเตือนก่อน
    alert("Access Denied: Please login to access this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <h2 style={{ color: "#e94057" }}>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      {/* โชว์ Navbar เฉพาะตอนล็อกอินแล้ว */}
      {user && <Navbar />}

      <Routes>
        {/* หน้า Login: ถ้าล็อกอินแล้วจะเด้งไปหน้าแรกทันที */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* --- 🛡️ การใช้ ProtectedRoute ดักทุก Path --- */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/education"
          element={
            <ProtectedRoute user={user}>
              <Education />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute user={user}>
              <Activity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute user={user}>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tct-form"
          element={
            <ProtectedRoute user={user}>
              <TCTForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
