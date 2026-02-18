import { NavLink } from "react-router-dom";
import "./Navbar.css"; // เปลี่ยนจาก import "../Student.css"

function Navbar() {
  return (
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
    </nav>
  );
}

export default Navbar;
