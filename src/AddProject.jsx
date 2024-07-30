import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useToast,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, CheckCircleIcon, InfoOutlineIcon } from "@chakra-ui/icons";

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
  const navigate = useNavigate();
  const toast = useToast();

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
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!authToken) {
        throw new Error("Your token has expired, please login again")
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
          "Authorization": "Bearer " + authToken
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const returnedData = await response.json();
      if (returnedData) {
        toast({
          position: "bottom-left",
          render: () => (
            <Box color={"white"} bg="green.500" p={2}>
              <Heading size="m" color="white">
                {" "}
                <CheckCircleIcon mr={2} mt={-1} color="green.500" />
                Success
              </Heading>
              <Text>{`${returnedData.name} Project added successfully`}</Text>
            </Box>
          ),
          isClosable: true,
          duration: 4000,
        });
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      toast({
        position: "bottom-left",
        render: () => (
          <Box color={"white"} bg="red.500" p={2}>
            <Heading size="m">
              {" "}
              <InfoOutlineIcon mr={2} mt={-1}/>
              Error {error.message}
            </Heading>
            <Text>Failed to add project</Text>
          </Box>
        ),
        isClosable: true,
        duration: 4000,
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
    >
      <Heading size="lg" mb={4} color="teal.600">
        Add New Project
      </Heading>
      <Box as="form" width="100%" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name" isRequired boxShadow="md">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter project name"
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

          <FormControl id="description" isRequired boxShadow="md">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter project description"
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

          <FormControl id="budget" isRequired boxShadow="md">
            <FormLabel>Budget</FormLabel>
            <Input
              type="number"
              name="budget"
              value={budget}
              onChange={handleChange}
              placeholder="Enter project budget"
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

          <FormControl id="image" boxShadow="md">
            <FormLabel>Upload Image</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
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
    </VStack>
  );
};

export default AddProject;
