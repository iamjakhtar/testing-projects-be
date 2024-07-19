import { Link } from "react-router-dom";
import { formatImageUrl } from "./imagePathFormatter";

const Project = ({ project }) => {
  const imagePath = formatImageUrl(project.imageUrl);
  return (
    <div key={project.id} className="project">
      <h2 className="project-name">{project.name}</h2>
      <p className="project-description">{project.description}</p>
      <p className="project-budget">{project.budget}</p>
      <img src={imagePath} alt={project.name} className="project-image" />
      <Link to="/project-details" state={{ project }} className="button">
        Details
      </Link>
    </div>
  );
};
export default Project;
