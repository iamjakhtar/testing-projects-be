import { useState } from "react";

const defaultValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegisterUser = () => {
  const [formData, setFormData] = useState(defaultValues);

  const { name, username, password, confirmPassword} = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
        ...formData,
        [name]: value
    }
    setFormData(updatedFormData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const {confirmPassword, ...registerDto} = formData;
    
    if (!password.match(confirmPassword)) {
      console.log("Password doesn't match");
      return;
    }
    

    try {
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerDto)
        });
        if (!response.ok) {
            throw new Error("Could not register user, an error occured");
        }

        const data = await response.text();
        console.log(data);
        setFormData(defaultValues);
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={name} onChange={handleChange}/>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={username} onChange={handleChange}/>
      <label htmlFor="password">Password</label>
      <input type="text" name="password" value={password} onChange={handleChange}/>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input type="text" name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
      <button>Register</button>
    </form>
  );
};
export default RegisterUser;
