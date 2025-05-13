import "./App.css";

import SidebarSection from "./sections/sidebar/SidebarSection";
import Header from "./sections/header/Header";
import { Outlet } from "react-router";

import worker from "./worker.js?worker";
import { useEffect } from "react";

const workerInstance = new worker();

function App() {
  useEffect(() => {
    workerInstance.onmessage = (event) => {
      console.log(event.data);
    };
    workerInstance.postMessage("Hello from main thread");
  }, []);

  return (
    <div className="h-full w-dvw flex">
      <SidebarSection />
      <div className="grow h-dvh flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
