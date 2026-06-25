SET NAMES 'utf8mb4';

-- generateur-factures
UPDATE projects SET
  tags_competences = '["apprentissage-continu", "autonomie", "resolution-problemes"]',
  tags_expertises  = '["ingenierie-logiciel", "gestion-de-projet"]'
WHERE slug = 'generateur-factures';

-- mycitystock
UPDATE projects SET
  tags_competences = '["collaboration", "adaptabilite", "resolution-problemes"]',
  tags_expertises  = '["ingenierie-logiciel", "gestion-de-projet"]'
WHERE slug = 'mycitystock';

-- coliback-premium-devops
UPDATE projects SET
  tags_competences = '["apprentissage-continu", "adaptabilite", "autonomie"]',
  tags_expertises  = '["ingenierie-logiciel", "devops", "gestion-de-projet"]'
WHERE slug = 'coliback-premium-devops';

-- coliback-premium
UPDATE projects SET
  tags_competences = '["apprentissage-continu", "collaboration", "autonomie"]',
  tags_expertises  = '["ingenierie-logiciel", "ux-ui-design", "gestion-de-projet"]'
WHERE slug = 'coliback-premium';

-- coliback-cloud
UPDATE projects SET
  tags_competences = '["collaboration", "creativite-sens-critique"]',
  tags_expertises  = '["ux-ui-design", "ingenierie-logiciel", "gestion-de-projet"]'
WHERE slug = 'coliback-cloud';
