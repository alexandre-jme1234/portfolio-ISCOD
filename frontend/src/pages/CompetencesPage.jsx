import { useParams, Link } from "react-router-dom";
import { usePageContent, useProjects } from "../hooks/useApi.js";
import Spinner from "../components/common/Spinner.jsx";

/**
 * CompetencesPage — template dynamique d'une page de compétence.
 * URL : /competences/:slug   (ex: /competences/adaptabilite)
 *
 * Reproduit la maquette Figma "expertise/Adaptabilité" (node 338:1744) :
 *   - En-tête : grand titre + breadcrumb
 *   - Bloc DEFINITION (encadré violet translucide)
 *   - 3 sections numérotées : éléments de preuves / évolution / autocritique
 *   - Section "projets" (cartes projets)
 *
 * TOUT le texte est injecté dynamiquement depuis content_blocks via le slug :
 * la même page sert de template pour n'importe quelle compétence en base.
 */

function Paragraphs({ value }) {
  if (!value) return null;
  const parts = value.split(/\n\s*\n/);
  // Sub-label pattern: short first segment, starts lowercase, no sentence-ending punctuation
  const hasSubLabel = parts.length > 1
    && parts[0].length < 60
    && !/[.!?]$/.test(parts[0].trim())
    && /^[a-z]/.test(parts[0]);

  if (hasSubLabel) {
    return (
      <ul className="list-disc pl-6 text-body text-white">
        <li>
          <span className="font-poppins font-semibold">{parts[0]}</span>
          <br />
          {parts.slice(1).map((p, i) => (
            <span key={i}>{i > 0 && <><br /><br /></>}{p}</span>
          ))}
        </li>
      </ul>
    );
  }

  return (
    <div className="text-body text-white">
      {parts.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-4" : ""}>{para}</p>
      ))}
    </div>
  );
}

// Récupère les blocs d'une catégorie, triés par order_index
function blocksOf(content, category) {
  return (content[category] || [])
    .slice()
    .sort((a, b) => a.order_index - b.order_index);
}

const byType = (blocks, type) => blocks.find((b) => b.type === type)?.value || "";

