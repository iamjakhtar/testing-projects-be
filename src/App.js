import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import LoginUser from "./LoginUser";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import AddProject from "./AddProject";
import ProjectDetails from "./ProjectDetails";
import EditProject from "./EditProject";
import RegisterUser from "./RegisterUser";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.expiresAt > new Date()) {
      setIsAuthenticated(true);
      setUserName(userDetails.name);
    }
  }, []);

  
  const onLogin = (userDetails) => {
      setIsAuthenticated(true);
      setUserName(userDetails.name);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }

  const onLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("userDetails");
  }


  return (
    <div className="App">
      <NavBar loggedIn={isAuthenticated} name={userName} onLogout={onLogout}/>
        <Routes>
          <Route path="/" element={<Projects />}/>
          <Route path="/add-project" element={<AddProject />}/>
          <Route path="/project-details" element={<ProjectDetails />}/>
          <Route path="/edit-project" element={<EditProject />}/>
          <Route path="/register" element={<RegisterUser />}/>
          <Route path="/login" element={<LoginUser onLogin={onLogin} />}/>
        </Routes>
      <Outlet />    
    </div>
  );
}

export default App;
