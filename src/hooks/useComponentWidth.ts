import { useLayoutEffect, useState, type RefObject } from "react";

type useComponentWidthProps = {
  component: RefObject<HTMLDivElement | null>;
};

export function useComponentWidth({ component }: useComponentWidthProps) {
  const [componentWidth, setComponentWidth] = useState(0);

  useLayoutEffect(() => {
    const element = component.current;
    if (!element) return;
    const updateComponentWidth = () => {
      setComponentWidth(element?.clientWidth ?? 0);
    };
    updateComponentWidth();

    window.addEventListener("resize", updateComponentWidth);
    return () => {
      window.removeEventListener("resize", updateComponentWidth);
    };
  });

  return componentWidth;
}
