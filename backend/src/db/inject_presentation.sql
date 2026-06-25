-- ============================================================
-- inject_presentation.sql
-- Seed des blocs de contenu pour la page "Présentation Générale"
-- (maquette Figma node 2189:893 — page_slug = 'presentation')
--
-- Sections :
--   presentation  → 4 paragraphes du bloc 01
--   valeurs       → 9 paragraphes du bloc 02
--   qualites_col1 → 4 paragraphes colonne gauche du bloc 03
--   qualites_col2 → 3 paragraphes colonne droite du bloc 03
--   interests     → 3 cartes (titre + corps) du bloc 04
--   projets_section → 5 paragraphes du bloc 05
-- ============================================================

SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- Déclare la page si elle n'existe pas encore
INSERT IGNORE INTO pages (slug, title, type)
VALUES ('presentation', 'Présentation Générale', 'home');

-- ── Section 01 : Présentation Générale ──────────────────────────────────────
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('presentation', 'pres_p1', 'paragraph',
   'C''est lors de mon parcours en Bac S que j''ai découvert l''informatique, une passion que j''ai réellement concrétisée sur le tard dans mes études.',
   'presentation', 1),
  ('presentation', 'pres_p2', 'paragraph',
   'Je suis compétent en développement d''applications web et mobile, notamment grâce à mon parcours académique, mais aussi à ma curiosité et à mon enthousiasme pour la résolution de problèmes algorithmiques complexes. Cela m''a permis, de manière autonome, de suivre des bootcamps de haut niveau pour débutants et de rejoindre des projets open source en tant que développeur web, notamment pour une application liée aux événements Erasmus.',
   'presentation', 2),
  ('presentation', 'pres_p3', 'paragraph',
   'Ces projets, aux contextes techniques variés, m''ont permis d''échanger avec des développeurs expérimentés et de m''inspirer de leurs bonnes pratiques de travail et de code. En tant que développeur frontend, j''ai souvent travaillé sur des bases de code existantes, ce qui m''a amené à adapter ma logique à celle des développeurs précédents.',
   'presentation', 3),
  ('presentation', 'pres_p4', 'paragraph',
   'La résolution de problèmes complexes et la conception logicielle sont des domaines que j''ai toujours cherché à approfondir.',
   'presentation', 4);

-- ── Section 02 : Mes Valeurs ─────────────────────────────────────────────────
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('presentation', 'val_p1', 'paragraph',
   'Mes valeurs principales sont le relationnel, l''esprit d''équipe, l''autonomie, l''apprentissage continu, l''adaptabilité, ainsi que l''investissement personnel et professionnel pour produire un travail de qualité.',
   'valeurs', 1),
  ('presentation', 'val_p2', 'paragraph',
   'Durant mon apprentissage chez ColiBack, j''ai été en charge du projet ColiBack Premium. Ce fut une expérience significative, qui m''a permis de monter en compétences sur plusieurs aspects : gestion de projet, conception, développement, test et déploiement d''un web service utilisé pour des centaines de commandes mensuelles en France et en Europe.',
   'valeurs', 2),
  ('presentation', 'val_p3', 'paragraph',
   'Cette expérience m''a permis de confirmer ma rigueur, mon sens de l''organisation, mes compétences en programmation, ainsi que ma capacité à concevoir des systèmes logiciels menant à des produits de qualité professionnelle.',
   'valeurs', 3),
  ('presentation', 'val_p4', 'paragraph',
   'La collaboration a toujours été au cœur des projets. En binôme avec David, en charge du frontend, j''ai défini les comportements du logiciel en synthétisant les besoins clients et en vulgarisant les choix techniques. Nous avons également travaillé ensemble sur l''optimisation des routes.',
   'valeurs', 4),
  ('presentation', 'val_p5', 'paragraph',
   'Ce projet m''a demandé une grande autonomie, notamment à travers la lecture de documentation et la compréhension de stacks comme Shopify, GraphQL ou Docker. J''ai également contribué à l''amélioration du système informatique de ColiBack grâce à mon projet et à mon investissement.',
   'valeurs', 5),
  ('presentation', 'val_p6', 'paragraph',
   'Lors de mon expérience chez Aucae en tant que développeur frontend, j''étais en charge de faire évoluer un CRM en Angular. Avant ma prise de poste, je me suis formé en autonomie (projets from scratch, lecture de documentation, algorithmique, compréhension des couches Angular) afin d''être rapidement opérationnel.',
   'valeurs', 6),
  ('presentation', 'val_p7', 'paragraph',
   'J''ai travaillé avec Angular et Strapi (CMS headless), et j''ai notamment implémenté un système multilingue ainsi que des évolutions sur les workflows de contact.',
   'valeurs', 7),
  ('presentation', 'val_p8', 'paragraph',
   'Suite à un accident de ski m''ayant immobilisé pendant trois mois, je n''ai pas pu poursuivre cette expérience. Cependant, j''ai continué à progresser en programmation orientée objet et à approfondir ma compréhension des concepts Angular sur des bases de code complexes.',
   'valeurs', 8),
  ('presentation', 'val_p9', 'paragraph',
   'Durant cette période, j''ai développé un projet personnel : un catalogue de films en ligne avec Angular et MongoDB. Cette expérience a été très formatrice.',
   'valeurs', 9);

