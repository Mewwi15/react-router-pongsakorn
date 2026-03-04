import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AccessDenied.css";

function AccessDenied() {
  const navigate = useNavigate();

  useEffect(() => {
    // ให้เวลาผู้ใช้อ่านข้อความ 3 วินาที แล้วค่อยเตะไปหน้า Login
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="access-denied-container">
      <div className="denied-blob"></div>
      <div className="denied-card">
        <div className="denied-icon">
          <i className="bi bi-exclamation-octagon-fill"></i>
        </div>
        <h1 className="denied-title">Restricted Area</h1>
        <p className="denied-message">
          Authentication is required to access this resource. <br />
          <span>Redirecting you to login page...</span>
        </p>
        <div className="denied-loader">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
