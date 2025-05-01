import "./App.css";
import { getColumnConfig } from "./sections/results/columnConfig";
import { useEffect } from "react";
import { useState } from "react";
import { getEntities } from "./api/api";

import SidebarSection from "./sections/sidebar/SidebarSection";
import Header from "./sections/header/Header";
import QueryName from "./sections/queryInput/QueryName";
import QueryInput from "./sections/queryInput/QueryInput";
import ResultsGrid from "./sections/results/ResultsGrid";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getEntities("customers");
      if (results.type === "success") {
        const columns = getColumnConfig(results.data);
        setColumns(columns);
        setData(results.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-dvw flex">
      <SidebarSection />
      <div className="grow h-dvh flex flex-col">
        <Header />
        <main className="box-border flex grow mx-4 mt-4 mb-4 flex-col gap-4">
          <QueryName />
          <QueryInput />
          <ResultsGrid columns={columns} data={data} heightOffset={300} />
        </main>
      </div>
    </div>
  );
}

export default App;
