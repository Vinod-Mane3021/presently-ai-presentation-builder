import React, { ReactNode, useMemo } from "react";

type Condition<Value = unknown> = Value | false | null | undefined | 0 | "";

type IfType<Value = unknown> = {
  condition: Condition<Value>;
  children: ReactNode | ((value: Value) => ReactNode);
  fallback?: ReactNode;
};

const If = ({ condition, children, fallback }: IfType) => {
  return useMemo(() => {
    if (condition) {
      if (typeof children == "function") {
        return <>{children(condition)}</>;
      }
      return <>{children}</>;
    }
    if (fallback) {
      return <>{fallback}</>;
    }

    return null;
  }, [condition, children, fallback]);
};

export default If;
