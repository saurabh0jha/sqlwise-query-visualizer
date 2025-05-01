import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueriesProvider } from "./store/queryProvider";

import "./main.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueriesProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/query/:queryId" element={<App />} />
        </Routes>
      </QueriesProvider>
    </BrowserRouter>
  </StrictMode>
);
