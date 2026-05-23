import { cn } from "@tn/shared/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "gold" | "silver" | "bronze";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
        // Sizes
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        // Variants
        variant === "default" &&
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        variant === "primary" &&
          "bg-primary/10 text-primary dark:bg-primary/20",
        variant === "success" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        variant === "warning" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        variant === "danger" &&
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        variant === "gold" &&
          "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-600",
        variant === "silver" &&
          "bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-300 border border-gray-300 dark:border-gray-500",
        variant === "bronze" &&
          "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border border-orange-300 dark:border-orange-600",
        className
      )}
    >
      {children}
    </span>
  );
}
