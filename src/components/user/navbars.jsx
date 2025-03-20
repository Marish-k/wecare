import React from "react";
import { Link } from "react-router-dom";

function Navbars({ userHome, onTabChange }) {
  return (
    <nav>
      <div className="navbar">
        <Link style={{ textDecoration: "none" }} to="/weCare">
          <h3>WeCare</h3>
        </Link>
        <div className="nav-links">
          {userHome && (
            <>
              <Link
                to="#"
                className="nav-link"
                onClick={() => onTabChange("coaches")}
              >
                Coaches
              </Link>
              <Link
                to="#"
                className="nav-link"
                onClick={() => onTabChange("profile")}
              >
                View Profile
              </Link>
              <Link
                to="#"
                className="nav-link"
                onClick={() => onTabChange("appointments")}
              >
                My Appointments
              </Link>
            </>
          )}
          <Link to="#" className="nav-link">
            call us on 90876543211
          </Link>
          {userHome && (
                    <div className="nav-links">
                      <Link className="nav-link" to='/weCare'>
                        Logout
                      </Link>
                      </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbars;
