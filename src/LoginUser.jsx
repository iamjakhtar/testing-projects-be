import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  username: "",
  password: "",
};

const LoginUser = ({ onLogin }) => {
  const [formData, setFormData] = useState(defaultValues);
  const navigate = useNavigate();

  const { username, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch("http://localhost:8080/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error("Could not login, some error occured");
        }

        const token = response.headers.get("Authorization").split(" ")[1];
        
        if (token) {
            localStorage.setItem("authToken", token);
            onLogin();
            navigate("/");
        }

    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} >
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={username} onChange={handleChange} required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={password} onChange={handleChange} required />
      <button>Login</button>
    </form>
  );
};
export default LoginUser;
