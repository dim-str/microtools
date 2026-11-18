"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateCarTekmirio, calculateHomeTekmirio } from "@/lib/tool-calculations";

export default function TekmiriaCalculator() {
  const [type, setType] = useState<"car" | "home">("car");
  
  // Car state
  const [cc, setCc] = useState("");
  const [year, setYear] = useState("");
  
  // Home state
  const [sqm, setSqm] = useState("");

  const [result, setResult] = useState<number | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() => {
    if (type === "car") {
      setResult(calculateCarTekmirio(cc, year));
    } else {
      setResult(calculateHomeTekmirio(sqm));
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
        <button onClick={() => { setType("car"); setResult(null); }} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${type === "car" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>
          Αυτοκίνητο
        </button>
        <button onClick={() => { setType("home"); setResult(null); }} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${type === "home" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>
          Κατοικία
        </button>
      </div>

      {type === "car" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Κυβικά (cc)</label>
            <input type="number" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="π.χ. 1600" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Έτος Κυκλοφορίας</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="π.χ. 2018" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium">Τετραγωνικά Μέτρα (τ.μ.)</label>
          <input type="number" value={sqm} onChange={(e) => setSqm(e.target.value)} placeholder="π.χ. 100" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      )}

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Εκτίμηση Τεκμηρίου
      </button>

      <ToolError message={error} />

      {result !== null && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-muted-foreground">Εκτιμώμενο Τεκμήριο:</span>
            <span className="text-2xl font-bold text-primary">{result.toFixed(2)} €</span>
          </div>
          <p className="text-xs text-muted-foreground">
            * Ενδεικτική εκτίμηση. Τα πραγματικά τεκμήρια υπολογίζονται από την εφορία με βάση πολλούς περισσότερους παράγοντες (παλαιότητα, τιμή ζώνης, κλπ).
          </p>
        </div>
      )}
    </div>
  );
}