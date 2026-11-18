import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Όροι Χρήσης | MicroTools.gr",
};

const lastUpdated = "18 Νοεμβρίου 2026";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Όροι Χρήσης</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Τελευταία ενημέρωση: {lastUpdated}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="mb-2 text-xl font-semibold">1. Αποδοχή Όρων</h2>
          <p>
            Με τη χρήση του MicroTools.gr αποδέχεστε τους παρόντες όρους. Αν δεν
            συμφωνείτε, παρακαλούμε να μη χρησιμοποιείτε την ιστοσελίδα.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">2. Παρεχόμενες Υπηρεσίες</h2>
          <p>
            Το MicroTools.gr παρέχει δωρεάν διαδικτυακά εργαλεία. Τα αποτελέσματα
            είναι ενδεικτικά και παρέχονται «ως έχουν», χωρίς εγγύηση ακρίβειας ή
            καταλληλότητας για συγκεκριμένο σκοπό.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">3. Αποποίηση Ευθύνης</h2>
          <p>
            Τα εργαλεία, συμπεριλαμβανομένων των οικονομικών, υγειονομικών και
            εκπαιδευτικών υπολογισμών, δεν αποτελούν νομική, ιατρική, λογιστική ή
            άλλη επαγγελματική συμβουλή. Για επίσημες αποφάσεις ή υπολογισμούς
            απευθυνθείτε στον κατάλληλο επαγγελματία ή αρμόδιο φορέα.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">4. Πνευματική Ιδιοκτησία</h2>
          <p>
            Το περιεχόμενο της ιστοσελίδας προστατεύεται από την ισχύουσα νομοθεσία.
            Δεν επιτρέπεται η αντιγραφή ή αναδημοσίευσή του χωρίς άδεια, εκτός αν
            επιτρέπεται από τον νόμο.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">5. Επιτρεπόμενη Χρήση</h2>
          <p>
            Απαγορεύεται η χρήση της ιστοσελίδας με τρόπο που διαταράσσει τη λειτουργία
            της, παραβιάζει δικαιώματα τρίτων ή αντίκειται στον νόμο.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">6. Επικοινωνία και Εφαρμοστέο Δίκαιο</h2>
          <p>
            Υπεύθυνος του MicroTools.gr είναι ο Στρίγκος Δημήτριος. Για ερωτήματα
            σχετικά με τους όρους, επικοινωνήστε στο{" "}
            <a className="text-primary underline" href="mailto:info-microtools@gmail.com">
              info-microtools@gmail.com
            </a>
            . Οι όροι διέπονται από το ελληνικό δίκαιο.
          </p>
        </div>
      </section>
    </main>
  );
}
