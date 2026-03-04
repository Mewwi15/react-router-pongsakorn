import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase"; // นำเข้า auth เพื่อเช็คสถานะล็อกอิน
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Student from "./Student";
import Education from "./pages/Education";
import Activity from "./pages/Activity";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TCTForm from "./pages/TCTForm";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ป้องกันหน้าเว็บกระพริบตอนโหลดเช็คสถานะ

  useEffect(() => {
    // ให้ Firebase คอยเช็คว่ามีคนล็อกอินค้างไว้หรือไม่
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // เช็คเสร็จแล้ว ปิดโหลด
    });
    return () => unsubscribe();
  }, []);

  // หน้าจอโหลดดิ้งระหว่างรอ Firebase ตอบกลับ
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
        <h2 style={{ color: "#e94057" }}>Loading Secure Data...</h2>
      </div>
    );
  }

  return (
    <Router>
      {/* โชว์ Navbar เฉพาะตอนที่ล็อกอินแล้วเท่านั้น! */}
      {user && <Navbar />}

      <Routes>
        {/* Route สำหรับหน้า Login */}
        {/* ถ้า "ยังไม่ล็อกอิน" ให้เข้าหน้า Login ได้ / ถ้า "ล็อกอินแล้ว" ให้เด้งไปหน้าแรก (/) ทันที */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* --- Protected Routes (โซนหวงห้าม ต้องล็อกอินเท่านั้น) --- */}
        {/* ถ้า "ล็อกอินแล้ว" ดูเนื้อหาได้ / ถ้า "ยังไม่ล็อกอิน" เตะกลับไปหน้า /login เสมอ */}
        <Route
          path="/"
          element={user ? <Student /> : <Navigate to="/login" />}
        />
        <Route
          path="/education"
          element={user ? <Education /> : <Navigate to="/login" />}
        />
        <Route
          path="/activity"
          element={user ? <Activity /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={user ? <Contact /> : <Navigate to="/login" />}
        />
        <Route
          path="/tct-form"
          element={user ? <TCTForm /> : <Navigate to="/login" />}
        />

        {/* หน้า 404 */}
        <Route
          path="*"
          element={user ? <NotFound /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
