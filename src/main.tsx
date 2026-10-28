import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const mountNode = document.getElementById("root");

if (!mountNode) {
  throw new Error("Could not find the app mount point.");
}

createRoot(mountNode).render(<App />);
