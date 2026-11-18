"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { convertGreeklish } from "@/lib/tool-calculations";

export default function GreeklishConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toGreek" | "toGreeklish">("toGreek");
  const [copied, setCopied] = useState(false);
  const { error, run } = useToolAction();

  const convert = () => run(() => setOutput(convertGreeklish(input, mode)));

  const handleCopy = () => run(async () => {
    if (!output) throw new Error("Δεν υπάρχει αποτέλεσμα για αντιγραφή.");
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <span className="text-sm font-medium">Greeklish</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setMode(mode === "toGreek" ? "toGreeklish" : "toGreek");
            setInput(output);
            setOutput("");
          }}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">Ελληνικά</span>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Κείμενο προς μετατροπή</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={10000}
          placeholder={mode === "toGreek" ? "Γράψτε Greeklish (π.χ. kalimera)..." : "Γράψτε Ελληνικά (π.χ. καλημέρα)..."}
          className="h-32 w-full resize-y rounded-lg border border-input bg-background p-4 outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <Button onClick={convert} className="w-full sm:w-auto">
        Μετατροπή
      </Button>

      <ToolError message={error} />

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Αποτέλεσμα</label>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 gap-2">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Αντιγράφηκε!" : "Αντιγραφή"}
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-lg">{output}</p>
          </div>
        </div>
      )}
    </div>
  );
}