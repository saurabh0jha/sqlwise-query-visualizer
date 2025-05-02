import DataTable from "@/components/composite/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ResultsLoader from "./ResultsLoader";
import React from "react";
const ResultsGrid = React.memo(
  ({
    data,
    columns,
    heightOffset = 320,
  }: {
    data: any[];
    columns: ColumnDef<any>[];
    heightOffset?: number;
  }) => {
    return (
      <>
        {data?.length ? (
          <div className="container py-2">
            <DataTable
              columns={columns}
              data={data}
              heightOffset={heightOffset}
            />
          </div>
        ) : (
          <ResultsLoader />
        )}
      </>
    );
  }
);

export default ResultsGrid;
