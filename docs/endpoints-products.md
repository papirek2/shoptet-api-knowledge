# Shoptet API — Produkty / Products

<!-- 
  CZ: Detailní reference endpointů pro produkty, kategorie, sklady, ceníky.
  EN: Detailed endpoint reference for products, categories, stocks, pricelists.
-->

## POST /api/products — Vytvoření produktu / Create product

**Query:** `include` (string)

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis / Description |
|------|-----|---------|---------------------|
| `name` | string | **ANO** | Název, max 250 znaků / Name, max 250 chars |
| `defaultCategoryGuid` | string | **ANO** | GUID výchozí kategorie / Default category GUID |
| `guid` | string | ne | Vlastní GUID (pokud nechceš auto) / Custom GUID |
| `type` | enum | ne | `product`\|`bazar`\|`service`\|`product-set`, default `product` |
| `visibility` | enum | ne | Viz code list, default `visible` |
| `adult` | boolean | ne | Obsah pro dospělé, default false |
| `shortDescription` | string\|null | ne | Krátký popis / Short description |
| `description` | string\|null | ne | Popis (HTML ok) / Full description (HTML ok) |
| `additionalName` | string\|null | ne | Doplňkový název, max 150 znaků |
| `metaTitle` | string\|null | ne | SEO titulek, max 255 znaků |
| `metaDescription` | string\|null | ne | Meta popis |
| `conditionGrade` | string\|null | ne | Stav (jen pro `bazar`) |
| `conditionDescription` | string\|null | ne | Popis stavu (jen pro `bazar`) |
| `brandCode` | string | ne | Kód výrobce (musí existovat) |
| `internalNote` | string | ne | Interní poznámka |
| `supplierGuid` | string\|null | ne | GUID dodavatele |
| `categoryGuids` | array | ne | Další kategorie (string[]) |
| `warrantyId` | integer\|null | ne | ID záruky |
| `indexName` | string | ne | URL slug (sanitizuje se auto) |
| `flags` | array\|null | ne | Kódy příznaků (string[]) |
| `flagsManagement` | array\|null | ne | Alternativa k flags s akcemi (nelze kombinovat) |
| `filteringParameters` | array\|null | ne | Filtrační parametry |
| `surchargeParameters` | array | ne | Příplatkové parametry |
| `descriptiveParameters` | array | ne | Popisné parametry |
| `relatedVideos` | array | ne | Videa |
| `variants` | array | ne | Varianty produktu (viz níže) |
| `preauthorizationRequired` | boolean | ne | Vyžaduje předautorizaci (Shoptet Pay modul) |

**Varianta (variants[]):**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `code` | string | ne | SKU kód varianty |
| `ean` | string\|null | ne | EAN kód |
| `price.withVat` | string | ne | Cena s DPH (**string!**) |
| `price.withoutVat` | string | ne | Cena bez DPH (**string!**) |
| `price.currencyCode` | string | ne | Kód měny |
| `purchasePrice.withVat` | string | ne | Nákupní cena s DPH (**string!**) |
| `stock.count` | number | ne | Počet skladem |
| `stock.minCount` | number | ne | Minimální zásoba |
| `weight` | number | ne | Hmotnost v kg |
| `width` | number | ne | Šířka v cm |
| `height` | number | ne | Výška v cm |
| `depth` | number | ne | Hloubka v cm |
| `availabilityId` | integer | ne | ID dostupnosti |
| `variantParameters` | array | ne | [{paramCode: string, valueCode: string}] |
| `atypicalShipping` | boolean | ne | Nestandardní doprava |
| `atypicalBilling` | boolean | ne | Nestandardní fakturace |

---

## GET /api/products — Seznam produktů / List products

| Parametr | Typ | Popis |
|----------|-----|-------|
| `availabilityId` | integer | Filtr dostupnosti |
| `availabilityWhenSoldOutId` | integer | Filtr dostupnosti při vyprodání |
| `creationTimeFrom/To` | string | ISO 8601 |
| `changeTimeFrom/To` | string | ISO 8601 |
| `visibility` | string | visible\|hidden\|blocked\|... |
| `type` | string | product\|bazar\|service\|product-set |
| `brandName` | string | Název výrobce |
| `brandCode` | string | Kód výrobce |
| `defaultCategoryGuid` | string | GUID výchozí kategorie |
| `categoryGuid` | string | GUID kategorie (i podkategorie) |
| `flag` | string | Kód příznaku |
| `supplierGuid` | string | GUID dodavatele |
| `productCodes` | string | Max 50 kódů oddělených čárkou |
| `productGuids` | string | Max 50 GUIDů oddělených čárkou |
| `include` | string | `variants,images,flags,...` |
| `itemsPerPage` | integer | Default: 20, max: 1000 |

