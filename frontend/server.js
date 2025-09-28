import { fileURLToPath } from "url";
import path from "path";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const indexPath = path.join(__dirname, "dist", "index.html");

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
