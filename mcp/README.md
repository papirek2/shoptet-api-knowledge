# Shoptet MCP Server

<!-- 
  CZ: MCP server pro Shoptet API — 312 tools pokrývající všechny endpointy.
      Token je uložen POUZE lokálně, nikdy neopouští váš stroj.
  EN: MCP server for Shoptet API — 312 tools covering all endpoints.
      Token is stored LOCALLY ONLY, never leaves your machine.
-->

> 🇨🇿 [Česky níže](#česky) · 🇬🇧 [English below](#english)

---

## English

### Requirements / Požadavky

- Node.js 18+
- Shoptet Premium account with Private API token

### Installation

```bash
# 1. Clone the repo (if not already done)
git clone https://github.com/papirek2/shoptet-api-knowledge.git
cd shoptet-api-knowledge/mcp

# 2. Install dependencies
npm install

# 3. Run setup — enter your token securely (hidden input, stored locally)
npm run setup
```

The setup script will:
- Ask for your Shoptet Private API token (hidden input, never logged)
- Verify the token against the API
- Store it in `.shoptet-token` with `600` permissions (owner-only)
- Show you the exact snippet to add to `claude_desktop_config.json`

### Security

- Token stored in `mcp/.shoptet-token` (chmod 600)
- `.shoptet-token` is in `.gitignore` — **never committed**
- Token never sent to Anthropic servers — only to `api.myshoptet.com`
- MCP communicates via stdio (local process), not network

### Claude Desktop config

After setup, add to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shoptet-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/shoptet-api-knowledge/mcp/server.js"]
    }
  }
}
```

### Claude Code config

Add to your project `CLAUDE.md`:

```markdown
## Shoptet MCP
MCP server `shoptet-mcp` is available with 312 Shoptet API tools.
Use it for all Shoptet API operations instead of writing HTTP calls manually.
```

### Available tools (312 total)

All Shoptet API endpoints are available as MCP tools. Examples:

| Tool | Method | Endpoint |
|------|--------|----------|
| `list_orders` | GET | `/api/orders` |
| `get_orders_by_code` | GET | `/api/orders/{code}` |
| `update_orders_status_by_code` | PATCH | `/api/orders/{code}/status` |
| `list_products` | GET | `/api/products` |
| `get_products_by_guid` | GET | `/api/products/{guid}` |
| `update_products_by_guid` | PATCH | `/api/products/{guid}` |
| `update_stocks_movements_by_stockId` | PATCH | `/api/stocks/{stockId}/movements` |
| `list_customers` | GET | `/api/customers` |
| `create_webhooks` | POST | `/api/webhooks` |
| `get_system_jobs_by_jobId` | GET | `/api/system/jobs/{jobId}` |

Full list: run `npm start` and Claude will discover all 312 tools automatically.

### Updating

When Shoptet updates their API (you'll get a GitHub issue via the workflow):

```bash
cd shoptet-api-knowledge
git pull  # Updates openapi.yaml and docs/
# server.js is auto-generated — regenerate if needed:
cd mcp && node generate.js
```

---

## Česky

### Požadavky

- Node.js 18+
- Shoptet Premium účet s Private API tokenem

### Instalace

```bash
# 1. Naklonuj repo (pokud ještě nemáš)
git clone https://github.com/papirek2/shoptet-api-knowledge.git
cd shoptet-api-knowledge/mcp

# 2. Nainstaluj závislosti
npm install

# 3. Spusť setup — zadej token bezpečně (skrytý vstup, uloženo lokálně)
npm run setup
```

Setup skript:
- Požádá o Shoptet Private API token (skrytý vstup, nikde se neloguje)
- Ověří token voláním API
- Uloží ho do `.shoptet-token` s právy `600` (jen vlastník může číst)
- Zobrazí přesný snippet pro `claude_desktop_config.json`

### Bezpečnost

- Token uložen v `mcp/.shoptet-token` (chmod 600)
- `.shoptet-token` je v `.gitignore` — **nikdy se necommituje**
- Token nikdy neodchází na servery Anthropic — pouze na `api.myshoptet.com`
- MCP komunikuje přes stdio (lokální proces), ne sítí

### Konfigurace Claude Desktop

Po setupu přidej do `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "shoptet-mcp": {
      "command": "node",
      "args": ["/absolutni/cesta/k/shoptet-api-knowledge/mcp/server.js"]
    }
  }
}
```

### Konfigurace Claude Code

Přidej do `CLAUDE.md` projektu:

```markdown
## Shoptet MCP
MCP server `shoptet-mcp` je dostupný s 312 nástroji pro Shoptet API.
Používej ho pro všechny Shoptet API operace místo ručního psaní HTTP volání.
```

### Více e-shopů

Jeden server obslouží libovolný e-shop — token a očekávaná identita se předávají přes env proměnné v **projektové** konfiguraci MCP (`-s project`), takže každý projekt mluví jen se svým e-shopem.

| Env | Význam |
|-----|--------|
| `SHOPTET_TOKEN_FILE` | Absolutní cesta k souboru s tokenem. Bez ní se použije legacy `mcp/.shoptet-token` (stávající chování). |
| `SHOPTET_EXPECTED_ESHOP` | ID e-shopu nebo URL/doména. Při prvním volání se ověří přes `GET /api/eshop`; při neshodě server odmítne **všechna** volání („Token patří e-shopu X, očekáván Y"). |
| `SHOPTET_READONLY=1` | Jen čtecí (GET) nástroje — zapisovací se v seznamu nástrojů vůbec neobjeví a jejich volání se odmítne. |

```bash
cd /var/projects/<eshop>
claude mcp add shoptet-mcp -s project \
  -e SHOPTET_TOKEN_FILE=/var/projects/<eshop>/secrets/shoptet-token \
  -e SHOPTET_EXPECTED_ESHOP=<id> \
  -- node /home/jarvis/shoptet-api-knowledge/mcp/server.js
# volitelně jen čtení: přidej -e SHOPTET_READONLY=1
```

Pravidla:
- Tokeny patří do `/var/projects/<eshop>/secrets/shoptet-token`, soubor `chmod 600` (adresář `secrets/` `chmod 700`). Pokud je soubor čitelný pro ostatní, server vypíše varování na stderr.
- Vždy nastav `SHOPTET_EXPECTED_ESHOP` — chrání proti tichému čtení/zápisu do cizího e-shopu při záměně tokenu.
- Kontrola: nástroj `shoptet_whoami` vrátí ID, název a URL e-shopu, zdroj tokenu (jen cestu), stav ověření a read-only režim. Obsah tokenu se nikdy nevypisuje.
