import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
        <p>© 2026 MicroTools.gr. Όλα τα δικαιώματα διατηρούνται.</p>
        <nav aria-label="Νομικές πληροφορίες" className="flex flex-wrap justify-center gap-4">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Απόρρητο
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Όροι Χρήσης
          </Link>
          <Link href="/cookies" className="transition-colors hover:text-foreground">
            Cookies
          </Link>
          <a
            href="mailto:info-microtools@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            Επικοινωνία
          </a>
        </nav>
      </div>
    </footer>
  );
}
