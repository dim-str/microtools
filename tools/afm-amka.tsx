"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { isValidAfm, isValidAmka } from "@/lib/tool-calculations";

export default function AfmAmkaChecker() {
  const [afm, setAfm] = useState("");
  const [amka, setAmka] = useState("");
  const [results, setResults] = useState<{ afm?: boolean | null; amka?: boolean | null }>({});
  const { error, run } = useToolAction();

  const handleCheckAFM = () => run(() => {
    if (afm.length !== 9) throw new Error("Εισάγετε ΑΦΜ με ακριβώς 9 ψηφία.");
    setResults((prev) => ({ ...prev, afm: isValidAfm(afm) }));
  });

  const handleCheckAMKA = () => run(() => {
    if (amka.length !== 11) throw new Error("Εισάγετε ΑΜΚΑ με ακριβώς 11 ψηφία.");
    setResults((prev) => ({ ...prev, amka: isValidAmka(amka) }));
  });

  return (
    <div className="space-y-8">
      {/* ΑΦΜ Section */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-lg">Έλεγχος ΑΦΜ</h3>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={afm}
            onChange={(e) => setAfm(e.target.value.replace(/\D/g, "").slice(0, 9))}
            placeholder="Εισάγετε 9ψήφιο ΑΦΜ"
            className="w-full min-w-0 rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="button"
            onClick={handleCheckAFM}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto"
          >
            Έλεγχος
          </button>
        </div>
        {results.afm !== undefined && (
          <p className={`text-sm font-medium ${results.afm ? "text-green-600" : "text-red-500"}`}>
            {results.afm ? "✅ Το ΑΦΜ είναι μαθηματικά έγκυρο." : "❌ Το ΑΦΜ δεν είναι έγκυρο."}
          </p>
        )}
      </div>

      <ToolError message={error} />

      {/* ΑΜΚΑ Section */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-lg">Έλεγχος ΑΜΚΑ</h3>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={amka}
            onChange={(e) => setAmka(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="Εισάγετε 11ψήφιο ΑΜΚΑ"
            className="w-full min-w-0 rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="button"
            onClick={handleCheckAMKA}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto"
          >
            Έλεγχος
          </button>
        </div>
        {results.amka !== undefined && (
          <p className={`text-sm font-medium ${results.amka ? "text-green-600" : "text-red-500"}`}>
            {results.amka ? "✅ Το ΑΜΚΑ φαίνεται έγκυρο (σωστή ημερομηνία)." : "❌ Το ΑΜΚΑ δεν είναι έγκυρο."}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          * Ο έλεγχος ΑΜΚΑ βασίζεται στην ημερομηνία γέννησης και δεν συνδέεται με βάση δεδομένων.
        </p>
      </div>
    </div>
  );
}