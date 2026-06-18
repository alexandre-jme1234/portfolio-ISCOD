import { Link } from "react-router-dom";

/**
 * ProjectCard — carte projet avec image et barre de titre en bas.
 * Reproduit les "Project Card" (frame 227:1270) de la maquette :
 * fond blanc avec logo/image + barre sombre avec titre en bas.
 */
function ProjectCard({ project }) {
  return (
    <Link
      to={`/projets/${project.slug}`}
      className="group flex flex-col gap-4"
    >
      <div className="h-[414px] rounded-[8px] border-[6px] border-[#cdfb7c] bg-white overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <span className="font-poppins font-bold text-[#aa7cfb] text-[32px] opacity-30 px-6 text-center">
            {project.title}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-poppins text-[24px] text-white">{project.title}</p>
        {project.category && (
          <span className="bg-[#eae9ff] text-[#171c21] font-poppins font-semibold text-[14px] px-6 py-[2px] rounded-[16px] w-fit">
            {project.category}
          </span>
        )}
      </div>
    </Link>
  );
}

export function ProjetSection({ projects = [], title = "projets", fullWidth = false }) {
  if (!projects.length) return null;

  const sectionClass = fullWidth 
    ? "w-full px-[80px] py-[80px]"
    : "mt-16";

  const containerContent = (
    <>
      <div className="flex items-center justify-center gap-8 mb-12">
        <span className="h-px w-[168px] bg-white/40" />
        <h2 className="text-heading text-white">{title}</h2>
        <span className="h-px w-[168px] bg-white/40" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );

  return fullWidth ? (
    <section className={sectionClass}>
      <div className="max-w-[1440px] mx-auto">
        {containerContent}
      </div>
    </section>
  ) : (
    <section className={sectionClass}>
      {containerContent}
    </section>
  );
}

export default function ProjectsSection({ projects = [], fullWidth = false }) {
  return <ProjetSection projects={projects} fullWidth={fullWidth} />;
}
