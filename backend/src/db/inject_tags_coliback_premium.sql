SET NAMES 'utf8mb4';

-- Ajout conditionnel de tags_competences
SELECT COUNT(*) INTO @has_tags_comp
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME   = 'projects'
  AND COLUMN_NAME  = 'tags_competences';

SET @sql1 = IF(@has_tags_comp = 0,
  'ALTER TABLE projects ADD COLUMN tags_competences JSON DEFAULT NULL',
  'SELECT 1'
);
PREPARE s1 FROM @sql1; EXECUTE s1; DEALLOCATE PREPARE s1;

-- Ajout conditionnel de tags_expertises
SELECT COUNT(*) INTO @has_tags_exp
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME   = 'projects'
  AND COLUMN_NAME  = 'tags_expertises';

SET @sql2 = IF(@has_tags_exp = 0,
  'ALTER TABLE projects ADD COLUMN tags_expertises JSON DEFAULT NULL',
  'SELECT 1'
);
PREPARE s2 FROM @sql2; EXECUTE s2; DEALLOCATE PREPARE s2;

-- Créer le projet s'il n'existe pas
INSERT IGNORE INTO projects (slug, title, subtitle, description, category, order_index)
VALUES (
  'coliback-premium-devops',
  'ColiBack Premium',
  'Plateforme retours e-commerce',
  'Développement d''une plateforme de gestion des retours produits pour les e-commerçants Shopify intégrés à ColiBack.',
  'développement web',
  6
);

-- Injecter les tags
UPDATE projects
SET
  tags_competences = '["Apprentissage Continu", "Adaptabilité", "Autonomie"]',
  tags_expertises  = '["Ingénierie Logiciel", "Devops", "Gestion de projet"]'
WHERE slug = 'coliback-premium-devops';
