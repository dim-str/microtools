import { tools } from "@/lib/tools";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const content = [
    "# MicroTools.gr",
    "",
    "> Ελληνική συλλογή δωρεάν διαδικτυακών εργαλείων για υπολογισμούς και καθημερινές εργασίες.",
    "",
    "## About",
    "",
    "Τα εργαλεία είναι διαθέσιμα στα Ελληνικά και οι υπολογισμοί ή οι μετατροπές εκτελούνται στον browser. Τα αποτελέσματα είναι ενδεικτικά και δεν αποτελούν επαγγελματική, νομική, ιατρική ή φορολογική συμβουλή.",
    "",
    "## Tools",
    "",
    ...tools.map(
      (tool) =>
        `- [${tool.name}](${siteUrl}/tools/${tool.slug}): ${tool.description}`,
    ),
    "",
    "## Site information",
    "",
    `- [Privacy policy](${siteUrl}/privacy)`,
    `- [Terms of use](${siteUrl}/terms)`,
    `- [Cookie policy](${siteUrl}/cookies)`,
    `- [Contact](mailto:info-microtools@gmail.com)`,
  ].join("\n");

  return new Response(`${content}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
