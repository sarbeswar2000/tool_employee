import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: ""
  });

  useEffect(() => {
    // Fetch employee details by ID to pre-fill the form
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Auth/getEmployee/${id}`);
        setFormData(response.data.employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/Auth/editEmployee/${id}`, formData);
      navigate("/ShowEmployee"); // Redirect after successful edit
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container">
      <h4>Edit Employee</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label className="active" htmlFor="name">Name</label>
        </div>

        <div className="input-field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="active" htmlFor="email">Email</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <label className="active" htmlFor="mobile">Mobile</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
          <label className="active" htmlFor="designation">Designation</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
          <label className="active" htmlFor="gender">Gender</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
          <label className="active" htmlFor="course">Course</label>
        </div>

        <button type="submit" className="btn waves-effect waves-light">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
