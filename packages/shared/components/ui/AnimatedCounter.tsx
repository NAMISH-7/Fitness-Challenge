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
  const hasDecimals = value % 1 !== 0;
  const decimals = hasDecimals ? 1 : 0;
  const { count, ref } = useAnimatedCounter(value, duration, true, decimals);

  return (
    <span
      ref={ref as any}
      className={cn("tabular-nums", className)}
      data-counter={value}
    >
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}
