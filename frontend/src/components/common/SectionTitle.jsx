/**
 * SectionTitle — Pattern label (Poppins Light 20px) + heading (Poppins Bold 80px).
 * Reproduit le composant "Skills Container / Skills Subcontainer" de la maquette.
 * Réutilisé dans toutes les sections : Compétences, Expertises, Cursus, Projets.
 */
export default function SectionTitle({
  label,
  title,
  titleColor = "text-white",
  className = "",
}) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      {label && <p className="text-label text-white mb-2">{label}</p>}
      <h2 className={`text-heading ${titleColor}`}>{title}</h2>
    </div>
  );
}
