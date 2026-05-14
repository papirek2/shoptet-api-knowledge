# Shoptet API — Znalostní báze / Knowledge Base

<!-- 
  CZ: Tento soubor je automaticky načítán Claude Code jako kontext pro práci se Shoptet API.
  EN: This file is automatically loaded by Claude Code as context for working with Shoptet API.
  
  Verze OpenAPI spec / OpenAPI spec version: 928c0ee
  Aktualizováno / Updated: 2025-05
-->

**API Base URL:** `https://api.myshoptet.com`  
**Formát / Format:** JSON  
**Oficiální dokumentace / Official docs:** https://api.docs.shoptet.com/shoptet-api/openapi

---

## Autentizace / Authentication

### Private API (Premium) — používáme toto / we use this

```
Shoptet-Private-API-Token: <váš-token>
```

Token vytvoř v administraci eshopu. Má přístup ke **všem** endpointům.

```php
// CZ: Základní volání / EN: Basic call
$response = $httpClient->request('GET', 'https://api.myshoptet.com/api/eshop', [
    'headers' => [
        'Shoptet-Private-API-Token' => $config['shoptet_token'],
        'Content-Type' => 'application/json',
    ],
]);
```

### Addon (OAuth2) — pro partnery / for partners

1. Instalace addonu → `code` GET parametr na tvém serveru (platnost jednorázová, krátká)
2. `code` → OAuth access token (serverový request na adresu z administrace)
3. OAuth token → API access token: `GET https://<eshop>.cz/action/ApiOAuthServer/getAccessToken` s `Authorization: Bearer <oauth_token>`
4. Každé API volání: `Shoptet-Access-Token: <api_access_token>`
5. Token expiruje → HTTP 401 → obnov (max 5 platných současně, max 3 spojení na token)

---

## Základní principy / Core Principles

### Response formát / Response format

```json
{
    "data": { "...": "..." },
    "errors": null,
    "metadata": { "requestId": "uuid-pro-support" }
}
```

Při chybě `data` je `null`, `errors` obsahuje pole s `errorCode` a `message`.

### HTTP status kódy / HTTP status codes

| Kód | CZ | EN |
|-----|----|----|
| 200 | OK (i PATCH s částečnými chybami v `errors`) | OK (also PATCH with partial errors in `errors`) |
| 400 | Validace selhala — neopakuj | Validation failed — do not retry |
| 401 | Token expiroval (addon) — obnov | Token expired (addon) — renew |
| 403 | Addon nemá práva / chybí modul | Addon lacks rights / module missing |
| 404 | Entita neexistuje | Entity does not exist |
| 409 | Konflikt (duplicita, broken relation) | Conflict (duplicate, broken relation) |
| 413 | Příliš mnoho entit v requestu | Too many entities in request |
| 422 | Nevalidní JSON nebo schéma | Invalid JSON or schema |
| 423 | Locked — paralelní request na stejnou URL (retry) | Locked — parallel request on same URL (retry) |
| 429 | Rate limit (50 spojení/IP, 3/token) | Rate limit (50 conn/IP, 3/token) |
| 503 | Údržba — zkus za chvíli | Maintenance — try later |

### Paginace / Pagination

```
GET /api/orders?page=1&itemsPerPage=50
```

Response obsahuje / Response contains:
```json
"paginator": {
    "totalCount": 1250,
    "currentPage": 1,
    "itemsPerPage": 50
}
```

**POZOR / WARNING:** Při iteraci přes stránky kontroluj `totalCount` — pokud se změní, záznamy se mohly posunout.

```php
// CZ: Iterace přes všechny záznamy / EN: Iterate over all records
$all = [];
$page = 1;
do {
    $resp = $api->get('/api/orders', ['page' => $page, 'itemsPerPage' => 100]);
    $items = $resp['data']['orders'] ?? [];
    $all = array_merge($all, $items);
    $total = $resp['data']['paginator']['totalCount'] ?? 0;
    $page++;
} while (count($all) < $total);
```

### Include — sekce na vyžádání / Sections on demand

```
GET /api/orders/{code}?include=notes,items
GET /api/eshop?include=paymentMethods,shippingMethods,imageCuts,currencies
GET /api/products/{guid}?include=variants,images,filteringParameters,flags
GET /api/products/snapshot?include=variants,images
```

### Asynchronní requesty / Async requests

Endpointy vracející `jobId` (snapshot, batch operace) jsou async:

