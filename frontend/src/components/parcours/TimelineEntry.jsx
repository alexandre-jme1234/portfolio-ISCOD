import { Link } from "react-router-dom";

/**
 * TimelineEntry — une entrée de la frise chronologique du parcours.
 *
 * Fidèle à la maquette Figma (node 2167:879) :
 *   - date (vert)  +  badge type (Expérience = vert / Formation = violet)  +  logo 44px
 *   - titre (blanc) · organisme (violet) · sous-titre (blanc 80%)
 *   - lien "Voir le détail →" (vert) suivi d'un trait → vers /parcours/:slug
 *
 * L'entrée se place à gauche ou à droite de la ligne centrale selon `side`.
 * Le contenu est aligné vers la ligne centrale (droite pour une carte de gauche,
 * gauche pour une carte de droite).
 */

/** Pastille colorée indiquant le type d'étape (expérience vs formation). */
function TypeBadge({ type }) {
  // Expérience → vert ; Formation → violet (couleurs de la charte Figma)
  const isExperience = type === "experience";
  const colorClasses = isExperience
    ? "border-portfolio-green text-portfolio-green bg-portfolio-green/10"
    : "border-portfolio-purple text-portfolio-purple bg-portfolio-purple/10";

  return (
    <span
      className={`inline-flex items-center rounded-[20px] border px-3 py-1 font-poppins font-semibold text-[11px] uppercase ${colorClasses}`}
    >
      {isExperience ? "Expérience" : "Formation"}
    </span>
  );
}

/** Logo carré 44px de l'organisme (rien n'est rendu si la maquette n'en prévoit pas). */
function EntryLogo({ logo, logoAlt }) {
  if (!logo) return null;
  return (
    <div className="shrink-0 size-[44px] rounded-[6px] border border-white/[0.13] overflow-hidden">
      <img
        src={logo}
        alt={logoAlt}
        className="size-full object-contain rounded-[6px]"
      />
    </div>
  );
}

/** Lien "Voir le détail →" + trait → navigue vers la page détail /parcours/:slug. */
function DetailLink({ align, slug }) {
  return (
    <Link
      to={`/parcours/${slug}`}
      className={`flex items-center gap-[6px] pt-1 group ${align === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      <span className="font-poppins font-medium text-[13px] text-portfolio-green/90 group-hover:text-portfolio-green whitespace-nowrap transition-colors">
        Voir le détail →
      </span>
      <span className="h-px w-[90px] bg-portfolio-green/30 group-hover:bg-portfolio-green/60 transition-colors" aria-hidden="true" />
    </Link>
  );
}

export default function TimelineEntry({ entry }) {
  const { side, date, type, title, org, subtitle, logo, logoAlt, detail, slug } = entry;
  const isLeft = side === "left";
  // Alignement du contenu vers la ligne centrale
  const align = isLeft ? "right" : "left";
  const alignClasses = isLeft ? "items-end text-right" : "items-start text-left";

  // La carte elle-même (réutilisée des deux côtés)
  const card = (
    <article className={`flex flex-col gap-1 max-w-[460px] ${alignClasses}`}>
      {/* En-tête : bloc (date + badge) et logo côte à côte */}
      <div className="flex items-start gap-4 mb-1">
        <div className={`flex flex-col gap-[2px] ${isLeft ? "items-end" : "items-start"}`}>
          <span className="font-poppins font-semibold text-[16px] text-portfolio-green whitespace-nowrap">
            {date}
          </span>
          <TypeBadge type={type} />
        </div>
        <EntryLogo logo={logo} logoAlt={logoAlt} />
      </div>

      {/* Titre */}
      <h3 className="font-poppins font-semibold text-[24px] text-white leading-normal">
        {title}
      </h3>

      {/* Organisme */}
      <p className="font-crimson font-semibold text-[20px] text-portfolio-purple">
        {org}
      </p>

      {/* Sous-titre (optionnel) */}
      {subtitle && (
        <p className="font-crimson text-[16px] text-white/80">{subtitle}</p>
      )}

      {/* Lien détail — affiché seulement si l'entrée le prévoit (champ `detail` + `slug`) */}
      {detail && slug && <DetailLink align={align} slug={slug} />}
    </article>
  );

  return (
    <li className="relative w-full">
      {/* Pastille sur la ligne centrale */}
      <span
        className="absolute left-1/2 -translate-x-1/2 top-2 size-3 rounded-full bg-portfolio-green ring-4 ring-[#171c21] z-10"
        aria-hidden="true"
      />

      {/* Deux demi-colonnes séparées par la ligne centrale */}
      <div className="grid grid-cols-2">
        {/* Demi-gauche : carte si side === left */}
        <div className="flex justify-end pr-12">{isLeft && card}</div>
        {/* Demi-droite : carte si side === right */}
        <div className="flex justify-start pl-12">{!isLeft && card}</div>
      </div>
    </li>
  );
}