---

## GET /api/products/{guid} — Detail produktu / Product detail

**Path:** `guid` = UUID produktu (string)

**Query:** `include` = `variants` \| `images` \| `filteringParameters` \| `surchargeParameters` \| `flags` \| `gifts` \| `alternativeProducts` \| `relatedProducts` \| `relatedFiles`

**Klíčová pole response:**

| Pole | Typ | Popis |
|------|-----|-------|
| `guid` | string | UUID produktu |
| `type` | string | Typ produktu |
| `name` | string\|null | Název |
| `visibility` | string | Viditelnost |
| `isVariant` | boolean | Má varianty? |
| `variants[]` | array | Varianty (s `?include=variants`) |
| `images[]` | array | Obrázky (s `?include=images`) — name, seoName, cdnName |
| `defaultCategory.guid` | string\|null | GUID výchozí kategorie |
| `brand.code` | string | Kód výrobce |
| `url` | string\|null | URL produktu v eshopu |

---

## PATCH /api/products/{guid} — Aktualizace produktu / Update product

Stejná pole jako POST — všechna **volitelná** u PATCH.

**Path:** `guid` = UUID produktu

---

## GET /api/products/code/{code} — Detail podle kódu / Detail by code

**Path:** `code` = SKU kód produktu nebo varianty (string)

---

## PATCH /api/products/code/{code} — Aktualizace podle kódu / Update by code

**Path:** `code` = SKU kód produktu nebo varianty

---

## DELETE /api/products/{guid}

**Path:** `guid` = UUID produktu

---

## DELETE /api/products/code/{code}

**Path:** `code` = SKU kód VARIANTY (pokud je to poslední varianta, smaže se celý produkt)

---

## GET /api/products/changes — Změny produktů / Product changes

| Parametr | Typ | Povinné | Popis |
|----------|-----|---------|-------|
| `from` | string | **ANO** | ISO 8601 datetime (garantováno 30 dní) |
| `changeType` | string | ne | `edit` \| `delete` |
| `itemsPerPage` | integer | ne | Default a max: 1000 |

---

## PATCH /api/products/batch — Hromadná aktualizace (async)

**Request body:**
```json
{"batchFileUrlPath": "https://muj-server.cz/products-batch.jsonl"}
```
Soubor musí být v JSONL formátu, každý řádek = jeden produkt ve formátu stejném jako PATCH /api/products/{guid}.  
Vrátí `jobId` → čekej na webhook `job:finished`.

---

## DELETE /api/products/batch — Hromadné smazání (async)

```json
{"batchFileUrlPath": "https://muj-server.cz/delete-batch.jsonl"}
```

---

## POST /api/products/{guid}/copy — Kopie produktu / Copy product

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název kopie, max 250 znaků |
| `isVisible` | boolean | ne | Viditelný? Jinak `visible` jako originál |
| `copyProperties.generalData` | boolean | ne | Kopíruj popis, poznámky... |
| `copyProperties.images` | boolean | ne | Kopíruj obrázky |
| `copyProperties.pricelist` | boolean | ne | Kopíruj ceník a varianty |
| `copyProperties.categories` | boolean | ne | Kopíruj kategorie |
| `copyProperties.stocks` | boolean | ne | Kopíruj sklady (vyžaduje pricelist=true) |

---

## OBRÁZKY / IMAGES

### GET/DELETE /api/products/{guid}/images/{gallery}

**Path `gallery`:** `shop` (normální) \| `shop360` (360°)

### POST /api/products/{guid}/images/{gallery} — Přidání obrázků (async)

```json
{
    "data": {
        "images": [
            {"sourceUrl": "https://...", "priority": 1, "description": "Popis"}
        ]
    }
}
```

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `sourceUrl` | string | **ANO** | URL obrázku ke stažení |
| `priority` | integer | ne | Pořadí |
| `description` | string | ne | Popis obrázku |

