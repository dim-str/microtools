type FaqItem = {
  question: string;
  answer: string;
};

export function SeoContent({
  title,
  description,
  faqs,
}: {
  title: string;
  description: string; // Εδώ μπορείς να βάλεις HTML (<p>, <ul>) αν θες
  faqs: FaqItem[];
}) {
  // Δημιουργία του Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="mt-16 border-t pt-10">
      {/* Εισαγωγή του Schema στο HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
      
      {/* Το κείμενο (description) */}
      <div 
        className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-10"
        dangerouslySetInnerHTML={{ __html: description }} 
      />

      {/* Το FAQ Section */}
      {faqs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Συχνές Ερωτήσεις</h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border rounded-lg bg-card [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-muted-foreground"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}