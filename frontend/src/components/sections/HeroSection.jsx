/**
 * HeroSection — reproduit le frame "hero face" (node 2036:1920) de la maquette.
 * h=1020px | "Portfolio" 160px | "Ingénierie Logiciel" 36px Poppins Light
 * Photo de fond pleine opacité + couche floutée (effet atmosphérique Figma).
 */
export default function HeroSection({ name, subtitle }) {
  return (
    <section
      id="overview"
      className="relative w-full overflow-hidden flex flex-col justify-end pb-20 px-[80px]"
      style={{ minHeight: "1020px" }}
    >
      {/* Couche 1 — photo portrait pleine opacité */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/images/hero_home.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        {/* Couche 2 — gradient sombre par-dessus pour lisibilité du texte */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,13,26,0.85) 0%, rgba(23,28,33,0.55) 55%, rgba(23,28,33,0.20) 100%)",
          }}
        />
        {/* Couche 3 — copie floutée en bas (effet Figma blur-[20.95px]) */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{ height: "340px", backdropFilter: "blur(20px)" }}
        />
      </div>

      {/* Blobs */}
      <div
        className="blob-purple absolute rounded-full"
        style={{ width: "1600px", height: "1600px", top: "-300px", right: "-400px", opacity: 0.35 }}
        aria-hidden
      />

      {/* Contenu — bas gauche, fidèle Figma */}
      <div className="relative z-10 max-w-[680px]">
        <h1
          className="font-poppins font-bold text-white leading-none"
          style={{ fontSize: "clamp(80px, 11.1vw, 160px)" }}
        >
          Portfolio
        </h1>

        {/* "Ingénierie Logiciel" — sans crochets, 36px Light */}
        <p
          className="font-poppins font-light text-white mt-2 mb-5"
          style={{ fontSize: "clamp(20px, 2.5vw, 36px)" }}
        >
          Ingénierie Logiciel
        </p>

        <p className="font-crimson font-semibold text-white/75 text-[24px] leading-snug max-w-[1279px] mb-10">
          {subtitle ||
            "De la conception au développement logiciel, voici le fruit de 5 années d'études dans le domaine du numérique. Sont présentés, les 4 projets réalisés chez Coliback en tant que développeur logiciel Junior pour clore mon Master en ingénierie Logiciel."}
        </p>

        {/* Bouton CTA */}
        <a
          href="https://wa.me/32768308711"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#2c2f32] border border-[#cdfb7c] text-white font-poppins font-semibold text-[16px] px-6 py-3 rounded-[8px] hover:bg-[#3a3f44] transition-colors"
        >
          <WhatsAppIcon />
          +32.768 30 871
        </a>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
