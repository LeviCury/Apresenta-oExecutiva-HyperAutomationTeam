import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExecutiveDeck from "./ExecutiveDeck";
import "./tailwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExecutiveDeck />
  </StrictMode>,
);
