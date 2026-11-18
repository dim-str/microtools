"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const consentChangedEvent = "microtools-cookie-consent";

function subscribeToConsent(callback: () => void) {
  window.addEventListener(consentChangedEvent, callback);
  return () => window.removeEventListener(consentChangedEvent, callback);
}

function hasConsent() {
  try {
    return localStorage.getItem("cookie-consent") !== null;
  } catch {
    return false;
  }
}

export function CookieBanner() {
  const consentSaved = useSyncExternalStore(subscribeToConsent, hasConsent, () => false);
  const [error, setError] = useState("");

  const saveConsent = (consent: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie-consent", consent);
      window.dispatchEvent(new Event(consentChangedEvent));
      setError("");
    } catch {
      setError("Δεν ήταν δυνατή η αποθήκευση της επιλογής στον browser.");
    }
  };

  if (consentSaved) return null;

  return (
    <aside
      aria-label="Επιλογή cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-4 backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Αποθηκεύουμε την επιλογή σας για τα προαιρετικά cookies στον browser σας.
            Δείτε την{" "}
            <Link href="/cookies" className="text-primary underline">
              Πολιτική Cookies
            </Link>
            .
          </p>
          {error && <p role="alert" className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => saveConsent("declined")}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Απόρριψη
          </button>
          <button
            onClick={() => saveConsent("accepted")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Αποδοχή
          </button>
        </div>
      </div>
    </aside>
  );
}
