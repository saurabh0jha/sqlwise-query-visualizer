import { getQueries } from "@/api/api";
import { Query } from "@/types";
import { createContext, Dispatch, useEffect, useReducer } from "react";

type QueryStore = Record<string, Query>;

type SET_QUERIES = {
  type: "SET_QUERIES";
  payload: QueryStore;
};

type ADD_QUERY = {
  type: "ADD_QUERY";
  payload: { id: string; query: Query };
};

type UPDATE_QUERY = {
  type: "UPDATE_QUERY";
  payload: { id: string; query: Query };
};

type DELETE_QUERY = {
  type: "DELETE_QUERY";
  payload: string;
};

export type Action = ADD_QUERY | UPDATE_QUERY | DELETE_QUERY | SET_QUERIES;

export const QueriesContext = createContext<QueryStore | null>(null);
export const QueriesDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

const initialQueries: QueryStore = {};

export function QueriesProvider({ children }: { children: React.ReactNode }) {
  const savedQueries = localStorage.getItem("queries");
  const initialQueries = savedQueries ? JSON.parse(savedQueries) : {};
  const [queries, dispatch] = useReducer<QueryStore, any>(
    queriesReducer,
    savedQueries ? JSON.parse(savedQueries) : initialQueries
  );

  useEffect(() => {
    const fetchQueries = async () => {
      const queryResp = await getQueries();
      if (queryResp.type === "success") {
        dispatch({ type: "SET_QUERIES", payload: queryResp.data });
      }
    };
    if (!savedQueries) fetchQueries();
  }, []);

  return (
    <QueriesContext.Provider value={queries}>
      <QueriesDispatchContext.Provider value={dispatch}>
        {children}
      </QueriesDispatchContext.Provider>
    </QueriesContext.Provider>
  );
}

function queriesReducer(queries: QueryStore, action: Action): QueryStore {
  switch (action.type) {
    case "SET_QUERIES": {
      localStorage.setItem("queries", JSON.stringify(action.payload));
      return action.payload;
    }
    case "ADD_QUERY": {
      const newQueries = {
        ...queries,
        [action.payload.id]: action.payload.query,
      };
      localStorage.setItem("queries", JSON.stringify(newQueries));
      return newQueries;
    }
    case "UPDATE_QUERY": {
      const newQueries = {
        ...queries,
        [action.payload.id]: action.payload.query,
      };
      localStorage.setItem("queries", JSON.stringify(newQueries));
      return newQueries;
    }
    case "DELETE_QUERY": {
      const { [action.payload]: _, ...rest } = queries;
      localStorage.setItem("queries", JSON.stringify(rest));
      return rest;
    }
    default:
      return queries;
  }
}
