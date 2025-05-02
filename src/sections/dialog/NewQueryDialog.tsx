import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { useContext, useState } from "react";
import { QueriesDispatchContext } from "@/store/queryProvider";
import { Dispatch } from "react";
import { Action } from "@/store/queryProvider";
import { v4 as uuidv4 } from "uuid";

type DialogType = "link" | "button";

export function NewQueryDialog({ type }: { type: DialogType }) {
  const dispatch = useContext(QueriesDispatchContext) as Dispatch<Action>;
  const [name, setName] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === "link" ? (
          <span
            className="flex items-center pb-1 gap-2"
            role="button"
            tabIndex={0}
            aria-label="Create a new query"
          >
            <span className="border-b-2 border-accent border-dashed text-lg">
              Create a new query
            </span>
          </span>
        ) : (
          <Button
            variant="default"
            className="mx-4 mt-4 mb-2 p-4"
            aria-label="Create a new query"
          >
            New Query
            <PlusIcon className="w-4 h-4 text-primary" aria-hidden="true" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >
        <DialogHeader>
          <DialogTitle>Create Query</DialogTitle>
          <DialogDescription>
            Add a name, optional datasource and optional query to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4" role="form">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="New Query"
              className="col-span-3"
              placeholder="Enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required="true"
              aria-label="Query name"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dataSource" className="text-right">
              Data Source
            </Label>
            <Select
              value={dataSource}
              onValueChange={(value) => {
                setDataSource(value);
                setQueryValue("SELECT * FROM " + value);
              }}
            >
              <SelectTrigger
                className="w-[280px] border-2 border-gray-300 rounded-md p-1 align-left"
                aria-label="Select data source"
              >
                <SelectValue placeholder="Select a datasource" />
              </SelectTrigger>
              <SelectContent role="listbox">
                <SelectItem value="customers" role="option">
                  Customers
                </SelectItem>
                <SelectItem value="products" role="option">
                  Products
                </SelectItem>
                <SelectItem value="orders" role="option">
                  Orders
                </SelectItem>
                <SelectItem value="orderDetails" role="option">
                  Order Details
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
              Query
            </Label>
            <Input
              id="value"
              defaultValue=""
              className="col-span-3"
              placeholder="Enter SQL query"
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
              aria-label="SQL query"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              dispatch({
                type: "ADD_QUERY",
                payload: {
                  id: uuidv4(),
                  query: {
                    name: name,
                    dataSource: dataSource,
                    value: queryValue,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                },
              });
              setName("");
              setDataSource("");
              setQueryValue("");
              setOpen(false);
            }}
            aria-label="Create query"
          >
            Create Query
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
