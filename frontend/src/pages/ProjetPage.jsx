import { useParams, Link } from "react-router-dom";
import { useProject } from "../hooks/useApi.js";
import Spinner      from "../components/common/Spinner.jsx";
import SectionTitle from "../components/common/SectionTitle.jsx";

/**
 * ProjetPage — template dynamique pour la page détail d'un projet.
 * URL : /projets/:slug
 *
 * Affiche : catégorie, titre, sous-titre, image (si disponible), description.
 * Reproduit l'extension du "Project Card" de la maquette.
 */
export default function ProjetPage() {
  const { slug }                               = useParams();
  const { project, loading, error }            = useProject(slug);

  if (loading) return <Spinner />;

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <p className="font-poppins text-body-lg text-white/60">Projet introuvable</p>
        <Link to="/" className="text-[#cdfb7c] hover:underline font-poppins">← Retour</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-[80px] pb-[80px] px-[80px] relative overflow-hidden bg-[#171c21]">
      <div
        className="blob-purple absolute rounded-full"
        style={{ width: "2200px", height: "1316px", top: "-300px", left: "-800px", opacity: 0.25 }}
        aria-hidden
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <Link
          to="/#projets"
          className="font-poppins text-body-sm text-white/60 hover:text-[#cdfb7c] mb-10 inline-block transition-colors"
        >
          ← Retour aux projets
        </Link>

        {/* En-tête */}
        <SectionTitle label={project.category} title={project.title} className="mb-4" />
        {project.subtitle && (
          <p className="font-crimson font-semibold text-body-lg text-white/70 mb-10">
            {project.subtitle}
          </p>
        )}

        {/* Image du projet */}
        {project.image_url && (
          <div className="w-full aspect-video rounded-[8px] overflow-hidden mb-10">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="card-border p-8 max-w-[900px]">
            <p className="text-body text-white">{project.description}</p>
          </div>
        )}
      </div>
    </main>
  );
}
