import { Info } from "lucide-react";

export function ToolCalculationHint({
  slug,
  hint,
}: {
  slug: string;
  hint: string;
}) {
  const tooltipId = `calculation-hint-${slug}`;

  return (
    <span className="group relative inline-flex shrink-0">
      <button
        type="button"
        aria-label={`Τρόπος υπολογισμού: ${hint}`}
        aria-describedby={tooltipId}
        title={hint}
        className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Info aria-hidden="true" className="h-5 w-5" />
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden w-72 rounded-md border bg-popover p-3 text-left text-sm font-normal text-popover-foreground shadow-lg group-hover:block group-focus-within:block"
      >
        {hint}
      </span>
    </span>
  );
}
