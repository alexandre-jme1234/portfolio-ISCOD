/**
 * SoftSkillsSection — grille 3 colonnes × 2 rangées (Figma node 2036:1983).
 * Colonne 1 rangée 1 : heading "Soft skills".
 * 4 tuiles avec image + overlay violet + titre vert + description blanche.
 * Données : skills['soft-skills'] passé depuis HomePage via prop softSkills.
 *
 * Layout grid :
 *   [Soft skills]  [tile 0 – Collaboratif]  [tile 1 – Adaptabilité]
 *   [tile 2 – App. continu]  [—vide—]  [tile 3 – Créativité]
 */

import { Link } from "react-router-dom";
import { usePages } from "../../hooks/useApi.js";

// Image de fond par slug de compétence (fichiers dans public/images/)
const COMPETENCE_IMAGES = {
  "adaptabilite":           "/images/img_card_comp_adapatbilite.png",
  "apprentissage-continu":  "/images/img_card_comp_apprentissage.png",
  "creativite-sens-critique": "/images/img_card_comp_creativite.png",
  "collaboration":          "/images/img_card_comp_collaboratif.png",
};

const DEFAULT_SOFT_SKILLS = [
  {
    id: 1,
    name: "Collaboratif",
    slug: "collaboration",
    description:
      "Suggérer, proposer, rechercher les raisons d'un bug dans un projet impliquant plusieurs autres développeurs.",
    image_url: "/images/img_card_comp_collaboratif.png",
  },
  {
    id: 2,
    name: "Adaptabilité",
    slug: "adaptabilite",
    description:
      "Prise en main de stack techniques méconnus dans le cadre d'un projet informatique.",
    image_url: "/images/img_card_comp_adapatbilite.png",
  },
  {
    id: 3,
    name: "Apprentissage continu",
    slug: "apprentissage-continu",
    description:
      "Formation en continu pour s'adapter rapidement aux innovations technologiques.",
    image_url: "/images/img_card_comp_apprentissage.png",
  },
  {
    id: 4,
    name: "Créativité",
    slug: "creativite-sens-critique",
    description:
      "Proposer des solutions innovantes et élégantes adaptées aux contraintes du projet.",
    image_url: "/images/img_card_comp_creativite.png",
  },
];

/** Positions CSS grid-area pour les 4 tuiles */
const TILE_GRID_AREAS = [
  "1 / 2 / 2 / 3", // tile 0 → row1 col2
  "1 / 3 / 2 / 4", // tile 1 → row1 col3
  "2 / 1 / 3 / 2", // tile 2 → row2 col1
  "2 / 3 / 3 / 4", // tile 3 → row2 col3
];

export default function SoftSkillsSection({ softSkills = [], getValue }) {
  const { pages } = usePages();
  const competencePages = pages || [];
  const rawTiles = competencePages.length >= 4 ? competencePages.slice(0, 4) : DEFAULT_SOFT_SKILLS;
  // Enrichit chaque tuile avec image_url (l'API ne la retourne pas)
  const tiles = rawTiles.map((c) => ({
    ...c,
    name: c.name || c.title,
    image_url: c.image_url || COMPETENCE_IMAGES[c.slug],
  }));

  return (
    <section className="relative w-full px-[80px] py-[80px] overflow-hidden">
      {/* Citation fantôme — watermark intentionnel (texte sombre sur fond sombre) */}
      <p
        className="font-poppins font-bold text-[64px] leading-[0.9] text-white mb-12 tracking-[-1.28px] max-w-[1283px]"
        aria-hidden
      >
        {getValue(
          "soft_skills_quote",
          "Les compétences sont la clé du succès, mais la détermination est la clé pour les acquérir"
        )}
      </p>

      <div className="max-w-[1440px] mx-auto">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
          }}
        >
          {/* Heading "Soft skills" — col 1 row 1 */}
          <div
            className="flex flex-col justify-center"
            style={{ gridArea: "1 / 1 / 2 / 2" }}
          >
            <h2
              className="font-poppins font-bold leading-[0.9] tracking-[-1.6px] text-portfolio-purple"
              style={{ fontSize: "clamp(56px, 5.5vw, 80px)" }}
            >
              Soft
              <br />
              skills
            </h2>
          </div>

          {/* 4 tuiles */}
          {tiles.map((skill, i) => {
            const slug = skill.slug || skill.name?.toLowerCase().replace(/\s+/g, "-");
            const title = skill.title || skill.name;
            return (
              <Link
                key={slug || skill.id || i}
                to={`/competences/${slug}`}
                className="no-underline"
                onClick={() => console.log("Soft skill clicked:", { slug, title })}
              >
                <SoftSkillTile
                  skill={skill}
                  gridArea={TILE_GRID_AREAS[i]}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SoftSkillTile({ skill, gridArea }) {
  const slug = skill.slug || skill.name.toLowerCase().replace(/\s+/g, "-");
  const route = `/soft-skills/${slug}`;
  
  return (
    <div
      className="relative overflow-hidden rounded-[8px] border-4 border-[#cdfb7c] h-[403px] cursor-pointer group"
      style={{ gridArea }}
    >
      {/* Image de fond */}
      {skill.image_url ? (
        <img
          src={skill.image_url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #8b5ae2 0%, #aa7cfb 100%)" }}
          aria-hidden
        />
      )}

      {/* Overlay violet */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(170, 124, 251, 0.75)" }}
        aria-hidden
      />

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-center px-[43px]">
        <p
          className="font-poppins font-semibold leading-[0.9] tracking-[-0.8px] mb-2"
          style={{ color: "#cdfb7c", fontSize: "clamp(28px, 2.8vw, 40px)" }}
        >
          {skill.title || skill.name}
        </p>
        <p className="font-poppins font-normal text-white text-[16px] leading-[1.04] tracking-[0.32px] max-w-[330px]">
          {skill.description || "Compétence soft skill liée au contenu."}
        </p>
      </div>
    </div>
  );
}
