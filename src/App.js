import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Components & Pages
import Navbar from "./components/Navbar";
import Student from "./Student";
import Education from "./pages/Education";
import Activity from "./pages/Activity";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TCTForm from "./pages/TCTForm";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";

/**
 * --- 🛡️ Path Security Guard ---
 * สำหรับดักคนที่พยายามใส่ Path ตรงๆ เข้ามาโดยไม่ผ่านการ Login
 */
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // ถ้าไม่มี User (ไม่ได้ Login) แต่พยายามเข้าหน้าอื่น ให้ส่งไปหน้า Access Denied ทันที
    return <Navigate to="/access-denied" replace />;
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
          backgroundColor: "#F9FAFB",
        }}
      >
        <div className="spinner-pink"></div>
      </div>
    );
  }

  return (
    <Router>
      {/* Navbar จะขึ้นเฉพาะตอน Login สำเร็จแล้วเท่านั้น */}
      {user && <Navbar />}

      <Routes>
        {/* 1. หน้าด่านแรก: ถ้ายังไม่ Login จะเจอหน้า Login เสมอ */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* 2. หน้ากับดัก: สำหรับคนเจาะ Path */}
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* 3. ปกป้องทุกหน้าด้วย ProtectedRoute */}
        <Route
          path="/"
          element={user ? <Student /> : <Navigate to="/login" />}
        />

        {/* สำหรับ Path อื่นๆ ถ้าแอบเข้าจะโดนส่งไป Access Denied */}
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

        <Route
          path="*"
          element={user ? <NotFound /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
