-- ============================================================
-- Portfolio Alexandre JAMME — Schéma MariaDB + Seed
-- Contenu fidèle à la maquette Figma (textes non modifiés)
-- ============================================================

SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- ---- PAGES -----------------------------------------------
-- Référentiel des pages du portfolio
CREATE TABLE IF NOT EXISTS pages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  slug       VARCHAR(100)  NOT NULL UNIQUE,
  title      VARCHAR(200)  NOT NULL,
  type       ENUM('home','expertise','competence','projet') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- CONTENT_BLOCKS ---------------------------------------
-- Blocs de texte injectables dans les templates par page
-- (titres, paragraphes, labels, chiffres...)
CREATE TABLE IF NOT EXISTS content_blocks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  page_slug   VARCHAR(100)  NOT NULL,
  block_key   VARCHAR(200)  NOT NULL,  -- identifiant unique dans la page
  type        ENUM('h1','h2','h3','label','paragraph','list_item','number','image_url') NOT NULL,
  value       TEXT          NOT NULL,
  category    VARCHAR(100),            -- regroupement sémantique (ex: intro_col1)
  order_index INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (page_slug) REFERENCES pages(slug) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- SKILLS -----------------------------------------------
-- Compétences techniques (losanges verts dans la section Compétences)
CREATE TABLE IF NOT EXISTS skills (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  description VARCHAR(200),
  category    ENUM('programmation','infogerance','ux-design','gestion-projet') NOT NULL,
  icon_key    VARCHAR(100),            -- clé de l'icône SVG
  order_index INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- EXPERTISES -------------------------------------------
-- 4 domaines d'expertise (Ingénierie, DevOps, Gestion, UX)
CREATE TABLE IF NOT EXISTS expertises (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(100)  NOT NULL UNIQUE,
  title       VARCHAR(200)  NOT NULL,
  subtitle    VARCHAR(200),
  description TEXT,
  image_url   VARCHAR(500),
  order_index INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- PROJECTS ---------------------------------------------
-- Cards de projets réalisés
CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(200)  NOT NULL UNIQUE,
  title       VARCHAR(200)  NOT NULL,
  subtitle    VARCHAR(200),
  description TEXT,
  image_url   VARCHAR(500),
  category    VARCHAR(100),
  order_index INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---- CURSUS -----------------------------------------------
-- Timeline des formations (3 colonnes dans la maquette)
CREATE TABLE IF NOT EXISTS cursus (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  school      VARCHAR(200)  NOT NULL,
  discipline  VARCHAR(200),
  period      VARCHAR(50),
  order_index INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Items bullet-points de chaque formation
CREATE TABLE IF NOT EXISTS cursus_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  cursus_id   INT NOT NULL,
  content     TEXT NOT NULL,
  order_index INT DEFAULT 0,
  FOREIGN KEY (cursus_id) REFERENCES cursus(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==============================================================
-- SEED — Données fidèles à la maquette Figma
-- ==============================================================

-- ---- Pages ---------------------------------------------------
INSERT INTO pages (slug, title, type) VALUES
  ('home',                  'Portfolio Alexandre JAMME', 'home'),
  ('expertises-ingenierie', 'Ingénierie Logiciel',       'expertise'),
  ('expertises-devops',     'DevOps',                    'expertise'),
  ('expertises-gestion',    'Gestion de Projet',         'expertise'),
  ('expertises-uxui',       'UX.UI Design',              'expertise'),
  ('competences',           'Compétences',               'competence'),
  ('projets',               'Projets',                   'projet');

-- ---- Content blocks : page home -----------------------------

-- Hero
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('home', 'hero_name',     'h1',    'Alexandre JAMME',     'hero', 1),
  ('home', 'hero_subtitle', 'label', 'INGENIERIE LOGICIEL', 'hero', 2);

-- Section Intro — 3 colonnes de texte (frame 77:464 maquette)
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('home', 'intro_col1_p1', 'paragraph',
   'Coliback est un fournisseur clé dans le secteur du e-commerce en France. Le logisticien propose deux offres : la préparation des commandes effectuées sur les boutiques des e-commerçants et une offre pour retourner des produits non conformes ou défectueux. J\'intègre la société en 2024 en tant que développeur de solution informatique en alternance au cours d\'un Master en Ingénierie Logiciel proposé par l\'ISCOD.\nAvec de solides connaissances en UX.UI design et en programmation informatique, l\'obtention de ce titre me permettait de comprendre comment conduire et réaliser la conception de solutions logiciels robustes qui répondent au besoin des utilisateurs.',
   'intro_col1', 1),
  ('home', 'intro_col1_p2', 'paragraph',
   'Le Master d\'Ingénierie Logiciel proposé par l\'ISCOD vise l\'acquisition des connaissances et compétences d\'analyse des besoins d\'un client en termes d\'architecture technique, la conception',
   'intro_col1', 2),
  ('home', 'intro_col2_p1', 'paragraph',
   'et le développement d\'architectures techniques et la gestion de projet de développement informatique en Agilité.',
   'intro_col2', 1),
  ('home', 'intro_col2_p2', 'paragraph',
   'Ancien diplômé de la Capsule avec l\'obtention d\'une certification développeur Web et Mobile, j\'ai appris programmer des applications créatives et robustes qui répondent à des contraintes techniques.',
   'intro_col2', 2),
  ('home', 'intro_col2_p3', 'paragraph',
   'Plus tôt, j\'ai été diplômé d\'un Master en UX.UI design décerné par l\'Ecole Supérieur du Numérique où j\'ai acquis les connaissances en Design Thinking, en Design et en recherche utilisateur nécessaire pour concevoir des solution numériques qui répondent à des besoins utilisateurs ciblés.',
   'intro_col2', 3),
  ('home', 'intro_col2_p4', 'paragraph',
   'Naturellement, le Mastère d\'Ingénierie Logiciel créé le pont entre ces compétences de programmation et ces compétences de conception.',
   'intro_col2', 4),
  ('home', 'intro_col3_p1', 'paragraph',
   'C\'est sous la responsabilité de Mr David DIAS, directeur technique de Coliback que j\'ai été missionné à développer une solution automatisant les commandes retournées sur les boutiques Shopify, une refonte du portail des services internes de l\'entreprise, la création d\'un site vitrine pour la Startup MyCityStock, le développement d\'un logiciel de génération de factures dans l\'écosystème de l\'entreprise.',
   'intro_col3', 1),
  ('home', 'intro_col3_p2', 'paragraph',
   'Je m\'appelle Alexandre JAMME, et j\'espère que les projets que vous découvrirez dans ce portfolio vous passionneront autant qu\'ils m\'ont plu à réaliser.',
   'intro_col3', 2);

-- Section Expertises — graphique en barres (frame 77:418)
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('home', 'expertises_title',         'h1',    'Expertises',                                        'expertises', 1),
  ('home', 'expertises_subtitle',      'label', 'Répartition de mon temps de travail chez Coliback', 'expertises', 2),
  ('home', 'expertises_pct_gestion',   'number','10',                                                'expertises', 3),
  ('home', 'expertises_pct_prog',      'number','60',                                                'expertises', 4),
  ('home', 'expertises_pct_infog',     'number','30',                                                'expertises', 5),
  ('home', 'expertises_label_gestion', 'label', 'GESTION DE PROJET',                                'expertises', 6),
  ('home', 'expertises_label_prog',    'label', 'PROGRAMMATION',                                     'expertises', 7),
  ('home', 'expertises_label_infog',   'label', 'INFOGÉRANCE',                                       'expertises', 8);

-- Section Compétences (frame 77:415)
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('home', 'competences_title',    'h1',       'Compétences', 'competences', 1),
  ('home', 'competences_subtitle', 'label',    'Overview',    'competences', 2),
  ('home', 'competences_desc',     'paragraph',
   'Soft skills et hard skills acquis au cours de mes projets profesionnels, de mes projets d\'étude ainsi que de mes formation',
   'competences', 3);

-- ---- Skills -------------------------------------------------

-- Programmation / Ingénierie Logiciel (frame comp_pjt_prog)
INSERT INTO skills (name, description, category, icon_key, order_index) VALUES
  ('Javascript',       'POO / événementiel / algorithmie',   'programmation', 'javascript',  1),
  ('nodeJS',           'POO / app backend',                   'programmation', 'nodejs',       2),
  ('AngularJS',        'POO / Single Page Application',       'programmation', 'angular',      3),
  ('React',            'POO / Single Page Application',       'programmation', 'react',        4),
  ('Python',           'script & logiciel exécutable / IA',   'programmation', 'python',       5),
  ('JavaSE',           'POO',                                 'programmation', 'java',         6),
  ('SQL',              'Backend / Database',                  'programmation', 'sql',          7),
  ('NoSQL',            'Backend / Database',                  'programmation', 'nosql',        8),
  ('HTML5',            'Balisage',                            'programmation', 'html5',        9),
  ('CSS3',             'Style',                               'programmation', 'css3',        10),
  ('TailWind',         'style',                               'programmation', 'tailwind',    11),
  ('nginx',            'Reverse Proxy / DNS',                 'programmation', 'nginx',       12),
  ('Directus',         'CRM Backend OpenSource',              'programmation', 'directus',    13),
  ('SpringBoot',       'ORM backend',                         'programmation', 'springboot',  14),
  ('Github',           'versionning / collaboratif',          'programmation', 'github',      15),
  ('Wordpress',        'intégration de sites vitrine',        'programmation', 'wordpress',   16),
  ('Typescript',       'programmation',                       'programmation', 'typescript',  17),
  ('Kotlin',           'POO développement applications',      'programmation', 'kotlin',      18),
  ('Modélisation UML', 'Diagramme classe / objet / DB',       'programmation', 'uml',         19);

-- Infogérance / DevOps (frame comp_pjt_infogerance)
INSERT INTO skills (name, description, category, icon_key, order_index) VALUES
  ('Ubuntu 24.04', 'Linux / hébergement',  'infogerance', 'ubuntu',     1),
  ('Cloud OVH',    'hébergement distant',  'infogerance', 'cloud',      2),
  ('Kubernetes',   'hébergement distant',   'infogerance', 'kubernetes', 3),
  ('Windows',      'système exploitation', 'infogerance', 'windows',    4),
  ('Docker',       'containerisation',     'infogerance', 'docker',     5),
  ('Git Actions',  'pipelines ci/cd',      'infogerance', 'gitactions', 6);

-- UX.UI Design (frame comp_pjt_ux)
INSERT INTO skills (name, description, category, icon_key, order_index) VALUES
  ('figma',          'conception maquette',                  'ux-design', 'figma',     1),
  ('hotjar',         'analyse navigation ux',                'ux-design', 'hotjar',    2),
  ('Audit Ergonomie','Audit Bastien Scapin / Design',        'ux-design', 'audit',     3),
  ('Sondage UX',     'Rédactions et études de formulaires',  'ux-design', 'survey',    4),
  ('Wireframes UX',  'conception Wireframes / Recherche UX', 'ux-design', 'wireframe', 5);

-- Gestion de Projet (frame comp_pjt)
INSERT INTO skills (name, description, category, icon_key, order_index) VALUES
  ('Méthodologie Agile', 'Backlog',                             'gestion-projet', 'agile',      1),
  ('Jira',               'Gestion Backlog / Taches / Epic',     'gestion-projet', 'backlog',    2),
  ('Projet SI',          'Architecture SI / suivi projet',      'gestion-projet', 'si',         3),
  ('Google Drive',       'Reporting KPI / présentation / doc',  'gestion-projet', 'gdrive',     4),
  ('Confluence',         'Documentations',                      'gestion-projet', 'confluence', 5),
  ('Obsidian',           'Prise de note',                       'gestion-projet', 'obsidian',   6);

-- ---- Expertises ---------------------------------------------
INSERT INTO expertises (slug, title, subtitle, description, order_index) VALUES
  ('ingenierie-logiciel',
   'INGENIERIE LOGICIEL', 'développement application web',
   'Développement d\'applications et de logiciel web en node JS et Java. Cela comprend l\'étude de votre besoin, le choix des technologies les plus adaptées et le développement en respectant des bonnes pratiques, sécurisé et résiliant.',
   1),
  ('devops',
   'DEVOPS', 'infrastructure & déploiement',
   'Mise en place d\'architectures Docker/Kubernetes, configuration CI/CD avec Git Actions, déploiement sur Cloud OVH et gestion des environnements Linux.',
   2),
  ('gestion-de-projet',
   'GESTION DE PROJET', 'pilotage agile',
   'Pilotage de projets informatiques en méthodologie Agile. Gestion du backlog, des taches et des épics. Modélisation UML et suivi des architectures SI.',
   3),
  ('ux-ui-design',
   'UX.UI DESIGN', 'conception & recherche utilisateur',
   'Conception de maquettes Figma haute-fidélité, conduite d\'audits ergonomiques Bastien-Scapin, wireframes UX et sondages utilisateurs.',
   4);

-- ---- Cursus -------------------------------------------------
INSERT INTO cursus (school, discipline, period, order_index) VALUES
  ('ESD',        'UX.UI DESIGN',        '2020-2022',  1),
  ('LA CAPSULE', 'PROGRAMMATION',       'mai 2023',   2),
  ('ISCOD',      'INGÉNIERIE LOGICIEL', '2024-2026',  3);

-- Items ESD (Ecole Supérieure du Design)
INSERT INTO cursus_items (cursus_id, content, order_index) VALUES
  (1, 'Méthodologie de recherches utilisateurs',                    1),
  (1, 'Méthodologie Design Thinking',                               2),
  (1, 'Conception de maquettes d\'application avec Figma.',         3),
  (1, 'Suivi des besoins user via un user story mapping.',          4),
  (1, 'Mise en forme d\'un besoin user en créant des userStories.', 5);

-- Items La Capsule
INSERT INTO cursus_items (cursus_id, content, order_index) VALUES
  (2, 'Création et styliser page Web HTML5 / CSS3',            1),
  (2, 'Dynamiser des app web av Javascript Frontend',          2),
  (2, 'Développer des app Backend avec NodeJs & Express',      3),
  (2, 'Coder des app réactives React et NextJS',               4),
  (2, 'Maitriser des outils de versionning GitHub',            5);

-- Items ISCOD
INSERT INTO cursus_items (cursus_id, content, order_index) VALUES
  (3, 'Analyser les besoins du client en termes d\'architectures techniques', 1),
  (3, 'Concevoir et développer des architectures techniques',                  2),
  (3, 'Manager des équipes de développement informatique',                     3),
  (3, 'Piloter un projet de développement informatique avec DevOps',           4);

-- ---- Projects -----------------------------------------------
INSERT INTO projects (slug, title, subtitle, description, category, order_index) VALUES
  ('shopify-automation',
   'Automatisation Shopify', 'Retours commandes',
   'Solution automatisant les commandes retournées sur les boutiques Shopify de Coliback.',
   'développement web', 1),
  ('portail-coliback',
   'Portail Interne Coliback', 'Refonte portail services',
   'Refonte complète du portail des services internes de Coliback.',
   'développement web', 2),
  ('mycitystock',
   'MyCityStock', 'Site vitrine Startup',
   'Création du site vitrine pour la Startup MyCityStock.',
   'développement web', 3),
  ('generateur-factures',
   'Générateur de Factures', 'Logiciel interne',
   'Développement d\'un logiciel de génération de factures dans l\'écosystème Coliback.',
   'développement logiciel', 4);
