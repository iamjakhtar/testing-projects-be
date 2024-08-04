import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Stack,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import { inputStyles } from "../common/styles/inputStyles";
import ToastNotification from "../common/ToastNotification";

export const defaultFormData = {
  name: "",
  description: "",
  budget: 0,
  image: null,
};

const AddProject = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [authToken, setAuthToken] = useState("");
  const { name, description, budget, image } = formData;
  const [toastData, setToastData] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      setAuthToken(userDetails.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!authToken) {
        throw new Error("Your token has expired, please login again");
      }
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("budget", budget.toString());
      if (image) {
        data.append("image", image);
      }

      const response = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const returnedData = await response.json();
      if (returnedData) {
        setToastData({
          title: "Success",
          description: `${returnedData.name} project added successfully`,
          status: "success"
        });
        
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      
      setToastData({
        title: "Error",
        description: `${error.message}: failed to add project.`,
        status: "error"
      })
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
    >
      <Heading size="lg" mb={4} color="teal.600">
        Add New Project
      </Heading>
      <Box as="form" width="100%" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormInput
            id="name"
            label="Name"
            name="name"
            value={name}
            handleChange={handleChange}
            placeholder="Enter project name"
            isRequired
            shadow="md"
            width="100%"
            styles={inputStyles}
          />

          <FormInput
            id="description"
            isRequired
            label="Description"
            name="description"
            value={description}
            placeholder="Enter project description"
            handleChange={handleChange}
            textArea
            shadow="md"
            styles={inputStyles}
          />

          <FormInput
            id="number"
            type="number"
            label="Budget"
            name="budget"
            isRequired
            value={budget}
            placeholder="Enter project budget"
            handleChange={handleChange}
            shadow="md"
            styles={inputStyles}
          />

          <FormInput
            id="image"
            type="file"
            label="Upload Image"
            isRequired
            name="image"
            handleChange={handleChange}
            shadow="md"
            styles={inputStyles}
          />

          <Button
            type="submit"
            colorScheme="teal"
            rightIcon={<AddIcon />}
            mt={4}
            size="lg"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            width="100%"
            p={2}
          >
            Add Project
          </Button>
        </Stack>
      </Box>
      { toastData && <ToastNotification {...toastData} />}
    </VStack>
  );
};

export default AddProject;
