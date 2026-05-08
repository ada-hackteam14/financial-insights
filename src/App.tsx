import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
