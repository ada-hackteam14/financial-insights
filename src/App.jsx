
import { BrowserRouter } from "react-router-dom";
import {
  getTotalSpent,
  getBalance,
  getInsights,
  getSpendingByCategory,
} from "./utils/calculations";

getTotalSpent().then((v) => console.log("Total gasto:", v));
getBalance().then((v) => console.log("Saldo:", v));
getSpendingByCategory().then((v) => console.log("Por categoria:", v));
getInsights().then((v) => console.log("Insights:", v));

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Financial Insights</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
