import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "./ad-slot";
import type { ToolMeta } from "@/lib/tools";
import { ToolCalculationHint } from "./tool-calculation-hint";

export function ToolShell({
  tool,
  children,
}: {
  tool: ToolMeta;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Tools
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
        <ToolCalculationHint slug={tool.slug} hint={tool.calculationHint} />
      </div>
      <p className="mt-2 text-muted-foreground">{tool.description}</p>

      <AdSlot slot="tool-top" className="my-6" />

      <section className="my-8">{children}</section>

      <AdSlot slot="tool-bottom" className="my-6" />
    </main>
  );
}