/**
 * ExpertisePage — template dynamique pour chaque expertise.
 * URL : /expertises/:slug
 *
 * Reproduit fidèlement le node 321-2261 de la maquette Figma
 * (expertise/IngénierieLogiciel). La structure est générique et
 * fonctionne pour toutes les expertises via le slug passé en paramètre.
 *
 * Sections :
 *  1. Hero — titre + breadcrumb "home / expertise" + description
 *  2. Méthodologie — pipeline visuel en 4 étapes hexagonales
 *  3. Compétences associées (optionnel, données BDD)
 *  4. Section numérotée "1 éléments de preuves" avec sous-parties a/b/c/d
 *  5. Section numérotée "2 évolution"
 *  6. Section numérotée "3 auto-critique"
 *  7. Grille de projets liés
 *
 * PLACEHOLDERS : les textes longs des sections 1, 2, 3 sont en dur.
 * TODO: les remplacer par GET /api/content/:slug (content_blocks table)
 * avec les block_keys : preuves_intro, preuves_recherche,
 * preuves_conception, preuves_developpement, preuves_deploiement,
 * evolution_texte, autocritique_texte.
 */

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useExpertise, useSkills, useProjects, usePageContent } from "../hooks/useApi.js";
import Spinner   from "../components/common/Spinner.jsx";
import SkillItem from "../components/common/SkillItem.jsx";

// ---------------------------------------------------------------------------
// Constante : liaison slug expertise → catégorie de skills BDD
// ---------------------------------------------------------------------------
const SLUG_TO_CATEGORY = {
  "ingenierie-logiciel": "programmation",
  "devops":              "infogerance",
  "gestion-de-projet":   "gestion-projet",
  "ux-ui-design":        "ux-design",
};

// Étapes de méthodologie par défaut quand aucun content_block n'existe
const DEFAULT_METHODOLOGY = {
  "ingenierie-logiciel": ["Etude Besoin", "Conception", "Développement", "Déploiement"],
  "devops":              ["Contenerisation", "Orchestration", "ci / cd", "Monitoring"],
  "gestion-de-projet":   ["Analyse", "Planification", "Exécution", "Livraison"],
  "ux-ui-design":        ["Recherche", "Idéation", "Prototypage", "Test Utilisateur"],
};

// ---------------------------------------------------------------------------
// Sous-composant : étape du pipeline Méthodologie
// ---------------------------------------------------------------------------

/**
 * MethodologyStep — hexagone vert numéroté + libellé de l'étape.
 *
 * @param {Object} props
 * @param {string} props.number - "1", "2", "3", "4"
 * @param {string} props.label  - libellé de l'étape (ex : "Etude Besoin")
 */