### PATCH /api/products/{guid}/images/{gallery} — Aktualizace metadat

```json
{
    "data": {
        "images": [
            {"name": "100.jpg", "priority": 1, "description": "Nový popis"}
        ]
    }
}
```

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název existujícího obrázku |
| `priority` | integer | ne | Nové pořadí |
| `description` | string | ne | Nový popis |

Max 100 obrázků na jedno volání.

**⚠️ Limit velikosti obrázků:** Shoptet async job selhává tiše při stahování velkých souborů. V praxi:
- JPEG do ~6 MB: funguje spolehlivě
- PNG nad ~10 MB: job selže, obrázek se nenahraje (žádná chybová hláška!)
- **Řešení:** Velké PNG konvertuj před nahráním: `convert input.png -resize 2000x2000\> -quality 90 output.jpg`
- Výsledek: 12–22 MB PNG → ~200 KB JPEG bez viditelné ztráty kvality

### DELETE /api/products/{guid}/images/{gallery}/{imageName}

**Query:** `removeReference` (boolean) — odstraní i referenci z varianty, default false

### Sestavení URL obrázku / Image URL assembly

```php
// Z GET /api/eshop?include=imageCuts
// $imageCuts['detail']['urlPath'] = 'https://eshop.cz/user/shop/detail/'
// $imageCuts['detail']['cdnPath'] = 'https://cdn-api.myshoptet.com/.../detail/'

$urlPath = $imageCuts['detail']['urlPath'] . $product['images'][0]['name'];
// nebo CDN (cached, pro frontend):
$cdnUrl  = $imageCuts['detail']['cdnPath'] . $product['images'][0]['cdnName'];
```

---

## SKLADY / STOCKS

### GET /api/stocks — Seznam skladů

Response: `stocks[]` (id, name, default), `defaultStockId`

### PATCH /api/stocks/{stockId}/movements — Aktualizace množství

**⚠️ POZOR / WARNING:** `amountChange` je **ABSOLUTNÍ** hodnota, NE delta!

```json
{
    "data": [
        {"productCode": "SKU001", "amountChange": 25}
    ]
}
```

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `productCode` | string | **ANO** | SKU kód produktu/varianty |
| `amountChange` | number | **ANO** | Nový absolutní počet (číslo, ne string) |

Max 300 produktů/variant na jedno volání.

### GET /api/stocks/{stockId}/movements — Pohyby skladu

| Parametr | Typ | Popis |
|----------|-----|-------|
| `lastId` | integer | ID posledního záznamu (pro cursor pagination) |
| `changeTimeFrom` | string | ISO 8601 (nelze kombinovat s lastId) |
| `orderCode` | string | Filtr podle objednávky |
| `include` | string | Volitelné sekce |
| `itemsPerPage` | integer | Default: 25, max: 1000 |

### GET /api/stocks/{stockId}/supplies — Zásoby

| Parametr | Typ | Popis |
|----------|-----|-------|
| `productGuid` | string | Filtr GUID produktu |
| `code` | string | Filtr kód produktu |
| `onlyWithClaim` | boolean | Jen produkty s reklamací |
| `changedFrom` | string | Změny od data |
| `itemsPerPage` | integer | Default a max: 1000 |

---

## CENÍKY / PRICELISTS

### GET /api/pricelists — Seznam ceníků

Vrátí všechny ceníky najednou (bez paginace).  
Response: `pricelists[]` (id, name, ...)

### POST /api/pricelists — Vytvoření ceníku

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název ceníku |

### PATCH /api/pricelists/{id} — Aktualizace cen v ceníku

**Path:** `id` = integer (ID ceníku)

Max 300 položek na jedno volání.

```json
{
    "data": [
        {
            "code": "SKU001",
            "currencyCode": "CZK",
            "includingVat": true,
            "vatRate": "21.00",
            "orderableAmount": {"minimumAmount": "1", "maximumAmount": null}
        }
    ]
}
```

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `code` | string | **ANO** | SKU kód varianty |
| `currencyCode` | string | ne | Kód měny |
| `vatRate` | string\|null | ne | Sazba DPH (**string!**) |
| `includingVat` | boolean | ne | Cena zahrnuje DPH |
| `orderableAmount.minimumAmount` | string\|null | ne | Min. objednatelné množství (string!) |
| `orderableAmount.maximumAmount` | string\|null | ne | Max. objednatelné množství (string!) |

