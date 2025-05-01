import "./App.css";

import SidebarSection from "./sections/sidebar/SidebarSection";
import Header from "./sections/header/Header";
import QueryName from "./sections/queryInput/QueryName";
import QueryInput from "./sections/queryInput/QueryInput";
import ResultsGrid from "./sections/results/ResultsGrid";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ColumnDef } from "@tanstack/react-table";
import {
  Action,
  QueriesContext,
  QueriesDispatchContext,
} from "./store/queryProvider";
import { getEntities } from "./api/api";
import { getColumnConfig } from "./sections/results/columnConfig";
import BlankResults from "./sections/results/BlankResults";
import { Query } from "@/types";
import { Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  let { queryId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [queryData, setQueryData] = useState<Query>();
  const queries = useContext(QueriesContext) || {};
  const dispatch = useContext(QueriesDispatchContext) as Dispatch<Action>;
  if (!queryId && Object.keys(queries).length > 0) {
    queryId = Object.keys(queries)?.[0];
  }

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      setColumns([]);
      const query =
        queries[queryId as string] || Object.values(queries)?.[0] || {};
      setQueryData(query);
      const results = await getEntities(query?.dataSource || "customers");

      if (results.type === "success") {
        const columns = getColumnConfig(results.data);
        setColumns(columns);
        setData(results.data);
      }
    };
    fetchData();
    return () => {
      console.log("unmounting");
      setData([]);
      setColumns([]);
    };
  }, [queryId]);

  useEffect(() => {
    const query =
      queries[queryId as string] || Object.values(queries)?.[0] || {};
    setQueryData(query);
  }, [queries]);

  const handleQueryChange = (field: string, newValue: string) => {
    dispatch({
      type: "UPDATE_QUERY",
      payload: {
        id: queryId as string,
        query: {
          name: field === "name" ? newValue : queryData?.name || "",
          value: field === "value" ? newValue : queryData?.value || "",
          dataSource: queryData?.dataSource || "",
          createdAt: queryData?.createdAt || "",
          updatedAt: queryData?.updatedAt || "",
        },
      },
    });
  };

  return (
    <div className="h-full w-dvw flex">
      <SidebarSection />
      <div className="grow h-dvh flex flex-col">
        <Header />
        <main className="box-border flex grow mx-4 mt-4 mb-4 flex-col gap-6">
          <QueryName
            queryId={queryId as string}
            queryName={queryData?.name || ""}
            onQueryNameChange={(newValue) =>
              handleQueryChange("name", newValue)
            }
            onQueryDelete={(id) => {
              dispatch({
                type: "DELETE_QUERY",
                payload: id,
              });
              if (Object.keys(queries).length === 1) {
                dispatch({
                  type: "ADD_QUERY",
                  payload: {
                    id: uuidv4(),
                    query: {
                      name: "New Query",
                      value: "SELECT * FROM customers",
                      dataSource: "customers",
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    },
                  },
                });
                navigate("/");
              }
            }}
          />
          <QueryInput
            queryValue={queryData?.value || ""}
            onQueryValueChange={(newValue) =>
              handleQueryChange("value", newValue)
            }
          />
          {data && data.length ? (
            <ResultsGrid heightOffset={300} data={data} columns={columns} />
          ) : (
            <div className="my-4 mx-2 flex flex-col gap-4">
              <BlankResults />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
