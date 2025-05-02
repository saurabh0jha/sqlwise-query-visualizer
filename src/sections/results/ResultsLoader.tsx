import { Skeleton } from "@/components/ui/skeleton";

const ResultsLoader = () => {
  return (
    <div role="status" aria-label="Loading results" aria-live="polite">
      <div className="sr-only">Loading query results, please wait...</div>
      <Skeleton className="h-12 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-6 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-10 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-8 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-6 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-6 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-10 bg-muted/55" aria-hidden="true" />
      <Skeleton className="h-8 bg-muted/55" aria-hidden="true" />
    </div>
  );
};

export default ResultsLoader;
