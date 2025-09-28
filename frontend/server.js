import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", (req, res) => {
  const backendUrl = process.env.BACKEND_URL;
  const target = backendUrl + req.originalUrl.replace("/api", "");
  fetch(target, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" ? req.body : undefined,
  }).then(async r => {
    const data = await r.text();
    res.status(r.status).send(data);
  }).catch(err => {
    res.status(502).json({ error: err.message });
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend rodando na porta 3000`);
});
