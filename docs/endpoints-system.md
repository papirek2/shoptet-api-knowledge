# Shoptet API — Systém / System (Webhooky, Joby, Soubory, Eshop)

## WEBHOOKY / WEBHOOKS

### POST /api/webhooks — Registrace webhooků / Register webhooks

Pro jeden event (`event`) lze zaregistrovat **jen jednu URL**. Pokud existuje, dostaneš chybu.

**Request body — `data` array:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `event` | string | **ANO** | Kód eventu (viz code list) |
| `url` | string | **ANO** | URL endpointu (max 2000 znaků) |

```json
{
    "data": [
        {"event": "order:create", "url": "https://muj-server.cz/webhook/order-create"},
        {"event": "job:finished", "url": "https://muj-server.cz/webhook/job-finished"}
    ]
}
```

### PATCH /api/webhooks/{id} — Aktualizace URL

**Path:** `id` = integer (ID webhooku)

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `url` | string | **ANO** | Nová URL (max 2000 znaků) |

### GET /api/webhooks — Seznam webhooků

**Query:** `itemsPerPage` (default: 20, max: 500)

### GET /api/webhooks/notifications — Log notifikací

| Parametr | Typ | Popis |
|----------|-----|-------|
| `status` | string | `new` \| `failed` \| `success` |
| `event` | string | Kód eventu |
| `active` | boolean | Nedoručené notifikace |
| `from` | string | ISO 8601 datetime |
| `itemsPerPage` | integer | Default: 20, max: 500 |

### POST /api/webhooks/renew-signature-key — Obnova podpisového klíče

Bez body. Response: `{"data": {"signatureKey": "..."}}`

---

## Webhook payload a ověření / Webhook payload and verification

### Příchozí payload struktura / Incoming payload structure

```json
{
    "eshopId": 12345,
    "event":   "order:create",
    "identifier": "2024001234",
    "timestamp": "2024-01-15T10:30:00+01:00"
}
```

Pro hromadné eventy (`order:massCreate`, `order:massUpdate`...) je `identifier` JSON string pole:
```json
"identifier": "[\"2024001234\",\"2024001235\"]"
```

### Ověření podpisu / Signature verification

```php
// Header: Shoptet-Webhook-Signature: sha256=<hash>
function verifyShoptetWebhook(string $body, string $signatureHeader, string $signatureKey): bool
{
    $hash = str_replace('sha256=', '', $signatureHeader);
    return hash_equals(hash_hmac('sha256', $body, $signatureKey), $hash);
}

$body      = file_get_contents('php://input');
$signature = $_SERVER['HTTP_SHOPTET_WEBHOOK_SIGNATURE'] ?? '';
$key       = $config['shoptet_webhook_signature_key']; // z POST /api/webhooks/renew-signature-key

if (!verifyShoptetWebhook($body, $signature, $key)) {
    http_response_code(401);
    exit('Invalid signature');
}

$event = json_decode($body, true);
```

---

## ASYNC JOBY / ASYNC JOBS

### GET /api/system/jobs/{jobId} — Detail jobu

**Path:** `jobId` = string (UUID jobu)

**Response `data.job` klíčová pole:**

| Pole | Typ | Popis |
|------|-----|-------|
| `id` | string | UUID jobu |
| `status` | string | `completed` \| `pending` \| `running` \| `failed` \| `expired` \| `killed` |
| `downloadUrl` | string\|null | URL ke stažení JSONL výsledku (jen u `completed`) |
| `createdAt` | string | ISO 8601 |
| `completedAt` | string\|null | ISO 8601 |

### GET /api/system/jobs — Seznam jobů

| Parametr | Typ | Popis |
|----------|-----|-------|
| `status` | string | `completed`\|`pending`\|`running`\|`failed`\|`expired`\|`killed` |
| `creationTimeFrom/To` | string | ISO 8601 |
| `completionTimeFrom/To` | string | ISO 8601 |
| `itemsPerPage` | integer | Default: 100, max: 500 |

### PHP — Čekání na dokončení jobu / Waiting for job completion

```php
// CZ: Doporučeno: použít webhook job:finished místo pollingu
// EN: Recommended: use webhook job:finished instead of polling

function waitForJob(ShoptetApiClient $api, string $jobId, int $timeoutSec = 120): array
{
    $start = time();
    do {
        sleep(3);
        $resp   = $api->get("/api/system/jobs/{$jobId}");
        $job    = $resp['data']['job'];
        $status = $job['status'];
    } while (in_array($status, ['pending', 'running']) && (time() - $start) < $timeoutSec);
    
    if ($status !== 'completed') {
        throw new \RuntimeException("Job {$jobId} ended with status: {$status}");
    }
    return $job;
}

// Stažení a zpracování JSONL / Download and process JSONL
function processJobResult(string $downloadUrl, callable $callback): void
{
    $handle = fopen($downloadUrl, 'r');
    while (($line = fgets($handle)) !== false) {
        $line = trim($line);
        if ($line === '') continue;
        $record = json_decode($line, true);
        $callback($record);
    }
    fclose($handle);
}

// Použití / Usage:
$resp  = $api->get('/api/products/snapshot', ['include' => 'variants']);
$jobId = $resp['data']['jobId'];
$job   = waitForJob($api, $jobId);
processJobResult($job['downloadUrl'], function (array $product) {
    // zpracuj produkt / process product
});
```

