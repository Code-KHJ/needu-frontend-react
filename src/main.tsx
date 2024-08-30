import ReactDOM from "react-dom/client";
import "./style-reset.scss";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext";
import { ConfirmProvider } from "./contexts/ConfirmContext.tsx";
import { LoadingProvider } from "./contexts/LoadingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfirmProvider>
    <LoadingProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoadingProvider>
  </ConfirmProvider>
);
