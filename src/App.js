import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import LoginUser from "./components/forms/LoginUser";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Projects from "./components/projects/Projects";
import AddProject from "./components/projects/AddProject";
import ProjectDetails from "./components/projects/ProjectDetails";
import EditProject from "./components/projects/EditProject";
import RegisterUser from "./components/forms/RegisterUser";
import { Box } from "@chakra-ui/react";
import Footer from "./components/layout/Footer";

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
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("userDetails");
  };

  return (
    <Box className="App" bg="gray.100" minH="100vh" p={4}>
      <NavBar loggedIn={isAuthenticated} name={userName} onLogout={onLogout} />
      <Box p={4} mb={12}>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/edit-project" element={<EditProject />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser onLogin={onLogin} />} />
        </Routes>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
