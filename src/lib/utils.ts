import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Papa from "papaparse";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(data: any[], type: "csv" | "json" = "csv") {
  const rawData = data.map((row) => row.original);

  const dataString =
    type === "csv"
      ? Papa.unparse(rawData, { header: true })
      : JSON.stringify(rawData);
  navigator.clipboard.writeText(dataString);
}

export function downloadFile(
  data: any[],
  type: "csv" | "json" = "csv",
  filename: string
) {
  const rawData = data.map((row) => row.original);
  const dataString =
    type === "csv"
      ? Papa.unparse(rawData, { header: true })
      : JSON.stringify(rawData);

  const dataBlob = new Blob([dataString], {
    type: type === "csv" ? "text/csv" : "application/json",
  });

  // Create an object URL for the blob object
  const url = URL.createObjectURL(dataBlob);

  // Create a new anchor element
  const a = document.createElement("a");

  // Set the href and download attributes for the anchor element
  // You can optionally set other attributes like `title`, etc
  // Especially, if the anchor element will be attached to the DOM
  a.href = url;
  a.download = filename || "download";

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      removeEventListener("click", clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener("click", clickHandler, false);

  a.click();
  return a;
}
