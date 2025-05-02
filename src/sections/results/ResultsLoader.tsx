import { Skeleton } from "@/components/ui/skeleton";

const ResultsLoader = () => {
  return (
    <div role="status" aria-label="Loading results" aria-live="polite">
      <div className="sr-only">Loading query results, please wait...</div>
      <div className="my-4 mx-2 flex flex-col gap-4">
        <Skeleton className="h-12 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-6 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-10 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-8 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-6 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-6 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-10 bg-muted/55" aria-hidden="true" />
        <Skeleton className="h-8 bg-muted/55" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ResultsLoader;
