SET NAMES 'utf8mb4';

-- ============================================================
-- Content blocks — page Expertise Ingénierie Logiciel
-- page_slug : 'expertises-ingenierie-logiciel'
-- Correspond à usePageContent(`expertises-${slug}`) avec slug = 'ingenierie-logiciel'
-- ============================================================

INSERT INTO pages (slug, title, type) VALUES
  ('expertises-ingenierie-logiciel', 'Ingénierie Logiciel', 'expertise');

-- ---- Méthodologie (4 étapes affichées dans le pipeline hexagonal) ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'methodo_1', 'list_item', 'Etude Besoin',   'methodologie', 1),
  ('expertises-ingenierie-logiciel', 'methodo_2', 'list_item', 'Conception',     'methodologie', 2),
  ('expertises-ingenierie-logiciel', 'methodo_3', 'list_item', 'Développement',  'methodologie', 3),
  ('expertises-ingenierie-logiciel', 'methodo_4', 'list_item', 'Déploiement',    'methodologie', 4);

-- ---- Section 1 : éléments de preuves ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'preuves_intro', 'paragraph',
   'L''ingénierie logiciel est au cœur de ce contrat d''apprentissage. Mon poste consistait à améliorer le système informatique, tant dans l''infogérance interne que dans la conception de solutions digitales pour les clients et les employés. La méthodologie appliquée respecte une approche en 4 phases : étude de besoin, conception, développement et déploiement.',
   'preuves', 1);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'preuves_a_label', 'label',
   '1.a - phase de recherche',
   'preuves', 2),
  ('expertises-ingenierie-logiciel', 'preuves_a_text', 'paragraph',
   'Pour débuter un projet, je réalise une étude du besoin formulé par le commanditaire. Elle se détaille par une analyse fonctionnelle externe puis interne qui consiste à analyser, rechercher et à caractériser les fonctions et objectifs techniques que le futur logiciel devra réaliser. Le fruit de cette étape est la rédaction d''un cahier des charges qui liste les contraintes techniques et métier inhérentes au contexte. Le choix des stacks techniques se base sur les contraintes métiers analysées durant cette phase — framework, CMS ou solution no-code selon les performances, la sécurité, le volume de trafic, la maintenabilité et le temps de développement.',
   'preuves', 3);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'preuves_b_label', 'label',
   '1.b - phase de conception',
   'preuves', 4),
  ('expertises-ingenierie-logiciel', 'preuves_b_text', 'paragraph',
   'Une fois les exigences définies, on entame la phase de conception. C''est à ce stade que l''on définit l''architecture globale et la structure interne du logiciel. Les décisions concernant les composants, leur organisation, leur communication et les technologies utilisées sont prises ici. La conception tient compte des structures de données, des algorithmes et des comportements. Pour représenter et raisonner durant cette phase, on utilise les diagrammes UML pour décrire les différentes couches du logiciel, les réseaux TCP/IP, les échanges avec la base de données et les interactions avec les services tiers.',
   'preuves', 5);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'preuves_c_label', 'label',
   '1.c - phase de développement',
   'preuves', 6),
  ('expertises-ingenierie-logiciel', 'preuves_c_text', 'paragraph',
   'La programmation consiste à traduire la conception en une mise en œuvre fonctionnelle, en respectant les décisions architecturales et les modèles convenus. J''ai commencé par développer le workflow d''usage le plus simple, puis j''ai fait évoluer les routes selon les besoins définis en amont. En respectant les bonnes pratiques de clean code — code lisible, maintenable, testable et simple à étendre — j''ai utilisé des repositories GitHub pour un historique de développement collaboratif, des backlogs agiles pour le suivi des tâches et des tests unitaires, d''intégration et de bout en bout pour garantir la robustesse des fonctionnalités.',
   'preuves', 7);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'preuves_d_label', 'label',
   '1.d - phase de déploiement',
   'preuves', 8),
  ('expertises-ingenierie-logiciel', 'preuves_d_text', 'paragraph',
   'La phase de déploiement désigne l''ensemble des opérations techniques et organisationnelles qui permettent de mettre en service un système dans un environnement de production. Le déploiement implique la préparation de l''environnement cible, la vérification de la compatibilité et des dépendances. Nous avons instancié un serveur Ubuntu OVH sur lequel j''ai créé plusieurs workflows de production, de développement et de test. La mise en place de protocoles de sécurité HTTPS via un reverse proxy Nginx et la virtualisation des stacks via Docker Engine ont facilité la phase de mise en service.',
   'preuves', 9);

-- ---- Section 2 : évolution ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'evolution_p1', 'paragraph',
   'En intégrant l''ISCOD et en débutant ce contrat d''apprentissage, j''avais des compétences en développement web liées à ma formation Bac+3 : des projets concrets, des cas d''études, mais pas encore la charge complète du développement d''un logiciel avec des utilisateurs finaux ni la mise en place d''environnements de développement professionnels.',
   'evolution', 1),
  ('expertises-ingenierie-logiciel', 'evolution_p2', 'paragraph',
   'L''apprentissage en autonomie avec les cours de l''ISCOD, la recherche personnelle ainsi que l''encadrement de mon tuteur m''a réellement permis de concevoir, de développer, de maintenir et de déployer plusieurs projets comme un ingénieur logiciel.',
   'evolution', 2),
  ('expertises-ingenierie-logiciel', 'evolution_p3', 'paragraph',
   'J''ai gagné en compétences de développement, en gestion de projet, en DevOps et également sur la conception de logiciel pure. En matière de méthodologie, la règle que j''ai retenue est de concevoir des solutions les plus simples possibles qui répondent au besoin métier défini.',
   'evolution', 3);

-- ---- Section 3 : autocritique ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-ingenierie-logiciel', 'autocritique_p1', 'paragraph',
   'J''ai bien conscience que la méthodologie que j''ai acquise au sein de Coliback est adaptée au développement de logiciels pour une start-up ou une société avec une culture Système d''Information établie, mais qu''à contrario elle serait moins applicable dans une société d''édition de logiciels avec une segmentation des métiers plus forte.',
   'autocritique', 1),
  ('expertises-ingenierie-logiciel', 'autocritique_p2', 'paragraph',
   'Puisque ce qui fait la force de mon profil, c''est ma polyvalence en informatique, non pas ma spécialisation.',
   'autocritique', 2);
