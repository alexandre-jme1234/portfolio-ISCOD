import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router v6 ne gère pas nativement le scroll vers les ancres hash.
 * Ce hook rétablit ce comportement en écoutant chaque changement de location
 * et en scrollant vers l'élément cible si un hash est présent.
 *
 * Le délai de 80ms est nécessaire pour les navigations inter-routes :
 * la page cible doit avoir le temps de se monter avant que querySelector
 * puisse trouver l'élément.
 */
export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const scrollToTarget = () => {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Délai minimal pour laisser le composant cible se monter
    // (cas de navigation depuis une route différente)
    const timeoutId = setTimeout(scrollToTarget, 80);

    return () => clearTimeout(timeoutId);
  }, [location.hash, location.pathname]);
}
