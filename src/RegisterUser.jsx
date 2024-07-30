import { useState } from "react";
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
import { EditIcon } from "@chakra-ui/icons";

const defaultValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegisterUser = () => {
  const [formData, setFormData] = useState(defaultValues);
  const toast = useToast();

  const { name, username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...registerDto } = formData;

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDto),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.text();
      toast({
        title: "Registration Successful",
        description: "You have registered successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData(defaultValues);
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
      <Heading size="lg" mb={4} color="teal.600" fontWeight="bold" fontSize={24}>
        Register
      </Heading>
      <Box as="form" width="100%" onSubmit={handleRegister}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired width="100%">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
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

          <FormControl id="confirmPassword" isRequired width="100%">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
            leftIcon={<EditIcon />}
            p={2}
          >
            Register
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default RegisterUser;
