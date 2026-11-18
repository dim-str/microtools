"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateFuelCost } from "@/lib/tool-calculations";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [price, setPrice] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [result, setResult] = useState<{ total: number; perPerson: number; liters: number } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() =>
    setResult(calculateFuelCost(distance, consumption, price, passengers)),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Απόσταση (χλμ)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="π.χ. 250" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Κατανάλωση (λτ/100χλμ)</label>
          <input type="number" value={consumption} onChange={(e) => setConsumption(e.target.value)} placeholder="π.χ. 6.5" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Τιμή Καυσίμου (€/λτ)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="π.χ. 1.85" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Επιβάτες</label>
          <input type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} min="1" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός Κόστους
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Λίτρα που θα κάψετε:</span>
            <span className="font-medium">{result.liters.toFixed(2)} λτ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Συνολικό Κόστος:</span>
            <span className="font-medium text-lg text-primary">{result.total.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="text-muted-foreground">Κόστος ανά επιβάτη:</span>
            <span className="font-medium">{result.perPerson.toFixed(2)} €</span>
          </div>
        </div>
      )}
    </div>
  );
}