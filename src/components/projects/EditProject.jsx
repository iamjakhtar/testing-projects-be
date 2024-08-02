import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { defaultFormData } from "./AddProject";

const fetchProjectById = async (id, setterFunc) => {
  try {
    const response = await fetch("http://localhost:8080/projects/" + id);
    if (!response.ok) {
      throw new Error("Project not found from client");
    }
    const project = await response.json();
    setterFunc(project);
  } catch (e) {
    console.log(e.message);
  }
};

const EditProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
  const { id } = state || {};
  const [projectToEdit, setProjectToEdit] = useState(defaultFormData);
  const [authToken, setAuthToken] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (id) {
      fetchProjectById(id, setProjectToEdit);
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      setAuthToken(userDetails.token);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProjectToEdit((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", id);
    data.append("name", projectToEdit.name);
    data.append("description", projectToEdit.description);
    data.append("budget", projectToEdit.budget.toString());

    if (projectToEdit.image && projectToEdit.image instanceof File) {
      data.append("image", projectToEdit.image);
    }

    try {
      if (!authToken) {
        throw new Error("403 forbidden");
      }
      const response = await fetch("http://localhost:8080/projects/" + id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authToken,
        },
        body: data,
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to update project");
        toast({
          title: "Error",
          description: "Failed to update project.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        position: "bottom-left",
        render: () => (
          <Box color={"white"} bg="red.500" p={2}>
            <Heading size="m">
              {" "}
              <InfoOutlineIcon mr={2} mt={-1} />
              Error {error.message}
            </Heading>
            <Text>Failed to update project</Text>
          </Box>
        ),
        isClosable: true,
        duration: 4000,
      });
    }
  };

  if (!projectToEdit) {
    return <Heading>Loading...</Heading>;
  }

  const { name, description, budget } = projectToEdit;
  const imagePath = projectToEdit ? projectToEdit.imageUrl : "";

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.100"
      p={4}
    >
      <Box width="80%" bg="white" boxShadow="md" borderRadius="md" p={8} mt={8}>
        <Heading
          size="lg"
          mb={6}
          color="teal.600"
          textAlign="center"
          fontSize={24}
          fontWeight="bold"
        >
          Edit Project
        </Heading>
        <Flex
          as="form"
          onSubmit={handleEdit}
          direction={{ base: "column", md: "row" }}
          gap={6}
        >
          <VStack spacing={4} flex="1">
            <FormControl
              id="id"
              width="100%"
              border="1px"
              borderColor="gray.100"
              _hover={{ borderColor: "gray.100" }}
            >
              <FormLabel>Project ID</FormLabel>
              <Input type="text" name="id" value={id} disabled />
            </FormControl>

            <FormControl
              id="name"
              isRequired
              width="100%"
              border="1px"
              borderColor="gray.100"
              _hover={{ borderColor: "teal.500" }}
            >
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter project name"
                bg="white"
                p={4}
                width="100%"
                outline={0}
              />
            </FormControl>

            <FormControl
              id="description"
              isRequired
              width="100%"
              height="47%"
              border="1px"
              borderColor="gray.100"
              _hover={{ borderColor: "teal.500" }}
            >
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Enter project description"
                bg="white"
                p={4}
                width="100%"
                outline={0}
              />
            </FormControl>

            <FormControl
              id="budget"
              isRequired
              width="100%"
              border="1px"
              borderColor="gray.100"
              _hover={{ borderColor: "teal.500" }}
            >
              <FormLabel>Budget</FormLabel>
              <Input
                type="number"
                name="budget"
                value={budget}
                onChange={handleChange}
                placeholder="Enter project budget"
                bg="white"
                p={4}
                width="100%"
                outline={0}
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
              leftIcon={<CheckIcon />}
              p={2}
            >
              Save
            </Button>
          </VStack>

          <VStack spacing={4} flex="1">
            <FormControl
              id="image"
              width="100%"
              border="1px"
              borderColor="gray.100"
              _hover={{ borderColor: "teal.500" }}
            >
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                bg="white"
                p={4}
                width="100%"
                outline={0}
              />
            </FormControl>

            {projectToEdit.imageUrl && (
              <Box>
                <Image src={imagePath} alt={name} borderRadius="md" />
              </Box>
            )}
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditProject;
