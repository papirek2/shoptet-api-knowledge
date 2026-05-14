#!/usr/bin/env node
// CZ: Interaktivní instalátor Shoptet MCP serveru
//     Token je uložen lokálně do .shoptet-token, nikdy neopouští tento stroj.
// EN: Interactive Shoptet MCP server installer
//     Token is stored locally in .shoptet-token, never leaves this machine.

import { createInterface } from "readline";
import { writeFileSync, chmodSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = join(__dirname, ".shoptet-token");
const CONFIG_FILE = join(__dirname, "claude-config-snippet.json");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    // CZ: Skryj vstup pro token / EN: Hide input for token
    if (process.stdin.isTTY) {
      process.stdout.write(prompt);
      const stdin = process.stdin;
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding("utf8");
      let token = "";
      stdin.on("data", function handler(ch) {
        ch = ch.toString();
        if (ch === "\n" || ch === "\r" || ch === "\u0003") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener("data", handler);
          process.stdout.write("\n");
          resolve(token);
        } else if (ch === "\u007f") {
          if (token.length > 0) {
            token = token.slice(0, -1);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(prompt + "•".repeat(token.length));
          }
        } else {
          token += ch;
          process.stdout.write("•");
        }
      });
    } else {
      rl.question(prompt, resolve);
    }
  });
}

function questionVisible(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function main() {
  console.log("");
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║         Shoptet MCP Server — Setup / Instalace         ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log("");
  console.log("CZ: Tento skript uloží tvůj Shoptet API token POUZE lokálně.");
  console.log("    Token nikdy neopouští tento stroj a není odesílán na žádné servery.");
  console.log("");
  console.log("EN: This script stores your Shoptet API token LOCALLY ONLY.");
  console.log("    The token never leaves this machine and is never sent to any server.");
  console.log("");

  // CZ: Zkontroluj existující token / EN: Check for existing token
  if (existsSync(TOKEN_FILE)) {
    const existing = readFileSync(TOKEN_FILE, "utf-8").trim();
    const masked = existing.substring(0, 6) + "..." + existing.slice(-4);
    console.log(`⚠️  CZ: Token již existuje: ${masked}`);
    console.log(`    EN: Token already exists: ${masked}`);
    console.log("");
    const overwrite = await questionVisible(
      "CZ: Přepsat? / EN: Overwrite? (y/N): "
    );
    if (overwrite.toLowerCase() !== "y") {
      console.log("CZ: Instalace zrušena. / EN: Setup cancelled.");
      process.exit(0);
    }
    console.log("");
  }

  console.log("CZ: Kde najdeš token:");
  console.log("    Administrace eshopu → API → Přístupy k API → Private API token");
  console.log("");
  console.log("EN: Where to find your token:");
  console.log("    Shop admin → API → API Access → Private API token");
  console.log("");

  const token = await question("CZ: Vlož token / EN: Enter token: ");

  if (!token || token.length < 10) {
    console.log("\n❌ CZ: Token je příliš krátký. / EN: Token is too short.");
    process.exit(1);
  }

  // CZ: Ověř token zavoláním API / EN: Verify token by calling API
  console.log("\n🔍 CZ: Ověřuji token... / EN: Verifying token...");

  try {
    const { default: fetch } = await import("node-fetch");
    const resp = await fetch("https://api.myshoptet.com/api/eshop", {
      headers: {
        "Shoptet-Private-API-Token": token,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    if (resp.status === 401) {
      console.log("❌ CZ: Token je neplatný (401). / EN: Token is invalid (401).");
      process.exit(1);
    }

    if (!resp.ok) {
      console.log(`⚠️  CZ: API vrátilo ${resp.status}. Token uložen, ale zkontroluj práva.`);
      console.log(`    EN: API returned ${resp.status}. Token saved, but check permissions.`);
    } else {
      const data = await resp.json();
      const eshopName = data?.data?.contactInformation?.eshopName || "unknown";
      const eshopUrl = data?.data?.contactInformation?.url || "";
      console.log(`✅ CZ: Token ověřen! Eshop: ${eshopName} (${eshopUrl})`);
      console.log(`   EN: Token verified! Eshop: ${eshopName} (${eshopUrl})`);
    }
  } catch (e) {
    console.log(`⚠️  CZ: Nelze ověřit token (síťová chyba): ${e.message}`);
    console.log(`    EN: Cannot verify token (network error): ${e.message}`);
    const cont = await questionVisible(
      "CZ: Pokračovat i tak? / EN: Continue anyway? (y/N): "
    );
    if (cont.toLowerCase() !== "y") process.exit(1);
  }

  // CZ: Ulož token s omezenými právy (jen owner může číst)
  // EN: Save token with restricted permissions (owner-only read)
  writeFileSync(TOKEN_FILE, token, { mode: 0o600 });
  chmodSync(TOKEN_FILE, 0o600);
  console.log(`\n✅ CZ: Token uložen do: ${TOKEN_FILE}`);
  console.log(`   EN: Token saved to: ${TOKEN_FILE}`);
  console.log(`   🔒 Práva / Permissions: 600 (jen owner / owner only)`);

  // CZ: Vygeneruj config snippet pro claude_desktop_config.json
  // EN: Generate config snippet for claude_desktop_config.json
  const serverPath = join(__dirname, "server.js");
  const configSnippet = {
    "shoptet-mcp": {
      command: "node",
      args: [serverPath],
    },
  };

  writeFileSync(CONFIG_FILE, JSON.stringify(configSnippet, null, 2));

  console.log("\n══════════════════════════════════════════════════════════");
  console.log("CZ: Přidej do claude_desktop_config.json:");
  console.log("EN: Add to claude_desktop_config.json:");
  console.log("══════════════════════════════════════════════════════════");
  console.log("");

  // CZ: Zjisti platformu a ukáž správnou cestu
  // EN: Detect platform and show correct path
  const platform = process.platform;
  let configPath = "";
  if (platform === "darwin") {
    configPath =
      "~/Library/Application Support/Claude/claude_desktop_config.json";
  } else if (platform === "win32") {
    configPath = "%APPDATA%\\Claude\\claude_desktop_config.json";
  } else {
    configPath = "~/.config/Claude/claude_desktop_config.json";
  }

  console.log(`📁 Config soubor / file: ${configPath}`);
  console.log("");
  console.log('Přidej do sekce "mcpServers":');
  console.log("");
  console.log(JSON.stringify(configSnippet, null, 2));
  console.log("");
  console.log("══════════════════════════════════════════════════════════");
  console.log("CZ: Pro Claude Code přidej do CLAUDE.md projektu:");
  console.log("EN: For Claude Code add to your project CLAUDE.md:");
  console.log("══════════════════════════════════════════════════════════");
  console.log("");
  console.log("## Shoptet MCP");
  console.log("MCP server shoptet-mcp is available with 312 Shoptet API tools.");
  console.log("Use it for all Shoptet API operations.");
  console.log("");
  console.log(`✅ CZ: Hotovo! Restartuj Claude Desktop.`);
  console.log(`   EN: Done! Restart Claude Desktop.`);

  rl.close();
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
