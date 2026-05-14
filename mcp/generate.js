#!/usr/bin/env node
// CZ: Regeneruje server.js z openapi.yaml — spusť po aktualizaci API spec
// EN: Regenerates server.js from openapi.yaml — run after API spec update

import { execSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const specPath = join(__dirname, "..", "openapi.yaml");

if (!existsSync(specPath)) {
  console.error("❌ openapi.yaml not found at:", specPath);
  process.exit(1);
}

console.log("🔄 CZ: Regeneruji server.js z openapi.yaml...");
console.log("   EN: Regenerating server.js from openapi.yaml...");

try {
  execSync(
    `python3 ${join(__dirname, "..", ".github", "scripts", "generate-mcp.py")}`,
    { stdio: "inherit" }
  );
  console.log("✅ server.js regenerován / regenerated");
} catch (e) {
  console.error("❌ Generování selhalo / Generation failed:", e.message);
  process.exit(1);
}
