import Link from "next/link";
import { tools } from "@/lib/tools";
import { AdSlot } from "@/components/ad-slot";
import { ArrowRight, Search } from "lucide-react";
import { ToolSearch } from "@/components/tool-search";

export default function Home() {

  const toolData = tools.map((t) => ({
    slug: t.slug,
    name: t.name,
    description: t.description,
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12 md:py-24">
      <div className="mb-10 flex flex-col items-center space-y-4 text-center sm:mb-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Χρήσιμα Micro Tools.
          <br />
          <span className="text-muted-foreground">Απλά, γρήγορα, δωρεάν.</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Μια συλλογή από καθημερινά εργαλεία για την ελληνική αγορά. Χωρίς εγγραφές και χωρίς περιττά βήματα.
        </p>
        <ToolSearch tools={toolData} />
      </div>

      <AdSlot slot="home-top" className="mb-12" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
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
      </div>
    </main>
  );
}