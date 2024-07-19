import React from "react";
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
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
