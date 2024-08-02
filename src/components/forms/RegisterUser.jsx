import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import FormInput from "../common/FormInput";
import { inputStyles } from "../common/styles/inputStyles";

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
        description: data,
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
      <Heading
        size="lg"
        mb={4}
        color="teal.600"
        fontWeight="bold"
        fontSize={24}
      >
        Register
      </Heading>
      <Box as="form" width="100%" onSubmit={handleRegister}>
        <VStack spacing={4}>
          <FormInput
            id="name"
            isRequired
            label="Name"
            name="name"
            value={name}
            placeholder="Enter your name"
            handleChange={handleChange}
            shadow="md"
            styles={inputStyles}
          />

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

          <FormInput
            id="password"
            isRequired
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Re-enter your password"
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