---

## ESHOP INFO

### GET /api/eshop — Informace o eshopu / Eshop info

**Query:** `include` (comma-separated):

| Hodnota | Co vrátí |
|---------|----------|
| `paymentMethods` | Platební metody |
| `shippingMethods` | Způsoby dopravy |
| `imageCuts` | Řezy obrázků (URL pro sestavení URL obrázků) |
| `currencies` | Dostupné měny |
| `languages` | Dostupné jazyky |

**Klíčová pole response:**

| Pole | Popis |
|------|-------|
| `contactInformation.eshopName` | Název eshopu |
| `contactInformation.url` | URL eshopu |
| `contactInformation.companyId` | IČO |
| `settings.*` | Různá nastavení eshopu |
| `imageCuts.{cut}.urlPath` | Základ URL pro obrázky (uncached) |
| `imageCuts.{cut}.cdnPath` | Základ CDN URL (cached, pro frontend) |

---

## ZPŮSOBY DOPRAVY / SHIPPING METHODS

### GET /api/shipping-methods — Seznam dopravců

**Query:** `salesChannelGuid` (optional) — filtr podle prodejního kanálu

### POST /api/shipping-methods — Přidání dopravce

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název způsobu dopravy |
| `shippingMethodCode` | string | **ANO** | Kód přepravce (přiděluje Shoptet) |
| `visibility` | boolean | ne | Viditelný? |
| `wholesale` | boolean | ne | Pro velkoobchod (false = retail) |
| `logo.filename` | string | ne* | Název souboru loga |
| `logo.content` | string | ne* | Base64 obsah obrázku |
| `description` | string\|null | ne | Popis |
| `minimalShippingPrice` | string\|null | ne | Minimální cena dopravy (string!) |

---

## PLATEBNÍ METODY / PAYMENT METHODS

### POST /api/payment-methods — Přidání platební metody

**Pouze pro addon, ne pro Private API.**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název platební metody |
| `paymentType` | string | **ANO** | Typ platby (přiděluje Shoptet) |
| `logo.filename` | string | **ANO** | Název souboru loga |
| `logo.content` | string | **ANO** | Base64 obsah obrázku |
| `description` | string\|null | ne | Popis |
| `submethod` | string\|null | ne | Doplňková identifikace |
| `visibility` | boolean | ne | Viditelný? |
| `wholesale` | boolean | ne | Pro velkoobchod |

---

## SHIPPING REQUESTS — Vlastní dopravci / Custom shipping

### PUT /api/shipping-request/{shippingRequestCode}/{shippingGuid} — Nastavení ceny dopravy

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `expires` | string\|null | **ANO** | ISO 8601 — do kdy je cena platná |
| `description` | string | ne | Popis zásilky |
| `additionalText` | string\|null | ne | Doplňkové info |
| `price` | object | ne | Cena dopravy |
| `currency` | string\|null | ne | Kód měny |
| `deliveryAddress` | object | ne | Doručovací adresa |

---

## EXPORTY / EXPORTS

### GET /api/export/{type}/{format} — Obecný export (async)

**Path:**
- `type` = `orders` \| `invoices` \| `proformaInvoices` \| `creditNotes` \| `deliveryNotes` \| `proofPayments`
- `format` = `csv` \| `xml` \| `xls`

| Parametr | Typ | Popis |
|----------|-----|-------|
| `currency` | string | **Povinné** pro vše kromě dodacích listů |
| `codeFrom/codeTo` | string | Rozsah kódů |
| `dateFrom/dateTo` | string | Rozsah dat |
| `include` | string | Volitelné sekce |

---

## DOSTUPNÉ ENDPOINTY / AVAILABLE ENDPOINTS

### GET /api/system/endpoints — Co je dostupné pro token

**Query:** `status` = `approved` \| `pending`

Vrátí seznam endpointů, ke kterým má daný token přístup. Užitečné pro debugging 403 chyb.

---

## Rate Limiting — detaily

```
Limity spojení:
- Max 50 aktivních spojení z jedné IP
- Max 3 aktivní spojení na jeden token

Leaky bucket headers (každý response):
X-RateLimit-Bucket-Filling: 200/200
Retry-After: Mon, 01 Jul 2024 12:01:11 GMT  (jen pokud bucket full)
```

```php
// PHP — kompletní retry logika s rate limitem
function apiRequestWithRetry(callable $request, int $maxRetries = 3): array
{
    for ($attempt = 0; $attempt < $maxRetries; $attempt++) {
        try {
            return $request();
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            $status = $e->getResponse()->getStatusCode();
            
            if ($status === 429) {
                // Rate limit — počkej dle Retry-After
                $retryAfter = $e->getResponse()->getHeaderLine('Retry-After');
                $wait = $retryAfter ? max(1, strtotime($retryAfter) - time()) : (2 ** $attempt);
                sleep($wait);
                continue;
            }
            
            if ($status === 423) {
                // Locked — krátký retry
                sleep(2);
                continue;
            }
            
            throw $e; // jiné chyby neopakuj
        }
    }
    throw new \RuntimeException('Max retries exceeded');
}
```
