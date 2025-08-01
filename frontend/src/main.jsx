import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/common.css";
import "./styles/header.css";
import "./styles/main.css";
import "./styles/footer.css";

import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// dashboard should include all current user workspace, account management, resource / workspace history and saved resources.

// header should include a search bar instead of Articles link.