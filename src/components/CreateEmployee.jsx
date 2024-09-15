import React from "react";
import { useNavigate } from "react-router-dom";
const CreateEmployee = () => {
    const navigate = useNavigate();
  const buttnHandler = async () => {
    alert("you are redirected to creating an employee");
    navigate("/EmployeeForm");
  };
  return (
    <div className="container center-allign">
      <a class="waves-effect waves-light btn-small" onClick={buttnHandler}>
        Create Employee{" "}
      </a>
    </div>
  );
};

export default CreateEmployee;
