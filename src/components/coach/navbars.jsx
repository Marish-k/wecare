import React from "react";
import { Link } from "react-router-dom";

function Navbars({ coachHome, onTabChange }) {
  
  return (
    <nav>
      <div className="navbar">
        <Link style={{ textDecoration: "none" }} to="/">
          <h3>WeCare</h3>
        </Link>
        <div className="nav-links">
          {coachHome && (
            <>
              <Link
                to="#"
                className="nav-link"
                onClick={() => onTabChange("schedules")}
              >
                My Schedules
              </Link>
              <Link
                to="#"
                className="nav-link"
                onClick={() => onTabChange("profile")}
              >
                View Profile
              </Link>
            </>
          )}
          <Link to="#" className="nav-link">
            call us on 90876543211
          </Link>
          {coachHome && (
                    <div className="nav-links">
                      <Link className="nav-link" to='/'>
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