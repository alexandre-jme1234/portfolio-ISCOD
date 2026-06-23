/**
 * ContactPage — Page de contact complète.
 * Fidèle à la maquette Figma (node 2155:877).
 *
 * Layout :
 *   Hero (badge disponible + titre + sous-titre)
 *   ↳ Section split : colonne formulaire | colonne infos
 *      - Formulaire : nom*, email*, téléphone, objet, message → POST /api/contact
 *      - Infos      : encart réponse 24h + email / LinkedIn / GitHub / localisation
 */
import { useState } from "react";

// Résout la base URL de l'API (proxy Vite en dev, VITE_API_URL en prod)
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

// ── Icônes SVG inline (pas de dépendance externe) ─────────────────────────

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
         0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
         -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
         .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
         -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844
         a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
         .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
         0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Données statiques de la colonne droite ────────────────────────────────

const CONTACT_INFOS = [
  {
    key:   "email",
    icon:  <MailIcon />,
    label: "Email",
    value: "jammealexandre1@gmail.com",
    href:  "mailto:jammealexandre1@gmail.com",
  },
  {
    key:   "linkedin",
    icon:  <LinkedInIcon />,
    label: "LinkedIn",
    value: "linkedin.com/in/alexandre-jamme",
    href:  "https://www.linkedin.com/in/alexandre-jamme",
  },
  {
    key:   "github",
    icon:  <GitHubIcon />,
    label: "GitHub",
    value: "github.com/alexandre-jamme",
    href:  "https://github.com/alexandre-jamme",
  },
  {
    key:   "location",
    icon:  <MapPinIcon />,
    label: "Localisation",
    value: "Lyon, France",
    href:  null,
  },
];

// Classes partagées pour input et textarea
const INPUT_CLASS =
  "w-full bg-[#1e2530] border border-white/10 rounded-[4px] px-4 " +
  "font-crimson text-[16px] text-white placeholder:text-[#b0b6bd] " +
  "focus:outline-none focus:border-[#cdfb7c] transition-colors duration-200";

// ── Sous-composants ───────────────────────────────────────────────────────

/**
 * Field — Wrapper label + enfant (input / textarea).
 * @param {string}  label    - Libellé affiché en uppercase
 * @param {boolean} required - Affiche l'astérisque vert si true
 */
function Field({ label, required = false, children }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <p className="font-poppins font-semibold text-[14px] text-white uppercase tracking-wide">
        {label}
        {required && <span className="text-[#cdfb7c] ml-1">*</span>}
      </p>
      {children}
    </div>
  );
}

/**
 * ContactInfoRow — Ligne icône + label vert + valeur dans la colonne droite.
 * Devient un <a> cliquable si href est fourni.
 */
