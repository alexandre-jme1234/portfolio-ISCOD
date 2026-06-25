import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEstablishment } from "../hooks/useApi.js";
import Spinner from "../components/common/Spinner.jsx";
import VisionCard from "../components/parcours/VisionCard.jsx";

/**
 * EstablishmentPage — Page de présentation d'un établissement / d'une entreprise.
 * URL : /parcours/:slug  (ex: /parcours/coliback)
 *
 * Template DYNAMIQUE fidèle à la maquette Figma (node 2179:886) :
 *   Hero (label + logo + nom + sous-titre)
 *   → Présentation générale (2 colonnes de texte)
 *   → Vision pédagogique (cartes alimentées par l'API)
 *   → Lien retour vers la frise /parcours
 *
 * Les données (nom, sous-titre, textes, visions) proviennent de
 * GET /api/establishments/:slug. Le LOGO est servi par le frontend
 * (/images/parcours/:slug.png) et n'est jamais stocké en base.
 *
 * La navigation et le footer sont ceux de l'application (rendus globalement
 * dans App.jsx) : la maquette ne les redéfinit pas ici.
 */

/**
 * Logo de l'établissement (72px) avec repli sur le placeholder pointillé
 * de la maquette si aucune image n'est disponible pour ce slug.
 */
function EstablishmentLogo({ slug, name }) {
  const [hasImage, setHasImage] = useState(true);

  // Placeholder pointillé (identique à la maquette) si pas d'image
  if (!hasImage) {
    return (
      <div
        className="size-[72px] shrink-0 rounded-[10px] bg-[#1f262b] border-[1.5px] border-dashed border-portfolio-green/50"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="size-[72px] shrink-0 rounded-[10px] bg-[#1f262b] border-[1.5px] border-portfolio-green/50 overflow-hidden">
      <img
        src={`/images/parcours/${slug}.png`}
        alt={`Logo ${name}`}
        className="size-full object-contain"
        onError={() => setHasImage(false)}
      />
    </div>
  );
}

export default function EstablishmentPage() {
  const { slug } = useParams();
  const { establishment, loading, error } = useEstablishment(slug);

  if (loading) return <Spinner />;

  // Slug inconnu ou erreur API → message + retour
  if (error || !establishment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#171c21]">
        <p className="font-poppins text-body-lg text-white/60">Établissement introuvable</p>
        <Link to="/parcours" className="text-portfolio-green hover:underline font-poppins">
          ← Retour à la frise
        </Link>
      </div>
    );
  }

  const { name, subtitle, presentation_left, presentation_right, visions = [] } = establishment;

  return (
    <main className="bg-[#171c21] min-h-screen text-white px-[80px] pb-[120px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[120px]">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="pt-[80px] flex flex-col gap-4">
          <p className="font-poppins font-semibold text-[16px] uppercase text-portfolio-green">
            Présentation
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-center">
              <EstablishmentLogo slug={slug} name={name} />
              <h1 className="font-poppins font-bold text-[80px] leading-[1.1] text-white">
                {name}
              </h1>
            </div>
            {/* Trait d'accent vert */}
            <span className="h-[4px] w-[120px] bg-portfolio-green rounded-full" aria-hidden="true" />
          </div>

          {subtitle && (
            <p className="font-crimson font-semibold italic text-[24px] text-white/80">
              {subtitle}
            </p>
          )}
        </section>

        {/* ── Présentation générale (2 colonnes) ────────────────── */}
        <section className="flex flex-col gap-10">
          <h2 className="font-poppins font-bold text-[48px]">Présentation générale</h2>
          <div className="flex flex-col md:flex-row gap-16">
            {presentation_left && (
              <p className="flex-1 font-crimson font-semibold text-[20px] leading-[1.6]">
                {presentation_left}
              </p>
            )}
            {presentation_right && (
              <p className="flex-1 font-crimson font-semibold text-[20px] leading-[1.6]">
                {presentation_right}
              </p>
            )}
          </div>
        </section>

        {/* ── Vision pédagogique (cartes dynamiques) ────────────── */}
        {visions.length > 0 && (
          <section className="flex flex-col gap-12">
            <h2 className="font-poppins font-bold text-[48px]">Vision pédagogique</h2>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              {visions.map((v) => (
                <VisionCard key={v.id} title={v.title} description={v.description} />
              ))}
            </div>
          </section>
        )}

        {/* ── Lien retour vers la frise ─────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link
            to="/parcours"
            className="font-poppins font-medium text-[18px] text-portfolio-green hover:underline whitespace-nowrap"
          >
            Voir la frise chronologique →
          </Link>
          <span className="h-px w-[220px] bg-portfolio-green/30" aria-hidden="true" />
        </div>

      </div>
    </main>
  );
}
