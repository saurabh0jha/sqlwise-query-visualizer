import "./App.css";

import SidebarSection from "./sections/sidebar/SidebarSection";
import Header from "./sections/header/Header";
import { Outlet } from "react-router";

function App() {
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