function MethodologyStep({ number, label }) {
  return (
    <div className="flex flex-col items-center gap-[8px] flex-shrink-0">
      {/* Hexagone vert via clip-path — reproduit les formes Subtract Figma */}
      <div
        className="bg-[#cdfb7c] flex items-center justify-center"
        style={{
          width: "160px",
          height: "160px",
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        }}
        aria-hidden
      >
        <span
          className="font-poppins font-black text-[#171c21] leading-none select-none"
          style={{ fontSize: "64px" }}
        >
          {number}
        </span>
      </div>
      <p
        className="font-poppins font-light text-white text-center"
        style={{ fontSize: "20px" }}
      >
        {label}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sous-composant : Section numérotée (grand chiffre + titre + corps)
// ---------------------------------------------------------------------------

/**
 * NumberedSection — bloc avec grand chiffre décoratif + titre + contenu.
 *
 * @param {Object}          props
 * @param {string}          props.number   - "1", "2", "3"
 * @param {string}          props.title    - titre principal
 * @param {React.ReactNode} props.children - sous-parties libres
 */
function NumberedSection({ number, title, children }) {
  return (
    <section className="relative" style={{ paddingTop: "60px" }}>
      {/* Grand chiffre décoratif — Poppins SemiBold 128px */}
      <p
        className="absolute top-0 left-0 font-poppins font-semibold text-white leading-none select-none pointer-events-none"
        style={{ fontSize: "128px" }}
        aria-hidden
      >
        {number}
      </p>

      {/* Titre décalé à droite du chiffre — Poppins Bold 80px */}
      <h2
        className="relative font-poppins font-bold text-white leading-normal"
        style={{ fontSize: "80px", paddingLeft: "92px", paddingTop: "8px" }}
      >
        {title}
      </h2>

      {/* Corps de la section */}
      <div className="mt-[60px]">
        {children}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Sous-composant : Sous-partie avec étiquette + texte (Crimson Text)
// ---------------------------------------------------------------------------

/**
 * SubSection — étiquette de phase (Poppins 22px) + corps Crimson Text.
 *
 * @param {Object} props
 * @param {string} props.label - ex : "1.a - phase de recherche"
 * @param {string} props.text  - corps de texte justifié
 */
function SubSection({ label, text }) {
  return (
    <div className="mb-[60px]">
      <p
        className="font-poppins font-normal text-white mb-[24px]"
        style={{ fontSize: "22px" }}
      >
        {label}
      </p>
      <p
        className="text-body text-white"
        style={{ maxWidth: "1280px" }}
      >
        {text}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sous-composant : Carte projet
// ---------------------------------------------------------------------------

/**
 * ProjectCard — carte projet dans la grille "projets liés".
 * Image + titre Poppins Regular 24px + tags sur fond #eae9ff.
 *
 * @param {Object}   props
 * @param {string}   props.slug       - slug du projet (routing)
 * @param {string}   props.title      - titre du projet
 * @param {string}   [props.imageUrl] - URL de l'image de couverture
 * @param {string[]} [props.tags]     - tableau de tags textuels
 */
function ProjectCard({ slug, title, imageUrl, tags = [] }) {
  return (
    <Link
      to={`/projets/${slug}`}
      className="flex flex-col gap-[17px] flex-shrink-0 group"
      style={{ width: "413px" }}
      aria-label={`Voir le projet ${title}`}
    >
      {/* Vignette image — fond blanc + bordure verte 10px (Figma node 377:2377) */}
      <div
        className="rounded-[8px] overflow-hidden flex-shrink-0 relative"
        style={{ height: "414px", border: "10px solid #cdfb7c", backgroundColor: "#ffffff" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#2c2f32] flex items-center justify-center">
            <span className="font-poppins text-white/30" style={{ fontSize: "14px" }}>
              {title}
            </span>
          </div>
        )}
      </div>

      {/* Titre + tags */}
      <div className="flex flex-col gap-[10px]">
        <p
          className="font-poppins font-normal text-white leading-normal group-hover:text-[#cdfb7c] transition-colors"
          style={{ fontSize: "24px" }}
        >
          {title}
        </p>
        {tags.length > 0 && (
          <div className="flex gap-[12px] flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-poppins font-semibold text-[#171c21] bg-[#eae9ff] px-[20px] py-[2px] rounded-[16px]"
                style={{ fontSize: "14px" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

/**
 * ExpertisePage — page template pour chaque expertise du portfolio.
 * Le slug est fourni par React Router (/expertises/:slug).
 */
export default function ExpertisePage() {
  const { slug }                                       = useParams();
  const { expertise, loading: loadExp, error: errExp } = useExpertise(slug);
  const { skills,    loading: loadSkills }             = useSkills();
  const { projects,  loading: loadProjects }           = useProjects();
  const { content,   loading: loadContent }            = usePageContent(slug ? `expertises-${slug}` : null);

  // ---- États de chargement / erreur ----------------------------------------
  if (loadExp || loadSkills || loadProjects || loadContent) return <Spinner />;

  if (errExp || !expertise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#171c21]">
        <p className="font-poppins text-white/60" style={{ fontSize: "20px" }}>
          Expertise introuvable.
        </p>
        <Link to="/" className="font-poppins text-[#cdfb7c] hover:underline">
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

  // ---- Dérivation des données ----------------------------------------------
  const category        = SLUG_TO_CATEGORY[slug] || "";
  const relatedSkills   = (skills[category] || []).slice(0, 6);
  const relatedProjects = (projects || []).slice(0, 4);

  // Étapes de méthodologie — depuis content_blocks, sinon fallback par slug
  const methodologySteps = (() => {
    const blocks = [...(content.methodologie || [])].sort((a, b) => a.order_index - b.order_index);
    return blocks.length > 0
      ? blocks.map((b) => b.value)
      : (DEFAULT_METHODOLOGY[slug] || ["Analyse", "Conception", "Développement", "Livraison"]);
  })();

  // Hero : description longue depuis content_blocks, fallback sur expertise.description
  const heroDescription =
    content.hero?.find((b) => b.block_key === "hero_description")?.value ||
    expertise.description;

  // Section 1 : preuves — intro + sous-sections (paires label/text)
  const preuveBlocks = [...(content.preuves || [])].sort((a, b) => a.order_index - b.order_index);
  const preuveIntro  = preuveBlocks.find((b) => b.block_key === "preuves_intro")?.value || "";
  const preuveLabels = preuveBlocks.filter((b) => b.type === "label");
  const preuveTexts  = preuveBlocks.filter((b) => b.type === "paragraph" && b.block_key !== "preuves_intro");
  const subSections  = preuveLabels.map((lb, i) => ({ label: lb.value, text: preuveTexts[i]?.value || "" }));

  // Section 2 : évolution — paragraphes ordonnés
  const evolutionParas = [...(content.evolution || [])]
    .filter((b) => b.type === "paragraph")
    .sort((a, b) => a.order_index - b.order_index);

  // Section 3 : autocritique — paragraphes ordonnés
  const autocritiqueParas = [...(content.autocritique || [])]
    .filter((b) => b.type === "paragraph")
    .sort((a, b) => a.order_index - b.order_index);

  // ---- Rendu ---------------------------------------------------------------
  return (
    <main
      className="min-h-screen relative overflow-hidden bg-[#171c21]"
      style={{ paddingTop: "80px" }} /* espace pour la Navbar fixed */
    >

      {/* ====================================================================
          BLOBS DE FOND — reproduit les bg purple/green radials de la maquette
          (positions adaptées depuis les valeurs absolues Figma sur 1440px)
          ==================================================================== */}
      <div
        className="blob-green absolute rounded-full pointer-events-none"
        style={{ width: "2200px", height: "1316px", top: "-200px", left: "-900px", opacity: 0.30 }}
        aria-hidden
      />
      <div
        className="blob-purple absolute rounded-full pointer-events-none"
        style={{ width: "2200px", height: "1316px", top: "800px", left: "calc(16.67% + 48px)", opacity: 0.30 }}
        aria-hidden
      />
      <div
        className="blob-purple absolute rounded-full pointer-events-none"
        style={{ width: "2200px", height: "1316px", top: "2700px", left: "-1356px", opacity: 0.30 }}
        aria-hidden
      />
      <div
        className="blob-purple absolute rounded-full pointer-events-none"
        style={{ width: "2200px", height: "1316px", top: "3200px", left: "calc(66.67% - 13px)", opacity: 0.30 }}
        aria-hidden
      />
      <div
        className="blob-green absolute rounded-full pointer-events-none"
        style={{ width: "2200px", height: "1316px", top: "3800px", left: "-1541px", opacity: 0.30 }}
        aria-hidden
      />
      <div
        className="blob-green absolute rounded-full pointer-events-none"
        style={{ width: "2200px", height: "1316px", top: "4300px", left: "calc(33.33% + 89px)", opacity: 0.30 }}
        aria-hidden
      />

      {/* ====================================================================
          CONTENU — max-width 1440px centré, paddings latéraux 80px
          ==================================================================== */}
      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* ------------------------------------------------------------------
            SECTION HERO
            Titre Poppins Bold 80px + breadcrumb Poppins Regular 20px
            + description Crimson Text SemiBold 24px (max 1206px)
            ------------------------------------------------------------------ */}
        <section className="px-[80px] pt-[80px] pb-[80px]">

          {/* Lignes décoratives ondulées (Subtract Figma) */}
          <div
            className="absolute pointer-events-none overflow-hidden"
            style={{ top: "560px", left: "0", width: "1027px", height: "148px", opacity: 0.45 }}
            aria-hidden
          >
            <svg
              viewBox="0 0 1027 148"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M0 74 Q128 0 257 74 Q385 148 514 74 Q642 0 770 74 Q899 148 1027 74"
                stroke="#cdfb7c"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M0 100 Q128 26 257 100 Q385 174 514 100 Q642 26 770 100 Q899 174 1027 100"
                stroke="#aa7cfb"
                strokeWidth="1.5"
                fill="none"
                opacity="0.35"
              />
            </svg>
          </div>

          {/* Titre + breadcrumb */}
          <div className="flex flex-col gap-[4px] mb-[40px]">
            <h1
              className="font-poppins font-bold text-white leading-[0.9]"
              style={{ fontSize: "80px" }}
            >
              {expertise.title}
            </h1>
            <p
              className="font-poppins font-normal text-white"
              style={{ fontSize: "20px" }}
            >
              home / expertise
            </p>
          </div>

          {/* Description de l'expertise — content_block hero_description si dispo */}
          <p
            className="text-body text-white"
            style={{ maxWidth: "1206px" }}
          >
            {heroDescription}
          </p>
        </section>

        {/* ------------------------------------------------------------------
            SECTION MÉTHODOLOGIE
            Titre Poppins Bold 80px + pipeline 4 étapes hexagonales
            ------------------------------------------------------------------ */}
        <section className="px-[80px] pb-[100px]">
          <h2
            className="font-poppins font-bold text-white leading-[0.9] mb-[80px]"
            style={{ fontSize: "80px" }}
          >
            Méthodologie
          </h2>

          <div className="flex items-center gap-0">
            {/* Label vertical gauche — slug en majuscules, rotation -90° */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: "58px", height: "212px" }}
              aria-hidden
            >
              <span
                className="font-poppins font-black text-[#cdfb7c] leading-[0.9] whitespace-nowrap select-none block"
                style={{
                  fontSize: "36px",
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                  display: "block",
                  width: "212px",
                  textAlign: "center",
                  marginLeft: "-77px",
                }}
              >
                {slug.toUpperCase().replace(/-/g, " ")}
              </span>
            </div>

            {/* Pipeline — 4 hexagones liés par des flèches */}
            <div className="flex items-center flex-1 min-w-0">
              {methodologySteps.map((label, i) => (
                <div key={label} className="flex items-center flex-1 min-w-0">
                  <MethodologyStep number={String(i + 1)} label={label} />
                  {i < methodologySteps.length - 1 && (
                    <div className="flex-1 flex items-center justify-center min-w-[20px]" aria-hidden>
                      <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="6" x2="50" y2="6" stroke="#cdfb7c" strokeWidth="1.5" />
                        <polyline points="44,1 56,6 44,11" fill="none" stroke="#cdfb7c" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Label vertical droit "START" */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: "58px", height: "212px" }}
              aria-hidden
            >
              <span
                className="font-poppins font-black text-[#cdfb7c] leading-[0.9] whitespace-nowrap select-none"
                style={{
                  fontSize: "36px",
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                  display: "block",
                  width: "212px",
                  textAlign: "center",
                  marginRight: "-77px",
                }}
              >
                START
              </span>
            </div>
          </div>

          {/* Compétences associées — affiché uniquement si données BDD disponibles */}
          {relatedSkills.length > 0 && (
            <div className="mt-[80px]">
              <h3
                className="font-poppins font-bold text-[#cdfb7c] mb-[40px]"
                style={{ fontSize: "32px" }}
              >
                Compétences associées
              </h3>
              <div className="grid grid-cols-2 gap-x-[60px] gap-y-[24px]">
                {relatedSkills.map((skill) => (
                  <SkillItem key={skill.id} name={skill.name} description={skill.description} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ---- Section 1 : éléments de preuves ----------------------------- */}
        <section className="px-[80px] pb-[100px]">
          <NumberedSection number="1" title="éléments de preuves">

            {/* Intro — depuis content_blocks (block_key: preuves_intro) */}
            {preuveIntro && (
              <p className="text-body text-white mb-[60px]" style={{ maxWidth: "1280px" }}>
                {preuveIntro}
              </p>
            )}

            {/* Sous-sections avec label (ex: ingénierie) ou paragraphes plats (ex: devops) */}
            {subSections.length > 0
              ? subSections.map((s) => (
                  <SubSection key={s.label} label={s.label} text={s.text} />
                ))
              : preuveTexts.map((b, i) => (
                  <p
                    key={b.block_key}
                    className="text-body text-white"
                    style={{ maxWidth: "1280px", marginBottom: i < preuveTexts.length - 1 ? "32px" : 0 }}
                  >
                    {b.value}
                  </p>
                ))
            }
          </NumberedSection>
        </section>

        {/* ---- Section 2 : évolution --------------------------------------- */}
        <section className="px-[80px] pb-[100px]">
          <NumberedSection number="2" title="évolution">
            {evolutionParas.map((b, i) => (
              <p
                key={b.block_key}
                className="text-body text-white"
                style={{ maxWidth: "1280px", marginBottom: i < evolutionParas.length - 1 ? "24px" : 0 }}
              >
                {b.value}
              </p>
            ))}
          </NumberedSection>
        </section>

        {/* ---- Section 3 : auto-critique ---------------------------------- */}
        <section className="px-[80px] pb-[120px]">
          <NumberedSection number="3" title="auto-critique">
            {autocritiqueParas.map((b, i) => (
              <p
                key={b.block_key}
                className="text-body text-white"
                style={{ maxWidth: "1280px", marginBottom: i < autocritiqueParas.length - 1 ? "24px" : 0 }}
              >
                {b.value}
              </p>
            ))}
          </NumberedSection>
        </section>

        {/* ====================================================================
            SECTION PROJETS
            Titre "projets" flanqué de lignes horizontales + grille de cards
            (reproduit le node "Project Heading" + "Content Container" Figma)
            ==================================================================== */}
        {relatedProjects.length > 0 && (
          <section className="px-[80px] pb-[120px]">

            {/* Titre flanqué de lignes — reproduit node 321:2335 */}
            <div className="flex items-center gap-[31px] mb-[60px]">
              <div
                className="h-px bg-white flex-shrink-0"
                style={{ width: "168px" }}
                aria-hidden
              />
              <h2
                className="font-poppins font-bold text-white leading-[0.9] flex-shrink-0 whitespace-nowrap"
                style={{ fontSize: "80px" }}
              >
                projets
              </h2>
              <div
                className="h-px bg-white flex-shrink-0"
                style={{ width: "168px" }}
                aria-hidden
              />
            </div>

            {/* Grille de cards — 3 colonnes, gap 28px (reproduit node 2052:2862) */}
            <div className="flex flex-wrap gap-[28px]">
              {relatedProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  imageUrl={project.image_url}
                  tags={project.tags ?? []}
                />
              ))}
            </div>
          </section>
        )}

      </div>{/* fin max-w-[1440px] */}
    </main>
  );
}
