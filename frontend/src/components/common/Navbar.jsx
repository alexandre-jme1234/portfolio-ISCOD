import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCompetences, useExpertises, useProjects } from "../../hooks/useApi.js";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`inline-block w-3 h-3 ml-1.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="2 4 6 8 10 4" />
    </svg>
  );
}

function DropdownMenu({ open, children }) {
  return (
    <div
      className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ease-out ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
    >
      <ul
        className="min-w-[200px] bg-[#1a1f25] border border-white/10 rounded-lg shadow-xl py-1"
      >
        {children}
      </ul>
    </div>
  );
}

function DropdownItem({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-2 font-poppins font-normal text-[13px] text-white/80 whitespace-nowrap px-4 py-2.5 hover:text-portfolio-green hover:bg-white/[0.04] transition-colors duration-150"
      >
        <span className="w-1 h-1 rounded-full bg-portfolio-green/50 flex-shrink-0" />
        {label}
      </Link>
    </li>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`relative font-poppins font-medium text-[13px] tracking-wide whitespace-nowrap py-1 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-transform after:duration-200 after:origin-left ${active ? "text-portfolio-green after:bg-portfolio-green after:scale-x-100" : "text-white/70 hover:text-white after:bg-portfolio-green after:scale-x-0 hover:after:scale-x-100"}`}
    >
      {children}
    </Link>
  );
}

function DropdownTrigger({ active, open, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open ? "true" : "false"}
      className={`relative font-poppins font-medium text-[13px] tracking-wide whitespace-nowrap py-1 flex items-center transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[calc(100%-18px)] after:rounded-full after:transition-transform after:duration-200 after:origin-left ${active || open ? "text-portfolio-green after:bg-portfolio-green after:scale-x-100" : "text-white/70 hover:text-white after:bg-portfolio-green after:scale-x-0 hover:after:scale-x-100"}`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const { competences } = useCompetences();
  const { expertises } = useExpertises();
  const { projects } = useProjects();
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);

  const isActive = (basePath) =>
    pathname === basePath || pathname.startsWith(basePath + "/");

  const toggleMenu = (menu) => {
    console.log("Navbar dropdown clicked:", menu);
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 bg-[#171c21]/95 backdrop-blur-sm border-b border-white/[0.07]">
      <div className="flex items-center h-[72px] px-8 md:px-14 max-w-[1440px] mx-auto gap-10">

        {/* Brand — flex-shrink-0 garantit sa visibilité même sur petits écrans */}
        <Link
          to="/"
          className="font-poppins font-bold text-[15px] tracking-tight text-white hover:text-portfolio-green transition-colors duration-200 flex-shrink-0"
        >
          Alexandre<span className="text-portfolio-green">.</span>
        </Link>

        {/* Pas d'overflow sur cet élément ni sur ses parents directs : tout overflow non-visible
            clippe les enfants position:absolute (les dropdowns). 5 items → pas besoin de scroll. */}
        <ul className="flex items-center gap-5 lg:gap-8 flex-1 justify-end list-none">

          {/* Accueil */}
          <li className="flex-shrink-0">
            <NavLink to="/" active={pathname === "/"}>Accueil</NavLink>
          </li>

          {/* Compétences */}
          <li className="relative flex-shrink-0">
            <DropdownTrigger
              active={isActive("/competences")}
              open={openMenu === "competences"}
              onClick={(event) => {
                event.stopPropagation();
                toggleMenu("competences");
              }}
            >
              Compétences
              <ChevronIcon open={openMenu === "competences"} />
            </DropdownTrigger>
            <DropdownMenu open={openMenu === "competences"}>
              {competences.map((c) => (
                <DropdownItem key={c.slug} to={`/competences/${c.slug}`} label={c.title} />
              ))}
            </DropdownMenu>
          </li>

          {/* Projets */}
          <li className="relative flex-shrink-0">
            <DropdownTrigger
              active={isActive("/projets")}
              open={openMenu === "projets"}
              onClick={(event) => {
                event.stopPropagation();
                toggleMenu("projets");
              }}
            >
              Projets
              <ChevronIcon open={openMenu === "projets"} />
            </DropdownTrigger>
            <DropdownMenu open={openMenu === "projets"}>
              {projects.map((p) => (
                <DropdownItem key={p.slug} to={`/projets/${p.slug}`} label={p.title} />
              ))}
            </DropdownMenu>
          </li>

          {/* Expertises */}
          <li className="relative flex-shrink-0">
            <DropdownTrigger
              active={isActive("/expertises")}
              open={openMenu === "expertises"}
              onClick={(event) => {
                event.stopPropagation();
                toggleMenu("expertises");
              }}
            >
              Expertises
              <ChevronIcon open={openMenu === "expertises"} />
            </DropdownTrigger>
            <DropdownMenu open={openMenu === "expertises"}>
              {expertises.map((e) => (
                <DropdownItem key={e.slug} to={`/expertises/${e.slug}`} label={e.title} />
              ))}
            </DropdownMenu>
          </li>

          {/* Contact — CTA pill */}
          <li className="flex-shrink-0 ml-2">
            <Link
              to="/contact"
              className="inline-flex items-center font-poppins font-semibold text-[12px] tracking-wide
                         text-portfolio-green border border-portfolio-green/70
                         px-5 py-2 rounded-full
                         hover:bg-portfolio-green hover:border-portfolio-green hover:text-[#171c21]
                         transition-all duration-200 whitespace-nowrap"
            >
              Contact
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}
