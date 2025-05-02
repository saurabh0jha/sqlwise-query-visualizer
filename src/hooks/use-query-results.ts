import { getEntities } from "@/api/api";
import { getColumnConfig } from "@/sections/results/columnConfig";
import { QueriesContext } from "@/store/queryProvider";
import { Query } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const useQueryResults = (queryId: string) => {
  const queries = useContext(QueriesContext) || {};
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [queryData, setQueryData] = useState<Query>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const query = queries[queryId as string];

      if (!query) {
        navigate("/");
        return;
      }

      setQueryData(query);
      const results = await getEntities(query?.dataSource);

      if (results.type === "success") {
        const columns = getColumnConfig(results.data);
        setColumns(columns);
        setData(results.data);
      }
    };
    fetchData();

    return () => {
      setData([]);
      setColumns([]);
    };
  }, [queryId]);

  return { queries, data, columns, queryData };
};

export default useQueryResults;
