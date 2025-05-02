import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CircleCheckBig, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";

const QueryName = React.memo(
  ({
    queryId,
    queryName,
    onQueryNameChange,
    onQueryDelete,
  }: {
    queryId: string;
    queryName: string;
    onQueryNameChange: (name: string) => void;
    onQueryDelete: (id: string) => void;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [nameOfQuery, setNameOfQuery] = useState(queryName);

    useEffect(() => {
      setNameOfQuery(queryName);
    }, [queryName]);

    return (
      <h1 className="text-2xl flex items-center gap-2">
        {isEditing ? (
          <Input
            className="md:text-2xl text-2xl w-1/2 p-4"
            style={{
              fontSize: "1em",
              padding: "24px 12px",
            }}
            type="text"
            value={nameOfQuery}
            onChange={(e) => {
              setNameOfQuery(e.target.value);
            }}
            onBlur={(e) => {
              setIsEditing(false);
              onQueryNameChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                onQueryNameChange((e.target as HTMLInputElement).value);
              }
            }}
          />
        ) : (
          <span className="border-b-2 border-primary border-dashed pt-2 pb-1">
            {nameOfQuery}
          </span>
        )}
        {isEditing ? (
          <CircleCheckBig
            className="w-5 h-5 ml-2"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        ) : (
          <SquarePen
            className="w-5 h-5 ml-3"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        )}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <Trash2 className="w-5 h-5 ml-3" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Query</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this query?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onQueryDelete(queryId);
                  setIsDeleteModalOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </h1>
    );
  }
);

export default QueryName;
