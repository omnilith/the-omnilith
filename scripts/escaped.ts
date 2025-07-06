import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "escaped.md");
const raw = fs.readFileSync(filePath, "utf-8");
const escaped = JSON.stringify(raw);
console.log(escaped);
