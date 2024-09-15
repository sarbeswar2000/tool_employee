import CreateEmployee from "./components/CreateEmployee";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import logo from "./logo.svg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/Signup" element={<Signup></Signup>} />
          <Route path="/Login" element={<Login></Login>} />
          <Route path="/EmployeeForm" element={<EmployeeForm></EmployeeForm>} />
          <Route path="/CreateEmployee"element={<CreateEmployee></CreateEmployee>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
