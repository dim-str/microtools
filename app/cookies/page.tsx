import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Πολιτική Cookies | MicroTools.gr",
};

const lastUpdated = "18 Νοεμβρίου 2026";

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Πολιτική Cookies</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Τελευταία ενημέρωση: {lastUpdated}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Η ιστοσελίδα χρησιμοποιεί τοπική αποθήκευση του browser για να θυμάται αν
          αποδεχτήκατε ή απορρίψατε προαιρετικά cookies. Η αποθήκευση αυτή δεν είναι
          cookie και παραμένει στη συσκευή σας.
        </p>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Τι είναι τα cookies;</h2>
          <p>
            Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται από έναν
            ιστότοπο στη συσκευή σας και μπορούν να χρησιμοποιηθούν για λειτουργικούς
            ή άλλους σκοπούς.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Cookies τρίτων</h2>
          <p>
            Η τρέχουσα έκδοση δεν φορτώνει υπηρεσίες Google Analytics ή διαφημιστικά
            scripts. Αν προστεθούν cookies τρίτων, θα ενημερωθεί η παρούσα πολιτική
            και θα ζητείται η απαιτούμενη επιλογή σας πριν από την ενεργοποίησή τους.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Διαχείριση επιλογής</h2>
          <p>
            Μπορείτε να διαγράψετε την αποθηκευμένη επιλογή καθαρίζοντας τα δεδομένα
            ιστοτόπου του browser σας. Τότε θα εμφανιστεί ξανά το μήνυμα επιλογής.
          </p>
        </div>
      </section>
    </main>
  );
}
