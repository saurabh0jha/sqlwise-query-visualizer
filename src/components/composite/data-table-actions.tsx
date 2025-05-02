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
    <div className="flex justify-end mt-0 pt-0 mb-4 gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            Export
            <Download className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onExport(ExportType.ALL_CSV)}>
            Export all (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport(ExportType.ALL_JSON)}>
            Export all (JSON)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport(ExportType.SELECTION_CSV)}>
            Export selection (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport(ExportType.SELECTION_JSON)}>
            Export selection (JSON)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/80">
            Copy
            <Copy className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onCopy(CopyType.ALL_CSV)}>
            Copy all (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(CopyType.ALL_JSON)}>
            Copy all (JSON)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(CopyType.SELECTION_CSV)}>
            Copy selection (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(CopyType.SELECTION_JSON)}>
            Copy selection (JSON)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DataTableActions;
