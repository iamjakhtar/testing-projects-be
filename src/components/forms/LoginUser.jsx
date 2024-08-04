import { LockIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputStyles } from "../../assets/styles/inputStyles";
import FormInput from "../common/FormInput";
import ToastNotification from "../common/ToastNotification";

const defaultValues = {
  username: "",
  password: "",
};

const LoginUser = ({ onLogin }) => {
  const [formData, setFormData] = useState(defaultValues);
  const navigate = useNavigate();
  const [toastData, setToastData] = useState(null);

  const { username, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw response;
      }

      const data = await response.json();
      localStorage.setItem("userDetails", JSON.stringify(data));
      onLogin(data);
      setToastData({
        title: "Success",
        description: "You have logged in successfully.",
        status: "success"
      })
      navigate("/");
    } catch (error) {
      setToastData({
        title: "Error",
        description: error,
        status: "error",
      });
    }
  };

  return (
    <VStack
      spacing={6}
      p={6}
      mx="auto"
      maxW="md"
      bg="gray.50"
      boxShadow="md"
      borderRadius="md"
      mt={8}
    >
      <Heading
        size="lg"
        mb={4}
        color="teal.600"
        fontSize={24}
        fontWeight="bold"
      >
        Login
      </Heading>
      <Box as="form" width="100%" onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormInput
            id="username"
            isRequired
            label="Username"
            name="username"
            value={username}
            placeholder="Enter your username"
            handleChange={handleChange}
            shadow="md"
            styles={inputStyles}
          />

          <FormInput
            id="password"
            type="password"
            isRequired
            label="Password"
            name="password"
            value={password}
            placeholder="Enter your password"
            handleChange={handleChange}
            shadow="md"
            styles={inputStyles}
          />

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            width="50%"
            borderRadius={50}
            leftIcon={<LockIcon />}
            p={2}
          >
            Login
          </Button>
        </VStack>
      </Box>
      { toastData && <ToastNotification {...toastData} />}
    </VStack>
  );
};

export default LoginUser;
