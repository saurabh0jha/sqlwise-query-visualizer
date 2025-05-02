import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueriesProvider } from "./store/queryProvider";
import { Toaster } from "@/components/ui/sonner";

import "./main.css";
import App from "./App.tsx";
import InitialView from "./pages/initialView/InitialView.tsx";
import QueryView from "./pages/queryView/QueryView.tsx";
import { ThemeProvider } from "./store/themeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueriesProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<InitialView />} />
              <Route path="/query" element={<InitialView />} />
              <Route path="/query/:queryId" element={<QueryView />} />
            </Route>
          </Routes>
          <Toaster position="bottom-left" richColors closeButton />
        </QueriesProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
