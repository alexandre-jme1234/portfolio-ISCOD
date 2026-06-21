/**
 * skillIconMap.js
 * ---------------------------------------------------------------
 * Mappe les `icon_key` de la table `skills` (BDD) vers les
 * fichiers SVG exportés depuis Figma via MCP, stockés dans
 * /public/img_MCP_figma/ (nommage Figma : préfixe "img=").
 *
 * Usage :
 *   import { getSkillIconUrl } from "../utils/skillIconMap.js";
 *   const url = getSkillIconUrl("react"); // "/img_MCP_figma/img=React.svg"
 * ---------------------------------------------------------------
 */

/** Dossier public contenant les SVG exportés depuis Figma */
const BASE = "/img_MCP_figma";

/**
 * Mapping icon_key (BDD) → nom de fichier SVG dans img_MCP_figma.
 * Les clés correspondent exactement à la colonne `icon_key` de la table `skills`.
 */
const ICON_MAP = {
  // ── Programmation ─────────────────────────────────────────────
  javascript:  "img=js.svg",
  nodejs:      "img=node.svg",
  angular:     "img=angular.svg",
  react:       "img=React.svg",
  python:      "img=python.svg",
  java:        "img=java.svg",
  sql:         "img=sql.svg",
  nosql:       "img=mongodb.svg",
  nginx:       "img=nginx.svg",
  directus:    "img=directus.svg",
  springboot:  "img=spring.svg",
  github:      "img=git.svg",
  wordpress:   "img=wordpress.svg",
  typescript:  "img=TS.svg",
  kotlin:      "img=kotlin.svg",
  uml:         "img=UML.svg",
  // html5, css3, tailwind → pas de SVG disponible (fallback losange)

  // ── Infogérance / DevOps ──────────────────────────────────────
  ubuntu:      "img=ubuntu.svg",
  cloud:       "img=ovh.svg",
  kubernetes:  "img=kub.svg",
  windows:     "img=windows.svg",
  docker:      "img=docker.svg",
  gitactions:  "img=git.svg",

  // ── UX / UI Design ────────────────────────────────────────────
  figma:       "img=figma.svg",
  hotjar:      "img=hotjar.svg",
  audit:       "img=auditErgo.svg",
  survey:      "img=sondageUX.svg",
  wireframe:   "img=interviewUX.svg",

  // ── Gestion de Projet ─────────────────────────────────────────
  agile:       "img=workflow.svg",
  backlog:     "img=jira.svg",
  si:          "img=SI.svg",
  gdrive:      "img=drive.svg",
  confluence:  "img=conflence.svg",
  // obsidian → pas de SVG disponible (fallback losange)
};

/**
 * Retourne l'URL publique de l'icône SVG pour un icon_key donné.
 * Renvoie `null` si aucun SVG n'est disponible (la UI affiche alors
 * le losange vert de fallback).
 *
 * @param {string|null|undefined} iconKey - Valeur de icon_key en base
 * @returns {string|null} URL ex : "/img_MCP_figma/img=React.svg"
 */
export function getSkillIconUrl(iconKey) {
  if (!iconKey) return null;
  const filename = ICON_MAP[iconKey];
  return filename ? `${BASE}/${filename}` : null;
}
