"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateDoro } from "@/lib/tool-calculations";

export default function DoroXristougennon() {
  const [salary, setSalary] = useState<number | "">("");
  const [hireDate, setHireDate] = useState("");
  const [result, setResult] = useState<{ doro: number; days: number; ratio: number; type: string } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() =>
    setResult(calculateDoro(String(salary), hireDate)),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Μικτός Μηνιαίος Μισθός (€)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value ? Number(e.target.value) : "")}
            placeholder="π.χ. 1000"
            className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ημερομηνία Πρόσληψης</label>
          <input
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full sm:w-auto">
        Υπολογισμός Δώρου
      </Button>

      <ToolError message={error} />

      {result && (
        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-4">{result.type}</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Ημέρες Απασχόλησης:</span>
              <span className="font-medium">{result.days} ημέρες</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Αναλογία:</span>
              <span className="font-medium">{(result.ratio * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between pt-2 text-xl font-bold text-primary">
              <span>Δικαιούμενο Δώρο:</span>
              <span>{result.doro.toFixed(2)} €</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}