import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

export function DataTableFilters({ table }: { table: Table<any> }) {
  const columnNames: { name: string; filterVariant: string }[] = [];

  table.getHeaderGroups().forEach((headerGroup) => {
    headerGroup.headers.forEach((header) => {
      const meta = header.column.columnDef.meta as { filterVariant: string };
      if (meta?.filterVariant) {
        columnNames.push({
          name: header.column.id,
          filterVariant: meta?.filterVariant,
        });
      }
    });
  });

  return (
    <div className="flex items-center">
      {columnNames.map((element: { name: string; filterVariant: string }) => {
        if (element.filterVariant === "range") {
          return (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={
                  (
                    table.getColumn(element.name)?.getFilterValue() as [
                      number,
                      number
                    ]
                  )?.[0] ?? ""
                }
                onChange={(e) =>
                  table
                    .getColumn(element.name)
                    ?.setFilterValue((old: [number, number]) => [
                      parseInt(e.target.value),
                      old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
              />
              <Input
                type="number"
                value={
                  (
                    table.getColumn(element.name)?.getFilterValue() as [
                      number,
                      number
                    ]
                  )?.[1] ?? ""
                }
                onChange={(e) =>
                  table
                    .getColumn(element.name)
                    ?.setFilterValue((old: [number, number]) => [
                      old?.[0],
                      parseInt(e.target.value),
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
