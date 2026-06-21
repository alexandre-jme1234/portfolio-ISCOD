import { Link } from "react-router-dom";
import { useExpertises, useProjects, useCompetences } from "../../hooks/useApi.js";

/**
 * Footer — reproduit le frame footer (241:1328).
 * CTA banner + "Book" heading + 3 colonnes (Projets / Expertises / Me contacter)
 * + bouton retour haut + barre de bas de page.
 */
export default function Footer() {
  const { expertises }   = useExpertises();
  const { projects }     = useProjects();
  const { competences }  = useCompetences();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="relative bg-[#171c21] overflow-hidden">
      {/* CTA Banner */}
      <div className="border border-white/20 mx-[80px] my-12 rounded-[4px] px-10 py-6 flex items-center justify-between gap-6">
        <p className="font-poppins font-light text-white text-[18px] leading-snug max-w-[600px]">
          Prenons un temps en visio pour comprendre vos enjeux et vos objectifs.
        </p>
        <a
          href="mailto:alexandre@coliback.com"
          className="flex-shrink-0 border border-white/40 text-white font-poppins font-medium text-[16px] px-7 py-3 rounded-[4px] hover:border-[#cdfb7c] hover:text-[#cdfb7c] transition-colors whitespace-nowrap"
        >
          Prendre rendez-vous
        </a>
      </div>

      {/* Séparateur */}
      <div className="h-px bg-white/10 mx-[80px]" />

      {/* Corps du footer */}
      <div className="px-[80px] py-16 flex items-start gap-0 relative z-10">
        {/* "Book" heading — colonne gauche large */}
        <div className="flex-1 mr-16">
          <h2 className="font-poppins font-bold text-white text-[64px] leading-none">Book</h2>
        </div>

        {/* Colonnes de liens */}
        <div className="flex gap-16 flex-shrink-0">
          {/* Projets */}
          <div>
            <h3 className="font-poppins font-bold text-white text-[20px] mb-4">Projets</h3>
            <ul className="flex flex-col gap-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/projets/${p.slug}`}
                    className="font-poppins font-light text-white/70 text-[16px] hover:text-white transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compétences */}
          <div>
            <h3 className="font-poppins font-bold text-white text-[20px] mb-4">Compétences</h3>
            <ul className="flex flex-col gap-2">
              {competences.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/competences/${c.slug}`}
                    className="font-poppins font-light text-white/70 text-[16px] hover:text-white transition-colors"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertises */}
          <div>
            <h3 className="font-poppins font-bold text-white text-[20px] mb-4">Expertises</h3>
            <ul className="flex flex-col gap-2">
              {expertises.map((e) => (
                <li key={e.slug}>
                  <Link
                    to={`/expertises/${e.slug}`}
                    className="font-poppins font-light text-white/70 text-[16px] hover:text-white transition-colors"
                  >
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Me contacter */}
          <div>
            <h3 className="font-poppins font-bold text-white text-[20px] mb-4">Me contacter</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://wa.me/32768308711"
                  target="_blank" rel="noreferrer"
                  className="font-poppins font-light text-white/70 text-[16px] hover:text-white transition-colors"
                >
                  Me contacter par Whats&apos;app
                </a>
              </li>
              <li>
                <a
                  href="mailto:alexandre@coliback.com"
                  className="font-poppins font-light text-white/70 text-[16px] hover:text-white transition-colors"
                >
                  Prendre un rendez-vous
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank" rel="noreferrer"
                  className="font-poppins font-light text-white/70 text-[16px] hover:text-white transition-colors"
                >
                  Me suivre sur Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bouton retour en haut — carré vert */}
        <button
          onClick={scrollTop}
          aria-label="Retour en haut"
          className="ml-10 flex-shrink-0 w-14 h-14 bg-[#cdfb7c] flex items-center justify-center hover:brightness-110 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171c21" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>

      {/* Barre de bas de page */}
      <div className="h-px bg-white/10 mx-[80px]" />
      <div className="px-[80px] py-5 flex items-center justify-between">
        <span className="font-poppins font-light text-white/40 text-[14px]">
          Développé et conçus par Alexandre JAMME
        </span>
        <div className="flex gap-8">
          <a href="/mentions-legales" className="font-poppins font-light text-white/40 text-[14px] hover:text-white/70 transition-colors">
            Mentions légales
          </a>
          <a href="/terms" className="font-poppins font-light text-white/40 text-[14px] hover:text-white/70 transition-colors">
            Terms of use
          </a>
        </div>
      </div>
    </footer>
  );
}
