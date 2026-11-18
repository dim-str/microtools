"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateDiscount } from "@/lib/tool-calculations";

export default function EkptosiCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState<{ final: number; saved: number } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() => setResult(calculateDiscount(price, discount)));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Αρχική Τιμή (€)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="π.χ. 150" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ποσοστό Έκπτωσης (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="π.χ. 20" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός Έκπτωσης
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Κέρδος (Έκπτωση):</span>
            <span className="font-medium text-green-600">-{result.saved.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between pt-2 border-t text-xl font-bold">
            <span>Τελική Τιμή:</span>
            <span>{result.final.toFixed(2)} €</span>
          </div>
        </div>
      )}
    </div>
  );
}