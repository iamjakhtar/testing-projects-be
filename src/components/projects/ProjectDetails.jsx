import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import ToastNotification from "../common/ToastNotification";

const ProjectDetails = () => {
  const {
    state: { project },
  } = useLocation();
  const navigate = useNavigate();
  const imagePath = project.imageUrl;
  const [toastData, setToastData] = useState(null);

  const handleDelete = async (id) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (!userDetails) {
        throw new Error("Unauthorized");
      }
      const response = await fetch("http://localhost:8080/projects/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userDetails.token,
        },
      });
      if (!response.ok) {
        throw new Error("Could not delete the project with id: " + id);
      }
      const data = await response.text();
      console.log(data);
      return navigate("/");
    } catch (error) {
      setToastData({
        title: "Error",
        description: "Failed to fetch project!",
        status: "error"
      });
    }
  };

  if (!project) {
    return <Spinner />;
  }

  return (
    <Box
      bg="white"
      p={8}
      rounded="md"
      boxShadow="md"
      maxW="4xl"
      mx="auto"
      mt={8}
    >
      <Flex direction={{ base: "column", md: "row" }} alignItems="center">
        <Image
          src={imagePath}
          alt={project.name}
          boxSize={{ base: "100%", md: "300px" }}
          objectFit="cover"
          border="1px"
          borderColor="gray.300"
          rounded="md"
          mb={{ base: 4, md: 0 }}
          mr={{ md: 8 }}
        />
        <Flex direction="column" flex="1">
          <Heading as="h1" size="lg" mb={4}>
            {project.name}
          </Heading>
          <Text mb={4}>{project.description}</Text>
          <Text fontWeight="bold" color="teal.600" mb={4}>
            Budget: ${project.budget}
          </Text>
          <Flex mt={4}>
            <Button
              bg="teal.400"
              color="white"
              _hover={{ bg: "teal.500" }}
              size="sm"
              mr={4}
              leftIcon={<EditIcon />}
              onClick={() =>
                navigate("/edit-project", { state: { id: project.id } })
              }
              padding={"10px"}
            >
              Update
            </Button>
            <Button
              bg="red.500"
              color="white"
              _hover={{ bg: "red.300" }}
              size="sm"
              leftIcon={<DeleteIcon />}
              onClick={() => handleDelete(project.id)}
              padding={"10px 15px"}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>
      { toastData && <ToastNotification {...toastData}/> }
    </Box>
  );
};

export default ProjectDetails;
