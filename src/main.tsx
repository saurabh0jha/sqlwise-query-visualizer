import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueriesProvider } from "./store/queryProvider";

import "./main.css";
import App from "./App.tsx";
import InitialView from "./pages/initialView/InitialView.tsx";
import QueryView from "./pages/queryView/QueryView.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueriesProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<InitialView />} />
            <Route path="/query" element={<InitialView />} />
            <Route path="/query/:queryId" element={<QueryView />} />
          </Route>
        </Routes>
      </QueriesProvider>
    </BrowserRouter>
  </StrictMode>
);
