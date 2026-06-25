/**
 * seed_establishments_content.js — Injecte le contenu réel des pages /parcours/:slug.
 *
 * Correspondance des blocs (contenu fourni → champs de la page) :
 *   - "Période"     → establishments.subtitle (sous-titre du Hero)
 *   - "Présentation" → establishments.presentation_left / presentation_right (2 colonnes)
 *   - "Valeurs"     → establishment_visions[] (titre en gras = title, texte = description)
 *
 * Idempotent : crée les tables au besoin, fait un upsert par slug, puis
 * reconstruit les visions de chaque établissement.
 *
 * Usage :
 *   # Base configurée dans .env (Aiven) :
 *   docker exec portfolio_backend node src/seed_establishments_content.js
 *
 *   # Base Docker locale (override des variables d'env) :
 *   docker exec -e DB_HOST=db -e DB_PORT=3306 -e DB_NAME=portfolio \
 *     -e DB_USER=portfolio_user -e DB_PASSWORD=portfolio_pass -e DB_SSL=false \
 *     portfolio_backend node src/seed_establishments_content.js
 */

import "dotenv/config";
import mysql from "mysql2/promise";

const config = {
  host:     process.env.DB_HOST     || "localhost",
  port:     Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME     || "portfolio",
  user:     process.env.DB_USER     || "portfolio_user",
  password: process.env.DB_PASSWORD || "portfolio_pass",
  charset:  "utf8mb4",
  ...(process.env.DB_SSL === "true" && { ssl: { rejectUnauthorized: false } }),
};

// ── DDL (idempotent — utile pour la base locale) ──────────────────────────────
const CREATE_ESTABLISHMENTS = `
CREATE TABLE IF NOT EXISTS establishments (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  slug               VARCHAR(100)  NOT NULL UNIQUE,
  name               VARCHAR(200)  NOT NULL,
  subtitle           VARCHAR(255),
  presentation_left  TEXT,
  presentation_right TEXT,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const CREATE_VISIONS = `
