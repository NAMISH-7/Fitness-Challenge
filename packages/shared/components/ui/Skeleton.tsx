import { cn } from "@tn/shared/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
}

export default function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800",
        variant === "text" && "rounded-md h-4",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-xl",
        className
      )}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-light dark:border-border-dark p-6 space-y-4">
      <Skeleton variant="rectangular" className="w-full h-40" />
      <Skeleton className="w-3/4" />
      <Skeleton className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonLeaderboardRow() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl">
      <Skeleton variant="circular" className="w-10 h-10" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-32" />
        <Skeleton className="w-20" />
      </div>
      <Skeleton className="w-16 h-6" />
    </div>
  );
}