---

## KATEGORIE / CATEGORIES

### POST /api/categories — Vytvoření kategorie / Create category

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název kategorie |
| `guid` | string | ne | Vlastní GUID |
| `parentGuid` | string\|null | ne | GUID rodičovské kategorie |
| `description` | string\|null | ne | Popis (HTML, max 65535 B) |
| `secondDescription` | string\|null | ne | Dolní popis (max 65535 B) |
| `sourceImageName` | string\|null | ne | Obrázek z temp storage |
| `indexName` | string | ne | URL slug (generuje se z name pokud chybí) |
| `menuTitle` | string\|null | ne | Název v menu |
| `title` | string\|null | ne | Meta title |
| `metaTagDescription` | string\|null | ne | Meta popis |
| `visible` | boolean | ne | Viditelná?, default true |
| `customerVisibility` | enum | ne | `all`\|`registered`\|`unregistered`\|`admin-only` |
| `sortBefore` | string | ne | GUID kategorie, před kterou se zařadit |
| `sortAfter` | string | ne | GUID kategorie, za kterou se zařadit |

---

## VÝROBCI / BRANDS

### POST /api/brands — Vytvoření výrobce / Create brand

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název výrobce |
| `indexName` | string\|null | ne | Unikátní kód (= code v URL) |
| `brandWeb` | string\|null | ne | Web výrobce |
| `showInCategoriesMenu` | boolean | ne | Zobrazit v menu kategorií, default false |
| `showInBrandList` | boolean | ne | Zobrazit v seznamu výrobců, default false |
| `description` | string\|null | ne | Popis (HTML ok) |
| `metaTitle` | string\|null | ne | Meta titulek |
| `metaDescription` | string\|null | ne | Meta popis |
| `postalAddress` | string\|null | ne | GPSR poštovní adresa |
| `contactEmail` | string\|null | ne | GPSR kontaktní email |

**Path u GET/PATCH/DELETE:** `code` = `indexName` výrobce (string), ne ID

### POST /api/brands/batch — Hromadné vytvoření (async)

```json
{"batchFileUrlPath": "https://..."}
```
JSONL soubor, každý řádek = jeden výrobce.

---

## VARIANTNÍ PARAMETRY / VARIANT PARAMETERS

### POST /api/products/variant-parameters — Vytvoření

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `paramName` | string | **ANO** | Název parametru, max 255 znaků |
| `paramIndex` | string\|null | ne | URL kód parametru |
| `displayName` | string\|null | ne | Zobrazovaný název |
| `priority` | integer\|null | ne | Priorita |
| `values` | array | ne | [{paramValue: string (required), rawValue: string\|null, color: string\|null, image: string\|null, valuePriority: int\|null}] |

### POST /api/products/variant-parameters/{paramIndex} — Přidání hodnoty

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `paramValues` | array | **ANO** | [{paramValue: string (required), rawValue: string\|null, ...}] |

---

## FILTRAČNÍ PARAMETRY / FILTERING PARAMETERS

### Workflow — vytvoření a přiřazení k produktům

1. **Vytvoř globální parametr** → `POST /api/products/filtering-parameters`
2. **Přiřaď hodnoty k produktu** → `PATCH /api/products/{guid}` s polem `filteringParameters`
3. **Smazání parametru** automaticky odstraní vazby ze všech produktů

### POST /api/products/filtering-parameters — Vytvoření globálního parametru

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název parametru |
| `values` | array | **ANO** | Pole hodnot (viz níže) |
| `code` | string | ne | URL kód (generuje se z name pokud chybí) |
| `priority` | integer | ne | Pořadí parametru ve filtru |
| `displayName` | string\|null | ne | Zobrazovaný název |
| `googleMapping` | string\|null | ne | Google mapování |

**Hodnota (values[]):**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Zobrazovaný název hodnoty |
| `valueIndex` | string | ne | URL slug — **POUZE `^[a-zA-Z0-9\-]*$`** — žádné háčky/čárky! |
| `priority` | integer | ne | Pořadí (min. **1**, 0 je chyba!) |
| `color` | string\|null | ne | Barva (hex) |
| `image` | string\|null | ne | Název obrázku |

