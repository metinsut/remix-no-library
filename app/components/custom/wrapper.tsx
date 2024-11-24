import { forwardRef } from "react";
import { cn } from "~/utils/cn";

const Wrapper = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-md bg-background shadow-md p-4", className)} {...props} />
  ),
);
Wrapper.displayName = "Wrapper";
export { Wrapper };
