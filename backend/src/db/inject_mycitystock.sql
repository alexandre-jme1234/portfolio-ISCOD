SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- ============================================================
-- Injection projet MyCityStock
-- Portfolio Alexandre JAMME
-- page_slug : 'mycitystock'
-- ============================================================


-- ============================================================
-- 1. ALTER TABLE projects — ajout des colonnes tags si absentes
-- ============================================================

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS tags_expertises  TEXT DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS tags_competences TEXT DEFAULT '[]';


-- ============================================================
-- 2. INSERT page 'mycitystock' (idempotent)
-- ============================================================

INSERT INTO pages (slug, title, type)
VALUES ('mycitystock', 'MyCityStock', 'projet')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  type  = VALUES(type);


-- ============================================================
-- 3. UPDATE project 'mycitystock'
-- ============================================================

UPDATE projects
SET
  title             = 'MyCityStock',
  subtitle          = 'Back-office collaboratif pour start-up de self-stockage',
  description       = 'Conception et développement du back-office de MyCityStock, une start-up de self-stockage urbain. Intégration d''une stack Directus / Express / Docker sur un serveur OVH, synchronisée avec l''application mobile existante.',
  tags_expertises   = '["Ingénierie Logiciel", "DevOps", "Gestion de projet"]',
  tags_competences  = '["Collaboratif", "Apprentissage Continu", "Créativité / Résolution de pbm"]'
WHERE slug = 'mycitystock';


-- ============================================================
-- 4. DELETE content_blocks existants pour cette page (idempotence)
-- ============================================================

DELETE FROM content_blocks WHERE page_slug = 'mycitystock';


-- ============================================================
-- 5. INSERT content_blocks — toutes les sections
-- ============================================================


-- ------------------------------------------------------------
-- INTRO
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'intro_p1', 'paragraph',
   'Dans le cadre de ma dernière année de Master Ingénierie Logiciel à l''ISCOD, j''ai l''opportunité d''intervenir sur le projet MyCityStock (MYC). Portée par l''un des trois associés de ColiBack (CB), MYC est une start-up qui développe une solution disruptive de self-stockage à destination d''un public citadin. L''application, en cours de développement depuis deux ans, se positionne sur un marché concurrentiel face à des acteurs établis tels que Homebox, Selfstock ou MondialBox.',
   'intro', 1),

  ('mycitystock', 'intro_p2', 'paragraph',
   'La conception de l''application mobile, bientôt disponible sur le Google Play Store, est initialement portée par un développeur web freelance avec lequel nous collaborons. Face aux besoins de pilotage de l''activité, David (mon responsable d''alternance chez ColiBack) et moi-même avons été intégrés au projet pour concevoir et développer le back-office indispensable au fonctionnement global de la solution.',
   'intro', 2);


-- ------------------------------------------------------------
-- SECTION 1 — OBJECTIFS
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'section_1_title', 'h1',
   'OBJECTIFS',
   'section_1', 1),

  ('mycitystock', 'sub_1_1_title', 'h2',
   '1.1 Concevoir un backoffice applicatif adapté à l''app développée en collaboration',
   'section_1', 2),

  ('mycitystock', 'sub_1_1_body_1', 'paragraph',
   'Le premier objectif consiste à concevoir un back-office capable de s''interfacer parfaitement avec l''application mobile existante. Il doit permettre de centraliser et de superviser les flux d''informations générés par les utilisateurs de l''application.',
   'section_1', 3),

  ('mycitystock', 'sub_1_2_title', 'h2',
   '1.2 Développer un backoffice évolutif, sûr et maintenable',
   'section_1', 4),

  ('mycitystock', 'sub_1_2_body_1', 'paragraph',
   'Le second objectif vise à fournir une solution technique robuste, hautement sécurisée et facilement maintenable. L''architecture doit être pensée pour évoluer au rythme des futures versions de l''application, tout en garantissant une étanchéité stricte des données.',
   'section_1', 5);


-- ------------------------------------------------------------
-- SECTION 2 — CONTEXTE HUMAIN ET TECHNIQUE
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'section_2_title', 'h1',
   'CONTEXTE HUMAIN ET TECHNIQUE',
   'section_2', 1),

  ('mycitystock', 'sub_2_1_title', 'h2',
   '2.1 Contexte humain',
   'section_2', 2),

  ('mycitystock', 'sub_2_1_body_1', 'paragraph',
   'Le projet réunit une équipe pluridisciplinaire aux compétences complémentaires. Nous collaborons étroitement avec le développeur web freelance, qui est un ingénieur logiciel expert web. Le reste de l''équipe comprend le client collaborateur, un expert juridique et droit (le commanditaire assurant également la gestion de la comptabilité), un développeur DevOps et un infogérant. De notre côté, David et moi intervenons en tant que développeurs pour la partie back-office.',
   'section_2', 3),

  ('mycitystock', 'sub_2_2_title', 'h2',
   '2.2 Contexte technique',
   'section_2', 4),

  ('mycitystock', 'sub_2_2_body_1', 'paragraph',
   'Sur le plan technique, le développeur freelance a codé l''application smartphone from scratch en utilisant Vue.js pour le frontend et .NET pour le backend, tout en prenant en charge l''architecture logicielle et la conception UX/UI.',
   'section_2', 5),

  ('mycitystock', 'sub_2_2_body_2', 'paragraph',
   'Initialement, l''application s''appuyait sur une base de données non persistante. Notre mission exigeait de collaborer activement avec lui en construisant un environnement de développement collaboratif, le tout reposant sur une infogérance mise en place avec des serveurs distants de type VPS dans le cloud.',
   'section_2', 6);