**⚠️ KRITICKÉ:**
- `valueIndex` musí být čistě ASCII: `reishi`, `cerny-bez`, `200`, `60-ks` ✓ — `reíší`, `černý-bez` ✗ → error 422
- `priority` minimální hodnota je **1** (ne 0) → error 422
- Pokud dva parametry mají stejné `valueIndex`, API vrátí 422

```json
{
  "data": {
    "name": "Medicinální houby",
    "code": "medicinalni-houby",
    "priority": 1,
    "values": [
      {"name": "Reishi (Lesklokorka lesklá)", "valueIndex": "reishi", "priority": 1},
      {"name": "Chaga (Rezavec šikmý)", "valueIndex": "chaga", "priority": 2}
    ]
  }
}
```

### POST /api/products/filtering-parameters/{code} — Přidání hodnot

Přidá hodnoty k existujícímu parametru.

```json
{"data": {"paramValues": [{"name": "Nová hodnota", "valueIndex": "nova-hodnota", "priority": 5}]}}
```

### DELETE /api/products/filtering-parameters/{code} — Smazání parametru

Smaže parametr **i všechny vazby na produkty**. Není potřeba ručně odlinkovat produkty.

### Přiřazení parametrů k produktu — PATCH /api/products/{guid}

**Formát `filteringParameters` (pole stringů, NE objektů):**

```json
{
  "filteringParameters": [
    {
      "code": "medicinalni-houby",
      "values": ["reishi", "chaga", "hericium"]
    },
    {
      "code": "forma-produktu",
      "values": ["med"]
    },
    {
      "code": "hmotnost",
      "values": ["200"]
    }
  ]
}
```

**⚠️ `values` je pole stringů (valueIndex), NE pole objektů!**
- ✓ `"values": ["reishi", "chaga"]`
- ✗ `"values": [{"valueIndex": "reishi"}, {"valueIndex": "chaga"}]` → error 422
- ✗ `"values": [{"nameIndex": "...", "valueIndex": "..."}]` → error 422

Přiřazení **přepíše** všechny existující filtrační parametry produktu.

---

## PŘÍPLATKOVÉ PARAMETRY / SURCHARGE PARAMETERS

### POST /api/products/surcharge-parameters — Vytvoření

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název parametru |
| `values` | array | **ANO** | [{name: string (required), price: string\|null (required), valueIndex: string\|null, priority: int\|null}] |
| `currency` | string\|null | ne | Kód měny |
| `code` | string | ne | URL kód |
| `required` | boolean | ne | Povinný?, default false |
| `includingVat` | boolean | ne | Ceny zahrnují DPH, default true |

---

## PŘÍZNAKY / FLAGS

### POST /api/products/flags — Vytvoření příznaku

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `title` | string | **ANO** | Název příznaku |
| `color` | string\|null | ne | Barva (hex) |

**Path u PATCH/DELETE:** `code` = kód příznaku

---

## DOSTUPNOSTI / AVAILABILITIES

### POST /api/products/availabilities — Vytvoření dostupnosti

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název dostupnosti |
| `indexName` | string\|null | ne | Kód dostupnosti |
| `onStockInHours` | integer\|null | ne | Za kolik hodin naskladní |
| `deliveryInHours` | integer\|null | ne | Za kolik hodin doručí |
| `googleAvailabilityId` | integer\|null | ne | 1=in stock, 3=out of stock, 4=preorder, 5=backorder |

---

## PRODEJNÍ KANÁLY / SALES CHANNELS

### GET /api/sales-channels — Seznam

**Query:** `type` = `in_store` \| `online_store` \| `marketplace`

---

## SOUBORY / FILES

Pouze obrázky: `png`, `jpg`, `gif`. Platnost v temp storage: 7 dní.

### POST /api/system/file — Upload jednoho souboru (synchronní)

```json
{"data": {"sourceUrl": "https://...", "name": "produkt.jpg"}}
```

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `sourceUrl` | string | **ANO** | URL obrázku ke stažení |
| `name` | string | ne | Název souboru |

Response: `{"data": {"name": "produkt.jpg", "..."}}`

### POST /api/system/files — Hromadný upload (async)

```json
{"data": [{"sourceUrl": "https://...", "name": "..."}]}
```

Vrátí `jobId`. Soubory jsou přístupné po dokončení jobu.
