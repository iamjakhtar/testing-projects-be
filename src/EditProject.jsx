import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatImageUrl } from "./imagePathFormatter";
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

  useEffect(() => {
    if (id) {
      fetchProjectById(id, setProjectToEdit);
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
    data.append("budget", projectToEdit.budget);

    if (projectToEdit.image && projectToEdit.image instanceof File) {
      data.append("image", projectToEdit.image);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/projects/" + id,
        {
          method: "PUT",
          body: data,
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to update project");
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  };

  if (!projectToEdit) {
    return <h1>Loading...</h1>;
  }

  const { name, description, budget } = projectToEdit;
  const imagePath = projectToEdit ? formatImageUrl(projectToEdit.imageUrl) : "";
  return (
    <div>
      <form onSubmit={handleEdit}>
        <input type="text" name="id" value={id} readOnly />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />

        <label htmlFor="budget">Budget</label>
        <input
          type="number"
          name="budget"
          value={budget}
          onChange={handleChange}
        />

        <label htmlFor="image">Image</label>
        <input type="file" name="image" onChange={handleChange} />
        {projectToEdit.imageUrl && <img src={imagePath} alt={name} />}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProject;
