import { ColumnDef } from "@tanstack/react-table";
import ResultsLoader from "./ResultsLoader";
import React, { lazy, Suspense } from "react";

const DataTable = lazy(() => import("@/components/composite/data-table"));

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
            <Suspense fallback={<ResultsLoader />}>
              <DataTable
                columns={columns as ColumnDef<unknown, unknown>[]}
                data={data}
                heightOffset={heightOffset}
              />
            </Suspense>
          </div>
        ) : (
          <ResultsLoader />
        )}
      </>
    );
  }
);

export default ResultsGrid;
