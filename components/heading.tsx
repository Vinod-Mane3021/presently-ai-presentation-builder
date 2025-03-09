import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export function Heading({
  level = 1,
  children,
  className,
}: React.PropsWithChildren<{ level?: Level; className?: string }>) {
  const headingStyles: Record<Level, string> = {
    1: "scroll-m-20 text-3xl font-bold tracking-tight dark:text-white lg:text-4xl",
    2: "scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 lg:text-3xl",
    3: "scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl",
    4: "scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl",
    5: "scroll-m-20 text-base font-medium lg:text-lg",
    6: "scroll-m-20 text-base font-medium",
  };

  const style = headingStyles[level];

  switch (level) {
    case 1:
      return <h1 className={cn(style, className)}>{children}</h1>;
    case 2:
      return <h2 className={cn(style, className)}>{children}</h2>;
    case 3:
      return <h3 className={cn(style, className)}>{children}</h3>;
    case 4:
      return <h4 className={cn(style, className)}>{children}</h4>;
    case 5:
      return <h5 className={cn(style, className)}>{children}</h5>;
    case 6:
      return <h6 className={cn(style, className)}>{children}</h6>;
    default:
      return <Heading level={1}>{children}</Heading>;
  }
}
