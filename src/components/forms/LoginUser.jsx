import { LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import { inputStyles } from "../common/styles/inputStyles";

const defaultValues = {
  username: "",
  password: "",
};

const LoginUser = ({ onLogin }) => {
  const [formData, setFormData] = useState(defaultValues);
  const navigate = useNavigate();
  const toast = useToast();

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
        throw new Error("Failed to login");
      }

      const data = await response.json();
      localStorage.setItem("userDetails", JSON.stringify(data));
      onLogin(data);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
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
    </VStack>
  );
};

export default LoginUser;
