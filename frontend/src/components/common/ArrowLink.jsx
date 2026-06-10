/**
 * ArrowLink — reproduit le composant "Link" de la maquette (frame 222:1056).
 * Texte Poppins Medium 24px blanc + flèche →.
 */
export default function ArrowLink({ text, onClick, href = "#" }) {
  const handleClick = (e) => {
    if (onClick) { e.preventDefault(); onClick(); }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-4 group w-fit"
    >
      <span className="text-nav text-white group-hover:text-[#cdfb7c] transition-colors duration-200">
        {text}
      </span>
      <svg
        width="38"
        height="12"
        viewBox="0 0 38 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white group-hover:text-[#cdfb7c] transition-colors duration-200 flex-shrink-0"
      >
        <line x1="0" y1="6" x2="31" y2="6" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="26,1 38,6 26,11" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </a>
  );
}
