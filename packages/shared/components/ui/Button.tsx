import { cn } from "@tn/shared/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer",
          "whitespace-nowrap shrink-0",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0",
          variant === "secondary" &&
            "bg-secondary text-white hover:bg-secondary-light shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5 active:translate-y-0",
          variant === "outline" &&
            "border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white",
          variant === "ghost" &&
            "text-text-secondary-light hover:text-text-primary-light hover:bg-surface-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark dark:hover:bg-surface-dark",
          // Sizes
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
