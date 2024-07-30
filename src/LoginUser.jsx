import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

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
      <Heading size="lg" mb={4} color="teal.600" fontSize={24} fontWeight="bold">
        Login
      </Heading>
      <Box as="form" width="100%" onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired width="100%">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: "teal.500" }}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              p={4}
              width="100%"
            />
          </FormControl>

          <FormControl id="password" isRequired width="100%">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: "teal.500" }}
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
              p={4}
              width="100%"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            width="100%"
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
