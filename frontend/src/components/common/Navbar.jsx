import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Acceuil",
    href: "/",
    isGreen: false,
    subitems: [],
  },
  {
    label: "developpement",
    isGreen: true,
    subitems: [
      { label: "Coliback Premium", href: "/projets/portail-coliback" },
      { label: "GenFacture",       href: "/projets/generateur-factures" },
    ],
  },
  {
    label: "ux.ui design",
    isGreen: true,
    subitems: [
      { label: "MyCityStock", href: "/projets/mycitystock" },
    ],
  },
  {
    label: "projets",
    href: "/#projets",
    isGreen: true,
    subitems: [],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Burger button — fixed top-right */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-8 right-10 z-40 flex flex-col gap-[7px] w-9 cursor-pointer group"
        aria-label="Ouvrir le menu"
      >
        <span className="block h-[3px] w-full bg-white rounded group-hover:bg-[#cdfb7c] transition-colors" />
        <span className="block h-[3px] w-full bg-white rounded group-hover:bg-[#cdfb7c] transition-colors" />
        <span className="block h-[3px] w-full bg-white rounded group-hover:bg-[#cdfb7c] transition-colors" />
      </button>

      {/* Dim overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Side panel — slides in from left */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-[#171c21] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "min(589px, 90vw)" }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-8 left-10 text-white hover:text-[#cdfb7c] transition-colors"
          aria-label="Fermer le menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Menu items */}
        <nav className="pt-28 px-12 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col">
              {item.href ? (
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-poppins font-bold text-[40px] leading-tight transition-opacity hover:opacity-75 ${
                    item.isGreen ? "text-[#cdfb7c]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-poppins font-bold text-[40px] leading-tight ${
                    item.isGreen ? "text-[#cdfb7c]" : "text-white"
                  }`}
                >
                  {item.label}
                </span>
              )}

              {item.subitems.length > 0 && (
                <ul className="mt-1 ml-2 flex flex-col gap-1">
                  {item.subitems.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        to={sub.href}
                        onClick={() => setOpen(false)}
                        className="font-poppins font-normal text-[22px] text-white hover:text-[#cdfb7c] transition-colors"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
