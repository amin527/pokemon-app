import { useCallback, useRef, useState } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (node) {
      const observer = new ResizeObserver(([entry]) => {
        setHeight(entry.contentRect.height);
      });
      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

  return { ref, height };
}