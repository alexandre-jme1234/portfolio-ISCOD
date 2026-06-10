SET NAMES 'utf8mb4';

-- ============================================================
-- Content blocks — page Expertise DevOps
-- page_slug : 'expertises-devops' (déjà dans init.sql)
-- Textes extraits fidèlement de la maquette Figma (node 321:2130)
-- ============================================================

-- ---- Hero : description longue (Figma node 321:2147) ----
-- Différente de expertises.description qui reste courte pour les cards
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'hero_description', 'paragraph',
   'Le DevOps est une méthodologie de développement de logiciels qui accélère la livraison d''applications et de services à hautes performances en combinant et en automatisant le travail des équipes de développement logiciel (Dev) et d''opérations informatiques (Ops).',
   'hero', 1);

-- ---- Méthodologie (3 étapes numérotées + label DEV) ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'methodo_1', 'list_item', 'Contenerisation', 'methodologie', 1),
  ('expertises-devops', 'methodo_2', 'list_item', 'Orchestration',   'methodologie', 2),
  ('expertises-devops', 'methodo_3', 'list_item', 'ci / cd',          'methodologie', 3);

-- ---- Section 1 : éléments de preuves — blocs de paragraphes plats ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'preuves_p1', 'paragraph',
   'Développer une méthodologie DevOps pour structurer le développement logiciel des projets était une nécessité chez Coliback. Plusieurs raisons expliquent cela : d''abord, l''équipe de développement était réduite, ce qui impliquait une collaboration minimale entre les développeurs, rendant ainsi les workflows plus simples. Ensuite, les logiciels développés avaient des rythmes de mise en production plus lents en raison des mises à jour des stacks technologiques, des demandes des clients et des failles métiers à corriger.',
   'preuves', 1);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'preuves_p2', 'paragraph',
   'Ces problématiques m''ont conduit à proposer de containeriser les stacks techniques des logiciels que nous développions chez Coliback via Docker. La conteneurisation offrait plusieurs avantages, notamment la possibilité de répliquer plus facilement des environnements de développement et d''économiser des ressources serveur lors du déploiement sur OVH. Maîtriser cette compétence permettrait également de rendre la code base en cours de développement résiliente, stable, testable et optimisable. La solution technique Coliback Premium repose sur une architecture orientée services (SOA), où chaque service est un composant distinct, conçu pour répondre à un besoin client clairement identifié.',
   'preuves', 2);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'preuves_p3', 'paragraph',
   'Pour répondre rapidement à ce besoin, le rythme de conception, développement et déploiement a été particulièrement soutenu, nécessitant des mises à jour fréquentes du code pour respecter les contraintes métiers. Cela a imposé la création d''environnements de développement et de test pour éviter les crashs en production, qui auraient pénalisé l''expérience des utilisateurs. Cette volonté de segmenter les workflows de développement a été réutilisée pour d''autres projets d''ingénierie logicielle en raison de sa nécessité et de son faible coût de mise en place. Dans cette logique, automatiser les workflows de développement s''est rapidement imposé pour son gain de temps et son efficacité.',
   'preuves', 3);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'preuves_p4', 'paragraph',
   'Avant d''automatiser la mise à jour de la code base en production, nous développions dans l''environnement de développement, puis nous poussions la code base mise à jour au format zip via un tunnel SSH, construisant et détruisant les images Docker. Cela remplaçait intégralement l''image obsolète par celle mise à jour. Cette méthode était chronophage, peu efficace et présentait d''énormes risques de crash et d''erreurs, polluant l''expérience d''achat des utilisateurs finaux. Pour éviter ces désagréments, j''ai mis en place des pipelines CI/CD inspirées par l''approche DevOps.',
   'preuves', 4);

INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'preuves_p5', 'paragraph',
   'Une pipeline CI/CD, ou pipeline d''intégration et de déploiement continus, est une série d''étapes précises à réaliser pour distribuer une nouvelle version d''un logiciel. Les pipelines de développement ont été réalisées avec GitHub Actions. Ce service CI/CD proposé par GitHub permet aux développeurs d''automatiser des tâches au sein de leur dépôt. Les processus automatisés proposés par cette solution sont appelés workflows. Les workflows développés suivent souvent la même logique à travers tous les projets. Ils permettent de tester la bonne construction des conteneurs Docker et d''éviter de pousser du code non sécurisé vers les branches de production hébergées sur OVH s''ils ne passent pas ces tests. Si le code est sécurisé, seules les parties modifiées du dépôt GitHub sont mises à jour sur la code base en production, entraînant un rebuild automatique, ce qui préserve l''expérience de l''utilisateur final.',
   'preuves', 5);

-- ---- Section 2 : évolution ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'evolution_p1', 'paragraph',
   'Connaissant docker d''un point de vue de développeur, je ne possédais que peu de connaissances en matière d''approche DevOps. Ainsi j''ai dû me former par moi-même, demander conseil à ma learning coach à l''Iscod pour tenter de mettre en place des workflows de développement automatisés.',
   'evolution', 1),
  ('expertises-devops', 'evolution_p2', 'paragraph',
   'L''évolution dans ce nouveau pan de l''informatique s''est faite à tâtons avec des cours supplémentaires, de la lecture de documentations et la réalisation de projets crash-test pour comprendre tel ou tel concept en programmation. Par expérience, l''utilisation au quotidien de Docker m''a permis de me confronter aux problématiques de sécurité, d''orchestration de containers via Docker Compose, de persistance de la mémoire, des réseaux etc. Des problématiques qui induisent l''acquisition de compétences en CLI (lignes de commandes), notamment sur la CLI Ubuntu, CLI Docker en cloud computing OVH, d''une configuration d''un firewall, des ports TCP d''écoute, des tunnels et des clés SSH.',
   'evolution', 2),
  ('expertises-devops', 'evolution_p3', 'paragraph',
   'J''ai acquis ces connaissances et compétences en les travaillant dans ces projets et en cultivant l''envie de rendre ces workflows et environnements de développement toujours plus solides et résilients.',
   'evolution', 3);

-- ---- Section 3 : autocritique ----
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES
  ('expertises-devops', 'autocritique_p1', 'paragraph',
   'J''ai découvert le domaine du DevOps par la nécessité de créer des environnements de développement stables et résilients chez Coliback.',
   'autocritique', 1),
  ('expertises-devops', 'autocritique_p2', 'paragraph',
   'Le développement de compétences DevOps passe par l''acquisition de connaissances par la pratique. En ce sens, n''ayant pas été recruté pour un poste de développeur DevOps et n''étant pas entouré de développeurs DevOps, je ne pourrais qualifier mes compétences réelles.',
   'autocritique', 2),
  ('expertises-devops', 'autocritique_p3', 'paragraph',
   'Pour autant, je prends plaisir à développer de nouvelles compétences dans ce domaine et ce en total autonomie.',
   'autocritique', 3),
  ('expertises-devops', 'autocritique_p4', 'paragraph',
   'Voici la liste des projets DevOps qui m''ont permis d''acquérir de nouvelles compétences dans ce domaine.',
   'autocritique', 4);
