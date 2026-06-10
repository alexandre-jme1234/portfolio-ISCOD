import {
  usePageContent,
  useSkills,
  useCursus,
  useProjects,
  useExpertises,
} from "../hooks/useApi.js";
import Spinner              from "../components/common/Spinner.jsx";
import HeroSection          from "../components/sections/HeroSection.jsx";
import HardSkillsSection    from "../components/sections/HardSkillsSection.jsx";
import IntroSection         from "../components/sections/IntroSection.jsx";
import CursusSection        from "../components/sections/CursusSection.jsx";
import ExpertisesBarSection from "../components/sections/ExpertisesBarSection.jsx";
import CompetencesSection   from "../components/sections/CompetencesSection.jsx";
import SoftSkillsSection    from "../components/sections/SoftSkillsSection.jsx";
import ProjectsSection      from "../components/sections/ProjectsSection.jsx";

/**
 * HomePage — orchestre toutes les sections de la page d'accueil.
 * Ordre fidèle à la maquette Figma (node 2036:1778) :
 *   Hero → Hard Skills → Présentation → Cursus → Expertises → Compétences → Soft Skills → Projets
 */
export default function HomePage() {
  const { content, loading: loadContent, getValue } = usePageContent("home");
  const { skills,     loading: loadSkills    }       = useSkills();
  const { cursus,     loading: loadCursus    }       = useCursus();
  const { projects,   loading: loadProjects  }       = useProjects();
  const { expertises, loading: loadExpertises}       = useExpertises();

  if (loadContent || loadSkills || loadCursus || loadProjects || loadExpertises) {
    return <Spinner />;
  }

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection
        name={getValue("hero_name")}
        subtitle={getValue("hero_subtitle")}
      />

      {/* 2. Hard Skills — 3 cartes expertise */}
      <HardSkillsSection expertises={expertises} getValue={getValue} />

      {/* 3. Présentation — 3 colonnes de texte */}
      <IntroSection
        col1={content.intro_col1}
        col2={content.intro_col2}
        col3={content.intro_col3}
      />

      {/* 4. Cursus — timeline formations */}
      <CursusSection cursus={cursus} />

      {/* 5. Expertises — graphique en barres */}
      <ExpertisesBarSection getValue={getValue} />

      {/* 6. Compétences — 4 catégories de skills */}
      <CompetencesSection skills={skills} getValue={getValue} />

      {/* 7. Soft Skills — 4 tuiles avec images */}
      <SoftSkillsSection
        softSkills={skills["soft-skills"] || []}
        getValue={getValue}
      />

      {/* 8. Projets — grille de cartes */}
      <ProjectsSection projects={projects} />
    </main>
  );
}
