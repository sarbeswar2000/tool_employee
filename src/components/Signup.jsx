import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    f_userName: "",
    f_Pwd: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/Auth/register",
        formData
      );
      setMessage(response.data.message);
      setErrors([]);
      
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div className="container">
      <h4 className="center-align"> Admin Signup</h4>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="f_userName"
            type="text"
            name="f_userName"
            value={formData.f_userName}
            onChange={handleChange}
            required
          />
          <label htmlFor="f_userName">Username</label>
        </div>

        <div className="input-field">
          <input
            id="f_Pwd"
            type="password"
            name="f_Pwd"
            value={formData.f_Pwd}
            onChange={handleChange}
            required
          />
          <label htmlFor="f_Pwd">Password</label>
        </div>

        <button type="submit" className="btn waves-effect waves-light">
          Signup
        </button>
      </form>
      <div>
        {" "}
        <p>
          <Link to="/Login">Already have an Admin Account ?</Link>
        </p>
      </div>
      {/* Display validation errors */}
      {errors.length > 0 && (
        <ul className="red-text">
          {errors.map((error, index) => (
            <li key={index}>{error.msg}</li>
          ))}
        </ul>
      )}

      {/* Display message */}
      {message && <p className="green-text center-align">{message}</p>}
    </div>
  );
};

export default Signup;
