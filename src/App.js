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
 * --- 🛡️ ProtectedRoute Component ---
 * ทำหน้าที่ตรวจสอบสิทธิ์การเข้าถึงหน้าเว็บ
 * ถ้ายังไม่ได้ Login จะส่งผู้ใช้ไปยังหน้า Access Denied
 */
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/access-denied" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ติดตามสถานะการล็อกอินจาก Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // หน้าจอ Loading ระหว่างเช็คสถานะ Authentication
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
        }}
      >
        <div className="spinner-pink"></div>
        <h2
          style={{
            color: "#e94057",
            marginTop: "20px",
            fontFamily: "sans-serif",
          }}
        >
          Securing Connection...
        </h2>
      </div>
    );
  }

  return (
    <Router>
      {/* แสดง Navbar เฉพาะเมื่อผู้ใช้ล็อกอินแล้วเท่านั้น */}
      {user && <Navbar />}

      <Routes>
        {/* หน้า Login: ถ้าล็อกอินแล้วจะ Redirect ไปหน้าหลัก (/) */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* หน้าแจ้งเตือนเมื่อพยายามเข้าถึงโดยไม่ได้รับอนุญาต */}
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* --- 🔒 กลุ่มหน้าเว็บที่ต้องล็อกอินก่อนถึงจะเข้าได้ (Protected Routes) --- */}
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

        {/* หน้า 404 - Not Found */}
        <Route
          path="*"
          element={user ? <NotFound /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
