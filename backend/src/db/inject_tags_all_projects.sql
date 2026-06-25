SET NAMES 'utf8mb4';

-- Colonnes JSON (idempotent)
SELECT COUNT(*) INTO @has_comp FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = 'tags_competences';
SET @s1 = IF(@has_comp = 0, 'ALTER TABLE projects ADD COLUMN tags_competences JSON DEFAULT NULL', 'SELECT 1');
PREPARE p1 FROM @s1; EXECUTE p1; DEALLOCATE PREPARE p1;

SELECT COUNT(*) INTO @has_exp FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = 'tags_expertises';
SET @s2 = IF(@has_exp = 0, 'ALTER TABLE projects ADD COLUMN tags_expertises JSON DEFAULT NULL', 'SELECT 1');
PREPARE p2 FROM @s2; EXECUTE p2; DEALLOCATE PREPARE p2;

-- Sécurité : créer ColiBack Premium s'il n'existe pas
INSERT IGNORE INTO projects (slug, title, subtitle, description, category, order_index)
VALUES ('coliback-premium', 'ColiBack Premium', 'Plateforme retours e-commerce',
  'Développement frontend et UX de la plateforme ColiBack Premium pour les retours produits.',
  'développement web', 7);

-- GenFact
UPDATE projects SET
  tags_competences = '["Apprentissage continu", "Autonomie", "Résolution de problème"]',
  tags_expertises  = '["Ingénierie Logiciel", "Gestion de Projet"]'
WHERE slug = 'generateur-factures';

-- MyCityStock
UPDATE projects SET
  tags_competences = '["Collaboratif", "Adaptabilité", "Résolution de problème"]',
  tags_expertises  = '["Ingénierie Logiciel", "Gestion de Projet"]'
WHERE slug = 'mycitystock';

-- DevOps ColiBack Premium
UPDATE projects SET
  tags_competences = '["Apprentissage Continu", "Adaptabilité", "Autonomie"]',
  tags_expertises  = '["Ingénierie Logiciel", "Devops", "Gestion de projet"]'
WHERE slug = 'coliback-premium-devops';

-- ColiBack Premium
UPDATE projects SET
  tags_competences = '["Apprentissage Continu", "Collaboratif", "Autonomie"]',
  tags_expertises  = '["Ingénierie Logiciel", "UX design", "Gestion de projet"]'
WHERE slug = 'coliback-premium';

-- ColiBack Cloud
UPDATE projects SET
  tags_competences = '["Collaboratif", "créativité & sens critique"]',
  tags_expertises  = '["UX design", "Ingénierie Logiciel", "Gestion de Projet"]'
WHERE slug = 'coliback-cloud';
