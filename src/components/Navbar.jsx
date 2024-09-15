import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = ({ userName, setUserName }) => {
  const user = localStorage.getItem("userName");
  const navigate = useNavigate();
  const handleOnclick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/CreateEmployee");
    } else {
      alert("You must be logged in to access the employee page");
      navigate("/Login");
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/Login");
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ShowEmployee" onClick={handleOnclick}>
                Employee List
              </Link>
            </li>
            <li>
              <a href="collapsible.html"></a>
            </li>
          </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {userName ? (
              <>
                <li>
                  <span style={{ color: "black" }}>Hello, {userName}!</span>
                </li>
                <li>
                  <a
                    className="waves-effect waves-light btn-small"
                    onClick={logoutHandler}
                  >
                    LogOut
                  </a>
                </li>
              </>
            ) : (
              <>
                <Link
                  className="waves-effect waves-light btn-small"
                  to="/Login"
                >
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
