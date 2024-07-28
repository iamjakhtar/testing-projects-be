import { useState, useEffect } from "react";
import Project from "./Project";
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
      return <div>Loading...</div>;
    } else {
      console.log(projects);
    }

  return (
    <div className="projects-container">
      {!projects.length && <div>No projects to display</div>}
      {projects.map((project) => (
        <Project project={project} key={project.id}/>
      ))}
    </div>
  );
}
export default Projects