import { cn } from "@tn/shared/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glow";
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = true, padding = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          // Variants
          variant === "default" &&
            "bg-surface-light border border-border-light dark:bg-surface-dark dark:border-border-dark",
          variant === "glass" && "glass-card",
          variant === "glow" &&
            "bg-surface-light border border-border-light dark:bg-surface-dark dark:border-border-dark glow",
          // Hover
          hover &&
            "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary/5",
          // Padding
          padding === "sm" && "p-4",
          padding === "md" && "p-6",
          padding === "lg" && "p-8",
          padding === "none" && "p-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
