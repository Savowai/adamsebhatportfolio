"use client";

import { useEffect } from "react";

/** Mirrors the hovered or focused project's contour band onto <html data-hot>. */
export function HoverBands() {
  useEffect(() => {
    const root = document.documentElement;
    const band = (t: EventTarget | null) =>
      t instanceof Element ? t.closest<HTMLElement>("[data-band]")?.dataset.band : undefined;
    const on = (e: Event) => {
      const b = band(e.target);
      if (b) root.dataset.hot = b;
      else delete root.dataset.hot;
    };
    const off = () => delete root.dataset.hot;
    document.addEventListener("pointerover", on);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => {
      document.removeEventListener("pointerover", on);
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", off);
      off();
    };
  }, []);
  return null;
}
