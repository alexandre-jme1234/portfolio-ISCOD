import { useParams, Link } from "react-router-dom";
import { usePageContent, useProject, useProjects } from "../hooks/useApi.js";
import Spinner from "../components/common/Spinner.jsx";
import ProjectsSection from "../components/sections/ProjectsSection.jsx";

function Paragraphs({ value }) {
  if (!value) return null;
  const parts = value.split(/\n\s*\n/);
  return (
    <div className="text-body text-white">
      {parts.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
      ))}
    </div>
  );
}

function blocksOf(content, category) {
  return (content[category] || [])
    .slice()
    .sort((a, b) => a.order_index - b.order_index);
}

// Renders a sequence of blocks (h2, h3, paragraph, list_item) in order.
// Consecutive list_items are grouped into a single <ul>.
function ProjetSection({ blocks }) {
  if (!blocks.length) return null;

  const elements = [];
  let listBuffer = [];

  const flushList = (key) => {
    if (!listBuffer.length) return;
    elements.push(
      <ul key={key} className="list-disc pl-6 flex flex-col gap-2 text-body text-white">
        {listBuffer.map((b) => <li key={b.id}>{b.value}</li>)}
      </ul>
    );
    listBuffer = [];
  };

  for (const block of blocks) {
    if (block.type === "list_item") {
      listBuffer.push(block);
    } else {
      flushList(`list-before-${block.id}`);
      if (block.type === "h2") {
        elements.push(
          <h2 key={block.id} className="font-poppins font-semibold text-[32px] text-[#cdfb7c] text-center">
            {block.value}
          </h2>
        );
      } else if (block.type === "h3") {
        elements.push(
          <h3 key={block.id} className="font-poppins font-semibold text-[24px] text-white mt-6">
            {block.value}
          </h3>
        );
      } else if (block.type === "paragraph") {
        elements.push(<Paragraphs key={block.id} value={block.value} />);
      }
    }
  }
  flushList("list-end");

  return (
    <section className="mb-20 max-w-[1063px]">
      <div className="flex flex-col gap-4">{elements}</div>
    </section>
  );
}

const SECTIONS = ["intro", "objectifs", "contexte", "enjeux", "realisation", "methodologie", "conclusion"];

export default function ProjetPage() {
  const { slug }                              = useParams();
  const { project, loading: projLoading }     = useProject(slug);
  const { content, loading: contentLoading, getValue } = usePageContent(slug);
  const { projects }                          = useProjects();

  if (projLoading || contentLoading) return <Spinner />;

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <p className="font-poppins text-body-lg text-white/60">Projet introuvable</p>
        <Link to="/" className="text-[#cdfb7c] hover:underline font-poppins">← Retour</Link>
      </div>
    );
  }

  const hasRichContent = Object.keys(content).length > 0;
  const title = getValue("header_title", project.title);

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
        <header className="mb-10">
          <h1 className="text-heading text-white mb-2">{title}</h1>
          {getValue("header_breadcrumb") && (
            <p className="text-label text-white/80 mb-4">{getValue("header_breadcrumb")}</p>
          )}
          {project.category && (
            <span className="bg-[#aa7cfb] text-white font-poppins font-semibold text-[14px] px-6 py-[2px] rounded-[16px]">
              {project.category}
            </span>
          )}
        </header>

        {/* Image */}
        {project.image_url && (
          <div className="w-full rounded-[8px] overflow-hidden mb-12 h-[370px]">
            <img
              src={project.image_url}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Contenu riche (content_blocks) */}
        {hasRichContent ? (
          SECTIONS.map((cat) => (
            <ProjetSection key={cat} blocks={blocksOf(content, cat)} />
          ))
        ) : (
          /* Fallback minimal si pas de content_blocks */
          project.description && (
            <div className="card-border p-8 max-w-[900px]">
              <p className="text-body text-white">{project.description}</p>
            </div>
          )
        )}

        {/* Section projets */}
        {content.projets && (
          <ProjectsSection
            projects={projects}
            title={getValue("projects_title", "projets")}
            fullWidth={false}
          />
        )}
      </div>
    </main>
  );
}
