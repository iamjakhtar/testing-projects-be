import { useState, useEffect } from "react";
import Project from "./Project";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import Spinner from "./Spinner";

const fetchProjects = async (url, setterFunc) => {
  const res = await fetch(url);
  const data = await res.json();
  setterFunc(data);
};

const Projects = () => {
  const [projects, setProjects] = useState();

  useEffect(() => {
    fetchProjects("http://localhost:8080/projects", setProjects);
  }, []);

  if (!projects) {
    return (
      <Box textAlign="center" mt={2}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={4}>
      {projects.
// @ts-ignore
      length === 0 ? (
        <Box textAlign="center" m={10}>
          <Text>No projects to display</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
          {projects.
// @ts-ignore
          map((project) => (
            <Project project={project} key={project.id} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Projects;
