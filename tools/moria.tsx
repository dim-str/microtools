"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateMoria } from "@/lib/tool-calculations";

export default function MoriaCalculator() {
  const [grades, setGrades] = useState({ g1: "", g2: "", g3: "", g4: "" });
  const [result, setResult] = useState<number | null>(null);
  const { error, run } = useToolAction();

  const calculate = () =>
    run(() => setResult(calculateMoria([grades.g1, grades.g2, grades.g3, grades.g4])));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {["g1", "g2", "g3", "g4"].map((key, index) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">Βαθμός Μαθήματος {index + 1}</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="20"
              value={grades[key as keyof typeof grades]}
              onChange={(e) => setGrades({ ...grades, [key]: e.target.value })}
              placeholder="π.χ. 15.5"
              className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        ))}
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός Μορίων
      </button>

      <ToolError message={error} />

      {result !== null && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-2">
          <div className="flex justify-between items-center text-xl font-bold text-primary">
            <span>Εκτιμώμενα Μόρια:</span>
            <span>{Math.round(result).toLocaleString("el-GR")}</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            * Ο υπολογισμός είναι ενδεικτικός και βασίζεται στον μέσο όρο. Τα πραγματικά μόρια εξαρτώνται από τους ειδικούς συντελεστές βαρύτητας κάθε σχολής.
          </p>
        </div>
      )}
    </div>
  );
}