import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  getTotalSpent,
  getBalance,
  getInsights,
  getSpendingByCategory,
} from "./utils/calculations";

console.log("Total gasto:", getTotalSpent());
console.log("Saldo:", getBalance());
console.log("Por categoria:", getSpendingByCategory());
console.log("Insights:", getInsights());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
