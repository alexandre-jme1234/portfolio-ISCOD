import { Link } from "react-router-dom";
import SkillItem from "../common/SkillItem.jsx";
import ArrowLink from "../common/ArrowLink.jsx";

/**
 * CompetencesSection — reproduit la section compétences (frames 77:374, 77:393, 77:401, 77:407).
 * Layout décalé (zigzag) : les blocs alternent alignement gauche / droite.
 * Bloc PROGRAMMATION (le plus large) à gauche, les 3 autres alternent.
 */

const EXPERTISE_BLOCKS = [
  {
    category:  "programmation",
    slug:      "ingenierie-logiciel",
    title:     "INGENIERIE LOGICIEL",
    linkText:  "Consultez mes expertises Ingénierie",
    widthClass: "w-[65%]",
    alignClass: "",
    twoCol:    true,
  },
  {
    category:  "gestion-projet",
    slug:      "gestion-de-projet",
    title:     "GESTION DE PROJET",
    linkText:  "Consultez mes expertises Gestion",
    widthClass: "w-[62%]",
    alignClass: "ml-auto",
    twoCol:    true,
  },
  {
    category:  "infogerance",
    slug:      "devops",
    title:     "DEVOPS",
    linkText:  "Consultez mes expertises DevOps",
    widthClass: "w-[62%]",
    alignClass: "",
    twoCol:    true,
  },
  {
    category:  "ux-design",
    slug:      "ux-ui-design",
    title:     "UX.UI DESIGN",
    linkText:  "Consultez mes expertises UX/UI",
    widthClass: "w-[62%]",
    alignClass: "ml-auto",
    twoCol:    true,
  },
];

export default function CompetencesSection({ skills = {}, getValue }) {
  return (
    <section
      id="competences"
      className="relative w-full px-[80px] py-[80px] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* En-tête de section */}
        <div className="mb-16">
          <p className="text-label text-white mb-2">
            {getValue("competences_subtitle", "Overview")}
          </p>
          <h2 className="text-heading text-white mb-4">
            {getValue("competences_title", "Compétences")}
          </h2>
          <p className="font-crimson font-semibold text-[20px] text-white/70 max-w-[420px] leading-snug">
            {getValue(
              "competences_desc",
              "Soft skills et hard skills acquis au cours de mes projets profesionnels, de mes projets d'étude ainsi que de mes formation"
            )}
          </p>
        </div>

        {/* Blocs décalés */}
        <div className="flex flex-col gap-16">
          {EXPERTISE_BLOCKS.map((cfg) => (
            <ExpertiseBlock
              key={cfg.category}
              config={cfg}
              skills={skills[cfg.category] || []}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseBlock({ config, skills }) {
  const mid  = Math.ceil(skills.length / 2);
  const col1 = config.twoCol ? skills.slice(0, mid) : skills;
  const col2 = config.twoCol ? skills.slice(mid)   : [];

  return (
    <div className={`${config.widthClass} ${config.alignClass}`}>
      {/* Titre vert */}
      <h3 className="text-section text-[#cdfb7c] mb-4">{config.title}</h3>

      {/* Cadre compétences */}
      <div className="card-border p-6">
        <div className={`grid gap-4 ${col2.length > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
          <div className="flex flex-col gap-4">
            {col1.map((skill) => (
              <SkillItem key={skill.id} name={skill.name} description={skill.description} />
            ))}
          </div>
          {col2.length > 0 && (
            <div className="flex flex-col gap-4">
              {col2.map((skill) => (
                <SkillItem key={skill.id} name={skill.name} description={skill.description} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lien flèche */}
      <div className="mt-5">
        <Link to={`/expertises/${config.slug}`}>
          <ArrowLink text={config.linkText} />
        </Link>
      </div>
    </div>
  );
}
