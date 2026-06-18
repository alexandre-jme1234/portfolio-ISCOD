import { useEffect, useState } from "react";

// Base URL de l'API (même logique que useApi.js : VITE_API_URL en prod, proxy /api en dev)
const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const LEVEL_LABELS = ["", "Débutant", "Basique", "Intermédiaire", "Avancé", "Expert"];

const CATEGORY_COLORS = {
  Frontend: "bg-blue-100 text-blue-800",
  Backend: "bg-green-100 text-green-800",
  "Base de données": "bg-purple-100 text-purple-800",
  DevOps: "bg-orange-100 text-orange-800",
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/skills`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => setSkills(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        Impossible de charger les compétences : {error}
      </div>
    );
  }

  return (
    <section id="skills" className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Compétences
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{category}</h3>
            <ul className="space-y-3">
              {items.map((skill) => (
                <li key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {LEVEL_LABELS[skill.level]}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
