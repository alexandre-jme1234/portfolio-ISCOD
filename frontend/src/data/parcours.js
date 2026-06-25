/**
 * parcours.js — Données de la frise chronologique (page /parcours).
 *
 * Source : maquette Figma "parcours-frise-verticale" (node 2167:879).
 * Le contenu ici est STRICTEMENT celui de la maquette (aucun ajout).
 *
 * Chaque entrée décrit une étape du parcours :
 *   - slug     : identifiant URL de la page détail (/parcours/:slug). Présent uniquement
 *                sur les entrées cliquables (celles avec detail: true).
 *   - side     : "left" | "right"  → côté de la frise (alterné, en commençant par la gauche)
 *   - date     : période affichée (ex. "oct. 2024 – aujourd'hui")
 *   - type     : "experience" | "formation"  → détermine la couleur du badge
 *   - title    : intitulé du poste / de la formation
 *   - org      : organisme / entreprise (texte violet)
 *   - subtitle : précision sous l'organisme (optionnel : Alternance, CDD, RNCP…)
 *   - logo     : chemin de l'image du logo dans /public (null si absent de la maquette)
 *   - logoAlt  : texte alternatif du logo
 *   - detail   : true → affiche le lien "Voir le détail →" ; false → le masque
 */

const LOGO_DIR = "/images/parcours";

export const PARCOURS_ENTRIES = [
  {
    side: "left",
    date: "oct. 2024 – aujourd'hui",
    type: "experience",
    title: "Développeur Fullstack",
    org: "COLIBACK",
    slug: "coliback",
    subtitle: "Alternance",
    logo: `${LOGO_DIR}/coliback.png`,
    logoAlt: "Logo Coliback",
    detail: true,
  },
  {
    side: "right",
    date: "janv. 2024 – janv. 2026",
    type: "formation",
    title: "ISCOD – Mastère Expert en ingénierie logicielle",
    org: "ISCOD",
    subtitle: "RNCP niveau 7 – Mastère Expert en ingénierie logicielle",
    logo: `${LOGO_DIR}/iscod.png`,
    logoAlt: "Logo ISCOD",
    detail: false,
  },
  {
    side: "left",
    date: "janv. 2024 – févr. 2024",
    type: "experience",
    title: "Développeur Frontend Angular",
    org: "AUCAE",
    slug: "aucae",
    subtitle: "CDD",
    logo: `${LOGO_DIR}/aucae.png`,
    logoAlt: "Logo AUCAE",
    detail: true,
  },
  {
    side: "right",
    date: "mars 2023 – mai 2023",
    type: "formation",
    title: "La Capsule – Développeur web full-stack",
    org: "La Capsule",
    slug: "la-capsule",
    subtitle: "RNCP Chef de projet de développements applications",
    logo: `${LOGO_DIR}/la-capsule.png`,
    logoAlt: "Logo La Capsule",
    detail: true,
  },
  {
    side: "left",
    date: "janv. 2023 – févr. 2023",
    type: "formation",
    title: "The Hacking Project – Bootcamp développeur full-stack",
    org: "The Hacking Project",
    slug: "the-hacking-project",
    subtitle: "Non précisé",
    logo: `${LOGO_DIR}/the-hacking-project.png`,
    logoAlt: "Logo The Hacking Project",
    detail: true,
  },
  {
    side: "right",
    date: "oct. 2021 – sept. 2022",
    type: "experience",
    title: "UX Designer Junior",
    org: "MisterAuto",
    slug: "misterauto",
    subtitle: "Alternance",
    logo: `${LOGO_DIR}/misterauto.png`,
    logoAlt: "Logo MisterAuto",
    detail: true,
  },
  {
    side: "left",
    date: "févr. 2021 – oct. 2021",
    type: "experience",
    title: "Rédacteur SEO",
    org: "Freelance",
    subtitle: null,
    logo: null, // Pas de logo sur la maquette pour cette entrée
    logoAlt: null,
    detail: false,
  },
  {
    side: "right",
    date: "2020 – 2022",
    type: "formation",
    title: "ESD – Mastère User Experience",
    org: "ESD",
    slug: "esd",
    subtitle: "RNCP Mastère User Experience",
    logo: `${LOGO_DIR}/esd.png`,
    logoAlt: "Logo ESD",
    detail: true,
  },
  {
    side: "left",
    date: "sept. 2020 – déc. 2020",
    type: "experience",
    title: "Consultant en référencement",
    org: "Viseo",
    subtitle: null,
    logo: `${LOGO_DIR}/viseo.png`,
    logoAlt: "Logo Viseo",
    detail: false,
  },
  {
    side: "right",
    date: "sept. 2018 – mai 2019",
    type: "experience",
    title: "Attaché de presse",
    org: "Editions Verone",
    subtitle: "Alternance",
    logo: `${LOGO_DIR}/editions-verone.png`,
    logoAlt: "Logo Éditions Verone",
    detail: false,
  },
  {
    side: "left",
    date: "mars 2018 – juil. 2018",
    type: "experience",
    title: "Rédacteur Web",
    org: "ENIGMAT",
    subtitle: "Stage",
    logo: `${LOGO_DIR}/enigmat.png`,
    logoAlt: "Logo ENIGMAT",
    detail: false,
  },
  {
    side: "right",
    date: "2017 – 2020",
    type: "formation",
    title: "SUP'DE COM – Bachelor responsable de communication",
    org: "SUP'DE COM",
    slug: "supdecom",
    subtitle: "Bachelor responsable de communication",
    logo: `${LOGO_DIR}/supdecom.png`,
    logoAlt: "Logo SUP'DE COM",
    detail: true,
  },
  {
    side: "left",
    date: "2015 – 2017",
    type: "formation",
    title: "Université Jean Moulin Lyon 3 – Licence de droit",
    org: "Lyon 3",
    slug: "lyon3",
    subtitle: "Licence de droit (L1 validée)",
    logo: `${LOGO_DIR}/lyon3.png`,
    logoAlt: "Logo Université Jean Moulin Lyon 3",
    detail: true,
  },
];
