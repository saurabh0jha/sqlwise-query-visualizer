import QueryName from "@/sections/queryName/QueryName";
import { useParams } from "react-router";
import { Dispatch } from "react";
import QueryInput from "@/sections/queryInput/QueryInput";
import ResultsGrid from "@/sections/results/ResultsGrid";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Action, QueriesDispatchContext } from "@/store/queryProvider";

import { v4 as uuidv4 } from "uuid";
import useQueryResults from "@/hooks/use-query-results";
import { toast } from "sonner";

const QueryView = () => {
  const navigate = useNavigate();
  const { queryId } = useParams();
  const dispatch = useContext(QueriesDispatchContext) as Dispatch<Action>;
  const { queries, data, columns, queryData } = useQueryResults(
    queryId as string
  );

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

    toast.success(`Successfully updated query ${field}`);
  };

  const handleQueryDelete = (id: string) => {
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
    }
    navigate("/");
  };

  return (
    <main className="box-border flex grow mx-4 mt-4 mb-4 flex-col gap-4">
      <QueryName
        queryId={queryId as string}
        queryName={queryData?.name || ""}
        onQueryNameChange={(newValue) => handleQueryChange("name", newValue)}
        onQueryDelete={handleQueryDelete}
      />
      <QueryInput
        queryValue={queryData?.value || ""}
        onQueryValueChange={(newValue) => handleQueryChange("value", newValue)}
      />
      <ResultsGrid heightOffset={310} data={data} columns={columns} />
    </main>
  );
};

export default QueryView;
