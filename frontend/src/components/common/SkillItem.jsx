/**
 * SkillItem — reproduit les rangées de compétences (Frame 18…27 maquette).
 * Losange vert (diamond) + nom Poppins Medium 24px + description Poppins Regular 16px grisée.
 */
export default function SkillItem({ name, description }) {
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Losange vert */}
      <div className="diamond flex-shrink-0" aria-hidden />

      {/* Texte */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="text-skill-name truncate">{name}</p>
        {description && (
          <p className="text-skill-desc truncate">{description}</p>
        )}
      </div>
    </div>
  );
}
