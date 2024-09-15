import React, { useState } from 'react';
import axios from 'axios';
// import 'materialize-css/dist/css/materialize.min.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCourseChange = (e) => {
    const options = e.target.options;
    const selectedCourses = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCourses.push(options[i].value);
      }
    }
    setFormData({ ...formData, course: selectedCourses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data
    for (let key in formData) {
      if (key === 'course') {
        formData.course.forEach((course) => data.append('course[]', course));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/Auth/submit', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="container s12">
      <h4 className="center-align">Employee Registration</h4>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-field">
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="input-field">
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-field">
          <input
            id="mobile"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <label htmlFor="mobile">Mobile</label>
        </div>

        <div className="input-field">
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="browser-default"
          >
            <option value="" disabled>
              Choose designation
            </option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="input-field">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="browser-default"
          >
            <option value="" disabled>
              Choose gender
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="input-field">
          <select   
            name="course"
             value={formData.course}
            onChange={handleCourseChange}
            className="browser-default"
          >
            <option value="" disabled>
              Choose your course
            </option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>

        <div className="file-field input-field">
          <div className="btn">
            <span>Upload Image</span>
            <input type="file" name="image" accept="image/jpeg,image/png" onChange={handleChange} required />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload employee image" />
          </div>
        </div>

        <button type="submit" className="btn waves-effect waves-light">
          Submit
        </button>
      </form>

      {message && <p className="center-align">{message}</p>}
    </div>
  );
};

export default EmployeeForm;
