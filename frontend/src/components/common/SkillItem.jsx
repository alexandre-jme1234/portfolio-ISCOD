import { getSkillIconUrl } from "../../utils/skillIconMap.js";

/**
 * SkillItem — reproduit les rangées de compétences (Frame 18…27 maquette).
 *
 * Affiche l'icône SVG Figma de la technologie quand elle est disponible.
 * Repli sur le losange vert (.diamond) si aucun SVG ne correspond à l'iconKey.
 *
 * @param {string}      name        - Nom de la compétence (ex : "React")
 * @param {string}      description - Description courte (ex : "POO / Single Page Application")
 * @param {string}      [iconKey]   - Clé d'icône issue de la BDD (ex : "react", "docker")
 */
export default function SkillItem({ name, description, iconKey }) {
  // Résout l'URL du SVG Figma ou null si non disponible
  const iconUrl = getSkillIconUrl(iconKey);

  return (
    <div className="flex items-center gap-4 w-full">

      {/* Icône SVG Figma OU losange vert de fallback */}
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={`Icône ${name}`}
          width={40}
          height={40}
          className="flex-shrink-0 w-[40px] h-[40px] object-contain"
        />
      ) : (
        <div className="diamond flex-shrink-0" aria-hidden="true" />
      )}

      {/* Texte : nom + description */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-skill-name truncate">{name}</p>
        {description && (
          <p className="text-skill-desc truncate">{description}</p>
        )}
      </div>

    </div>
  );
}
