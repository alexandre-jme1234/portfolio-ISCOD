SET NAMES 'utf8mb4';

-- ---- Entrée projet (table projects) ----
INSERT INTO projects (slug, title, subtitle, description, category, order_index) VALUES
('coliback-cloud', 'ColiBack Cloud', 'Intranet & Base de connaissance',
 'Conception et développement d''un intranet WordPress pour centraliser les modes opératoires et ressources internes de ColiBack.',
 'développement web', 5);

-- ---- Page & Hero ----
INSERT INTO pages (slug, title, type) VALUES ('coliback-cloud', 'ColiBack Cloud', 'projet');

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'header_title',      'h1',    'ColiBack Cloud', 'hero', 1),
('coliback-cloud', 'header_breadcrumb', 'label', 'home / projets',  'hero', 2);

-- ---- Introduction ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'intro_title', 'h2', 'INTRODUCTION', 'intro', 1),
('coliback-cloud', 'intro_p1', 'paragraph',
 'Dans le cadre de ma dernière année de Master Ingénierie Logiciel à l''ISCOD, j''ai mené en 2025 un projet de développement au sein de mon alternance chez ColiBack. Ce projet, nommé MyCityStock, répondait à un besoin concret de centralisation de l''information interne, dans un contexte où les salariés ne disposaient pas d''une base de connaissances commune pour consulter les modes opératoires, les actualités de l''entreprise et certaines ressources utiles au quotidien.',
 'intro', 2),
('coliback-cloud', 'intro_p2', 'paragraph',
 'Le projet m''a été confié par Philippe Perrin, Directeur Supply Chain, qui en était le commanditaire. Son besoin était clair : disposer d''un site web léger, simple à administrer par un profil non technique, et suffisamment souple pour pouvoir évoluer dans le temps selon les usages de l''entreprise.',
 'intro', 3);

-- ---- Objectifs ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'objectifs_title', 'h2', 'OBJECTIFS', 'objectifs', 1),
('coliback-cloud', 'objectifs_1_title', 'h3',
 '1.1 Concevoir et développer un site web léger qu''un salarié non-technique pourrait administrer',
 'objectifs', 2),
('coliback-cloud', 'objectifs_1_p', 'paragraph',
 'Le premier objectif du projet était de concevoir une solution simple, légère et compréhensible par des utilisateurs non techniques. J''ai donc orienté ma réflexion vers un outil de gestion de contenu qui permette une prise en main rapide, sans dépendance forte au développeur pour les opérations courantes.',
 'objectifs', 3),
('coliback-cloud', 'objectifs_2_title', 'h3',
 '1.2 Récolter les besoins et usages des users (salariés de ColiBack) pour concevoir une expérience user ergonomique qui répond à leurs besoins identifiés - ux design',
 'objectifs', 4),
('coliback-cloud', 'objectifs_2_p', 'paragraph',
 'Le second objectif consistait à mieux comprendre les usages réels des salariés afin de concevoir une interface utile et ergonomique. Je ne voulais pas seulement livrer un site fonctionnel, mais un outil pensé à partir des besoins de terrain, capable de répondre à des situations concrètes de consultation d''information.',
 'objectifs', 5);

-- ---- Contexte humain / technique ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'contexte_title', 'h2', 'Contexte humain / technique', 'contexte', 1),
('coliback-cloud', 'contexte_1_title', 'h3', '2.1 Contexte humain', 'contexte', 2),
('coliback-cloud', 'contexte_1_p', 'paragraph',
 'Sur cette mission, j''étais le développeur web en contrat d''apprentissage chargé de la conception et de la réalisation du projet. Philippe Perrin intervenait comme commanditaire et apportait la vision métier, tandis que David Dias, en tant que référent technique, m''accompagnait dans les choix de conception pour maintenir une solution cohérente avec l''environnement de ColiBack.

En parallèle, j''ai interrogé les salariés afin de mieux comprendre leur contexte de travail. Cette phase m''a aidé à identifier les types d''informations qu''ils devaient retrouver rapidement, ainsi que les limites des supports déjà en place.',
 'contexte', 3),
