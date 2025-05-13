import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import DataTableActions from "./data-table-actions";
import { CopyType } from "@/components/composite/types";
import { ExportType } from "@/components/composite/types";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";
import { toast } from "sonner";
import { DataTableFilters } from "./data-table-filters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  heightOffset?: number;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  heightOffset = 320,
}: DataTableProps<TData, TValue>) => {
  // const [rowSelection, setRowSelection] = useState({});

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const handleExport = (type: ExportType) => {
    let tableRows;
    switch (type) {
      case ExportType.ALL_CSV:
        tableRows = table.getCoreRowModel().rows;
        downloadFile(tableRows, "csv", "full-data.csv");
        break;
      case ExportType.ALL_JSON:
        tableRows = table.getCoreRowModel().rows;
        downloadFile(tableRows, "json", "full-data.json");
        break;
      case ExportType.SELECTION_CSV:
        tableRows = table.getFilteredSelectedRowModel().rows;
        if (tableRows.length === 0) {
          tableRows = table.getRowModel().rows;
        }
        downloadFile(tableRows, "csv", "selected-data.csv");
        break;
      case ExportType.SELECTION_JSON:
        tableRows = table.getFilteredSelectedRowModel().rows;
        if (tableRows.length === 0) {
          tableRows = table.getRowModel().rows;
        }
        downloadFile(tableRows, "json", "selected-data.json");
        break;
      default:
        break;
    }
    toast.success(
      `Successfully exported ${
        [ExportType.ALL_CSV, ExportType.ALL_JSON].includes(type)
          ? "all"
          : table.getFilteredSelectedRowModel().rows.length === 0
          ? "current page"
          : "selected"
      } data`
    );
  };

  const handleCopy = (type: CopyType) => {
    let tableRows;
    switch (type) {
      case CopyType.SELECTION_CSV:
        tableRows = table.getFilteredSelectedRowModel().rows;
        if (tableRows.length === 0) {
          tableRows = table.getRowModel().rows;
        }
        copyToClipboard(tableRows, "csv");
        break;
      case CopyType.SELECTION_JSON:
        tableRows = table.getFilteredSelectedRowModel().rows;
        if (tableRows.length === 0) {
          tableRows = table.getRowModel().rows;
        }
        copyToClipboard(tableRows, "json");
        break;
      case CopyType.ALL_CSV:
        tableRows = table.getCoreRowModel().rows;
        copyToClipboard(tableRows, "csv");
        break;
      case CopyType.ALL_JSON:
        tableRows = table.getCoreRowModel().rows;
        copyToClipboard(tableRows, "json");
        break;
    }
    toast.success(
      `Successfully copied ${
        [CopyType.ALL_CSV, CopyType.ALL_JSON].includes(type)
          ? "all"
          : table.getFilteredSelectedRowModel().rows.length === 0
          ? "current page"
          : "selected"
      } data to clipboard`
    );
  };

  return (
    <div role="region" aria-label="Data table">
      <div className="flex justify-between">
        <DataTableFilters table={table} />
        <DataTableActions onExport={handleExport} onCopy={handleCopy} />
      </div>
      <div
        className="rounded-md border flex flex-col"
        style={{
          height: `calc(100vh - ${heightOffset}px)`,
          overflow: "scroll",
        }}
        role="table"
        aria-label="Query results"
      >
        <Table className="flex-1">
          <TableHeader className="bg-muted/30 text-primary-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} role="row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold text-sm"
                      role="columnheader"
                      scope="col"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-b border-border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  role="row"
                  aria-selected={row.getIsSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} role="cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow role="row">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                  role="cell"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};

export default DataTable;
