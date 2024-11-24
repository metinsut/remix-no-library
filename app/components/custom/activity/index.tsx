import { forwardRef } from "react";
import type { ForwardedRef, ReactNode } from "react";
import { cn } from "~/utils/cn";
import { Spin } from "./spin";

type Props = {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
};

const Activity = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const { children, className, isLoading, ...rest } = props;
  return (
    <div ref={ref} className={cn("relative", className)} {...rest}>
      {children}
      {isLoading && (
        <div
          className={cn(
            "flex items-center justify-center absolute inset-0 animate-pulse rounded-md bg-accent",
          )}
        >
          <Spin />
        </div>
      )}
    </div>
  );
});

Activity.displayName = "Activity";
export { Activity };
