import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { inputStyles } from "../../assets/styles/inputStyles";
import FormInput from "../common/FormInput";
import ToastNotification from "../common/ToastNotification";

const defaultValues = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegisterUser = () => {
  const [formData, setFormData] = useState(defaultValues);
  const [toastData, setToastData] = useState(null);

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
      setToastData({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
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
      setToastData({
        title: "Success",
        description: data,
        status: "success",
      });
      setFormData(defaultValues);
    } catch (error) {
      setToastData({
        title: "Error",
        description: error.message,
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
            type="password"
            label="Password"
            name="password"
            value={password}
            placeholder="Enter your password"
            handleChange={handleChange}
            shadow="md"
            styles={inputStyles}
          />

          <FormInput
            id="confirmPassword"
            type="password"
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
            width="50%"
            borderRadius={50}
            leftIcon={<EditIcon />}
            p={2}
          >
            Register
          </Button>
        </VStack>
      </Box>
      { toastData && <ToastNotification {...toastData} />}
    </VStack>
  );
};

export default RegisterUser;
