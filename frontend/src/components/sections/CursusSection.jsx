/**
 * CursusSection — reproduit le frame "section cursus" (77:433).
 * 3 colonnes côte à côte. Chaque colonne : label vertical gauche + contenu école.
 * Label vertical en lettres empilées dans la couleur purple de la maquette.
 */

const SCHOOL_META = {
  esd:        { vertLabel: "UX / UI DESIGN",       iconBg: "#c0392b", iconText: "e" },
  lacapsule:  { vertLabel: "PROGRAMMATION",         iconBg: "#e67e22", iconText: "▶" },
  iscod:      { vertLabel: "INGÉNIERIE LOGICIEL",   iconBg: "#e91e8c", iconText: "" },
};

export default function CursusSection({ cursus = [] }) {
  return (
    <section className="relative w-full px-[80px] py-[80px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-heading text-white mb-16">Cursus</h2>

        <div className="grid grid-cols-3 gap-0 divide-x divide-white/10">
          {cursus.map((school, idx) => {
            const slug = school.school?.toLowerCase().replace(/\s+/g, "") || `school-${idx}`;
            const meta = SCHOOL_META[slug] ?? {
              vertLabel: school.discipline ?? "",
              iconBg: "#8b5ae2",
              iconText: "",
            };
            return (
              <SchoolColumn
                key={school.id ?? idx}
                school={school}
                meta={meta}
                isFirst={idx === 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SchoolColumn({ school, meta, isFirst }) {
  return (
    <div className={`flex gap-4 ${isFirst ? "pr-10" : "px-10"}`}>
      {/* Label vertical — lettres en colonne dans la couleur purple */}
      <VerticalLabel text={meta.vertLabel} />

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        {/* En-tête : nom + icône */}
        <div className="flex items-center gap-3 mb-1">
          <span className="font-poppins font-bold text-[28px] text-white leading-tight">
            {school.school}
          </span>
          {/* Icône colored square */}
          <span
            className="flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: meta.iconBg }}
            aria-hidden
          >
            {meta.iconText && (
              <span className="text-white text-[10px] font-bold leading-none">
                {meta.iconText}
              </span>
            )}
          </span>
        </div>

        {/* Période */}
        <p className="font-poppins font-semibold text-[14px] text-[#aa7cfb] mb-5">
          {school.period}
        </p>

        {/* Bullet points */}
        <ul className="flex flex-col gap-3">
          {school.items?.map((item, i) => (
            <li key={item.id ?? i} className="flex items-start gap-2">
              <span className="text-white/50 flex-shrink-0 mt-[2px] text-[18px] leading-none">•</span>
              <span className="font-crimson font-semibold text-[18px] text-white leading-snug">
                {item.content}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * VerticalLabel — affiche chaque caractère en colonne verticale.
 * Reproduit les labels UX / UI DESIGN, PROGRAMMATION, INGÉNIERIE LOGICIEL
 * visibles à gauche de chaque colonne dans la maquette (caractères empilés).
 */
function VerticalLabel({ text }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-[1px] pt-1">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="font-poppins font-light text-[11px] text-[#aa7cfb] uppercase leading-none"
          style={{ display: "block" }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </div>
  );
}
