import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProject from "./AddProject";
import App from "./App";
import "./index.css";
import NavBar from "./NavBar";
import Projects from "./Projects";
import reportWebVitals from "./reportWebVitals";
import ProjectDetails from "./ProjectDetails";
import EditProject from "./EditProject";
import { ChakraBaseProvider } from "@chakra-ui/react";
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Projects />,
      },
      {
        path: "add-project",
        element: <AddProject />,
      },
      {
        path: "project-details",
        element: <ProjectDetails />
      },
      {
        path: "edit-project/",
        element: <EditProject />
      },
      {
        path: "register",
        element: <RegisterUser />
      },
      {
        path: "login",
        element: <LoginUser onLogin={() => null }/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <ChakraBaseProvider>
      <App />
    </ChakraBaseProvider>
  </RouterProvider>
);

reportWebVitals();
