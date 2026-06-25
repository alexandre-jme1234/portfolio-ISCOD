/**
 * VisionCard — carte d'un argument "vision pédagogique".
 *
 * Fidèle à la maquette Figma (node 2179:911) :
 *   - fond sombre #1e252b, coins arrondis
 *   - barre verticale violette (8px) sur le bord gauche
 *   - titre (Poppins SemiBold 24px) + description (Crimson Text, 18px, opacité 80%)
 *
 * Réutilisable : alimentée par un objet { title, description } provenant de l'API.
 */
export default function VisionCard({ title, description }) {
  return (
    <article className="flex flex-1 min-w-0 self-stretch rounded-[8px] overflow-hidden bg-[#1e252b]">
      {/* Barre d'accent violette à gauche */}
      <span className="w-[8px] shrink-0 bg-portfolio-purple" aria-hidden="true" />

      {/* Contenu */}
      <div className="flex flex-col gap-4 p-8 text-white">
        <h3 className="font-poppins font-semibold text-[24px]">{title}</h3>
        <p className="font-crimson font-semibold text-[18px] leading-[1.6] opacity-80">
          {description}
        </p>
      </div>
    </article>
  );
}
