import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const defaultFormData = {
    name: '',
    description: '',
    budget: 0,
    image: null
}
const AddProject = () => {
    const [formData, setFormData] = useState(defaultFormData);
    const { name, description, budget, image } = formData;
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, files} = e.target;
        setFormData(prevFormData => ({...prevFormData, [name]: type === 'file' ? files[0] : value }));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = new FormData();
        data.append('name', name);
        data.append('description', description);
        data.append('budget', budget);
        if(image) {
          data.append('image', image);
        }

        const response = await fetch("http://localhost:8080/projects", {
          method: 'POSt',
          body: data
        })
        if (!response.ok) {
          throw new Error("Failed to save project");
        }
        const returnedData = await response.json();
        if (returnedData) {
          console.log(returnedData.name + " Project added successfully!");
          setTimeout(() =>  navigate("/"), 500);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input type="text" 
            name="name"
            value={name}
            onChange={handleChange}

        />
        <label htmlFor="description"></label>
        <input type="text" 
            name="description"
            value={description}
            onChange={handleChange}

        />
        <label htmlFor="budget"></label>
        <input type="text" 
            name="budget"
            value={budget}
            onChange={handleChange}

        />
        <label htmlFor="image"></label>
        <input 
            type="file" 
            name="image"
            onChange={handleChange}

        />
        <button>Add Project</button>
      </form>
    </div>
  );
};
export default AddProject;
