import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL;
    const target = `http://${backendUrl}${req.originalUrl}`;

    console.log(`Proxying ${req.method} ${req.originalUrl} to ${target}`);

    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    console.error("Erro no proxy:", err);
    res.status(502).json({ error: "Bad Gateway", detail: err.message });
  }
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
});
