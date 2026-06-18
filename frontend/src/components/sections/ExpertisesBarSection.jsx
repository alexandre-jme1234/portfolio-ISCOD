/**
 * ExpertisesBarSection — fidèle au frame "section experi" Figma (node 2036:1865).
 * 3 carrés fixes 411×411px. Chaque carré a une couleur de fond (zone claire)
 * et une barre de remplissage alignée en bas proportionnelle au pourcentage.
 * Le pourcentage s'affiche dans la zone claire, au-dessus du remplissage.
 */

const BARS = [
  {
    pctKey:      "expertises_pct_uxui",
    labelKey:    "expertises_label_uxui",
    defaultPct:  20,
    defaultLabel:"ux.ui design",
    bgColor:     "#aa7cfb",
    fillColor:   "#8b5ae2",
  },
  {
    pctKey:      "expertises_pct_prog",
    labelKey:    "expertises_label_prog",
    defaultPct:  60,
    defaultLabel:"INGENIERIE LOGICIEL",
    bgColor:     "#cdfb7c",
    fillColor:   "rgba(155, 220, 40, 0.93)",
  },
  {
    pctKey:      "expertises_pct_devops",
    labelKey:    "expertises_label_devops",
    defaultPct:  30,
    defaultLabel:"DEVOPS",
    bgColor:     "#aa7cfb",
    fillColor:   "rgba(139, 90, 226, 0.8)",
  },
];

const SQUARE_H = 411;

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
        <h2 className="text-heading text-white mb-3">{title}</h2>
        <p className="font-poppins font-light text-white/70 text-[18px] mb-20">{subtitle}</p>

        <div className="flex gap-[23px]">
          {BARS.map((bar) => {
            const pct    = parseInt(getValue(bar.pctKey, String(bar.defaultPct))) || bar.defaultPct;
            const label  = getValue(bar.labelKey, bar.defaultLabel);
            const fillH  = Math.round((pct / 100) * SQUARE_H);
            const lightH = SQUARE_H - fillH;

            return (
              <div key={bar.pctKey} className="flex-1 flex flex-col items-center gap-5">
                {/* Carré avec remplissage en bas */}
                <div
                  className="w-full relative overflow-hidden"
                  style={{
                    height:        `${SQUARE_H}px`,
                    backgroundColor: bar.bgColor,
                    borderRadius:  "4px 4px 0 0",
                  }}
                >
                  {/* Barre de remplissage alignée en bas */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height:          `${fillH}px`,
                      backgroundColor: bar.fillColor,
                    }}
                  />

                  {/* Pourcentage dans la zone claire (au-dessus du remplissage) */}
                  <div
                    className="absolute top-0 left-0 right-0 flex items-center justify-center"
                    style={{ height: `${lightH}px` }}
                  >
                    <p
                      className="font-poppins font-bold text-[#171c21] leading-none select-none"
                      style={{ fontSize: `clamp(40px, ${Math.round(lightH * 0.55)}px, 100px)` }}
                    >
                      {pct}%
                    </p>
                  </div>
                </div>

                {/* Label */}
                <p className="font-poppins font-normal text-white text-center uppercase text-[32px] tracking-wide">
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
