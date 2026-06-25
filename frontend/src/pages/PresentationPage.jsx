/**
 * PresentationPage — Page "À propos / Présentation Générale".
 * Fidèle à la maquette Figma (node 2189:893).
 *
 * Sections :
 *   Hero      — breadcrumb PORTFOLIO · À PROPOS + titre + sous-titre
 *   01        — Présentation Générale (portrait + bloc texte à bordure verte)
 *   02        — Mes Valeurs (paragraphes)
 *   03        — Principales Qualités Humaines (2 colonnes)
 *   04        — Centres d'intérêt (3 cartes)
 *   05        — Projets professionnels et personnels
 *
 * Données : content_blocks via GET /api/content/presentation (usePageContent).
 * Les textes longs sont injectés depuis la BDD ; la photo est statique.
 *
 * @see usePageContent dans hooks/useApi.js
 */
import { usePageContent } from "../hooks/useApi.js";
import Spinner from "../components/common/Spinner.jsx";

// ── Palette couleurs de la maquette (référence rapide) ──────────────────────
// #171c21 → fond page
// #cdfb7c → accent vert
// #d6dde6 → texte corps
// #2c2f32 → fond cartes / pills

// ── Sous-composant : numérotation de section (pill + label uppercase) ────────

/**
 * SectionBadge — affiche la pastille numérotée et le label de section.
 * Correspond au pattern "01 / PRÉSENTATION GÉNÉRALE" de la maquette.
 *
 * @param {string} number - "01", "02", …
 * @param {string} label  - Texte uppercase affiché à droite du badge
 */
function SectionBadge({ number, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#2c2f32] px-[10px] py-[4px] rounded-[4px] flex-shrink-0">
        <span className="font-poppins font-bold text-[11px] text-[#cdfb7c]">{number}</span>
      </div>
      <span className="font-poppins font-semibold text-[11px] text-[#cdfb7c] tracking-[0.88px] uppercase">
        {label}
      </span>
    </div>
  );
}

/**
 * SectionHeading — titre H2 de 36px (Poppins Bold blanc) précédé d'un SectionBadge.
 *
 * @param {string} number - Numéro de section ("01"…)
 * @param {string} badge  - Label uppercase du badge
 * @param {string} title  - Texte du titre h2
 */
function SectionHeading({ number, badge, title }) {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <SectionBadge number={number} label={badge} />
      <h2 className="font-poppins font-bold text-[36px] text-white leading-normal">{title}</h2>
    </div>
  );
}

/**
 * BodyText — rendu d'un bloc de texte en paragraphes (split sur double saut de ligne).
 * Utilisé pour les sections 02–05.
 *
 * @param {string}   value     - Texte brut (doubles \\n ou \n pour séparer les §)
 * @param {string}  [className] - Classes Tailwind supplémentaires sur le wrapper
 */
