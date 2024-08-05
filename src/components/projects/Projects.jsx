import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";
import Project from "./Project";

const fetchProjects = async (url, setData, setLoading, setError) => {
  try {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

const Projects = () => {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects("http://localhost:8080/projects", setProjects, setLoading, setError);
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={2}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return(
      <Box textAlign="center" mt={2}>
        <Heading size="md" color="red.500">{error} projects!</Heading>
      </Box>
    )
  }

  return (
    <Box p={4}>
      {
        // @ts-ignore
       projects && projects.length === 0 ? (
          <Box textAlign="center" m={10}>
            <Text>No projects to display</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
            {projects && projects
              // @ts-ignore
              .map((project) => (
                <Project project={project} key={project.id} />
              ))}
          </SimpleGrid>
        )
      }
    </Box>
  );
};

export default Projects;