1. Zavolej endpoint → dostaneš `{"data": {"jobId": "xyz"}}`
2. Čekej na webhook `job:finished` (musí být registrován, jinak → 403)
3. `GET /api/system/jobs/{jobId}` → zkontroluj `status` a `downloadUrl`
4. Stáhni JSONL soubor z `downloadUrl`

**KRITICKÉ / CRITICAL:** Registrace webhooku `job:finished` je povinná pro všechny async operace.

```php
// CZ: Zpracování JSONL výsledku / EN: Processing JSONL result
$jsonl = file_get_contents($job['data']['downloadUrl']);
foreach (explode("\n", trim($jsonl)) as $line) {
    if (!$line) continue;
    $record = json_decode($line, true);
    // zpracuj záznam / process record
}
```

### Locks — zámky / Locks

Write endpointy (POST/PATCH/PUT/DELETE) mají lock max 5 vteřin.  
Stejný request 2× rychle za sebou → **423 Locked** → retry po 1-2 vteřinách.

### Changes endpointy — incremental sync

Místo full snapshot pro pravidelnou synchronizaci:
```
GET /api/orders/changes?from=2024-01-01T00:00:00+01:00
GET /api/products/changes?from=2024-01-01T00:00:00+01:00
GET /api/customers/changes?from=2024-01-01T00:00:00+01:00
GET /api/invoices/changes?from=2024-01-01T00:00:00+01:00
```

**POZOR / WARNING:** Parametr se jmenuje `from` (ne `changeTimeFrom`). Garantovaná historie 30 dní.  
Format: ISO 8601, `+` v URL musí být zakódován jako `%2B`.

---

## ⚠️ Kritické datové typy / Critical Data Types

Tyto věci způsobují 90 % chyb při integraci. Čti pozorně.  
*These are responsible for 90% of integration errors. Read carefully.*

### Čísla jako stringy / Numbers as strings
Cenové a množstevní hodnoty jsou **vždy string**, ne number:
```php
// SPRÁVNĚ / CORRECT:
'price' => ['withVat' => '299.00']   // string
'amount' => '10'                      // string
'vatRate' => '21.00'                  // string

// ŠPATNĚ / WRONG:
'price' => ['withVat' => 299.00]     // float — 422 error!
'amount' => 10                        // integer — 422 error!
```

### Kód objednávky není číslo / Order code is not a number
```php
// Kód objednávky je VŽDY string, může obsahovat písmena
// Order code is ALWAYS string, can contain letters
$orderCode = (string) $code;  // VŽDY přetypuj / ALWAYS cast
```

### GUID vs code vs id
- **Produkty** identifikuj přes `guid` (UUID string)
- **Objednávky** identifikuj přes `code` (string, ne číslo!)
- **Zákazníci** identifikuj přes `guid` (UUID string)
- **Ceníky, skupiny zákazníků** identifikuj přes `id` (integer)
- **Výrobci (brands)** identifikuj přes `code` = `indexName` (string)

### ISO kódy zemí jsou 3-znakové / Country codes are 3-character
```php
// SPRÁVNĚ / CORRECT: ISO 3166-1 alpha-3
'countryCode' => 'CZE'   // Česká republika
'countryCode' => 'SVK'   // Slovensko
'countryCode' => 'DEU'   // Německo
'countryCode' => 'AUT'   // Rakousko
'countryCode' => 'POL'   // Polsko

// ŠPATNĚ / WRONG: ISO 3166-1 alpha-2
'countryCode' => 'CZ'    // 422 error!
'countryCode' => 'SK'    // 422 error!
```

### Sklad — absolutní hodnota / Stock — absolute value
```php
// PATCH /api/stocks/{stockId}/movements
// amountChange je ABSOLUTNÍ počet, ne delta!
// amountChange is ABSOLUTE count, not delta!
// Chceš přidat 5 ks ke stávajícím 10 → pošli 15
// Want to add 5 to existing 10 → send 15
$data = [['productCode' => 'SKU001', 'amountChange' => 15]];
```

### externalCode u objednávky je povinný / externalCode in order is required
```php
// POST /api/orders — externalCode je POVINNÝ a musí být UNIKÁTNÍ
// POST /api/orders — externalCode is REQUIRED and must be UNIQUE
$data = ['data' => ['externalCode' => 'EXT-' . uniqid(), ...]];
```

---

## Přehled endpointů / Endpoint Overview

Pro detailní dokumentaci každého endpointu čti příslušný soubor:  
*For detailed documentation of each endpoint, read the relevant file:*

- **[docs/endpoints-orders.md](docs/endpoints-orders.md)**  
  Objednávky, faktury, dobropisy, doklady o platbě, dodací listy, proformy  
  *Orders, invoices, credit notes, proof payments, delivery notes, proformas*