function BodyText({ value, className = "" }) {
  if (!value) return null;
  const paragraphs = value.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className={`font-poppins font-normal text-[17px] text-[#d6dde6] leading-[1.75] flex flex-col gap-[18px] ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}
    </div>
  );
}

// ── Section 01 : Présentation Générale ─────────────────────────────────────

/**
 * PresentationSection — portrait gauche + texte droit avec bordure verte.
 * Respecte exactement le layout Figma : photo 260×320 + identity + barre verte 3px.
 *
 * @param {string[]} paragraphs - Tableaux de paragraphes de texte
 */
function PresentationSection({ paragraphs }) {
  return (
    <section className="px-4 sm:px-8 lg:px-[120px] py-[80px] w-full">
      <div className="flex flex-col lg:flex-row gap-[48px] items-start w-full max-w-[1200px]">

        {/* Colonne gauche : portrait + identité */}
        <div className="flex flex-col gap-[24px] items-center flex-shrink-0 w-full lg:w-[280px]">
          {/* Photo de portrait */}
          <div className="w-[260px] h-[320px] rounded-[12px] overflow-hidden bg-[#2c2f32] flex-shrink-0">
            <img
              src="/images/portrait.jpg"
              alt="Portrait d'Alexandre JAMME"
              className="w-full h-full object-cover"
              /* Fallback si l'image n'est pas encore disponible */
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          {/* Identité */}
          <div className="flex flex-col gap-[8px] items-center text-center w-full">
            <p className="font-poppins font-semibold text-[16px] text-white">
              Alexandre JAMME
            </p>
            <p className="font-poppins font-normal text-[13px] text-[#cdfb7c]">
              Ingénieur Logiciel · Master 2
            </p>
          </div>
        </div>

        {/* Colonne droite : titre section + texte avec barre verte */}
        <div className="flex flex-col gap-[20px] flex-1 min-w-0">
          <SectionHeading
            number="01"
            badge="PRÉSENTATION GÉNÉRALE"
            title="Présentation Générale"
          />

          {/* Bloc texte à bordure verte — barre de 3px + paragraphes */}
          <div className="flex gap-[24px] items-stretch">
            <div className="w-[3px] flex-shrink-0 bg-[#cdfb7c] rounded-full" aria-hidden="true" />
            <div className="flex flex-col gap-[18px] flex-1 min-w-0">
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  className="font-poppins font-normal text-[17px] text-[#d6dde6] leading-[1.75]"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Section 04 : Centres d'intérêt — 3 cartes ──────────────────────────────

/**
 * InterestCard — carte fond #2c2f32, titre vert, texte corps.
 *
 * @param {string} title   - Titre en uppercase (ex: "MUSIQUE")
 * @param {string} content - Corps de la carte
 */
function InterestCard({ title, content }) {
  return (
    <div className="bg-[#2c2f32] flex-1 min-w-0 flex flex-col gap-[12px] p-[32px] rounded-[12px]">
      <p className="font-poppins font-semibold text-[16px] text-[#cdfb7c]">{title}</p>
      <p className="font-poppins font-normal text-[15px] text-[#d6dde6] leading-[1.6]">{content}</p>
    </div>
  );
}

// ── Page principale ─────────────────────────────────────────────────────────

export default function PresentationPage() {
  // Chargement du contenu depuis la BDD via GET /api/content/presentation
  const { content, loading, error, getValue } = usePageContent("presentation");

  if (loading) return <Spinner />;

  // Fallback si aucune donnée en BDD — affichage des textes hardcodés de la maquette
  const fallback = error || Object.keys(content).length === 0;

  // ── Helpers pour accéder aux blocs par catégorie ──────────────────────────
  const getBlocks = (category) =>
    (content[category] || [])
      .slice()
      .sort((a, b) => a.order_index - b.order_index)
      .map((b) => b.value);

  // Paragraphes de chaque section (avec fallback texte maquette)
  const presentationParagraphs = fallback
    ? [
        "C'est lors de mon parcours en Bac S que j'ai découvert l'informatique, une passion que j'ai réellement concrétisée sur le tard dans mes études.",
        "Je suis compétent en développement d'applications web et mobile, notamment grâce à mon parcours académique, mais aussi à ma curiosité et à mon enthousiasme pour la résolution de problèmes algorithmiques complexes. Cela m'a permis, de manière autonome, de suivre des bootcamps de haut niveau pour débutants et de rejoindre des projets open source en tant que développeur web, notamment pour une application liée aux événements Erasmus.",
        "Ces projets, aux contextes techniques variés, m'ont permis d'échanger avec des développeurs expérimentés et de m'inspirer de leurs bonnes pratiques de travail et de code. En tant que développeur frontend, j'ai souvent travaillé sur des bases de code existantes, ce qui m'a amené à adapter ma logique à celle des développeurs précédents.",
        "La résolution de problèmes complexes et la conception logicielle sont des domaines que j'ai toujours cherché à approfondir.",
      ]
    : getBlocks("presentation");

  const valeursText = fallback
    ? [
        "Mes valeurs principales sont le relationnel, l'esprit d'équipe, l'autonomie, l'apprentissage continu, l'adaptabilité, ainsi que l'investissement personnel et professionnel pour produire un travail de qualité.",
        "Durant mon apprentissage chez ColiBack, j'ai été en charge du projet ColiBack Premium. Ce fut une expérience significative, qui m'a permis de monter en compétences sur plusieurs aspects : gestion de projet, conception, développement, test et déploiement d'un web service utilisé pour des centaines de commandes mensuelles en France et en Europe.",
        "Cette expérience m'a permis de confirmer ma rigueur, mon sens de l'organisation, mes compétences en programmation, ainsi que ma capacité à concevoir des systèmes logiciels menant à des produits de qualité professionnelle.",
        "La collaboration a toujours été au cœur des projets. En binôme avec David, en charge du frontend, j'ai défini les comportements du logiciel en synthétisant les besoins clients et en vulgarisant les choix techniques. Nous avons également travaillé ensemble sur l'optimisation des routes.",
        "Ce projet m'a demandé une grande autonomie, notamment à travers la lecture de documentation et la compréhension de stacks comme Shopify, GraphQL ou Docker. J'ai également contribué à l'amélioration du système informatique de ColiBack grâce à mon projet et à mon investissement.",
        "Lors de mon expérience chez Aucae en tant que développeur frontend, j'étais en charge de faire évoluer un CRM en Angular. Avant ma prise de poste, je me suis formé en autonomie (projets from scratch, lecture de documentation, algorithmique, compréhension des couches Angular) afin d'être rapidement opérationnel.",
        "J'ai travaillé avec Angular et Strapi (CMS headless), et j'ai notamment implémenté un système multilingue ainsi que des évolutions sur les workflows de contact.",
        "Suite à un accident de ski m'ayant immobilisé pendant trois mois, je n'ai pas pu poursuivre cette expérience. Cependant, j'ai continué à progresser en programmation orientée objet et à approfondir ma compréhension des concepts Angular sur des bases de code complexes.",
        "Durant cette période, j'ai développé un projet personnel : un catalogue de films en ligne avec Angular et MongoDB. Cette expérience a été très formatrice.",
      ]
    : getBlocks("valeurs");

  const qualitesCol1 = fallback
    ? [
        "Je suis de nature sociable, investi, autonome et curieux. J'apprécie les échanges, aussi bien pour partager des bonnes pratiques que pour découvrir de nouveaux sujets.",
        "Mon expérience en tant qu'UX designer (près de deux ans en alternance à l'ESD, puis en freelance) m'a permis de développer une forte capacité d'écoute et d'analyse des besoins utilisateurs.",
        "Par exemple, chez Mister Auto, je travaillais avec différents métiers (SEA, UI, marketing) et réalisais des tests utilisateurs sur des tunnels de conversion. J'analysais ensuite les résultats pour en extraire des insights et proposer des améliorations.",
        "Chez ColiBack, cette capacité relationnelle m'a également servi, notamment sur le projet ColiBack Cloud. En échangeant avec les préparateurs de commandes et le directeur d'exploitation, j'ai pu identifier leurs besoins pour concevoir une solution adaptée à leurs usages.",
      ]
    : getBlocks("qualites_col1");

  const qualitesCol2 = fallback
    ? [
        "J'apprécie la complexité et je m'investis pleinement dans mon travail. Le métier de développeur implique parfois du stress (régressions, bugs, problèmes de conception), mais je sais garder mon sang-froid et proposer des solutions rapidement.",
        "Par exemple, sur la mise en place d'environnements de développement et de pipelines CI/CD pour ColiBack Premium, j'ai appliqué mes connaissances DevOps acquises à l'ISCOD. Cela a permis de fiabiliser les déploiements et d'éviter les erreurs liées aux environnements ou au manque de tests.",
        "Très curieux, je réalise une veille technique régulière et développe des projets personnels avec des technologies récentes, comme l'orchestration d'agents IA ou le langage Rust.",
      ]
    : getBlocks("qualites_col2");

  const projetsText = fallback
    ? [
        "Grâce à mon parcours, je peux évoluer vers des postes de développeur fullstack, chef de projet logiciel ou UX designer.",
        "Je souhaite poursuivre ma carrière dans l'informatique, tout en étant conscient des évolutions liées à l'intelligence artificielle.",
        "Ces domaines tendent d'ailleurs à se rapprocher avec l'automatisation croissante.",
        "Je souhaite intégrer une entreprise afin de continuer à progresser en développement.",
        "En parallèle, je souhaite poursuivre mes projets musicaux au sein de mon groupe et participer à des événements ou festivals.",
      ]
    : getBlocks("projets_section");

  // Données centres d'intérêt depuis BDD ou fallback
  const interestCards = [
    {
      key:     "musique",
      title:   getValue("interest_musique_title",   "MUSIQUE"),
      content: getValue("interest_musique_content", "Je joue de la basse, de la guitare électrique, du cajón, et je pratique le rap et le chant en improvisation. J'écoute une grande variété de styles (rock, funk, jazz fusion, rap, électro, etc.) et participe régulièrement à des sessions musicales."),
    },
    {
      key:     "art",
      title:   getValue("interest_art_title",   "ART & CULTURE"),
      content: getValue("interest_art_content", "Je m'intéresse également à l'art et à l'histoire de l'art. J'aime visiter des musées en Europe, comme la fondation Van Gogh, les collections de la peinture hollandaise ou encore la Villa Borghese à Rome avec les sculptures du Bernin."),
    },
    {
      key:     "sport",
      title:   getValue("interest_sport_title",   "SPORT"),
      content: getValue("interest_sport_content", "Je pratique aussi la randonnée (parfois sur plusieurs jours) et la natation, qui m'apportent équilibre et discipline. Ces passions sont essentielles pour maintenir un bon équilibre entre vie personnelle et professionnelle."),
    },
  ];

  return (
    <div className="bg-[#171c21] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="bg-[#171c21] flex flex-col gap-[40px] items-start
                   pb-[60px] pt-[80px] px-4 sm:px-8 lg:px-[120px] w-full"
      >
        <div className="flex flex-col gap-[16px] w-full">
          {/* Breadcrumb */}
          <p className="font-poppins font-semibold text-[13px] text-[#cdfb7c] tracking-[0.52px] uppercase">
            PORTFOLIO · À PROPOS
          </p>
          {/* Grand titre */}
          <h1 className="font-poppins font-bold text-[clamp(56px,8vw,80px)] text-white leading-none">
            Présentation
          </h1>
          {/* Sous-titre italique */}
          <p className="font-crimson italic text-[22px] text-[#d6dde6]">
            Ingénierie Logicielle · Master 2
          </p>
        </div>

        {/* Ligne de séparation */}
        <div className="w-full h-px bg-white/10" aria-hidden="true" />
      </section>

      {/* ── Section 01 : Présentation Générale ──────────────────────────── */}
      <PresentationSection paragraphs={presentationParagraphs} />

      {/* ── Section 02 : Mes Valeurs ────────────────────────────────────── */}
      {/* Figma : badge + h2 + contenu sont frères directs (gap-32px entre chaque) */}
      <section className="px-4 sm:px-8 lg:px-[120px] py-[80px] w-full">
        <div className="flex flex-col gap-[32px] w-full">
          <SectionBadge number="02" label="MES VALEURS" />
          <h2 className="font-poppins font-bold text-[36px] text-white leading-normal">
            Mes Valeurs
          </h2>
          <BodyText value={valeursText.join("\n\n")} />
        </div>
      </section>

      {/* ── Section 03 : Qualités Humaines — 2 colonnes ─────────────────── */}
      <section className="px-4 sm:px-8 lg:px-[120px] py-[80px] w-full">
        <div className="flex flex-col gap-[24px] w-full">
          <SectionBadge number="03" label="QUALITÉS HUMAINES" />
          <h2 className="font-poppins font-bold text-[36px] text-white leading-normal">
            Principales Qualités Humaines
          </h2>
          {/* Grille 2 colonnes sur desktop */}
          <div className="flex flex-col lg:flex-row gap-[48px] w-full">
            {/* Colonne gauche */}
            <div className="flex flex-col gap-[18px] flex-1 min-w-0">
              {qualitesCol1.map((text, i) => (
                <p key={i} className="font-poppins font-normal text-[17px] text-[#d6dde6] leading-[1.75]">
                  {text}
                </p>
              ))}
            </div>
            {/* Colonne droite */}
            <div className="flex flex-col gap-[18px] flex-1 min-w-0">
              {qualitesCol2.map((text, i) => (
                <p key={i} className="font-poppins font-normal text-[17px] text-[#d6dde6] leading-[1.75]">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 04 : Centres d'intérêt — 3 cartes ──────────────────── */}
      <section className="px-4 sm:px-8 lg:px-[120px] py-[80px] w-full">
        <div className="flex flex-col gap-[24px] w-full">
          <SectionBadge number="04" label="CENTRES D'INTÉRÊT" />
          <h2 className="font-poppins font-bold text-[36px] text-white leading-normal">
            {"Centres d'intérêt"}
          </h2>
          {/* 3 cartes côte à côte sur desktop */}
          <div className="flex flex-col md:flex-row gap-[20px] w-full">
            {interestCards.map((card) => (
              <InterestCard
                key={card.key}
                title={card.title}
                content={card.content}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 05 : Projets professionnels et personnels ────────────── */}
      <section className="px-4 sm:px-8 lg:px-[120px] py-[80px] w-full">
        <div className="flex flex-col gap-[24px] w-full">
          <SectionBadge number="05" label="PROJETS" />
          <h2 className="font-poppins font-bold text-[36px] text-white leading-normal">
            Projets professionnels et personnels
          </h2>
          <div className="flex flex-col gap-[18px] w-full">
            {projetsText.map((text, i) => (
              <p key={i} className="font-poppins font-normal text-[17px] text-[#d6dde6] leading-[1.75]">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
