"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateApolysi } from "@/lib/tool-calculations";

export default function ApolysiCalculator() {
  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [notice, setNotice] = useState<"yes" | "no">("yes");
  const [result, setResult] = useState<{ months: number; amount: number } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() => setResult(calculateApolysi(salary, years, notice)));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Μικτός Μηνιαίος Μισθός (€)</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="π.χ. 1200" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Έτη Προϋπηρεσίας</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="π.χ. 5" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Τηρήθηκε η προειδοποίηση απόλυσης;</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={notice === "yes"} onChange={() => setNotice("yes")} className="text-primary focus:ring-primary" />
            Ναι (Κανονική αποζημίωση)
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={notice === "no"} onChange={() => setNotice("no")} className="text-primary focus:ring-primary" />
            Όχι (Με προσαύξηση)
          </label>
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός Αποζημίωσης
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Μήνες Αποζημίωσης:</span>
            <span className="font-medium">{result.months.toFixed(1)} μήνες</span>
          </div>
          <div className="flex justify-between pt-2 border-t text-xl font-bold text-primary">
            <span>Συνολικό Ποσό:</span>
            <span>{result.amount.toFixed(2)} €</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            * Ενδεικτικός υπολογισμός. Συμβουλευτείτε εργατολόγο για την επίσημη εκτίμηση.
          </p>
        </div>
      )}
    </div>
  );
}