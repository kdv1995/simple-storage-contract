import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Web3ContextProvider } from "./context/Web3ProviderContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </React.StrictMode>
);
