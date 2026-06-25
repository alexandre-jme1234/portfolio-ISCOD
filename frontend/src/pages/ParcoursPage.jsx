import { Link } from "react-router-dom";
import { PARCOURS_ENTRIES } from "../data/parcours.js";
import TimelineEntry from "../components/parcours/TimelineEntry.jsx";

/**
 * ParcoursPage — Frise chronologique du parcours (URL : /parcours).
 *
 * Reproduit la maquette Figma "parcours-frise-verticale" (node 2167:879) :
 *   - Lien retour "← Accueil" + titre "Parcours" souligné
 *   - Frise verticale centrée : ligne au milieu, entrées alternées gauche/droite
 *
 * Les entrées proviennent de src/data/parcours.js et sont rendues via le
 * composant réutilisable <TimelineEntry />.
 */
export default function ParcoursPage() {
  return (
    <main className="min-h-screen bg-[#171c21] pt-[80px] pb-[120px] px-[80px] relative overflow-hidden">
      {/* Halo violet d'ambiance (cohérent avec les autres pages) */}
      <div
        className="blob-purple absolute rounded-full"
        style={{ width: "2000px", height: "1200px", top: "-400px", left: "-700px", opacity: 0.2 }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* En-tête : retour + titre */}
        <header className="flex flex-col gap-3 mb-24">
          <Link
            to="/"
            className="flex items-center gap-2 font-poppins font-medium text-[16px] text-portfolio-green/85 hover:text-portfolio-green transition-colors w-fit"
          >
            ← Accueil
            <span className="h-px w-[70px] bg-portfolio-green/40" aria-hidden="true" />
          </Link>

          <h1 className="font-poppins font-bold text-[80px] text-white leading-normal">
            Parcours
          </h1>
          {/* Trait de soulignement sous le titre */}
          <span className="h-[3px] w-[120px] bg-portfolio-green rounded-full" aria-hidden="true" />
        </header>

        {/* Frise verticale */}
        <section className="relative w-full" aria-label="Frise chronologique du parcours">
          {/* Ligne centrale */}
          <span
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.13]"
            aria-hidden="true"
          />

          {/* Liste des entrées, espacées de 80px (gap maquette) */}
          <ol className="relative flex flex-col gap-20 list-none m-0 p-0">
            {PARCOURS_ENTRIES.map((entry, index) => (
              <TimelineEntry key={index} entry={entry} />
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
