"use client";

import { useEffect, useRef } from "react";

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSlot({
  slot,
  className,
}: {
  slot: string;
  className?: string;
}) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!CLIENT || !ref.current) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the script in layout.tsx
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!CLIENT) {
    return (
      <div
        className={`flex h-[90px] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground ${
          className ?? ""
        }`}
      >
        Ad slot · {slot}
      </div>
    );
  }

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}