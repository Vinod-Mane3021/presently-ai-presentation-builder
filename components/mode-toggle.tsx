"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component is mounted before rendering UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder to prevent hydration mismatch
  }

  const default_button_className =
    "rounded-full size-8 flex items-center justify-center p-0 bg-accent duration-300 shadow-xs hover:text-accent-foreground";

  return (
    <div className="flex items-center">
      <div className="flex items-center p-1 bg-accent rounded-full gap-x-1 duration-300">
        <button
          className={cn(
            default_button_className,
            theme == "dark" && "bg-background"
          )}
          onClick={() => setTheme("dark")}
        >
          <Moon className="size-4 transition-all p-0 m-0" />
        </button>
        <button
          className={cn(
            default_button_className,
            theme == "light" && "bg-background"
          )}
          onClick={() => setTheme("light")}
        >
          <Sun className="size-4   transition-all " />
        </button>
        <span className="sr-only">Toggle theme</span>
      </div>
    </div>
  );
}
