"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateLeaveAllowance } from "@/lib/tool-calculations";

export default function EpidomaAdeias() {
  const [salary, setSalary] = useState("");
  const [daysWorked, setDaysWorked] = useState("");
  const [result, setResult] = useState<{ days: number; amount: number } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() => setResult(calculateLeaveAllowance(salary, daysWorked)));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Μικτός Μηνιαίος Μισθός (€)</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="π.χ. 1000" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ημέρες Εργασίας (στο έτος)</label>
          <input type="number" value={daysWorked} onChange={(e) => setDaysWorked(e.target.value)} placeholder="π.χ. 150" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός Επιδόματος
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Δικαιούμενες Ημέρες Άδειας:</span>
            <span className="font-medium">{result.days} ημέρες</span>
          </div>
          <div className="flex justify-between pt-2 border-t text-xl font-bold text-primary">
            <span>Ποσό Επιδόματος:</span>
            <span>{result.amount.toFixed(2)} €</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            * Ο υπολογισμός γίνεται αναλογικά με βάση τις ημέρες εργασίας.
          </p>
        </div>
      )}
    </div>
  );
}