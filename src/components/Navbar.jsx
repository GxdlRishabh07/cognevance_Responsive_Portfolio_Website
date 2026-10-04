import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 bg-background/85 backdrop-blur transition-shadow ${scrolled ? "shadow-soft" : ""}`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Main"
      >
        <a href="#top" className="font-serif text-xl tracking-tight">
          {profile.name}
        </a>
        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="nav-link text-sm font-semibold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden rounded-xl p-2 hover:bg-muted"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul className="md:hidden border-t px-6 py-4 space-y-3 bg-background animate-in slide-in-from-top-2">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block py-1 text-lg font-serif"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
export { Navbar };