- **[docs/endpoints-products.md](docs/endpoints-products.md)**  
  Produkty, kategorie, sklady, ceníky, parametry (filtrační/variant/příplatkové), obrázky, výrobci  
  *Products, categories, stocks, pricelists, parameters (filtering/variant/surcharge), images, brands*

- **[docs/endpoints-customers.md](docs/endpoints-customers.md)**  
  Zákazníci, skupiny zákazníků, doručovací adresy, přihlašovací účty, poznámky  
  *Customers, customer groups, delivery addresses, login accounts, remarks*

- **[docs/endpoints-marketing.md](docs/endpoints-marketing.md)**  
  Slevové kupony, množstevní slevy, XY slevy, objemové slevy, články, stránky, diskuze  
  *Discount coupons, quantity discounts, XY discounts, volume discounts, articles, pages, discussions*

- **[docs/endpoints-system.md](docs/endpoints-system.md)**  
  Webhooky, async joby, upload souborů, info o eshopu, prodejní kanály, způsoby dopravy/platby  
  *Webhooks, async jobs, file uploads, eshop info, sales channels, shipping/payment methods*

---

## PHP klient / PHP Client

```php
<?php
// CZ: Základní HTTP klient pro Shoptet API (Private token)
// EN: Basic HTTP client for Shoptet API (Private token)

class ShoptetApiClient
{
    private const BASE_URL = 'https://api.myshoptet.com';
    
    public function __construct(
        private string $token,
        private ?\GuzzleHttp\Client $httpClient = null
    ) {
        $this->httpClient ??= new \GuzzleHttp\Client([
            'base_uri' => self::BASE_URL,
            'timeout'  => 30,
            'headers'  => [
                'Shoptet-Private-API-Token' => $this->token,
                'Content-Type'              => 'application/json',
            ],
        ]);
    }

    public function get(string $path, array $query = []): array
    {
        $resp = $this->httpClient->get($path, ['query' => $query]);
        return json_decode((string) $resp->getBody(), true);
    }

    public function post(string $path, array $body, array $query = []): array
    {
        $resp = $this->httpClient->post($path, ['json' => $body, 'query' => $query]);
        return json_decode((string) $resp->getBody(), true);
    }

    public function patch(string $path, array $body, array $query = []): array
    {
        $resp = $this->httpClient->patch($path, ['json' => $body, 'query' => $query]);
        return json_decode((string) $resp->getBody(), true);
    }

    public function put(string $path, array $body): array
    {
        $resp = $this->httpClient->put($path, ['json' => $body]);
        return json_decode((string) $resp->getBody(), true);
    }

    public function delete(string $path, array $body = []): array
    {
        $opts = $body ? ['json' => $body] : [];
        $resp = $this->httpClient->delete($path, $opts);
        return json_decode((string) $resp->getBody(), true);
    }
}
```

---

## Code Lists / Číselníky

### Viditelnost produktu / Product visibility
| Hodnota / Value | Popis CZ | Description EN |
|-----------------|----------|----------------|
| `visible` | Viditelný | Visible |
| `hidden` | Skrytý | Hidden |
| `blocked` | Nelze objednat | Cannot be ordered |
| `show-registered` | Jen přihlášeným | Logged-in only |
| `block-unregistered` | Nezaregistrovaní nemohou objednat | Unregistered cannot order |
| `cash-desk-only` | Jen pokladna | Cash desk only |
| `detail-only` | Mimo navigaci eshopu | Outside shop navigation |

### Typ produktu / Product type
| Hodnota / Value | Popis |
|-----------------|-------|
| `product` | Produkt / Product |
| `bazar` | Bazarové zboží / Second-hand |
| `service` | Služba / Service |
| `product-set` | Sada produktů / Product set (vyžaduje modul / requires module) |

### Typy položek objednávky / Order item types
`product` · `bazar` · `service` · `shipping` · `billing` · `discount-coupon` · `volume-discount` · `gift` · `gift-certificate` · `generic-item` · `product-set` · `product-set-item` · `deposit`

### Řezy obrázků / Image cuts
`orig` (originál) · `big` (~1024×768) · `detail` (~360×270) · `category` (~216×105) · `related` (~100×100)

### Gallery identifikátory / Gallery identifiers
`shop` (normální galerie) · `shop360` (360° fotky)

