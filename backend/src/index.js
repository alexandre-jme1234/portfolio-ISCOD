import "dotenv/config";
import express from "express";
import cors from "cors";

import skillsRouter    from "./routes/skills.js";
import contentRouter   from "./routes/content.js";
import expertisesRouter from "./routes/expertises.js";
import projectsRouter  from "./routes/projects.js";
import cursusRouter      from "./routes/cursus.js";
import competencesRouter from "./routes/competences.js";

const app  = express();
const PORT = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/skills",     skillsRouter);
app.use("/api/content",    contentRouter);
app.use("/api/expertises", expertisesRouter);
app.use("/api/projects",   projectsRouter);
app.use("/api/cursus",       cursusRouter);
app.use("/api/competences",  competencesRouter);

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

export default app;
