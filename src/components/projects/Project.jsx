import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils/truncateString";

const Project = ({ project }) => {
  return (
    <Box
      boxShadow="md"
      p="6"
      rounded="lg"
      bg="white"
      maxW="sm"
      borderWidth="1px"
      overflow="hidden"
      borderRadius="lg"
    >
      <Image
        src={project.imageUrl}
        alt={project.name}
        objectFit="cover"
        h={217}
        w={327}
        mb={4}
        borderRadius="md"
      />
      <Flex direction="column" p={2}>
        <Heading as="h2" size="md" mb={2} color="teal.600">
          {project.name}
        </Heading>
        <Text mb={2} color="gray.600">
          {truncateString(project.description, 40)}
        </Text>
        <Text mb={4} fontWeight="bold" color="teal.800">
          Budget: ${project.budget}
        </Text>
        <Button
          as={Link}
          to="/project-details"
          state={{ project }}
          colorScheme="teal"
          size="sm"
          bg="teal.500"
          color="white"
          px={4}
          py={2}
          textTransform="uppercase"
          rightIcon={<InfoOutlineIcon />}
          _hover={{ bg: "teal.600" }}
        >
          Details
        </Button>
      </Flex>
    </Box>
  );
};

export default Project;
