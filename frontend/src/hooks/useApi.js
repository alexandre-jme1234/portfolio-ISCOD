import { useState, useEffect } from "react";

// Base URL de l'API (proxy Vite en dev → http://backend:5000 en Docker)
const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api`
  : "/api";

// Hook générique pour fetch GET
function useFetch(url) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => { setData(d); setError(null); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// ---- Hooks spécialisés ----------------------------------------

/**
 * Charge le content groupé par catégorie pour une page donnée.
 * Expose getValue(key, fallback) pour accès rapide à un bloc.
 */
export function usePageContent(pageSlug) {
  const { data, loading, error } = useFetch(pageSlug ? `${API}/content/${pageSlug}` : null);
  const content = data?.content || {};

  const getValue = (key, fallback = "") => {
    for (const blocks of Object.values(content)) {
      const b = blocks.find((b) => b.block_key === key);
      if (b) return b.value;
    }
    return fallback;
  };

  return { content, loading, error, getValue };
}

/** Charge toutes les compétences groupées par catégorie. */
export function useSkills() {
  const { data: skills, loading, error } = useFetch(`${API}/skills`);
  return { skills: skills || {}, loading, error };
}

/** Charge la liste des expertises. */
export function useExpertises() {
  const { data, loading, error } = useFetch(`${API}/expertises`);
  return { expertises: data || [], loading, error };
}

/** Charge une expertise par son slug. */
export function useExpertise(slug) {
  const { data, loading, error } = useFetch(slug ? `${API}/expertises/${slug}` : null);
  return { expertise: data, loading, error };
}

/** Charge la liste des projets. */
export function useProjects() {
  const { data, loading, error } = useFetch(`${API}/projects`);
  return { projects: data || [], loading, error };
}

/** Charge un projet par son slug. */
export function useProject(slug) {
  const { data, loading, error } = useFetch(slug ? `${API}/projects/${slug}` : null);
  return { project: data, loading, error };
}

/** Charge le cursus (formations + bullet points). */
export function useCursus() {
  const { data, loading, error } = useFetch(`${API}/cursus`);
  return { cursus: data || [], loading, error };
}
