"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

type Tool = {
  slug: string;
  name: string;
  description: string;
};

export function ToolSearch({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("");

  // Φιλτράρουμε τα εργαλεία με βάση το όνομα ή την περιγραφή
  const filteredTools = tools.filter((tool) => {
    const searchString = `${tool.name} ${tool.description}`.toLowerCase();
    return searchString.includes(query.toLowerCase());
  });

  return (
    <div className="w-full">
      {/* Η μπάρα αναζήτησης */}
      <div className="relative w-full max-w-md mx-auto mt-6 mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Αναζήτηση εργαλείου (π.χ. ΦΠΑ, ΑΦΜ, Δώρο)..."
          className="w-full rounded-full border border-border bg-background px-10 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        />
      </div>

      {/* Τα αποτελέσματα */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div>
              <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {t.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.description}
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
              Άνοιγμα εργαλείου <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        ))}

        {filteredTools.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-10">
            Δεν βρέθηκαν εργαλεία για "{query}".
          </p>
        )}
      </div>
    </div>
  );
}