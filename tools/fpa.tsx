"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateVat } from "@/lib/tool-calculations";

export default function FpaCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(24);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [result, setResult] = useState<{ net: number; vat: number; total: number } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() => setResult(calculateVat(amount, rate, mode)));

  return (
    <div className="space-y-6">
      <div className="flex gap-4 p-1 bg-muted rounded-lg w-fit">
        <button
          onClick={() => setMode("add")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === "add" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
        >
          Προσθήκη ΦΠΑ (Καθαρή -&gt; Τελική)
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === "remove" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
        >
          Αφαίρεση ΦΠΑ (Τελική -&gt; Καθαρή)
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ποσό (€)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="π.χ. 100"
            className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Συντελεστής ΦΠΑ</label>
          <div className="flex gap-2">
            {[24, 13, 6].map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${rate === r ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"}`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Καθαρή Αξία:</span>
            <span className="font-medium">{result.net.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ΦΠΑ ({rate}%):</span>
            <span className="font-medium">{result.vat.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between pt-2 border-t text-xl font-bold text-primary">
            <span>Τελική Αξία:</span>
            <span>{result.total.toFixed(2)} €</span>
          </div>
        </div>
      )}
    </div>
  );
}