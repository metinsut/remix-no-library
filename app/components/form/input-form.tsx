import type { FieldMetadata } from "@conform-to/react";
import * as React from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface InputFormProps extends React.ComponentProps<"input"> {
  meta: FieldMetadata<string>;
  label?: string;
}

export const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ meta, label, className, ...props }, ref) => {
    const hasError = Boolean(meta.errors?.length);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={meta.id} className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}

        <Input
          {...props}
          ref={ref}
          id={meta.id}
          name={meta.name}
          defaultValue={meta.initialValue}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${meta.id}-error` : undefined}
          className={cn(hasError && "border-destructive focus-visible:ring-destructive", className)}
        />

        {hasError && meta.errors && (
          <div id={`${meta.id}-error`} className="mt-1.5 text-sm text-destructive">
            {meta.errors.join(", ")}
          </div>
        )}
      </div>
    );
  },
);

InputForm.displayName = "InputForm";