-- ------------------------------------------------------------
-- SECTION 3 — ENJEUX ET RISQUES
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'section_3_title', 'h1',
   'ENJEUX ET RISQUES',
   'section_3', 1),

  ('mycitystock', 'sub_3_1_title', 'h2',
   '3.1 Enjeux du projet',
   'section_3', 2),

  ('mycitystock', 'sub_3_1_body_1', 'paragraph',
   'Le succès de notre intervention repose avant tout sur le développement d''un back-office pleinement opérationnel et parfaitement synchronisé avec l''application mobile MyCityStock.',
   'section_3', 3),

  ('mycitystock', 'sub_3_1_body_2', 'paragraph',
   'Pour répondre aux besoins des équipes sur le terrain, nous devons concevoir une interface simple, robuste et intuitive, dont la gestion quotidienne pourra être facilement déléguée à des administrateurs n''ayant pas de profil technique.',
   'section_3', 4),

  ('mycitystock', 'sub_3_1_body_3', 'paragraph',
   'De plus, il est crucial de rédiger une documentation technique exhaustive afin de garantir que le projet puisse être repris et poursuivi sereinement par d''autres développeurs. Enfin, la qualité de notre livrable dépend de notre capacité à fournir un code solide, hautement sécurisé et capable de préserver l''intégrité de toutes les données du système.',
   'section_3', 5),

  ('mycitystock', 'sub_3_2_title', 'h2',
   '3.2 Risques identifiés',
   'section_3', 6),

  ('mycitystock', 'sub_3_2_risk_1', 'list_item',
   'Manque de collaboration ou mauvaise définition initiale des objectifs du projet.',
   'section_3', 7),

  ('mycitystock', 'sub_3_2_risk_2', 'list_item',
   'Périmètre de développement trop large, non maîtrisé ou évolutif de manière incontrôlée.',
   'section_3', 8),

  ('mycitystock', 'sub_3_2_risk_3', 'list_item',
   'Mauvaise configuration introduisant des failles de sécurité majeures affectant l''intégrité de la plateforme.',
   'section_3', 9),

  ('mycitystock', 'sub_3_2_risk_4', 'list_item',
   'Non-respect des jalons et des dates de livraison convenus avec le commanditaire.',
   'section_3', 10),

  ('mycitystock', 'sub_3_2_risk_5', 'list_item',
   'Sous-effectif de l''équipe technique entraînant une surcharge de travail et une dégradation de la qualité.',
   'section_3', 11);


