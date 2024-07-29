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
            throw new Error(response.toString());
        }

        const data = await response.json();
        console.log(data);
        
        
        if (data) {
            localStorage.setItem("userDetails", JSON.stringify(data));
            onLogin(data);
            navigate("/");
        }

    } catch (error) {
        console.log(error);
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
