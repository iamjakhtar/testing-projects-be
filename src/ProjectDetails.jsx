import { useLocation, useNavigate } from "react-router-dom";
import { formatImageUrl } from "./imagePathFormatter";

const ProjectDetails = () => {
  const { state } = useLocation();
  const { project } = state;
  const navigate = useNavigate();
  const imagePath = formatImageUrl(project.imageUrl);
  const handleDelete = async (id) => {
    try {
        const response = await fetch("http://localhost:8080/projects/" + id, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Could not delete the project with id: " + id);
        }
        const data = await response.text();
        console.log(data);
        return navigate("/");
    } catch (e) {
        console.log(e.message);
    }
  }
  return (
    <div className="project-details-container">
      <div className="project-details">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <p>{project.budget}</p>
        <button
          onClick={() =>
            navigate("/edit-project", { state: { id: project.id } })
          }
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(project.id)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
      <div className="project-image">
        <img src={imagePath} alt={`${project.name}`} />
      </div>
    </div>
  );
};
export default ProjectDetails;
