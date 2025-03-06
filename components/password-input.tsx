import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordFeature?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "password", showPasswordFeature = true, ...props },
    ref
  ) => {
    const [inputType, setInputType] = React.useState(type);

    return (
      <div
        className={cn(
          "relative flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
      >
        <input
          type={inputType}
          className={cn(
            "flex-1 px-3 py-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            className
          )}
          ref={ref}
          {...props}
        />
        {showPasswordFeature && (
          <button
            type="button"
            onClick={() =>
              setInputType((prev) =>
                prev === "password" ? "text" : "password"
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            {inputType === "password" ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
