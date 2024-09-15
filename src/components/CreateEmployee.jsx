import React from "react";
import { useNavigate } from "react-router-dom";
import ShowEmployee from "./ShowEmployee";
const CreateEmployee = () => {
  const navigate = useNavigate();
 
  return (
    <>
      <ShowEmployee></ShowEmployee>
    </>
  );
};

export default CreateEmployee;
