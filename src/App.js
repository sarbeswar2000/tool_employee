import { useState } from "react";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import logo from "./logo.svg";
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowEmployee from "./components/ShowEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  const [userName,setUserName]=useState("");
  useEffect(()=>
    {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    })
  return (
    <>
      <Router>
        <Navbar userName={userName} setUserName={setUserName}></Navbar>
        <Routes>
        <Route path="/" element={<Signup></Signup>} />
          <Route path="/Signup" element={<Signup></Signup>} />
          <Route path="/Login" element={<Login setUserName={setUserName}></Login>} />
          <Route path="/EmployeeForm" element={<EmployeeForm></EmployeeForm>} />
          <Route path="/CreateEmployee"element={<CreateEmployee></CreateEmployee>}></Route>
          <Route path="/EditEmployee/:id" element={<EditEmployee />} />
          <Route path="/ShowEmployee"element={<ShowEmployee></ShowEmployee>}></Route>
        </Routes>
       
      </Router>
    </>
  );
}

export default App;
