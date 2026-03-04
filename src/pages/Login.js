import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Failed to login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-blob-1"></div>
      <div className="login-blob-2"></div>

      <div className="login-glass-card">
        {/* ✨ ลูกเล่นจัดเต็ม: Levitating Tech Core */}
        <div className="showcase-core">
          {/* วงแหวนหมุนรอบๆ */}
          <div className="core-ring"></div>

          {/* ป้ายเล็กๆ ลอยแบบ 3D แสดงถึงตัวตนของคุณ */}
          <div className="floating-badge badge-1" title="Frontend Web">
            <i className="bi bi-code-slash"></i>
          </div>
          <div className="floating-badge badge-2" title="Education">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          <div className="floating-badge badge-3" title="Hardware & IoT">
            <i className="bi bi-cpu-fill"></i>
          </div>

          {/* แกนกลางหลัก */}
          <div className="core-center">
            <i className="bi bi-fingerprint"></i>
          </div>
        </div>

        <h2 className="login-title">
          Welcome to <span>My Space</span>
        </h2>

        {/* Tags บอกความสามารถ */}
        <div className="login-tags">
          <span className="tag-item">Frontend</span>
          <span className="tag-item">Educator</span>
          <span className="tag-item">Hardware</span>
        </div>

        <button
          className="btn-google-modern"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner-pink"></div> Authenticating...
            </>
          ) : (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
              />
              Secure Access with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
