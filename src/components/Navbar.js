import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Mewwi from "../img/mewwi.jpeg";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้จาก Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ฟังก์ชันดึงชื่อแรก (First Name) มาทักทายใน Modal
  const getFirstName = () => {
    if (!user) return "";
    const fullName =
      user.email === "pongsakornx15@gmail.com"
        ? "Pongsakorn Srisaket"
        : user.displayName;
    return fullName ? fullName.split(" ")[0] : "Guest";
  };

  // ชื่อเต็มสำหรับโชว์ใน Dropdown
  const displayNameFull =
    user?.email === "pongsakornx15@gmail.com"
      ? "Pongsakorn Srisaket"
      : user?.displayName;

  // กด Logout จาก Dropdown ให้เปิด Modal
  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  // ยืนยันการออกระบบจริงๆ
  const executeLogout = () => {
    signOut(auth).then(() => {
      setShowLogoutModal(false);
      navigate("/login");
    });
  };

  return (
    <>
      <nav className="navbar-floating">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item-modern active" : "nav-item-modern"
          }
        >
          <i className="bi bi-person-badge"></i> <span>Profile</span>
        </NavLink>

        <NavLink
          to="/education"
          className={({ isActive }) =>
            isActive ? "nav-item-modern active" : "nav-item-modern"
          }
        >
          <i className="bi bi-mortarboard"></i> <span>Education</span>
        </NavLink>

        <NavLink
          to="/activity"
          className={({ isActive }) =>
            isActive ? "nav-item-modern active" : "nav-item-modern"
          }
        >
          <i className="bi bi-stars"></i> <span>Activity</span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "nav-item-modern active" : "nav-item-modern"
          }
        >
          <i className="bi bi-envelope-paper"></i> <span>Contact</span>
        </NavLink>

        <NavLink
          to="/tct-form"
          className={({ isActive }) =>
            isActive ? "nav-item-modern active" : "nav-item-modern"
          }
        >
          <i className="bi bi-ui-checks"></i> <span>TCT Form</span>
        </NavLink>

        {/* --- ส่วนโปรไฟล์และ Logout แบบ Dropdown --- */}
        {user && (
          <div className="nav-profile-wrapper">
            <img
              src={user.photoURL || Mewwi}
              alt="Profile"
              className="nav-avatar"
              onClick={() => setShowDropdown(!showDropdown)}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              }}
            />

            {showDropdown && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-info">
                  <strong>{displayNameFull}</strong>
                  <span>{user.email}</span>
                </div>
                <hr className="nav-dropdown-divider" />
                <button
                  className="nav-dropdown-logout"
                  onClick={handleLogoutClick}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* --- ✨ Super Cool Logout Modal --- */}
      {showLogoutModal && (
        <div className="cyber-modal-overlay">
          <div className="cyber-modal-card">
            {/* เอฟเฟกต์แสงหมุนด้านหลัง */}
            <div className="cyber-modal-glow"></div>

            <div className="cyber-modal-content">
              <div className="cyber-modal-icon">
                <i className="bi bi-power"></i>
              </div>

              <h3 className="cyber-modal-title">System Disconnect</h3>

              <p className="cyber-modal-text">
                Are you sure you want to end this session, <br />
                <strong className="cyber-username">{getFirstName()}</strong>?
              </p>

              <div className="cyber-modal-actions">
                <button
                  className="btn-cyber-cancel"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Stay Connected
                </button>
                <button className="btn-cyber-confirm" onClick={executeLogout}>
                  <i className="bi bi-box-arrow-right"></i> Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
