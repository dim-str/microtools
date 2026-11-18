"use client";

import { useMemo, useState } from "react";
import { countWords } from "@/lib/tool-calculations";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => countWords(text), [text]);

  const limits = [
    { name: "Twitter / X", limit: 280, current: stats.chars },
    { name: "Instagram Caption", limit: 2200, current: stats.chars },
    { name: "Facebook Post", limit: 63206, current: stats.chars },
    { name: "Meta Description (SEO)", limit: 160, current: stats.chars },
  ];

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={50000}
        placeholder="Γράψτε ή επικολλήστε το κείμενό σας εδώ..."
        className="h-64 w-full resize-y rounded-lg border border-input bg-background p-4 text-base outline-none focus:ring-2 focus:ring-ring"
      />
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          ["Λέξεις", stats.words],
          ["Χαρακτήρες", stats.chars],
          ["Χωρίς κενά", stats.charsNoSpaces],
          ["Προτάσεις", stats.sentences],
          ["Παράγραφοι", stats.paragraphs],
          ["Χρόνος ανάγνωσης", `${stats.readingTime} λεπτά`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-semibold tabular-nums">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Όρια Social Media & SEO</h3>
        {limits.map((l) => {
          const percent = Math.min((l.current / l.limit) * 100, 100);
          const isOver = l.current > l.limit;
          return (
            <div key={l.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium">{l.name}</span>
                <span className={isOver ? "text-red-500 font-bold" : "text-muted-foreground"}>
                  {l.current} / {l.limit} {isOver && "(Υπέρβαση)"}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${isOver ? "bg-red-500" : "bg-primary"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}