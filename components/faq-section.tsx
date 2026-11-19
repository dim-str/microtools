import { ChevronDown } from "lucide-react";
import type { ToolFAQ } from "@/lib/tools";

export function FAQSection({ faqs }: { faqs: ToolFAQ[] }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="my-10 space-y-4">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">
        Συχνές Ερωτήσεις
      </h2>
      <div className="space-y-3">
        {faqs.map(({ question, answer }) => (
          <details
            key={question}
            className="group rounded-xl border border-border bg-card"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 p-4 font-medium marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span>{question}</span>
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
