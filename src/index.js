import { ChakraBaseProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";



createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <ChakraBaseProvider>
        <App />
      </ChakraBaseProvider>
    </BrowserRouter>
 
);

reportWebVitals();
