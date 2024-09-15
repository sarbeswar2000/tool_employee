import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowEmployee = () => {
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    // Fetch employees from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Auth/getEmployees");
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Delete employee using database id
  const handleDelete = async (idd) => {
    try {
      // Make DELETE request to the API
      const response = await axios.delete(`http://localhost:5000/Auth/deleteEmployee/${idd}`);
      if (response.data.success) {
        setMessage("Employee deleted successfully.");
        // Remove the deleted employee from state
        setEmployees(employees.filter(employee => employee._id !== idd));
      } else {
        setMessage("Employee not found.");
      }
    } catch (error) {
      setMessage("Server error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h4>Employee List</h4>

      <div className="row">
        <div className="col s6">
          <h6>Total Count: {filteredEmployees.length}</h6>
        </div>
        <div className="col s6 right-align">
          <Link to="/EmployeeForm" className="btn waves-effect waves-light">
            Create Employee
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="input-field col s6">
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={searchKeyword}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="striped">
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${employee.image}`}
                  alt={`${employee.name}'s Image`}
                  width="50"
                  height="50"
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(", ")}</td>
              <td>{formatDate(employee.date)}</td>
              <td>
                <Link
                  to={`/EditEmployee/${employee._id}`}
                  className="btn-small"
                >
                  Edit
                </Link>

                <button
                  className="btn-small red"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ShowEmployee;
