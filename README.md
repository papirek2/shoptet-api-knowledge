# Shoptet API — Claude Code Knowledge Base

> 🇨🇿 [Česká verze níže](#česky)

---

## English

A comprehensive knowledge base for [Shoptet API](https://api.docs.shoptet.com/shoptet-api/openapi) designed for use with **Claude Code** (and compatible AI coding assistants). Covers all 195 endpoints across 68 resource groups with precise request/response schemas, required fields, data types, and PHP code examples.

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

This knowledge base covers **Private API (Premium)** access using `Shoptet-Private-API-Token` header. OAuth addon flow is documented but PHP examples focus on the token-based approach.

### API version

Based on Shoptet OpenAPI spec version `928c0ee`. When Shoptet releases updates, we update this repo and bump the version in `CLAUDE.md`.

### Contributing

Found an error or missing detail? Please open an issue or PR. Shoptet's API evolves — keeping this accurate matters.

---

## Česky

Kompletní znalostní báze [Shoptet API](https://api.docs.shoptet.com/shoptet-api/openapi) pro **Claude Code** (a kompatibilní AI asistenty). Pokrývá všech 195 endpointů ve 68 skupinách prostředků s přesnými schématy požadavků/odpovědí, povinnými poli, datovými typy a příklady v PHP.

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
Přečti .shoptet-api/CLAUDE.md pro kompletní dokumentaci Shoptet API a pak načti příslušný soubor z docs/ pro konkrétní doménu, na které pracuješ.
```

### Aktualizace

```bash
# Pokud používáš git clone nebo submodule
cd .shoptet-api && git pull
```

### Autentizace

Tato znalostní báze pokrývá přístup přes **Private API (Premium)** pomocí hlavičky `Shoptet-Private-API-Token`. OAuth addon flow je dokumentován, ale PHP příklady se soustřeďují na přístup přes token.

### Verze API

Vychází z Shoptet OpenAPI spec verze `928c0ee`. Při aktualizacích Shoptet API aktualizujeme i toto repo a bumbneme verzi v `CLAUDE.md`.

### Přispívání

Našel jsi chybu nebo chybí detail? Otevři issue nebo PR. Shoptet API se vyvíjí — udržovat toto aktuální je důležité.
