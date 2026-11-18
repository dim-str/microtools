"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { amountInGreekWords } from "@/lib/tool-calculations";

export default function Arithmografos() {
  const [amount, setAmount] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState("");
  const { error, run } = useToolAction();

  const convert = () => run(() => setResult(amountInGreekWords(amount)));

  const handleCopy = () => run(async () => {
    if (!result) throw new Error("Δεν υπάρχει αποτέλεσμα για αντιγραφή.");
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Ποσό (€)</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="π.χ. 1452.30"
          className="w-full rounded-lg border border-input bg-background p-4 text-lg outline-none focus:ring-2 focus:ring-primary/50"
        />
        <p className="text-xs text-muted-foreground">Χρησιμοποιήστε τελεία (.) για δεκαδικά.</p>
      </div>

      <Button onClick={convert} className="w-full sm:w-auto">Μετατροπή</Button>
      <ToolError message={error} />

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Ολογράφως</label>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-2">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Αντιγράφηκε!" : "Αντιγραφή"}
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-muted/50 p-6">
            <p className="text-lg font-medium leading-relaxed">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
}