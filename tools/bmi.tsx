"use client";

import { useState } from "react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { calculateBmi } from "@/lib/tool-calculations";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<{ bmi: number; category: string; bmr: number } | null>(null);
  const { error, run } = useToolAction();

  const calculate = () => run(() => setResult(calculateBmi(weight, height, age, gender)));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Βάρος (κιλά)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="π.χ. 75" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ύψος (εκατοστά)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="π.χ. 175" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ηλικία</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="π.χ. 30" className="w-full rounded-lg border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Φύλο</label>
          <div className="flex gap-2">
            <button onClick={() => setGender("male")} className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${gender === "male" ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"}`}>Άνδρας</button>
            <button onClick={() => setGender("female")} className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${gender === "female" ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted"}`}>Γυναίκα</button>
          </div>
        </div>
      </div>

      <button onClick={calculate} className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Υπολογισμός
      </button>

      <ToolError message={error} />

      {result && (
        <div className="rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-muted-foreground">Δείκτης Μάζας Σώματος (ΔΜΣ):</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{result.bmi.toFixed(1)}</span>
              <p className="text-sm font-medium">{result.category}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Βασικός Μεταβολισμός (BMR):</span>
            <span className="font-medium">{Math.round(result.bmr)} θερμίδες/ημέρα</span>
          </div>
        </div>
      )}
    </div>
  );
}