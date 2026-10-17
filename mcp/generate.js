#!/usr/bin/env node
// CZ: Regeneruje server.js z openapi.yaml — spusť po aktualizaci API spec
// EN: Regenerates server.js from openapi.yaml — run after API spec update
//
// CZ: POZOR — runtime část server.js mimo pole TOOLS a switch nástrojů je udržovaná ručně
//     a při regeneraci se MUSÍ zachovat: výběr tokenu (SHOPTET_TOKEN_FILE / legacy .shoptet-token,
//     varování na práva), SHOPTET_EXPECTED_ESHOP (ověření přes GET /api/eshop), SHOPTET_READONLY=1
//     (filtr ListTools + odmítnutí ne-GET), nástroj shoptet_whoami a TOOL_METHODS (parsuje
//     `case "<tool>": {` … `shoptetRequest('<METHOD>'` — formát switch neměnit).
// EN: WARNING — the runtime part of server.js outside TOOLS and the tool switch is hand-maintained
//     and MUST be preserved on regeneration (multi-token, expected e-shop, read-only, whoami).

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
