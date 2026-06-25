import { Routes, Route } from "react-router-dom";
import Navbar          from "./components/common/Navbar.jsx";
import Footer          from "./components/common/Footer.jsx";
import HomePage        from "./pages/HomePage.jsx";
import ParcoursPage    from "./pages/ParcoursPage.jsx";
import EstablishmentPage from "./pages/EstablishmentPage.jsx";
import ExpertisePage   from "./pages/ExpertisePage.jsx";
import CompetencesPage from "./pages/CompetencesPage.jsx";
import ProjetPage      from "./pages/ProjetPage.jsx";
import ContactPage       from "./pages/ContactPage.jsx";
import PresentationPage  from "./pages/PresentationPage.jsx";
import { useHashScroll } from "./hooks/useHashScroll.js";

/**
 * App — layout global + routing.
 *
 * Routes :
 *   /                          → Page d'accueil (toutes sections)
 *   /parcours                  → Frise chronologique du parcours
 *   /parcours/:slug            → Présentation d'un établissement (ex: /parcours/coliback)
 *   /expertises/:slug          → Template expertise (ex: /expertises/devops)
 *   /competences/:slug         → Template compétence (contenu injecté par slug, ex: /competences/adaptabilite)
 *   /projets/:slug             → Template projet (ex: /projets/shopify-automation)
 */
export default function App() {
  useHashScroll();

  return (
    <>
      <Navbar />

      <main className="pt-[80px]">
        <Routes>
          <Route path="/"                      element={<HomePage />}        />
          <Route path="/parcours"              element={<ParcoursPage />}    />
          <Route path="/parcours/:slug"        element={<EstablishmentPage />} />
          <Route path="/expertises/:slug"      element={<ExpertisePage />}   />
          <Route path="/competences/:slug"     element={<CompetencesPage />} />
          <Route path="/projets/:slug"         element={<ProjetPage />}      />
          <Route path="/presentation"          element={<PresentationPage />} />
          <Route path="/contact"               element={<ContactPage />}     />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen bg-[#171c21]">
                <p className="font-poppins text-section text-white/50">404 — Page introuvable</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
