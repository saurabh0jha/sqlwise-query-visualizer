import { ExportType, CopyType } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Download } from "lucide-react";

const DataTableActions = ({
  onExport,
  onCopy,
}: {
  onExport: (type: ExportType) => void;
  onCopy: (type: CopyType) => void;
}) => {
  return (
    <div
      className="flex justify-end mt-0 pt-0 mb-4 gap-4"
      role="toolbar"
      aria-label="Table actions"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            aria-label="Export data"
            aria-haspopup="true"
          >
            Export
            <Download className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent role="menu" aria-label="Export options">
          <DropdownMenuItem
            onClick={() => onExport(ExportType.ALL_CSV)}
            role="menuitem"
          >
            Export all (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onExport(ExportType.ALL_JSON)}
            role="menuitem"
          >
            Export all (JSON)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onExport(ExportType.SELECTION_CSV)}
            role="menuitem"
          >
            Export selection (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onExport(ExportType.SELECTION_JSON)}
            role="menuitem"
          >
            Export selection (JSON)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/80"
            aria-label="Copy data"
            aria-haspopup="true"
          >
            Copy
            <Copy className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent role="menu" aria-label="Copy options">
          <DropdownMenuItem
            onClick={() => onCopy(CopyType.ALL_CSV)}
            role="menuitem"
          >
            Copy all (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onCopy(CopyType.ALL_JSON)}
            role="menuitem"
          >
            Copy all (JSON)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onCopy(CopyType.SELECTION_CSV)}
            role="menuitem"
          >
            Copy selection (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onCopy(CopyType.SELECTION_JSON)}
            role="menuitem"
          >
            Copy selection (JSON)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DataTableActions;
