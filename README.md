# Shoptet API — Claude Code Knowledge Base + MCP Server

> 🇨🇿 [Česká verze níže](#česky)

---

## English

A comprehensive knowledge base and MCP server for [Shoptet API](https://api.docs.shoptet.com/shoptet-api/openapi), designed for **Claude Code** and compatible AI assistants.

**Two ways to use this repo:**

| | CLAUDE.md Knowledge Base | MCP Server |
|---|---|---|
| **What it is** | Context file loaded into AI conversation | Live API server — Claude calls real endpoints |
| **What it does** | Teaches AI about Shoptet API (schemas, examples, gotchas) | Executes real Shoptet API calls for you |
| **Requires** | Nothing | Node.js 18+, Shoptet Private API token |
| **Best for** | Writing PHP code, learning the API | Browsing products/orders, automating tasks |
| **Setup** | Copy/reference CLAUDE.md | `cd mcp && npm install && npm run setup` |

---

## MCP Server (live API access)

The MCP server exposes all **312 Shoptet API endpoints** as callable tools. Claude can list orders, create products, update stock — all in real time.

### Quick start

```bash
# 1. Clone
git clone https://github.com/papirek2/shoptet-api-knowledge.git ~/shoptet-api-knowledge

# 2. Install dependencies
cd ~/shoptet-api-knowledge/mcp && npm install

# 3. Setup — enter your Private API token (stored locally, never committed)
npm run setup

# 4. Test the server
node server.js
# → ✅ Shoptet MCP server running (312 tools)
```

### Requirements

- Node.js 18+
- Shoptet Premium account with Private API token
  - Find it in: Shop admin → API → API Access → Private API token

### Add to Claude Code

After running `npm run setup`, add the MCP server to your Claude Code config.

**Linux:** `~/.config/Claude/claude_desktop_config.json`  
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

The setup script generates the exact snippet with the correct path for your system — just copy it.

### Available tools (312 total)

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

Full list: run the server and Claude discovers all 312 tools automatically.

### Security

- Token stored in `mcp/.shoptet-token` (chmod 600, owner-only)
- `.shoptet-token` is in `.gitignore` — **never committed**
- Token only sent to `api.myshoptet.com` — never to Anthropic servers
- MCP communicates via stdio (local process), not network

See [mcp/README.md](mcp/README.md) for full MCP documentation.

---

## CLAUDE.md Knowledge Base (AI context)

Covers all 312 endpoints (195 documented in structured docs) with precise request/response schemas, required fields, data types, and PHP code examples.

### What's inside

| File | Description |
|------|-------------|
| `CLAUDE.md` | Main knowledge file — loaded automatically by Claude Code |
| `docs/endpoints-orders.md` | Orders, invoices, credit notes, delivery notes, proof payments |
| `docs/endpoints-products.md` | Products, categories, stocks, pricelists, parameters, images |
| `docs/endpoints-customers.md` | Customers, groups, accounts, delivery addresses |
| `docs/endpoints-marketing.md` | Discount coupons, quantity/XY discounts, articles, pages |
| `docs/endpoints-system.md` | Webhooks, async jobs, file uploads, eshop info |
| `openapi.yaml` | Original OpenAPI 3.1 spec from Shoptet (source of truth) |

### Installation into Claude Code

**Option A — Git clone (recommended, easy updates)**

```bash
# Clone into your project root or a shared location
git clone https://github.com/papirek2/shoptet-api-knowledge.git .shoptet-api

# Add to your project's CLAUDE.md (create if it doesn't exist)
echo "" >> CLAUDE.md
echo "## Shoptet API Knowledge" >> CLAUDE.md
echo "Read .shoptet-api/CLAUDE.md for complete Shoptet API documentation." >> CLAUDE.md
```

**Option B — Direct download**

```bash
curl -sSL https://raw.githubusercontent.com/papirek2/shoptet-api-knowledge/main/CLAUDE.md \
  -o .shoptet-api-knowledge.md
```

Then add to your project `CLAUDE.md`:
```markdown
## Shoptet API Knowledge
Read .shoptet-api-knowledge.md for complete Shoptet API documentation.
```

**Option C — Git submodule (for long-term projects)**

```bash
git submodule add https://github.com/papirek2/shoptet-api-knowledge.git .shoptet-api
```

Add to `CLAUDE.md`:
```markdown
## Shoptet API Knowledge
Read .shoptet-api/CLAUDE.md for complete Shoptet API documentation and then load the relevant docs/ file for the specific domain you're working on.
```

### Updating

```bash
# If using git clone or submodule
cd .shoptet-api && git pull
```

### Authentication

Covers **Private API (Premium)** access using `Shoptet-Private-API-Token` header. OAuth addon flow is documented but PHP examples focus on the token-based approach.

### API version

Based on Shoptet OpenAPI spec version `928c0ee`. When Shoptet releases updates, we update this repo.

### Contributing

Found an error or missing detail? Please open an issue or PR.

---

## Česky

Kompletní znalostní báze a MCP server pro [Shoptet API](https://api.docs.shoptet.com/shoptet-api/openapi), navrženo pro **Claude Code** a kompatibilní AI asistenty.

**Dvě možnosti použití:**

| | CLAUDE.md znalostní báze | MCP Server |
|---|---|---|
| **Co to je** | Kontextový soubor načtený do AI konverzace | Live API server — Claude volá skutečné endpointy |
| **Co umí** | Naučí AI Shoptet API (schémata, příklady, pasti) | Provádí skutečná volání Shoptet API |
| **Vyžaduje** | Nic | Node.js 18+, Shoptet Private API token |
| **Nejlepší pro** | Psaní PHP kódu, učení se API | Procházení produktů/objednávek, automatizace |
| **Setup** | Zkopíruj/odkáž CLAUDE.md | `cd mcp && npm install && npm run setup` |

---

## MCP Server (live přístup k API)

MCP server zpřístupňuje všech **312 Shoptet API endpointů** jako volatelné nástroje. Claude může zobrazovat objednávky, vytvářet produkty, aktualizovat sklad — vše v reálném čase.

### Rychlý start

```bash
# 1. Naklonuj
git clone https://github.com/papirek2/shoptet-api-knowledge.git ~/shoptet-api-knowledge

# 2. Nainstaluj závislosti
cd ~/shoptet-api-knowledge/mcp && npm install

# 3. Setup — zadej Private API token (uložen lokálně, nikdy necommitován)
npm run setup

# 4. Otestuj server
node server.js
# → ✅ Shoptet MCP server running (312 tools)
```

### Požadavky

- Node.js 18+
- Shoptet Premium účet s Private API tokenem
  - Najdeš ho: Administrace eshopu → API → Přístupy k API → Private API token

### Přidání do Claude Code

Po `npm run setup` přidej MCP server do konfigurace Claude Code.

**Linux:** `~/.config/Claude/claude_desktop_config.json`  
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

Setup skript vygeneruje přesný snippet se správnou cestou pro tvůj systém — stačí ho zkopírovat.

### Bezpečnost

- Token uložen v `mcp/.shoptet-token` (chmod 600, jen vlastník)
- `.shoptet-token` je v `.gitignore` — **nikdy se necommituje**
- Token odesílán pouze na `api.myshoptet.com` — nikdy na servery Anthropic
- MCP komunikuje přes stdio (lokální proces), ne sítí

Viz [mcp/README.md](mcp/README.md) pro úplnou MCP dokumentaci.

---

## Znalostní báze CLAUDE.md (AI kontext)

Pokrývá všech 312 endpointů (195 v strukturovaných docs) s přesnými schématy, povinnými poli, datovými typy a PHP příklady.

### Co je uvnitř

| Soubor | Popis |
|--------|-------|
| `CLAUDE.md` | Hlavní soubor znalostí — Claude Code ho načte automaticky |
| `docs/endpoints-orders.md` | Objednávky, faktury, dobropisy, dodací listy, doklady o platbě |
| `docs/endpoints-products.md` | Produkty, kategorie, sklady, ceníky, parametry, obrázky |
| `docs/endpoints-customers.md` | Zákazníci, skupiny, účty, doručovací adresy |
| `docs/endpoints-marketing.md` | Slevové kupony, množstevní/XY slevy, články, stránky |
| `docs/endpoints-system.md` | Webhooky, async joby, upload souborů, info o eshopu |
| `openapi.yaml` | Původní OpenAPI 3.1 spec od Shoptetu (zdroj pravdy) |

### Instalace do Claude Code

**Varianta A — Git clone (doporučeno, snadné aktualizace)**

```bash
# Naklonuj do kořene projektu nebo sdílené složky
git clone https://github.com/papirek2/shoptet-api-knowledge.git .shoptet-api

# Přidej do CLAUDE.md tvého projektu (vytvoř pokud neexistuje)
echo "" >> CLAUDE.md
echo "## Shoptet API znalostní báze" >> CLAUDE.md
echo "Přečti .shoptet-api/CLAUDE.md pro kompletní dokumentaci Shoptet API." >> CLAUDE.md
```

**Varianta B — Přímé stažení**

```bash
curl -sSL https://raw.githubusercontent.com/papirek2/shoptet-api-knowledge/main/CLAUDE.md \
  -o .shoptet-api-knowledge.md
```

Pak přidej do `CLAUDE.md` projektu:
```markdown
## Shoptet API znalostní báze
Přečti .shoptet-api-knowledge.md pro kompletní dokumentaci Shoptet API.
```

**Varianta C — Git submodule (pro dlouhodobé projekty)**

```bash
git submodule add https://github.com/papirek2/shoptet-api-knowledge.git .shoptet-api
```

Přidej do `CLAUDE.md`:
```markdown
## Shoptet API znalostní báze
Přečti .shoptet-api/CLAUDE.md pro kompletní dokumentaci Shoptet API a pak načti příslušný soubor z docs/ pro konkrétní doménu.
```

### Aktualizace

```bash
cd .shoptet-api && git pull
```

### Verze API

Vychází z Shoptet OpenAPI spec verze `928c0ee`.

### Přispívání

Našel jsi chybu nebo chybí detail? Otevři issue nebo PR.
