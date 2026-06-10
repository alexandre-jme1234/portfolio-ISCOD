import { Link } from "react-router-dom";

/**
 * HardSkillsSection — 3 cartes expertise (section entre Hero et Présentation).
 * Chaque carte : icône < >, titre, description issue de la DB, flèche diagonale.
 * Layout : grille 3 colonnes, cards h-[647px] avec positionnement absolu fidèle Figma.
 */

const HARD_SKILL_CARDS = [
  {
    slug:         "ingenierie-logiciel",
    descKey:      "hard_skill_prog_desc",
    defaultTitle: "ingénierie logiciel",
    defaultDesc:  "Développement d'applications et de logiciel web en node JS et Java. Cela comprend l'étude de votre besoin, le choix des technologies les plus adaptées et le développement en respectant des bonnes pratiques, sécurisé et résiliant.",
  },
  {
    slug:         "devops",
    descKey:      "hard_skill_devops_desc",
    defaultTitle: "DevOps : orchestration",
    defaultDesc:  "Parallèlement au développement logiciel, je peux accompagner les équipes de développement en orchestrant et automatisant les cycles de développement via Docker, Kubernetes.",
  },
  {
    slug:         "ux-ui-design",
    descKey:      "hard_skill_ux_desc",
    defaultTitle: "UxUi : Conception",
    defaultDesc:  "Vous souhaitez concevoir un site web ou une application ? Une démarche UX/UI peut être utile pour améliorer le taux de conversion de vos produits numériques.",
  },
];

export default function HardSkillsSection({ expertises = [], getValue }) {
  return (
    <section className="relative w-full px-[80px] py-[80px]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-heading text-white mb-12">hard skills</h2>

        <div className="grid grid-cols-3 gap-[31px]">
          {HARD_SKILL_CARDS.map((card) => {
            const expertise = expertises.find((e) => e.slug === card.slug);
            return (
              <HardSkillCard
                key={card.slug}
                card={card}
                expertise={expertise}
                getValue={getValue}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HardSkillCard({ card, expertise, getValue }) {
  const title = expertise?.title || card.defaultTitle;
  const desc  = getValue(card.descKey, card.defaultDesc);

  return (
    <Link
      to={`/expertises/${card.slug}`}
      className="group relative block h-[647px] card-border overflow-hidden transition-colors duration-300 hover:border-white/50"
    >
      {/* Icône < > */}
      <div className="absolute top-[28px] left-[29px]" aria-hidden>
        <CodeIcon />
      </div>

      {/* Titre */}
      <h3
        className="absolute top-[89px] left-[20px] right-[20px] font-poppins font-bold text-white leading-[1.4]"
        style={{ fontSize: "clamp(28px, 3.3vw, 48px)" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="absolute top-[233px] left-[24px] w-[244px] font-crimson font-semibold text-white text-[24px] leading-snug">
        {desc}
      </p>

      {/* Flèche diagonale ↗ */}
      <div
        className="absolute bottom-[20px] right-[28px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden
      >
        <DiagonalArrow />
      </div>
    </Link>
  );
}

function CodeIcon() {
  return (
    <svg width="72" height="40" viewBox="0 0 72 40" fill="none" aria-hidden>
      <text
        x="0"
        y="34"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
        fontSize="34"
        fill="white"
      >
        {"< >"}
      </text>
    </svg>
  );
}

function DiagonalArrow() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M4 24 L24 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M14 4 H24 V14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
