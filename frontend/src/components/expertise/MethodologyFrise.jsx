/**
 * MethodologyFrise — frise de chevrons espacés pour les pages Expertise.
 *
 * Props :
 *   steps    {string[]}  — libellés des étapes (numéros auto-générés 1, 2, 3…)
 *   abbrev   {string}    — texte vertical du dernier bloc (ex : "DEV")
 *   imageUrl {string=}   — image décorative affichée juste au-dessus de la frise
 */

const GREEN  = "#b5ea55";
const PURPLE = "#9b6de0";
const COLORS = [GREEN, PURPLE, GREEN, PURPLE, GREEN, PURPLE];

// Chevron : pointe à droite (17 %) uniquement, bord gauche plat
// Chaque bloc est visuellement séparé par un gap — pas d'imbrication
const CLIP_CHEVRON = "polygon(0% 0%, 83% 0%, 100% 50%, 83% 100%, 0% 100%)";

const ARROW_H  = 220;  // px — hauteur des blocs
const ARROW_GAP = 10;  // px — espace visible entre chaque flèche

export default function MethodologyFrise({ steps, abbrev, imageUrl }) {
  const n = steps.length + 1; // total blocs (étapes + abbrev final)

  return (
    <div className="w-full">

      {/* Image décorative (Docker + vague) — proportions naturelles */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          aria-hidden
          className="w-full block"
        />
      )}

      {/* Frise : flex avec gap, chaque bloc en flex-1 */}
      <div
        className="flex w-full"
        style={{ gap: `${ARROW_GAP}px`, height: `${ARROW_H}px` }}
      >

        {/* Étapes numérotées */}
        {steps.map((label, i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center"
            style={{
              clipPath: CLIP_CHEVRON,
              backgroundColor: COLORS[i % COLORS.length],
              height: `${ARROW_H}px`,
            }}
          >
            <div className="flex flex-col items-center select-none pointer-events-none">
              <span
                className="font-poppins font-black text-[#1a1a1a] leading-none"
                style={{ fontSize: "80px" }}
              >
                {i + 1}
              </span>
              <span
                className="font-poppins text-[#1a1a1a] text-center leading-tight"
                style={{ fontSize: "22px", marginTop: "6px" }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}

        {/* Dernier bloc — abréviation verticale (ex : DEV) + flèche blanche */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{
            clipPath: CLIP_CHEVRON,
            backgroundColor: COLORS[steps.length % COLORS.length],
            height: `${ARROW_H}px`,
          }}
        >
          <div className="flex flex-col items-center gap-[10px] select-none pointer-events-none">
            {/* writing-mode vertical + rotate → lit de bas en haut */}
            <span
              className="font-poppins font-black text-[#1a1a1a] leading-none"
              style={{
                fontSize: "64px",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {abbrev}
            </span>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden>
              <path
                d="M2 12H28M28 12L18 2M28 12L18 22"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
