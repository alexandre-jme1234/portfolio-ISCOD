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
    category:     "programmation",
    slug:         "ingenierie-logiciel",
    title:        "INGENIERIE LOGICIEL",
    linkText:     "Consultez mes expertises Ingénierie",
    widthClass:   "w-[65%]",
    alignClass:   "",
    twoCol:       true,
    decorImage:   "/images/img_comp_projet_home.png",
    decorAlt:     "Développement logiciel — écran de code en cours d'édition",
    imageOnRight: true,
    imageW:       625,
  },
  {
    category:     "gestion-projet",
    slug:         "gestion-de-projet",
    title:        "GESTION DE PROJET",
    linkText:     "Consultez mes expertises Gestion",
    widthClass:   "w-[62%]",
    alignClass:   "ml-auto",
    twoCol:       true,
    decorImage:   "/images/img_comp_gestion_projet_home.jpg",
    decorAlt:     "Gestion de projet — suivi et organisation d'équipe",
    imageOnRight: false,
    imageW:       679,
  },
  {
    category:     "infogerance",
    slug:         "devops",
    title:        "DEVOPS",
    linkText:     "Consultez mes expertises DevOps",
    widthClass:   "w-[62%]",
    alignClass:   "",
    twoCol:       true,
    decorImage:   "/images/img_comp_devops_home.png",
    decorAlt:     "DevOps — conteneurisation Docker et pipelines CI/CD",
    imageOnRight: true,
    imageW:       625,
  },
  {
    category:     "ux-design",
    slug:         "ux-ui-design",
    title:        "UX.UI DESIGN",
    linkText:     "Consultez mes expertises UX/UI",
    widthClass:   "w-[62%]",
    alignClass:   "ml-auto",
    twoCol:       true,
    decorImage:   "/images/img_comp_ux-ui_home.png",
    decorAlt:     "UX/UI design — maquette d'interface mobile",
    imageOnRight: false,
    imageW:       543,
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
            <Link
              key={cfg.category}
              to={`/expertises/${cfg.slug}`}
              className="group no-underline"
            >
              <ExpertiseBlock
                config={cfg}
                skills={skills[cfg.category] || []}
              />
            </Link>
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
    <div 
      className={`relative ${config.widthClass} ${config.alignClass} cursor-pointer`}
      onClick={() => console.log("Navigating to expertise:", { title: config.title, slug: config.slug })}
    >
        {/* Image décorative — déborde hors du bloc (clippée par overflow-hidden de la section) */}
        {config.decorImage && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none overflow-hidden rounded-[18px] bg-[#171c21] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
            style={{
              [config.imageOnRight ? "left" : "right"]: "calc(100% + 16px)",
              width: `${config.imageW}px`,
              opacity: 0.9,
            }}
          >
            <img
              src={config.decorImage}
              alt={config.decorAlt}
              className="w-full h-full object-contain rounded-[12px] transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        )}

        {/* Titre vert */}
        <h3 className="text-section text-[#cdfb7c] mb-4 group-hover:text-white transition-colors duration-200">{config.title}</h3>

        {/* Cadre compétences */}
        <div className="card-border p-6 group-hover:border-[#cdfb7c] transition-colors duration-200">
          <div className={`grid gap-4 ${col2.length > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
            <div className="flex flex-col gap-4">
              {col1.map((skill) => (
                <SkillItem
                  key={skill.id}
                  name={skill.name}
                  description={skill.description}
                  iconKey={skill.icon_key}
                />
              ))}
            </div>
            {col2.length > 0 && (
              <div className="flex flex-col gap-4">
                {col2.map((skill) => (
                  <SkillItem
                    key={skill.id}
                    name={skill.name}
                    description={skill.description}
                    iconKey={skill.icon_key}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lien flèche */}
        <div className="mt-5">
          <ArrowLink text={config.linkText} />
        </div>
      </div>
    );
  }
