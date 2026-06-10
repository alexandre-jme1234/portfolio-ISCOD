/**
 * ExpertisesBarSection — reproduit le frame "section experi" (77:418).
 * 3 blocs colorés de hauteur proportionnelle au pourcentage.
 * GESTION DE PROJET 10% (violet foncé) | PROGRAMMATION 60% (vert) | INFOGÉRANCE 30% (violet clair).
 */

const BARS = [
  {
    pctKey:      "expertises_pct_gestion",
    labelKey:    "expertises_label_gestion",
    defaultPct:  10,
    defaultLabel:"GESTION DE PROJET",
    color:       "#8b5ae2",
  },
  {
    pctKey:      "expertises_pct_prog",
    labelKey:    "expertises_label_prog",
    defaultPct:  60,
    defaultLabel:"PROGRAMMATION",
    color:       "#cdfb7c",
  },
  {
    pctKey:      "expertises_pct_infog",
    labelKey:    "expertises_label_infog",
    defaultPct:  30,
    defaultLabel:"INFOGÉRANCE",
    color:       "#aa7cfb",
  },
];

const MAX_PCT = 60;
const MAX_H   = 520;
const MIN_H   = 140;

export default function ExpertisesBarSection({ getValue }) {
  const title    = getValue("expertises_title",    "Expertises");
  const subtitle = getValue("expertises_subtitle", "Répartition de mon temps de travail chez Coliback");

  return (
    <section
      id="expertises"
      className="relative w-full px-[80px] py-[80px] overflow-hidden"
    >
      <div
        className="blob-green absolute rounded-full"
        style={{ width: "1800px", height: "1000px", top: 0, left: "-200px", opacity: 0.12 }}
        aria-hidden
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* En-tête */}
        <h2 className="text-heading text-white mb-3">{title}</h2>
        <p className="font-poppins font-light text-white/70 text-[18px] mb-20">{subtitle}</p>

        {/* Blocs */}
        <div className="flex items-end">
          {BARS.map((bar) => {
            const pct   = parseInt(getValue(bar.pctKey, String(bar.defaultPct)));
            const label = getValue(bar.labelKey, bar.defaultLabel);
            const h     = MIN_H + Math.round((pct / MAX_PCT) * (MAX_H - MIN_H));

            return (
              <div key={bar.pctKey} className="flex-1 flex flex-col items-center gap-5">
                {/* Bloc coloré */}
                <div
                  className="w-full flex items-center justify-center"
                  style={{ height: `${h}px`, backgroundColor: bar.color }}
                >
                  <p
                    className="font-poppins font-bold text-[#171c21] leading-none select-none"
                    style={{ fontSize: "clamp(48px, 6vw, 100px)" }}
                  >
                    {pct}%
                  </p>
                </div>

                {/* Label */}
                <p className="font-poppins font-normal text-white text-center uppercase text-[16px] tracking-wide">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
