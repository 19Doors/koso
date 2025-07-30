"use client";
import { useRef, useEffect } from "react";
import { pageAnimations } from "@/utils/animations";

export function LoadingOverlay({ loading }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!loading && overlayRef.current) {
      pageAnimations.hideLoader(overlayRef.current);
    }
  }, [loading]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 w-full h-full bg-foreground z-50"
    />
  );
}