('coliback-cloud', 'contexte_2_title', 'h3', '2.2 Contexte technique', 'contexte', 4),
('coliback-cloud', 'contexte_2_p', 'paragraph',
 'Le site a été hébergé et déployé chez OVH, dans un cadre adapté à la mise en ligne d''un site WordPress. Comme j''étais l''unique développeur sur cette mission, je n''ai pas mis en place d''environnement de développement collaboratif ni de chaîne de déploiement partagée.

Cette situation imposait une organisation rigoureuse, notamment parce que le projet devait avancer dans un délai contraint. J''ai donc dû faire des choix techniques réalistes, compatibles avec les ressources disponibles et le niveau d''autonomie attendu pour la suite du projet.',
 'contexte', 5);

-- ---- Enjeux & Risques ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'enjeux_title', 'h2', 'ENJEUX & RISQUES', 'enjeux', 1),
('coliback-cloud', 'enjeux_1_title', 'h3', '2.1 Enjeux', 'enjeux', 2),
('coliback-cloud', 'enjeux_1_p', 'paragraph',
 'L''un des principaux enjeux était de concevoir une solution robuste qu''un utilisateur avec un petit bagage technique puisse faire évoluer et administrer dans le temps. Il fallait aussi intégrer le projet dans le système informatique de ColiBack sans ajouter une complexité excessive.

Un autre enjeu important concernait la recherche UX. Je devais prendre le temps de récolter les besoins des utilisateurs pour ne pas construire un outil théorique, déconnecté de leurs pratiques réelles. Enfin, il était essentiel d''adopter une vraie posture de gestion de projet afin de rendre le développement possible dans un cadre temporel serré.',
 'enjeux', 3),
('coliback-cloud', 'enjeux_2_title', 'h3', '2.2 Risques', 'enjeux', 4),
('coliback-cloud', 'enjeux_2_p', 'paragraph',
 'Le premier risque était de développer une solution non maintenable ou insuffisamment sécurisée dans le temps. Un autre risque portait sur le manque de temps dans les phases de recherche UX, ce qui aurait pu conduire à une mauvaise ergonomie et donc à une faible adoption par les salariés.

Je devais aussi anticiper un risque plus opérationnel : si la gestion du contenu demandait trop d''efforts, le site risquait de ne plus être alimenté régulièrement. Dans ce cas, la valeur du projet aurait rapidement diminué malgré une mise en ligne réussie.',
 'enjeux', 5);

-- ---- Étapes projet (realisation) ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'realisation_title', 'h2', 'ETAPES PROJET', 'realisation', 1),
('coliback-cloud', 'step_3_1_title', 'h3',
 '3.1 Collecte et Etude des besoins des usage & des technique',
 'realisation', 2),
('coliback-cloud', 'step_3_1_p', 'paragraph',
 'J''ai commencé par une phase de collecte et d''étude des besoins afin de comprendre les attentes métier, les usages des salariés et les contraintes techniques existantes. Cette étape m''a permis de clarifier les priorités fonctionnelles et d''identifier le type de structure le plus pertinent pour centraliser l''information.',
 'realisation', 3),
('coliback-cloud', 'step_3_2_title', 'h3', '3.2 Etude faisabilité technique', 'realisation', 4),
('coliback-cloud', 'step_3_2_p', 'paragraph',
 'J''ai ensuite mené une étude de faisabilité technique pour vérifier que la solution envisagée pouvait être réalisée dans le temps imparti et avec un niveau de maintenance raisonnable. Cette analyse m''a conduit à privilégier WordPress, qui reste adapté à la création d''un site léger administrable par des profils non techniques.',
 'realisation', 5),
('coliback-cloud', 'step_3_3_title', 'h3',
 '3.3 Conception Wireframes sur l''étude des besoins et usages user',
 'realisation', 6),
