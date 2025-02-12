import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";
import { FavoritesProvider } from "./context/FavoritesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);
