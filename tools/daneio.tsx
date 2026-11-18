"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateLoan } from "@/lib/tool-calculations";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () =>
    run(() => setResult(calculateLoan(principal, annualRate, years)));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ποσό Δανείου (€)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="π.χ. 100000"
            className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ετήσιο Επιτόκιο (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="π.χ. 4.5"
            className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Διάρκεια (έτη)</label>
          <input
            type="number"
            min="1"
            max="50"
            step="1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="π.χ. 20"
            className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός Δόσης
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Μηνιαία Δόση:</span>
            <span className="font-medium">{result.monthlyPayment.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Συνολικοί Τόκοι:</span>
            <span className="font-medium">{result.totalInterest.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between pt-2 border-t text-xl font-bold text-primary">
            <span>Συνολικό Ποσό:</span>
            <span>{result.totalPayment.toFixed(2)} €</span>
          </div>
        </div>
      )}
    </div>
  );
}