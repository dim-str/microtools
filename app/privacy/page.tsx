import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Πολιτική Απορρήτου | MicroTools.gr",
};

const lastUpdated = "18 Νοεμβρίου 2026";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Πολιτική Απορρήτου</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Τελευταία ενημέρωση: {lastUpdated}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <div>
          <h2 className="mb-2 text-xl font-semibold">1. Υπεύθυνος Επεξεργασίας</h2>
          <p>
            Υπεύθυνος επεξεργασίας είναι ο Στρίγκος Δημήτριος, διαχειριστής του
            MicroTools.gr. Για θέματα προσωπικών δεδομένων μπορείτε να επικοινωνήσετε
            στο{" "}
            <a className="text-primary underline" href="mailto:info-microtools@gmail.com">
              info-microtools@gmail.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">2. Δεδομένα που επεξεργαζόμαστε</h2>
          <p>
            Οι υπολογισμοί και οι μετατροπές των εργαλείων εκτελούνται στον browser
            σας. Οι τιμές και τα κείμενα που εισάγετε δεν αποστέλλονται από τα εργαλεία
            στους διακομιστές μας.
          </p>
          <p className="mt-2">
            Αν επικοινωνήσετε μαζί μας μέσω email, θα επεξεργαστούμε τα στοιχεία και
            το περιεχόμενο που μας στείλατε για να απαντήσουμε στο αίτημά σας. Κατά
            την τεχνική λειτουργία της ιστοσελίδας, ο πάροχος φιλοξενίας ενδέχεται να
            επεξεργάζεται περιορισμένα τεχνικά δεδομένα σύνδεσης για λόγους λειτουργίας
            και ασφάλειας.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">3. Cookies και τοπική αποθήκευση</h2>
          <p>
            Αποθηκεύουμε στον browser σας την επιλογή αποδοχής ή απόρριψης των
            προαιρετικών cookies, ώστε να μην εμφανίζεται ξανά το σχετικό μήνυμα.
            Περισσότερες πληροφορίες υπάρχουν στην{" "}
            <a className="text-primary underline" href="/cookies">
              Πολιτική Cookies
            </a>
            .
          </p>
          <p className="mt-2">
            Η τρέχουσα έκδοση δεν φορτώνει υπηρεσίες Google Analytics ή διαφημιστικά
            scripts. Αν προστεθούν τέτοιες υπηρεσίες, η πολιτική και οι επιλογές
            συγκατάθεσης θα ενημερωθούν.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">4. Σκοπός και νομική βάση</h2>
          <p>
            Χρησιμοποιούμε τα στοιχεία που μας στέλνετε για να απαντήσουμε σε
            επικοινωνίες σας και τα τεχνικά δεδομένα για την ασφαλή και ορθή λειτουργία
            της ιστοσελίδας. Η επιλογή cookies αποθηκεύεται για να θυμόμαστε τη
            συγκατάθεσή σας ή την άρνησή σας.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">5. Τα δικαιώματά σας</h2>
          <p>
            Σύμφωνα με την ισχύουσα νομοθεσία, μπορείτε να ζητήσετε πρόσβαση,
            διόρθωση ή διαγραφή των προσωπικών δεδομένων σας, περιορισμό ή εναντίωση
            στην επεξεργασία και, όπου εφαρμόζεται, φορητότητα. Για σχετικά αιτήματα
            επικοινωνήστε στο{" "}
            <a className="text-primary underline" href="mailto:info-microtools@gmail.com">
              info-microtools@gmail.com
            </a>
            . Έχετε επίσης δικαίωμα υποβολής καταγγελίας στην αρμόδια εποπτική αρχή.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">6. Διατήρηση και ενημερώσεις</h2>
          <p>
            Διατηρούμε τα email επικοινωνίας μόνο για όσο χρειάζεται για τη διαχείριση
            του αιτήματός σας και τυχόν σχετικές υποχρεώσεις. Η παρούσα πολιτική
            μπορεί να ενημερώνεται όταν αλλάζουν οι υπηρεσίες ή οι νομικές απαιτήσεις.
          </p>
        </div>
      </section>
    </main>
  );
}