// Rend un bloc callout (boîte à bordure verte avec liste de phases)
// Format de la valeur : "Titre\nPhase :: Description\n..."
function Callout({ value }) {
  if (!value) return null;
  const lines = value.split("\n");
  const title = lines[0];
  const items = lines.slice(1).filter(Boolean).map((line) => {
    const sep = line.indexOf(" :: ");
    if (sep === -1) return { label: line, desc: "" };
    return { label: line.slice(0, sep), desc: line.slice(sep + 4) };
  });
  return (
    <div className="rounded-[16px] border border-[#cdfb7c] p-6 mb-24 max-w-[1280px]">
      <p className="text-section text-[#cdfb7c] mb-4">{title}</p>
      <ul className="list-disc pl-6 flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="font-poppins font-bold text-[16px] text-white">
            {item.label}
            {item.desc && <span className="font-normal text-white/80"> — {item.desc}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Section numérotée (1 / 2 / 3) : grand chiffre + titre + paragraphes. */
function NumberedSection({ blocks, blob }) {
  if (!blocks.length) return null;
  const number     = byType(blocks, "number");
  const title      = byType(blocks, "h2");
  const paragraphs = blocks.filter((b) => b.type === "paragraph");

  return (
    <section className="relative mb-28">
      {blob && (
        <div
          className={`${blob} absolute rounded-full`}
          style={{ width: "1600px", height: "1000px", top: "-300px", left: "-600px", opacity: 0.2 }}
          aria-hidden
        />
      )}
      <div className="relative z-10">
        <div className="flex items-end gap-6 mb-8">
          {number && (
            <span
              className="font-poppins font-semibold text-white leading-none select-none"
              style={{ fontSize: "128px", fontWeight: 600 }}
            >
              {number}
            </span>
          )}
          {title && <h2 className="text-heading text-white">{title}</h2>}
        </div>
        <div className="flex flex-col gap-6 max-w-[1280px]">
          {paragraphs.map((p) => (
            <Paragraphs key={p.id} value={p.value} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CompetencesPage() {
  const { slug }                              = useParams();
  const { content, loading, error, getValue } = usePageContent(slug);
  const { projects }                          = useProjects();

  if (loading) return <Spinner />;

  // Aucune donnée pour ce slug → page introuvable
  if (error || Object.keys(content).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <p className="font-poppins text-body-lg text-white/60">Compétence introuvable</p>
        <Link to="/#competences" className="text-[#cdfb7c] hover:underline font-poppins">← Retour</Link>
      </div>
    );
  }

  const definitionBlocks = blocksOf(content, "definition");
  const calloutBlock     = definitionBlocks.find((b) => b.type === "callout");
  const projectsTitle    = getValue("projects_title", "projets");

  return (
    <main className="min-h-screen pt-[80px] pb-[80px] px-[80px] relative overflow-hidden bg-[#171c21]">
      <div
        className="blob-purple absolute rounded-full"
        style={{ width: "2200px", height: "1316px", top: "-300px", left: "-800px", opacity: 0.25 }}
        aria-hidden
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Retour */}
        <Link
          to="/#competences"
          className="font-poppins text-body-sm text-white/60 hover:text-[#cdfb7c] mb-10 inline-block transition-colors"
        >
          ← Retour aux compétences
        </Link>

        {/* En-tête : titre + breadcrumb */}
        <header className="mb-12">
          <h1 className="text-heading text-white mb-2">{getValue("header_title", slug)}</h1>
          {getValue("header_breadcrumb") && (
            <p className="text-label text-white/80">{getValue("header_breadcrumb")}</p>
          )}
        </header>

        {/* Bloc DEFINITION (encadré violet translucide) + callout hors boîte */}
        {definitionBlocks.length > 0 && (
          <>
            <section
              className="rounded-[16px] p-8 mb-6"
              style={{ backgroundColor: "rgba(170, 124, 251, 0.19)" }}
            >
              <h2 className="text-section text-[#cdfb7c] mb-4">
                {byType(definitionBlocks, "h2") || "DÉFINITION"}
              </h2>
              <div className="flex flex-col gap-4">
                {definitionBlocks
                  .filter((b) => b.type === "paragraph")
                  .map((p) => <Paragraphs key={p.id} value={p.value} />)}
              </div>
            </section>
            {calloutBlock && <Callout value={calloutBlock.value} />}
          </>
        )}

        {/* Image bannière summary (optionnelle, block_key: summary_image) */}
        {getValue("summary_image") && (
          <div className="w-full rounded-[16px] overflow-hidden mb-14 max-w-[1280px]" style={{ height: "108px" }}>
            <img src={getValue("summary_image")} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Sections numérotées : preuves / évolution / autocritique */}
        <NumberedSection blocks={blocksOf(content, "preuves")}      blob="blob-green"  />
        <NumberedSection blocks={blocksOf(content, "evolution")}    blob="blob-purple" />
        <NumberedSection blocks={blocksOf(content, "autocritique")} blob="blob-green"  />

        {/* Section "projets" : titre centré entre deux lignes + cartes */}
        {content.projets && (
          <section className="mt-12">
            <div className="flex items-center justify-center gap-8 mb-12">
              <span className="h-px w-[168px] bg-white/40" />
              <h2 className="text-heading text-white">{projectsTitle}</h2>
              <span className="h-px w-[168px] bg-white/40" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projets/${p.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="h-[414px] rounded-[8px] border-[6px] border-[#cdfb7c] bg-white overflow-hidden flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-full h-full object-contain p-8"
                      />
                    ) : (
                      <span className="font-poppins font-bold text-[#aa7cfb] text-[32px] opacity-30 px-6 text-center">
                        {p.title}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-poppins text-[24px] text-white">{p.title}</p>
                    {p.category && (
                      <span className="bg-[#eae9ff] text-[#171c21] font-poppins font-semibold text-[14px] px-6 py-[2px] rounded-[16px] w-fit">
                        {p.category}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
