import { Link } from "react-router-dom";

/**
 * ProjectsSection — reproduit la section projets (frames 227:1265+).
 * Grille de Project Cards : image avec barre de titre en bas.
 * Données injectées depuis /api/projects.
 */
export default function ProjectsSection({ projects = [] }) {
  return (
    <section
      id="projets"
      className="relative w-full px-[80px] py-[80px] overflow-hidden"
    >
      <div
        className="blob-purple absolute rounded-full"
        style={{ width: "1800px", height: "1000px", top: 0, right: "-400px", opacity: 0.15 }}
        aria-hidden
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* En-tête */}
        <p className="font-poppins font-light text-[18px] text-white/60 mb-2">Mes réalisations</p>
        <h2 className="text-heading text-white mb-16">Projets</h2>

        {/* Grille */}
        <div className="grid grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ProjectCard — carte projet avec image et barre de titre en bas.
 * Reproduit les "Project Card" (frame 227:1270) de la maquette :
 * fond blanc avec logo/image + barre sombre avec titre en bas.
 */
function ProjectCard({ project }) {
  return (
    <Link
      to={`/projets/${project.slug}`}
      className="group block rounded-[4px] overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
    >
      {/* Zone image */}
      <div className="relative aspect-[4/3] bg-white overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-poppins font-bold text-[#aa7cfb] text-[32px] opacity-30">
              {project.title?.[0] ?? "?"}
            </span>
          </div>
        )}
      </div>

      {/* Barre titre */}
      <div className="bg-[#1a1a1a] px-6 py-4">
        <p className="font-poppins font-medium text-white text-[18px] leading-tight">
          {project.title}
        </p>
        {project.category && (
          <p className="font-poppins font-light text-white/50 text-[13px] mt-1 uppercase tracking-wide">
            {project.category}
          </p>
        )}
      </div>
    </Link>
  );
}
