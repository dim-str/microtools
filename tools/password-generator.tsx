"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";
import { ToolError, useToolAction } from "@/components/tool-error";
import { generatePassword } from "@/lib/tool-calculations";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const { error, run } = useToolAction();

  const generate = () => run(() => setPassword(generatePassword(length, options)));

  const handleCopy = () => run(async () => {
    if (!password) throw new Error("Δημιουργήστε πρώτα έναν κωδικό.");
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Πατήστε 'Δημιουργία'"
              className="w-full rounded-lg border border-input bg-background p-4 font-mono text-lg outline-none pr-24"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" onClick={generate} title="Ανανέωση">
                <RefreshCw className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy} title="Αντιγραφή">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Μήκος: {length}</label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-2/3"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "uppercase", label: "Κεφαλαία (A-Z)" },
              { key: "lowercase", label: "Πεζά (a-z)" },
              { key: "numbers", label: "Αριθμοί (0-9)" },
              { key: "symbols", label: "Σύμβολα (!@#)" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[key as keyof typeof options]}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <ToolError message={error} />
    </div>
  );
}