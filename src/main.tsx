import ReactDOM from "react-dom/client";
import "./style-reset.scss";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext";
import { ConfirmProvider } from "./contexts/ConfirmContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </UserProvider>
);
