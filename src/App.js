import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import LoginUser from "./LoginUser";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const onLogin = () => {
    setIsAuthenticated(true);
  }

  const onLogout = () => {
    setIsAuthenticated(false);
  }


  return (
    <div className="App">
      <NavBar />
      <LoginUser onLogin={onLogin} />
    </div>
  );
}

export default App;