-- ── Section 03 : Qualités Humaines — colonne gauche ─────────────────────────
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('presentation', 'qual_c1_p1', 'paragraph',
   'Je suis de nature sociable, investi, autonome et curieux. J''apprécie les échanges, aussi bien pour partager des bonnes pratiques que pour découvrir de nouveaux sujets.',
   'qualites_col1', 1),
  ('presentation', 'qual_c1_p2', 'paragraph',
   'Mon expérience en tant qu''UX designer (près de deux ans en alternance à l''ESD, puis en freelance) m''a permis de développer une forte capacité d''écoute et d''analyse des besoins utilisateurs.',
   'qualites_col1', 2),
  ('presentation', 'qual_c1_p3', 'paragraph',
   'Par exemple, chez Mister Auto, je travaillais avec différents métiers (SEA, UI, marketing) et réalisais des tests utilisateurs sur des tunnels de conversion. J''analysais ensuite les résultats pour en extraire des insights et proposer des améliorations.',
   'qualites_col1', 3),
  ('presentation', 'qual_c1_p4', 'paragraph',
   'Chez ColiBack, cette capacité relationnelle m''a également servi, notamment sur le projet ColiBack Cloud. En échangeant avec les préparateurs de commandes et le directeur d''exploitation, j''ai pu identifier leurs besoins pour concevoir une solution adaptée à leurs usages.',
   'qualites_col1', 4);

-- ── Section 03 : Qualités Humaines — colonne droite ─────────────────────────
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('presentation', 'qual_c2_p1', 'paragraph',
   'J''apprécie la complexité et je m''investis pleinement dans mon travail. Le métier de développeur implique parfois du stress (régressions, bugs, problèmes de conception), mais je sais garder mon sang-froid et proposer des solutions rapidement.',
   'qualites_col2', 1),
  ('presentation', 'qual_c2_p2', 'paragraph',
   'Par exemple, sur la mise en place d''environnements de développement et de pipelines CI/CD pour ColiBack Premium, j''ai appliqué mes connaissances DevOps acquises à l''ISCOD. Cela a permis de fiabiliser les déploiements et d''éviter les erreurs liées aux environnements ou au manque de tests.',
   'qualites_col2', 2),
  ('presentation', 'qual_c2_p3', 'paragraph',
   'Très curieux, je réalise une veille technique régulière et développe des projets personnels avec des technologies récentes, comme l''orchestration d''agents IA ou le langage Rust.',
   'qualites_col2', 3);

-- ── Section 04 : Centres d'intérêt — 3 cartes ────────────────────────────────
-- Format des cartes : block_key suffixé par _title ou _content
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('presentation', 'interest_musique_title', 'label',
   'MUSIQUE',
   'interests', 1),
  ('presentation', 'interest_musique_content', 'paragraph',
   'Je joue de la basse, de la guitare électrique, du cajón, et je pratique le rap et le chant en improvisation. J''écoute une grande variété de styles (rock, funk, jazz fusion, rap, électro, etc.) et participe régulièrement à des sessions musicales.',
   'interests', 2),
  ('presentation', 'interest_art_title', 'label',
   'ART & CULTURE',
   'interests', 3),
  ('presentation', 'interest_art_content', 'paragraph',
   'Je m''intéresse également à l''art et à l''histoire de l''art. J''aime visiter des musées en Europe, comme la fondation Van Gogh, les collections de la peinture hollandaise ou encore la Villa Borghese à Rome avec les sculptures du Bernin.',
   'interests', 4),
  ('presentation', 'interest_sport_title', 'label',
   'SPORT',
   'interests', 5),
  ('presentation', 'interest_sport_content', 'paragraph',
   'Je pratique aussi la randonnée (parfois sur plusieurs jours) et la natation, qui m''apportent équilibre et discipline. Ces passions sont essentielles pour maintenir un bon équilibre entre vie personnelle et professionnelle.',
   'interests', 6);

-- ── Section 05 : Projets professionnels et personnels ────────────────────────
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('presentation', 'proj_p1', 'paragraph',
   'Grâce à mon parcours, je peux évoluer vers des postes de développeur fullstack, chef de projet logiciel ou UX designer.',
   'projets_section', 1),
  ('presentation', 'proj_p2', 'paragraph',
   'Je souhaite poursuivre ma carrière dans l''informatique, tout en étant conscient des évolutions liées à l''intelligence artificielle.',
   'projets_section', 2),
  ('presentation', 'proj_p3', 'paragraph',
   'Ces domaines tendent d''ailleurs à se rapprocher avec l''automatisation croissante.',
   'projets_section', 3),
  ('presentation', 'proj_p4', 'paragraph',
   'Je souhaite intégrer une entreprise afin de continuer à progresser en développement.',
   'projets_section', 4),
  ('presentation', 'proj_p5', 'paragraph',
   'En parallèle, je souhaite poursuivre mes projets musicaux au sein de mon groupe et participer à des événements ou festivals.',
   'projets_section', 5);
