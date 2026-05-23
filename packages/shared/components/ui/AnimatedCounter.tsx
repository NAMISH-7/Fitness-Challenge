"use client";

import { useAnimatedCounter } from "@tn/shared/hooks/useAnimatedCounter";
import { cn } from "@tn/shared/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const count = useAnimatedCounter(value, duration);

  return (
    <span
      className={cn("tabular-nums", className)}
      data-counter={value}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