CREATE TABLE IF NOT EXISTS establishment_visions (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  establishment_id INT NOT NULL,
  title            VARCHAR(200) NOT NULL,
  description      TEXT,
  position         INT DEFAULT 0,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (establishment_id) REFERENCES establishments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// ── Contenu réel fourni par l'utilisateur (texte non modifié) ─────────────────
const DATA = [
  {
    slug: "coliback",
    name: "COLIBACK",
    subtitle: "oct. 2024 – aujourd'hui",
    presentation_left:
      "Expert en logistique depuis plus de 2012, ColiBack offre des solutions de préparation de commande et de retour de commandes aux e-commerçants français qui vendent en France et en Europe. Cette société située à Genay en périphérie de Lyon m'a accueillie pendant mon apprentissage en tant que développeur Fullstack.",
    presentation_right:
      "Structure à taille humaine, la boîte est en réalité un grand entrepôt de logistique où chaque jour les préparateurs de commande préparent puis envoient des colis. L'informatique a donc toujours fait partie du patrimoine de la société, et le système informatique a été imaginé par David, mon responsable, ingénieur logiciel qui m'a offert la possibilité d'apprendre à concevoir des projets informatiques d'envergure.",
    visions: [
      {
        title: "Ingénierie Logicielle",
        description:
          "C'est le contrat de professionnalisation rêvé dans le cadre du Master que je prépare puisque j'ai eu l'opportunité de démarrer tous mes projets from scratch et donc réfléchir à la conception de l'architecture et de la programmer.",
      },
      {
        title: "Collaboratif",
        description:
          "Les projets dont j'ai eu la charge ou auxquels j'ai participé ont toujours été des projets collaboratifs où il fallait s'entendre avec d'autres développeurs pour développer des solutions maintenables dans le temps.",
      },
      {
        title: "Gestion de projet",
        description:
          "Il fallait énormément d'organisation, un cadre de travail solide pour permettre à tous ces projets de voir le jour.",
      },
    ],
  },
  {
    slug: "la-capsule",
    name: "La Capsule",
    subtitle: "mars 2023 – mai 2023",
    presentation_left:
      "La Capsule est une école qui propose des bootcamps de formations en développement avec une approche centrée sur le codage par projet. Durant 10 semaines, j'ai suivi dans les locaux de la Capsule une bootcamp de Fullstack Web & Mobile Developer. L'école est réputée pour son approche disruptive de l'apprentissage de la programmation par le projet dont la densité et la difficulté d'obtention liée à la charge de connaissance par jour est équivalente à un Bac+3 en programmation universitaire.",
    presentation_right:
      "J'y ai rencontré mes collègues de développement qui sont devenus des amis et avec qui je partage toujours des projets de code.",
    visions: [
      {
        title: "Apprentissage Continu",
        description:
          "Le bootcamp de la Capsule calque les piscines d'Epitech, c'est-à-dire qu'on est lâchés chaque jour avec un nouveau concept de programmation à découvrir sur un projet inédit. Il y a beaucoup d'apprentissage en autonomie et d'exercices sur des projets concrets. Cela inculque une forme de curiosité et d'apprentissage continu en programmation.",
      },
      {
        title: "Pair Programming",
        description:
          "Il y a énormément d'esprit collaboratif dans les projets, c'est ce qui nous a permis de trouver des solutions sur des problèmes complexes, de garder de la motivation dans la difficulté mais aussi d'ancrer nos connaissances en les vulgarisant à ses pairs.",
      },
      {
        title: "Pédagogie Orientée Projet",
        description:
          "Chaque jour, nouveau projet pour maîtriser les fondamentaux en matière de programmation puis on développe un projet de A à Z en React. L'intérêt ici est de découvrir aussi les compétences annexes à la programmation, les compétences de gestion de projet, les compétences en UX/UI design et le pair programming.",
      },
    ],
  },
  {
    slug: "the-hacking-project",
    name: "The Hacking Project",
    subtitle: "janv. 2023 – févr. 2023",
    presentation_left:
      "The Hacking Project est un centre de formation qui propose également des bootcamps, formation développeur web, fullstack etc... Lorsque je me suis intéressé plus sérieusement à la programmation, j'ai commencé par réaliser leur bootcamp d'1 mois présentant les fondamentaux du web et de la programmation. Sur le modèle de la piscine mais sans examen d'entrée, le bootcamp était ouvert à tous, ce qui de jour en jour prévoyait les départs de nombreux de mes camarades. Encore une fois, je me suis fait de très bons collègues avec qui nous nous sommes soutenus dans la réalisation de ce mois avant de filer vers d'autres formations, en l'occurrence la Capsule pour moi.",
    presentation_right:
      "J'ai réalisé ce bootcamp en décembre 2022, peu de temps à la sortie de mes études d'UX UI design. L'apprentissage de la programmation se faisait de la même manière qu'à la Capsule, pédagogie centrée sur le projet.",
    visions: [
      {
        title: "Résolution de problème",
        description:
          "Énormément d'exercices et de katas pour apprendre l'algorithmie en Ruby on Rails. Des projets timés en rendre tous les deux jours sur un fonctionnement type piscine.",
      },
      {
        title: "Pair programming",
        description:
          "Résolution en équipe pour les problèmes complexes, j'ai une collègue qui avait plus d'expérience que nous en programmation et donc beaucoup plus de réflexes.",
      },
      {
        title: "Autonomie",
        description:
          "Ce bootcamp était en distanciel et supposait qu'on acquière rapidement une méthodologie d'apprentissage efficace pour réaliser les exercices quotidiens.",
      },
    ],
  },
  {
    slug: "esd",
    name: "ESD",
    subtitle: "2020 – 2022",
    presentation_left:
      "L'école Supérieure du Digital est sûrement l'une des écoles précurseures à Lyon en matière d'apprentissage des nouveaux métiers du digital. Il y est enseigné les métiers liés au marketing digital, à la production de produits créatifs et au design dans le numérique.",
    presentation_right:
      "J'y ai intégré un Master en UX UI design à la sortie de mon Bachelor à Sup de Com. Pour apprendre les méthodologies en Design Thinking, le métier d'UX designer ainsi que le management de projet.",
    visions: [
      {
        title: "Pédagogie par le projet",
        description:
          "Des semaines de workshop permettaient d'évaluer en continu, les modules de cours étaient destinés à produire des projets pour des clients ou des projets factices.",
      },
      {
        title: "Collaboration",
        description:
          "Tous les projets étaient des projets réalisés en équipe, où chaque étudiant avait un rôle défini et challengé par le chef de groupe.",
      },
      {
        title: "Créativité et design",
        description:
          "J'ai beaucoup développé ma créativité lors de ces années, car il est nécessaire d'imaginer de nouvelles solutions grâce aux méthodes de Design Thinking.",
      },
    ],
  },
  {
    slug: "misterauto",
    name: "MisterAuto",
    subtitle: "oct. 2021 – sept. 2022",
    presentation_left:
      "Durant mes études à l'ESD, j'étais rédacteur de contenu pendant une année puis UX designer junior l'année suivante. Mister Auto est une marketplace lyonnaise experte en vente de pièces détachées pour voiture.",
    presentation_right:
      "Durant la première année, j'étais chargé de rédiger du contenu de qualité en SEO pour améliorer le référencement du site vitrine de Mister Auto auprès de Guillaume PEUCELLE expert en référencement. La seconde année, j'ai été UX designer auprès d'Adrien DUPONT et j'améliorais l'ergonomie du site en relevant et analysant les insights clients.",
    visions: [
      {
        title: "Apprentissage en continu",
        description:
          "Pour s'améliorer et être autonome rapidement, j'ai lu et appris énormément en lisant sur le net, dans des livres.",
      },
      {
        title: "Design et ergonomie",
        description:
          "Compétences que j'ai beaucoup travaillées à Mister Auto, en réalisant des maquettes de tunnels d'achat, des ergonomies de blogs etc...",
      },
      {
        title: "Esthétique visuelle",
        description:
          "Travaillant en direct avec les UI designers, je découvrais et me passionnais pour les esthétiques visuelles en web design.",
      },
    ],
  },
  {
    slug: "supdecom",
    name: "SUP'DE COM",
    subtitle: "2017 – 2020",
    presentation_left:
      "École Supérieure en Communication, école à bonne réputation où l'on y enseigne les métiers de communicants, de Community Manager, pigiste, journaliste mais aussi les métiers de la rédaction web.",
    presentation_right:
      "J'y ai réalisé un Bachelor de 2017 à 2020, la pédagogie qui y était enseignée est également une pédagogie par projet dont le mot d'ordre était de permettre aux étudiants d'être immergés dans la réalité de l'emploi très tôt.",
    visions: [
      {
        title: "Créativité",
        description:
          "Il fallait créer des briefs créatifs, produire de la conception rédaction, des infographies etc... La créativité était le mot d'ordre.",
      },
      {
        title: "Collaboratif",
        description:
          "Les projets d'études, les workshop et les projets réalisés étaient exclusivement en groupe.",
      },
      {
        title: "Entreprise",
        description:
          "À Sup de Com, l'étudiant était considéré comme un professionnel de la communication.",
      },
    ],
  },
  {
    slug: "lyon3",
    name: "Université Jean Moulin Lyon 3",
    subtitle: "2015 – 2017",
    presentation_left:
      "Université en mention faculté de droit, où l'on y suivait des cours en amphi de droit général, de droit civil, de droit constitutionnel.",
    presentation_right:
      "En TD, des devoirs rédigés sur les mentions du cours étaient produits. J'y ai étudié le droit de 2015 à 2017.",
    visions: [
      {
        title: "Capacité rédactionnelle et esprit d'analyse",
        description:
          "Pour comprendre les arrêtés, les jurisprudences, retenir ses cours il est nécessaire d'avoir de bonnes capacités de rédaction et un bon esprit d'analyse et de synthèse.",
      },
      {
        title: "Discipline",
        description:
          "En totale autonomie, il est nécessaire d'être capable de s'auto-discipliner et de se poser une méthodologie stricte pour obtenir son année.",
      },
      {
        title: "Sens critique",
        description:
          "L'université est un milieu d'idées, les sujets sur lesquels nous étions évalués supposaient une bonne capacité à critiquer les sujets donnés sur des sujets de dissertation et de commentaires composés.",
      },
    ],
  },
];

async function seed() {
  let connection;
  try {
    console.log(`\n🔌 Connexion à ${config.host}:${config.port}/${config.database} …`);
    connection = await mysql.createConnection(config);
    console.log("✅ Connecté.");

    // Tables (au cas où — surtout pour la base locale)
    await connection.query(CREATE_ESTABLISHMENTS);
    await connection.query(CREATE_VISIONS);

    for (const est of DATA) {
      // Upsert de l'établissement par slug
      await connection.query(
        `INSERT INTO establishments (slug, name, subtitle, presentation_left, presentation_right)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           subtitle = VALUES(subtitle),
           presentation_left = VALUES(presentation_left),
           presentation_right = VALUES(presentation_right)`,
        [est.slug, est.name, est.subtitle, est.presentation_left, est.presentation_right]
      );

      // Récupère l'id puis reconstruit les visions
      const [[row]] = await connection.query(
        "SELECT id FROM establishments WHERE slug = ?",
        [est.slug]
      );
      await connection.query(
        "DELETE FROM establishment_visions WHERE establishment_id = ?",
        [row.id]
      );
      for (let i = 0; i < est.visions.length; i++) {
        await connection.query(
          `INSERT INTO establishment_visions (establishment_id, title, description, position)
           VALUES (?, ?, ?, ?)`,
          [row.id, est.visions[i].title, est.visions[i].description, i]
        );
      }
      console.log(`  ✓ ${est.slug} (${est.visions.length} visions)`);
    }

    console.log(`\n🎉 ${DATA.length} établissements mis à jour.\n`);
  } catch (err) {
    console.error("❌ Erreur de seed :", err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
    console.log("🔌 Connexion fermée.");
  }
}

seed();
