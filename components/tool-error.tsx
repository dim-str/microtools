"use client";

import { useState } from "react";

export function useToolAction() {
  const [error, setError] = useState<string | null>(null);

  const run = async (action: () => void | Promise<void>) => {
    setError(null);
    try {
      await action();
    } catch (cause) {
      console.error("Tool action failed:", cause);
      setError(
        cause instanceof Error && cause.message
          ? cause.message
          : "Παρουσιάστηκε απρόσμενο σφάλμα. Δοκιμάστε ξανά.",
      );
    }
  };

  return { error, run };
}

export function ToolError({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p role="alert" className="text-sm font-medium text-red-500">
      {message}
    </p>
  );
}
