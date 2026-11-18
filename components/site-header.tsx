"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { Wrench, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Wrench className="h-5 w-5 text-primary" />
          <span>MicroTools</span>
        </Link>
        
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-muted md:hidden"
        >
          {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          <span>Μενού</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <div className="relative">
            <button 
              type="button"
              aria-expanded={isOpen}
              aria-controls="desktop-tools-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              Tools <ChevronDown className="h-4 w-4" />
            </button>
            {isOpen && (
              <div id="desktop-tools-menu" className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-56 overflow-y-auto overscroll-contain rounded-md border border-border bg-popover p-1 shadow-md">
                {tools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-sm px-2 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Κύρια πλοήγηση"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain border-b border-border bg-background p-2 shadow-lg md:hidden"
        >
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex min-h-11 items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Αρχική
          </Link>
          <p className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Εργαλεία
          </p>
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex min-h-11 items-center rounded-md px-4 py-2 text-sm hover:bg-muted"
            >
              {tool.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}