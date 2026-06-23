SET NAMES 'utf8mb4';

INSERT INTO pages (slug, title, type) VALUES ('autonomie', 'Autonomie', 'competence');

-- Hero
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'header_title', 'h1', 'Autonomie', 'hero', 1);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'header_breadcrumb', 'label', 'home / compétences', 'hero', 2);

-- Définition
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'definition_title', 'h2', 'DÉFINITION', 'definition', 1);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'definition_p1', 'paragraph', 'L''autonomie en tant que développeur est une compétence essentielle; selon moi; elle consiste à s''intégrer à une équipe et à travailler de manière responsable tout en sachant respecter les directives ou le cadre de l''entreprise sans être supervisé à tout les instants.', 'definition', 2);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'definition_p2', 'paragraph', 'Elle sous-entend une capacité d''adaptation aux processus de l''entreprise, à l''équipe en place. Elle implique dans sa définition plus nuancée de savoir chercher de l''information par soi-même et d''admettre que l''on a besoin de support en cas de blocage.', 'definition', 3);

-- Section 1 : Éléments de preuve
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section1_number', 'number', '1', 'preuves', 1);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section1_title', 'h2', 'éléments de preuve', 'preuves', 2);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section1_p1', 'paragraph', 'Tout au long de mes projets, j''ai dû faire preuve d''autonomie et ainsi dû développer ma capacité à être autonome. La preuve la plus évidente est la conduite de ce master Ingénierie logiciel que j''entreprends en totale autonomie. Le suivi des cours, la méthodologie de travail, la réalisation des exercices et aussi l''approfondissement bibliographique que l''on entreprend pour consolider les connaissances vues lors de modules, certains étant plus complexes que d''autres. L''approche pédagogique de l''ISCOD pousse au gain en autonomie et à l''apprentissage continu. Les connaissances vues en cours sont appliquées durant mes projets d''entreprise et je tente de les valoriser afin de pratiquer, mais également de comprendre par la pratique des concepts parfois très abstraits.', 'preuves', 3);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section1_p2', 'paragraph', 'Également, les cours que je suis durant ce master sont en accord avec mon poste d''ingénieur logiciel débutant. Ainsi, pour la bonne conduite des projets chez ColiBack, j''ai dû énormément développer mes capacités d''autonomie pour la simple et bonne raison que je suis sous le mentorat de David dans le cadre de cet apprentissage. Son scope d''intervention est très large et est source de pression entre les projets informatiques, l''infogérance, la maintenabilité des systèmes, l''aspect commercial pour accueillir de nouveaux clients sur ColiBack Premium.', 'preuves', 4);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section1_p3', 'paragraph', 'Comme l''équipe informatique est réduite à 2 membres et que David mène de front plusieurs aspects du métier d''informaticien; il était nécessaire que je mène une conduite de projet autonome pour prendre mon poste. Notamment, en mettant en pratique les acquis vus durant la formation lorsqu''ils étaient utiles en développant les projets.', 'preuves', 5);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section1_p4', 'paragraph', 'Il suppose d''avoir une exigence vis-à-vis du travail rendu et de prendre du recul sur le travail réalisé pour anticiper les questions d''usage et les recommandations techniques que David pourrait poser en revue de code afin de gagner un maximum de temps en évitant des allers-retours peu fructueux.', 'preuves', 6);

-- Section 2 : Auto-critique
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section2_number', 'number', '2', 'evolution', 1);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section2_title', 'h2', 'auto-critique', 'evolution', 2);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section2_p1', 'paragraph', 'Être autonome dans son travail est une compétence qui relève de la maturité, selon moi, car elle suppose aussi de reconnaître qu''un autre professionnel connaît une solution à un point de blocage rencontré et que lui demander permet de faire évoluer son investigation et permet de gagner du temps.', 'evolution', 3);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section2_p2', 'paragraph', 'Ainsi il faut éviter l''enfermement de l''autonomie, en pensant qu''on peut trouver une solution originale par soi-même et tester des solutions de conception et de développement qui ont peu de valeur ajoutée.', 'evolution', 4);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section2_p3', 'paragraph', 'Bien que j''aie été en autonomie, et que je travaillais cette capacité, j''ai toujours milité pour maintenir des codes reviews régulières pour être certain que tous les acteurs de celui-ci ont une vision commune du projet et ainsi le faire évoluer.', 'evolution', 5);

-- Section 3 : Évaluation
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section3_number', 'number', '3', 'autocritique', 1);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section3_title', 'h2', 'évaluation', 'autocritique', 2);
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'section3_p1', 'paragraph', 'J''ai beaucoup gagné en autonomie, en expérience et en assurance sur mon métier chez ColiBack, car le contexte et les objectifs à réaliser étaient concrets et ambitieux, j''espère pouvoir continuer à développer en respectant cette approche que je trouve très épanouissante.', 'autocritique', 3);

-- Projets liés (optionnel)
INSERT INTO content_blocks (page_slug, block_key, type, value, category, order_index) VALUES ('autonomie', 'projects_title', 'h2', 'projets', 'projets', 1);