('coliback-cloud', 'step_3_3_p', 'paragraph',
 'Avant de développer, j''ai conçu des wireframes à partir des besoins identifiés. Cette phase m''a aidé à organiser les contenus, à structurer les parcours de navigation et à vérifier que l''interface restait simple pour les futurs utilisateurs.',
 'realisation', 7),
('coliback-cloud', 'step_3_4_title', 'h3',
 '3.4 Mise en place d''un WordPress avec thème base de connaissance',
 'realisation', 8),
('coliback-cloud', 'step_3_4_p', 'paragraph',
 'J''ai ensuite mis en place un site WordPress en m''appuyant sur une logique de base de connaissance. Ce choix était cohérent avec l''objectif de centralisation documentaire et avec la nécessité de disposer d''un back-office accessible pour l''administration de contenu.',
 'realisation', 9),
('coliback-cloud', 'step_3_5_title', 'h3',
 '3.5 Intégration de templates de pages réutilisables : modes opératoires de préparation de commandes',
 'realisation', 10),
('coliback-cloud', 'step_3_5_p', 'paragraph',
 'J''ai développé des templates de pages réutilisables pour les modes opératoires de préparation de commandes. Cette approche m''a permis de garantir une cohérence de présentation et de simplifier l''ajout de nouveaux contenus à mesure que les besoins évoluaient.',
 'realisation', 11),
('coliback-cloud', 'step_3_6_title', 'h3', '3.6 test user', 'realisation', 12),
('coliback-cloud', 'step_3_6_p', 'paragraph',
 'Une phase de test utilisateur m''a permis de confronter mes choix à des retours d''usage concrets. Cette étape était importante pour vérifier que l''organisation des contenus et la navigation répondaient bien aux habitudes de consultation des salariés.',
 'realisation', 13),
('coliback-cloud', 'step_3_7_title', 'h3', '3.7 Mise en ligne et déploiement', 'realisation', 14),
('coliback-cloud', 'step_3_7_p', 'paragraph',
 'Enfin, j''ai assuré la mise en ligne et le déploiement du site chez OVH. Cette dernière étape m''a amené à finaliser la configuration du site et à livrer une version exploitable dans le contexte réel de l''entreprise.',
 'realisation', 15);

-- ---- Méthodologie ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'methodologie_title', 'h2', 'METHODOLOGIE ADOPTEE', 'methodologie', 1),
('coliback-cloud', 'methodologie_p', 'paragraph',
 'J''ai combiné une approche waterfall et une démarche design thinking. La logique waterfall m''a servi à structurer le projet de façon séquentielle, avec un cadrage clair du besoin, une étude de faisabilité, une phase de conception, puis la réalisation, les tests et le déploiement.

En parallèle, la démarche design thinking m''a permis de garder l''utilisateur au centre du projet. En observant les besoins et les comportements des salariés, j''ai pu ajuster les choix d''ergonomie et construire une solution plus pertinente dans son usage quotidien.',
 'methodologie', 2);

-- ---- Conclusion ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
('coliback-cloud', 'conclusion_title', 'h2', 'CONCLUSION & AMELIORATION A VENIR', 'conclusion', 1),
('coliback-cloud', 'conclusion_p', 'paragraph',
 'Ce projet m''a montré qu''un travail d''ingénierie logicielle peut être très orienté produit et mobiliser d''autres compétences que le seul développement. J''ai dû intervenir à la fois sur la conception de la solution, l''intégration front-end, la structuration des contenus, la réflexion ergonomique et les choix techniques de mise en œuvre.

Aujourd''hui, le projet est utilisé comme base de référence pour les modes opératoires, les actualités de la société, les ressources humaines nécessaires et certains documents liés aux EPI. La suite logique consiste à faire évoluer progressivement le contenu et les fonctionnalités, tout en conservant une solution légère, maintenable et administrable par les équipes internes.',
 'conclusion', 2);
