import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "escaped.md");
const raw = fs.readFileSync(filePath, "utf-8");
const escaped = JSON.stringify(raw);
console.log(escaped);