### Klíčové webhook eventy / Key webhook events
| Event | CZ popis | Identifier |
|-------|----------|------------|
| `order:create` | Nová objednávka | code objednávky |
| `order:update` | Změna objednávky | code |
| `order:paid` | Zaplacení | code |
| `order:cancel` | Zrušení | code |
| `order:massCreate` | Hromadné vytvoření | JSON array of codes |
| `order:massUpdate` | Hromadná změna | JSON array of codes |
| `product:create` | Nový produkt | guid |
| `product:update` | Změna produktu | guid |
| `product:delete` | Smazání produktu | guid |
| `customer:create` | Nový zákazník | guid |
| `customer:update` | Změna zákazníka | guid |
| `customer:disableOrders` | Zákaz objednávek | guid |
| `stock:movement` | Pohyb skladu | stockId |
| `stock:soldOut` | Vyprodáno | product code |
| `stock:inStock` | Naskladněno | product code |
| `stock:minStockSupplyReached` | Min. zásoba dosažena | product code |
| `invoice:create` | Nová faktura | invoice code |
| `job:finished` | Async job dokončen | jobId |
| `availability:create/update/delete` | Dostupnost | ID |
| `brand:create/update/delete` | Výrobce | code |
| `category:create/update/delete` | Kategorie | guid |
| `discountCoupon:create/update/delete` | Slevový kupon | code |
| `webhookEvent:change` | Změna webhooku | — |

---

## Rychlé příklady / Quick Examples

### Změna stavu objednávky / Change order status

```php
// CZ: statusId získáš z GET /api/orders/statuses
// EN: get statusId from GET /api/orders/statuses
$api->patch('/api/orders/2024001234/status', [
    'data' => ['statusId' => 5]
], [
    'suppressEmailSending'       => 'true',
    'suppressDocumentGeneration' => 'true',
]);
```

### Aktualizace skladu / Update stock

```php
// CZ: amountChange = ABSOLUTNÍ hodnota, ne delta!
// EN: amountChange = ABSOLUTE value, not delta!
$api->patch('/api/stocks/1/movements', [
    'data' => [
        ['productCode' => 'SKU001', 'amountChange' => 25],
        ['productCode' => 'SKU002', 'amountChange' => 0],
    ]
]);
```

### Vytvoření produktu / Create product

```php
// CZ: name a defaultCategoryGuid jsou POVINNÉ
// EN: name and defaultCategoryGuid are REQUIRED
$api->post('/api/products', [
    'data' => [
        'name'                => 'Název produktu',
        'defaultCategoryGuid' => 'abc123-...',
        'visibility'          => 'visible',
        'type'                => 'product',
        'variants'            => [
            [
                'code'  => 'SKU001',
                'price' => ['withVat' => '299.00'],   // string!
            ]
        ],
    ]
]);
```

### Ověření webhooku / Verify webhook

```php
// CZ: Ověř podpis příchozího webhooku
// EN: Verify signature of incoming webhook
function verifyShoptetWebhook(string $body, string $signatureHeader, string $secret): bool
{
    $hash = str_replace('sha256=', '', $signatureHeader);
    return hash_equals(hash_hmac('sha256', $body, $secret), $hash);
}

$body = file_get_contents('php://input');
$signature = $_SERVER['HTTP_SHOPTET_WEBHOOK_SIGNATURE'] ?? '';

if (!verifyShoptetWebhook($body, $signature, $config['webhook_secret'])) {
    http_response_code(401);
    exit;
}

$event = json_decode($body, true);
// $event['event']      = 'order:create'
// $event['identifier'] = '2024001234'
// $event['eshopId']    = 12345
```

### Rate limit handling

```php
// CZ: Leaky bucket — sleduj hlavičky X-RateLimit-Bucket-Filling a Retry-After
// EN: Leaky bucket — watch X-RateLimit-Bucket-Filling and Retry-After headers
try {
    $result = $api->get('/api/products');
} catch (\GuzzleHttp\Exception\ClientException $e) {
    if ($e->getResponse()->getStatusCode() === 429) {
        $retryAfter = $e->getResponse()->getHeaderLine('Retry-After');
        sleep(max(1, strtotime($retryAfter) - time()));
        $result = $api->get('/api/products'); // retry
    }
}
```

---

## Deprecated endpointy / Deprecated endpoints

Sleduj response headery:
- `X-Shoptet-Deprecated` — endpoint bude odstraněn
- `Sunset: <datum>` — datum ukončení podpory

Nikdy nepoužívej `itemPriceWithVat` ani `itemPriceWithoutVat` — nahrazeny `unitPriceWithVat` / `unitPriceWithoutVat`.
