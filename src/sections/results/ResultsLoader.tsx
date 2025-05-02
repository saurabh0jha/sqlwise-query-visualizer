import { Skeleton } from "@/components/ui/skeleton";

const ResultsLoader = () => {
  return (
    <>
      <Skeleton className="h-12 bg-muted/55" />
      <Skeleton className="h-6 bg-muted/55" />
      <Skeleton className="h-10 bg-muted/55" />
      <Skeleton className="h-8 bg-muted/55" />
      <Skeleton className="h-6 bg-muted/55" />
      <Skeleton className="h-6 bg-muted/55" />
      <Skeleton className="h-10 bg-muted/55" />
      <Skeleton className="h-8 bg-muted/55" />
    </>
  );
};

export default ResultsLoader;