function ContactInfoRow({ icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-[20px] w-full">
      {/* Boîte icône */}
      <div className="flex-shrink-0 bg-[#1a2030] border border-white/10 rounded-[12px]
                      w-[56px] h-[56px] flex items-center justify-center">
        {icon}
      </div>
      {/* Texte */}
      <div className="flex flex-col gap-[4px] min-w-0">
        <span className="font-poppins font-semibold text-[12px] text-[#cdfb7c] uppercase tracking-wide">
          {label}
        </span>
        <span className="font-poppins font-medium text-[18px] text-white leading-tight break-all">
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="hover:opacity-75 transition-opacity duration-200"
      >
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}

// ── Page principale ───────────────────────────────────────────────────────

export default function ContactPage() {
  // État du formulaire
  const [form, setForm] = useState({
    nom: "", email: "", telephone: "", objet: "", message: "",
  });
  // Cycle de vie de la soumission : idle → loading → success | error
  const [status,   setStatus]   = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /** Met à jour un champ du formulaire */
  const setField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /** Soumet le formulaire vers POST /api/contact */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");

      setStatus("success");
      // Réinitialise le formulaire après succès
      setForm({ nom: "", email: "", telephone: "", objet: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="bg-[#171c21] min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 lg:px-[80px] pt-[40px] pb-[40px]">

        {/* Badge disponibilité */}
        <div className="inline-flex items-center gap-[8px] bg-[rgba(205,252,124,0.1)]
                        border border-[#cdfb7c] px-[12px] py-[6px] rounded-full mb-6">
          {/* Point pulsant animé */}
          <span className="relative inline-flex h-[10px] w-[10px] flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full
                             rounded-full bg-[#cdfb7c] opacity-75" />
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-[#cdfb7c]" />
          </span>
          <span className="font-poppins font-semibold text-[14px] text-[#cdfb7c] uppercase tracking-wide">
            Disponible
          </span>
        </div>

        {/* Titre + sous-titre */}
        <div className="flex flex-col gap-[8px]">
          <h1 className="font-poppins font-bold text-[clamp(56px,8vw,96px)] text-white leading-none">
            Contact<span className="text-[#cdfb7c]">.</span>
          </h1>
          <p className="font-crimson text-[24px] text-[#b0b6bd] leading-normal max-w-[700px]">
            {`Disponible en tant qu'ingénieur logiciel DevOps sur des postes — CDI, CDD, freelance`}
          </p>
        </div>
      </section>

      {/* ── Section split : formulaire | infos ────────────────────────── */}
      <section className="px-4 sm:px-8 lg:px-[80px] py-[60px]
                          flex flex-col lg:flex-row gap-[60px] lg:gap-[80px] items-start">

        {/* ── Colonne gauche : formulaire ─────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-[24px] w-full lg:flex-1"
        >
          {/* Nom complet */}
          <Field label="Nom complet" required>
            <input
              type="text"
              value={form.nom}
              onChange={setField("nom")}
              placeholder="Ex: Jean Dupont"
              required
              className={`${INPUT_CLASS} h-[54px]`}
            />
          </Field>

          {/* Email */}
          <Field label="Email" required>
            <input
              type="email"
              value={form.email}
              onChange={setField("email")}
              placeholder="votre@email.com"
              required
              className={`${INPUT_CLASS} h-[54px]`}
            />
          </Field>

          {/* Téléphone (optionnel) */}
          <Field label="Téléphone">
            <input
              type="tel"
              value={form.telephone}
              onChange={setField("telephone")}
              placeholder="+33 6 12 34 56 78"
              className={`${INPUT_CLASS} h-[54px]`}
            />
          </Field>

          {/* Objet (optionnel) */}
          <Field label="Objet">
            <input
              type="text"
              value={form.objet}
              onChange={setField("objet")}
              placeholder="Discutons d'un projet"
              className={`${INPUT_CLASS} h-[54px]`}
            />
          </Field>

          {/* Message (optionnel) */}
          <Field label="Message">
            <textarea
              value={form.message}
              onChange={setField("message")}
              placeholder="Comment puis-je vous aider ?"
              className={`${INPUT_CLASS} h-[160px] pt-4 resize-none leading-relaxed`}
            />
          </Field>

          {/* Feedback succès */}
          {status === "success" && (
            <p className="font-poppins text-[14px] text-[#cdfb7c]
                          bg-[rgba(205,252,124,0.08)] border border-[#cdfb7c]/30
                          rounded-[4px] px-4 py-3">
              ✓ Message envoyé ! Je vous répondrai dans les 24h.
            </p>
          )}

          {/* Feedback erreur */}
          {status === "error" && (
            <p className="font-poppins text-[14px] text-red-400
                          bg-red-500/10 border border-red-500/30
                          rounded-[4px] px-4 py-3">
              {errorMsg || "Une erreur est survenue. Réessayez."}
            </p>
          )}

          {/* Bouton soumettre */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="
              w-full h-[60px] bg-[#cdfb7c] rounded-[4px]
              font-poppins font-semibold text-[18px] text-black
              hover:brightness-90
              active:scale-[0.98] active:brightness-75
              transition-all duration-150
              disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
            "
          >
            {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
          </button>
        </form>

        {/* ── Colonne droite : infos contact ──────────────────────────── */}
        <div className="flex flex-col gap-[48px] w-full lg:flex-1 lg:pt-[20px]">

          {/* Encart "Temps de réponse" */}
          <div className="bg-[rgba(170,124,252,0.1)] border border-[#aa7cfc]
                          rounded-[16px] p-[32px] flex flex-col gap-[12px]">
            <p className="font-poppins font-semibold text-[16px] text-[#aa7cfc]">
              Temps de réponse
            </p>
            <p className="font-crimson text-[18px] text-white leading-[1.5]">
              {`Je réponds généralement en moins de 24 heures. N'hésitez pas à me
                contacter pour toute collaboration technique.`}
            </p>
          </div>

          {/* Lignes de contact (email, LinkedIn, GitHub, localisation) */}
          <div className="flex flex-col gap-[24px]">
            {CONTACT_INFOS.map((info) => (
              <ContactInfoRow key={info.key} {...info} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
