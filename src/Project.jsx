import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Project = ({ project }) => {
  
  return (
    <Box boxShadow="outline" p="6" rounded="md" bg="white">
      <Flex key={project.id} maxW="sm" direction="column">
        <h2 className="project-name">{project.name}</h2>
        <p className="project-description">{project.description}</p>
        <p className="project-budget">{project.budget}</p>
        <Image
          src={project.imageUrl}
          alt={project.name}
          objectFit="cover"
          boxSize="280px"
        />
       
          <Link to="/project-details" state={{ project }} className="button">
            Details
          </Link>
         
      </Flex>
    </Box>
  );
};
export default Project;
