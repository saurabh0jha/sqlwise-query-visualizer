import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const keyToHeaderMap = {
  customerID: "Customer ID",
  companyName: "Company name",
  contactName: "Contact name",
  contactTitle: "Contact title",
  address: "Address",
  city: "City",
  region: "Region",
  postalCode: "Postal code",
  country: "Country",
  phone: "Phone",
  fax: "Fax",
  email: "Email",
  website: "Website",
  supportRepId: "Support rep ID",
  totalSales: "Total sales",
  orderID: "Order ID",
  productID: "Product ID",
  unitPrice: "Unit price",
  quantity: "Quantity",
  discount: "Discount",
  orderDate: "Order date",
  requiredDate: "Required date",
  shippedDate: "Shipped date",
  shipVia: "Ship via",
  freight: "Freight",
  shipName: "Ship name",
  shipAddress: "Ship address",
  shipCity: "Ship city",
  shipRegion: "Ship region",
  shipPostalCode: "Ship postal code",
  shipCountry: "Ship country",
  productName: "Product name",
  supplierID: "Supplier ID",
  categoryID: "Category ID",
  quantityPerUnit: "Quantity per unit",
  unitsInStock: "Units in stock",
  unitsOnOrder: "Units on order",
  reorderLevel: "Reorder level",
};

const getHeaderFromKey = (key: string) => {
  return keyToHeaderMap[key as keyof typeof keyToHeaderMap];
};

const getDateColumnConfig = (accessorKey: string) => {
  return {
    accessorKey,
    header: ({ column }: { column: Column<any> }) => {
      return (
        <div
          role="button"
          className="flex justify-start font-bold cursor-pointer px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>{getHeaderFromKey(accessorKey)}</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }: { row: Row<any> }) => {
      let dateString = "";
      try {
        dateString =
          row.original[accessorKey] !== "NULL"
            ? new Date(row.original[accessorKey]).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A";
      } catch (error) {
        console.error(error);
      }
      return (
        <div className="text-left" role="cell">
          {dateString}
        </div>
      );
    },
  };
};

const getPriceColumnConfig = (accessorKey: string) => {
  return {
    accessorKey,
    header: ({ column }: { column: Column<any> }) => {
      return (
        <div
          role="button"
          className="flex justify-start font-bold cursor-pointer px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {getHeaderFromKey(accessorKey)}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }: { row: Row<any> }) => {
      let priceString = "";
      try {
        priceString = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(row.original[accessorKey]);
      } catch (error) {
        console.error(error);
      }
      return (
        <div className="text-left" role="cell">
          {priceString}
        </div>
      );
    },
    meta: {
      filterVariant: "range",
    },
    filterFn: (row: Row<any>, id: string, filterValue: [number, number]) => {
      const price = parseFloat(row.original[id]);
      if (isNaN(price)) return false;
      return price >= filterValue[0] && price <= filterValue[1];
    },
  };
};

export const getColumnConfig = (data: any[]): ColumnDef<any>[] => {
  const columnNames = Object.keys(data[0]);
  const columnConfig: ColumnDef<any>[] = columnNames.map((accessorKey) => {
    if (accessorKey.toLowerCase().includes("date")) {
      return getDateColumnConfig(accessorKey);
    }

    if (accessorKey.toLowerCase().includes("price")) {
      return getPriceColumnConfig(accessorKey);
    }

    return {
      accessorKey,
      header: getHeaderFromKey(accessorKey),
      cell: ({ row }) => (
        <div className="text-left" role="cell">
          {row.getValue(accessorKey)}
        </div>
      ),
    };
  });

  columnConfig.unshift({
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
        role="checkbox"
        aria-checked={table.getIsAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select row ${row.index + 1}`}
        role="checkbox"
        aria-checked={row.getIsSelected()}
      />
    ),
  });

  columnConfig.unshift({
    accessorKey: "index",
    header: "#",
    cell: ({ row }) => {
      return (
        <div className="text-left text-primary" role="cell">
          {row.index + 1}
        </div>
      );
    },
  });

  return columnConfig;
};
