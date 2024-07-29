import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AddProject from "./AddProject";
// import NavBar from "./NavBar";
// import Projects from "./Projects";
// import ProjectDetails from "./ProjectDetails";
// import EditProject from "./EditProject";
// import RegisterUser from "./RegisterUser";
// import LoginUser from "./LoginUser";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <NavBar />,
//     children: [
//       {
//         path: "/",
//         element: <Projects />,
//       },
//       {
//         path: "add-project",
//         element: <AddProject />,
//       },
//       {
//         path: "project-details",
//         element: <ProjectDetails />
//       },
//       {
//         path: "edit-project/",
//         element: <EditProject />
//       },
//       {
//         path: "register",
//         element: <RegisterUser />
//       },
//       {
//         path: "login",
//         element: <LoginUser onLogin={() => null }/>
//       }
//     ],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  // <RouterProvider router={router}>
    <BrowserRouter>
      <ChakraBaseProvider>
        <App />
      </ChakraBaseProvider>
    </BrowserRouter>
  // </RouterProvider>
);

reportWebVitals();