-- ------------------------------------------------------------
-- SECTION 4 — ÉTAPES DU PROJET
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'section_4_title', 'h1',
   'ÉTAPES DU PROJET',
   'section_4', 1),

  ('mycitystock', 'sub_4_1_title', 'h2',
   '4.1 Analyse des besoins techniques et fonctionnels',
   'section_4', 2),

  ('mycitystock', 'sub_4_1_body_1', 'paragraph',
   'L''équipe de ColiBack a rejoint le projet MyCityStock un an après le début du développement de l''application mobile. À notre arrivée, l''architecture logicielle était localisée uniquement sur la machine du développeur freelance. Aucun environnement de développement collaboratif n''avait été anticipé, les tables de la base de données étaient encore en cours de création, et le backend .NET tournait avec une base non persistante.',
   'section_4', 3),

  ('mycitystock', 'sub_4_1_body_2', 'paragraph',
   'Il a d''abord fallu analyser les besoins des trois typologies d''utilisateurs : les clients finaux (citadins souhaitant stocker temporairement des encombrants), les livreurs (professionnels de la logistique) et les entrepôts (professionnels assurant le stockage physique). L''application affecte automatiquement les tâches au livreur disponible selon la région et les horaires de l''entrepôt.',
   'section_4', 4),

  ('mycitystock', 'sub_4_2_title', 'h2',
   '4.2 Étude de faisabilité technique et recherche de solutions',
   'section_4', 5),

  ('mycitystock', 'sub_4_2_body_1', 'paragraph',
   'Lors de cette étude, nous avons confronté les contraintes de temps et de maintenabilité aux risques identifiés. Le back-office devant être administré par des profils non techniques, nous devions modéliser des workflows précis. Pour répondre à ces critères sans réinventer la roue, nous avons choisi la solution clé en main Directus. Ce CMS headless est simple à déployer, possède une communauté active et permet de configurer des flux (flows) pour dialoguer avec l''API .NET.',
   'section_4', 6),

  ('mycitystock', 'sub_4_3_title', 'h2',
   '4.3 Conception de l''architecture logicielle',
   'section_4', 7),

  ('mycitystock', 'sub_4_3_body_1', 'paragraph',
   'J''ai proposé une architecture logicielle globale basée sur la conteneurisation pour faire communiquer Directus et l''environnement de l''application.',
   'section_4', 8),

  ('mycitystock', 'sub_4_3_body_2', 'paragraph',
   'À l''aide de Docker, nous avons déployé une image Directus persistée sur un serveur distant OVH, associée à une base de données MySQL conteneurisée et un reverse proxy Nginx. L''intégration d''un web service intermédiaire en Express/Node.js a permis de collecter les appels de Directus et d''exécuter les requêtes SQL sur la base de l''application, sans impacter directement la structure de travail du freelance.',
   'section_4', 9),

  ('mycitystock', 'sub_4_4_title', 'h2',
   '4.4 Mise en place du back-office Directus',
   'section_4', 10),

  ('mycitystock', 'sub_4_4_body_1', 'paragraph',
   'Cette étape a débuté par la configuration d''un serveur Ubuntu : création des utilisateurs, définition des groupes et sécurisation des accès via des tunnels SSH. Après l''installation de Directus, j''ai configuré les comptes administrateurs, affiné les permissions d''écriture, créé la base de données et les tables associées, puis implémenté les premiers flows Directus pour valider les opérations CRUD sur notre base MariaDB.',
   'section_4', 11),

  ('mycitystock', 'sub_4_5_title', 'h2',
   '4.5 Développement des bridges Express / Directus',
   'section_4', 12),

  ('mycitystock', 'sub_4_5_body_1', 'paragraph',
   'Pour sécuriser les accès administratifs, j''ai mis en place une authentification par token via Google Firebase. À chaque création d''administrateur dans le back-office, un appel est émis vers Firebase et le token généré remonte dans la base MariaDB, centralisant la sécurité.',
   'section_4', 13),

  ('mycitystock', 'sub_4_5_body_2', 'paragraph',
   'J''ai développé des flux de synchronisation automatique pour mettre à jour les tables de Directus dès qu''une modification survient sur les données de l''application. Le serveur Express sert de passerelle : il intercepte la requête de Directus, récupère ou modifie les données sur la base de l''application, et gère la logique métier d''affectation des tâches en fonction du code postal et des horaires d''ouverture des dépôts.',
   'section_4', 14),

  ('mycitystock', 'sub_4_6_title', 'h2',
   '4.6 Dockerisation et orchestration avec Portainer',
   'section_4', 15),

  ('mycitystock', 'sub_4_6_body_1', 'paragraph',
   'Pour consolider l''infrastructure, un informaticien expert en infogérance a rejoint l''équipe. Ensemble, nous avons optimisé l''architecture serveur, configuré des environnements de développement strictement isolés et mis en place des accès sécurisés pour chaque partie prenante. L''utilisation de Portainer pour l''orchestration des conteneurs Docker nous a permis de simplifier la maintenance et de contrôler visuellement la communication entre toutes nos briques logicielles.',
   'section_4', 16);


-- ------------------------------------------------------------
-- SECTION 5 — MÉTHODOLOGIE ADOPTÉE
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'section_5_title', 'h1',
   'MÉTHODOLOGIE ADOPTÉE',
   'section_5', 1),

  ('mycitystock', 'section_5_body_1', 'paragraph',
   'Pour mener à bien ce projet en équipe décentralisée, nous avons adopté la méthodologie Agile. Nous avons découpé le projet en une liste d''objectifs précis et de tâches techniques à réaliser.',
   'section_5', 2),

  ('mycitystock', 'section_5_body_2', 'paragraph',
   'Des briefings hebdomadaires réguliers avec les autres développeurs nous ont permis de suivre l''avancement des développements, de réévaluer le listing des priorités et de réagir rapidement face aux contraintes techniques rencontrées.',
   'section_5', 3);


-- ------------------------------------------------------------
-- SECTION 6 — CONCLUSION ET PERSPECTIVES
-- ------------------------------------------------------------

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('mycitystock', 'section_6_title', 'h1',
   'CONCLUSION ET PERSPECTIVES',
   'section_6', 1),

  ('mycitystock', 'section_6_body_1', 'paragraph',
   'Le projet MyCityStock est toujours en cours de développement, les briques techniques se stabilisant à l''approche du lancement sur le store.',
   'section_6', 2),

  ('mycitystock', 'section_6_body_2', 'paragraph',
   'Cette expérience, qui associe plusieurs développeurs aux expertises métiers très différentes (du mobile au DevOps, en passant par l''infogérance et le CMS Headless), s''avère particulièrement enrichissante.',
   'section_6', 3),

  ('mycitystock', 'section_6_body_3', 'paragraph',
   'Elle m''a permis de concrétiser mes compétences en architecture logicielle et en gestion d''environnements collaboratifs complexes dans un cadre professionnel réel.',
   'section_6', 4);
