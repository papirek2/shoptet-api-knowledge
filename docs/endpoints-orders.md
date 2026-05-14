# Shoptet API — Objednávky / Orders

<!-- 
  CZ: Detailní reference endpointů pro objednávky a s nimi spojené dokumenty.
      Povinná pole označena *. Datové typy přesně dle OpenAPI spec.
  EN: Detailed endpoint reference for orders and related documents.
      Required fields marked with *. Data types exactly per OpenAPI spec.
-->

## GET /api/orders — Seznam objednávek / List of orders

**Query parametry / Query parameters** (všechny volitelné / all optional):

| Parametr | Typ | Popis CZ | Description EN |
|----------|-----|----------|----------------|
| `statusId` | integer | Filtr podle stavu | Filter by status ID |
| `shippingGuid` | string | Filtr podle dopravce | Filter by shipping GUID |
| `shippingCompanyCode` | string | Kód dopravní společnosti | Shipping company code |
| `paymentMethodGuid` | string | Filtr podle platby | Filter by payment method |
| `creationTimeFrom` | string | ISO 8601, dolní mez vytvoření | ISO 8601, creation lower bound |
| `creationTimeTo` | string | ISO 8601, horní mez vytvoření | ISO 8601, creation upper bound |
| `changeTimeFrom` | string | ISO 8601, dolní mez změny | ISO 8601, change lower bound |
| `changeTimeTo` | string | ISO 8601, horní mez změny | ISO 8601, change upper bound |
| `codeFrom` | string | Filtr od kódu objednávky | Filter from order code |
| `codeTo` | string | Filtr do kódu objednávky | Filter to order code |
| `customerGuid` | string | Filtr zákazníka | Filter by customer GUID |
| `email` | string | Přesná shoda emailu | Exact email match |
| `phone` | string | Mezinárodní formát telefonu | International phone format only |
| `productCode` | string | Objednávka obsahuje tento produkt | Order contains this product code |
| `sourceId` | integer | Zdroj objednávky | Order source ID |
| `orderCodes` | string | Max 50 kódů oddělených čárkou | Max 50 codes comma-separated |
| `itemsPerPage` | integer | Default: 50, max: 50 | Default: 50, max: 50 |

**Response data klíče / keys:** `orders[]`, `paginator`

---

## POST /api/orders — Vytvoření objednávky / Create order

**Query parametry / Query parameters** (všechny boolean / all boolean):

| Parametr | Popis CZ | Description EN |
|----------|----------|----------------|
| `suppressDocumentGeneration` | Nepotřebuj generovat doklady | Suppress linked document generation |
| `suppressEmailSending` | Nepošli email zákazníkovi | Suppress notification emails |
| `suppressProductChecking` | Neověřuj existenci produktů | Skip product existence check |
| `suppressStockMovements` | Neodepisuj ze skladu | Skip stock deduction |
| `suppressHistoricalMandatoryFields` | Vypni kontrolu povinných polí | Disable mandatory fields check |
| `suppressHistoricalPaymentChecking` | `paymentMethodGuid` může být null | Allow null paymentMethodGuid |
| `suppressHistoricalShippingChecking` | `shippingGuid` může být null | Allow null shippingGuid |

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis CZ | Description EN |
|------|-----|---------|----------|----------------|
| `externalCode` | string | **ANO / YES** | Unikátní ID v externím systému | Unique ID in external system |
| `currency.code` | string | **ANO / YES** | Kód měny (CZK, EUR, ...) | Currency code |
| `currency.exchangeRate` | string\|null | ne | Kurz vůči hlavní měně | Exchange rate to main currency |
| `email` | string | ne* | Email zákazníka (* povinný mimo pokladnu) | Customer email (* required outside cash desk) |
| `phone` | string\|null | ne | Telefon zákazníka | Customer phone |
| `birthDate` | string\|null | ne | Datum narození YYYY-MM-DD | Birth date YYYY-MM-DD |
| `code` | string | ne | Kód objednávky (generuje se pokud chybí) | Order code (generated if missing) |
| `creationTime` | string | ne | ISO 8601, výchozí = nyní | ISO 8601, default = now |
| `language` | string | ne | Jazyk objednávky (modul cizí jazyky) | Order language (foreign languages module) |
| `cashDeskOrder` | boolean | ne | Objednávka z pokladny, výchozí false | Cash desk order, default false |
| `statusId` | integer | ne | ID stavu (výchozí = výchozí stav eshopu) | Status ID (default = eshop default status) |
| `sourceId` | integer\|null | ne | ID zdroje objednávky | Order source ID |
| `salesChannelGuid` | string\|null | ne | GUID prodejního kanálu | Sales channel GUID |
| `vatPayer` | boolean | ne | Režim DPH plátce/neplátce | VAT payer mode |
| `vatMode` | string | ne | `Normal` \| `One Stop Shop` \| ... | VAT mode |
| `paymentMethodGuid` | string\|null | ne | GUID platební metody | Payment method GUID |
| `shippingGuid` | string\|null | ne | GUID způsobu dopravy | Shipping method GUID |
| `paid` | boolean\|null | ne | Příznak zaplacení | Paid flag |
| `stockId` | integer | ne | ID skladu, výchozí = default sklad | Stock ID, default = default stock |
| `customerGuid` | string\|null | ne | GUID zákazníka | Customer GUID |
| `addressesEqual` | boolean\|null | ne | Fakturační = doručovací adresa | Billing = delivery address |
| `billingAddress` | object | ne | Fakturační adresa | Billing address |
| `deliveryAddress` | object | ne | Doručovací adresa | Delivery address |
| `notes.customerRemark` | string\|null | ne | Poznámka zákazníka | Customer remark |
| `notes.eshopRemark` | string\|null | ne | Interní poznámka | Internal remark |
| `notes.trackingNumber` | string\|null | ne | Číslo zásilky | Tracking number |
| `items` | array | ne* | Položky (* alespoň 1 produktová) | Items (* at least 1 product item) |

**Adresní objekt (billingAddress / deliveryAddress):**

| Pole | Typ | Popis |
|------|-----|-------|
| `company` | string\|null | Firma / Company |
| `fullName` | string\|null | Celé jméno / Full name |
| `street` | string\|null | Ulice / Street |
| `streetWithNr` | string\|null | Ulice + č.p. (alternativa k street+houseNumber) |
| `houseNumber` | string\|null | Číslo popisné / House number |
| `city` | string\|null | Město / City |
| `district` | string\|null | Okres / District |
| `additional` | string\|null | Doplňkové info / Additional info |
| `zip` | string\|null | PSČ / ZIP code |
| `countryCode` | string | **3-znakový ISO** (CZE, SVK...) / **3-char ISO** |
| `regionName` | string\|null | Kraj / Region |
| `companyId` | string\|null | IČO / Company registration number |
| `vatId` | string\|null | DIČ / VAT ID |
| `taxId` | string\|null | Daňové ID (= vatId pro CZ) |

**Položka objednávky (items[]):**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `itemType` | string | **ANO** | Viz typy položek / See item types |
| `code` | string | ne | Kód produktu (null pro dopravu/platbu) |
| `vatRate` | string | **ANO** | Sazba DPH jako string: `"21.00"` |
| `unitPriceWithVat` | string | ne* | Jednotková cena s DPH (string!) |
| `unitPriceWithoutVat` | string | ne* | Jednotková cena bez DPH (string!) |
| `name` | string | ne* | Název (* povinný pro dopravu, platbu, kupony) |
| `productGuid` | string\|null | ne | GUID produktu |

\* Musí být zadána buď `unitPriceWithVat` nebo `unitPriceWithoutVat`, ne obě.  
\* Either `unitPriceWithVat` or `unitPriceWithoutVat` must be provided, not both.

---

## GET /api/orders/{code} — Detail objednávky / Order detail

**Path:** `code` = string (kód objednávky, NENÍ číslo / NOT a number)

**Query:** `include` = `notes` | `items` | `paymentMethods` | `shippings` | `completion` | `paymentTransactions`

**Klíčová pole response / Key response fields:**

| Pole | Typ | Popis |
|------|-----|-------|
| `code` | string | Kód objednávky (string!) |
| `guid` | string\|null | UUID (null pro staré obj.) |
| `externalCode` | string\|null | ID v externím systému |
| `creationTime` | string\|null | ISO 8601 |
| `changeTime` | string\|null | ISO 8601 |
| `email` | string\|null | Email zákazníka |
| `phone` | string\|null | Telefon |
| `status.id` | integer | ID stavu |
| `status.name` | string\|null | Název stavu |
| `paid` | boolean\|null | Zaplacena? |
| `price.withVat` | string\|null | Celkem s DPH (string!) |
| `price.withoutVat` | string\|null | Celkem bez DPH |
| `price.toPay` | string\|null | K úhradě |
| `price.currencyCode` | string | Kód měny |
| `adminUrl` | string | Odkaz do administrace |
| `items[]` | array | Položky (jen s `?include=items`) |

---

## DELETE /api/orders/{code}

**Path:** `code` = string

---

## PATCH /api/orders/{code}/status — Změna stavu / Change status

**Query:** `suppressDocumentGeneration`, `suppressEmailSending`, `suppressSmsSending` (boolean)

**Request body — `data` objekt (alespoň jedno pole / at least one field):**

| Pole | Typ | Popis |
|------|-----|-------|
| `statusId` | integer | Nový stav objednávky |
| `paid` | boolean\|null | Příznak zaplacení |
| `billingMethodId` | integer | ID způsobu fakturace |

---

## PATCH /api/orders/{code}/head — Změna hlavičky / Change head

**Request body — `data` objekt (všechna pole volitelná / all fields optional):**

| Pole | Typ | Omezení / Constraints |
|------|-----|----------------------|
| `email` | string\|null | max 100 znaků |
| `phone` | string\|null | max 32 znaků |
| `birthDate` | string\|null | YYYY-MM-DD |
| `customerGuid` | string | UUID |
| `addressesEqual` | boolean\|null | |
| `billingAddress` | object | viz adresní objekt výše |
| `deliveryAddress` | object | viz adresní objekt výše |
| `creationTime` | string | ISO 8601 |

**Omezení adresních polí / Address field constraints:**
- `billingAddress.company` — max 100 znaků
- `billingAddress.fullName` — max 100 znaků
- `billingAddress.street` — max 100 znaků
- `billingAddress.city` — max 100 znaků
- `billingAddress.zip` — max 20 znaků

---

## PATCH /api/orders/{code}/notes — Aktualizace poznámek / Update notes

**Request body — `data` objekt:**

| Pole | Typ | Popis |
|------|-----|-------|
| `customerRemark` | string\|null | Poznámka zákazníka |
| `eshopRemark` | string\|null | Interní poznámka eshopu |
| `trackingNumber` | string\|null | Číslo zásilky |
| `trackingUrl` | string\|null | URL sledování zásilky |
| `additionalFields` | array | Pole [{index: 1-6, text: string\|null}] |

---

## PATCH /api/orders/status-change — Hromadná změna stavu / Bulk status change

**Query:** `suppressDocumentGeneration`, `suppressEmailSending`, `suppressSmsSending` (boolean)

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `orderCodes` | array\<string\> | **ANO** | Kódy objednávek |
| `statusId` | number | **ANO** | ID nového stavu |

---

## POST /api/orders/{code}/item — Přidání položky / Add order item

**Query:** `suppressProductChecking`, `suppressStockMovements` (boolean)

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `itemType` | string | **ANO** | Typ položky (product, service, shipping, billing, ...) |
| `vatRate` | string | **ANO** | DPH jako string `"21.00"` |
| `code` | string | ne | Kód produktu (null pro dopravu/platbu/slevy) |
| `unitPriceWithVat` | string | ne* | Jednotková cena s DPH (string!) |
| `unitPriceWithoutVat` | string | ne* | Jednotková cena bez DPH (string!) |
| `name` | string | ne** | Název (* povinný pro dopravu, platbu, kupony) |
| `productGuid` | string\|null | ne | GUID produktu |
| `variantName` | string\|null | ne | Název varianty |
| `brand` | string\|null | ne | Výrobce |
| `supplierName` | string\|null | ne | Dodavatel |

\* Zadej buď `unitPriceWithVat` nebo `unitPriceWithoutVat`.  
DEPRECATED: `itemPriceWithVat`, `itemPriceWithoutVat` — nepoužívej.

---

## PATCH /api/orders/{code}/item/{id} — Změna položky / Change item

**Path:** `id` = string (ID položky z `data.order.items.itemId`)

Stejná pole jako POST (itemType a vatRate jsou povinné i zde).

---

## POST /api/orders/{code}/payment — Přidání platby / Add payment

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `guid` | string | **ANO** | GUID platební metody |
| `vatRate` | string | **ANO** | DPH jako string `"21.00"` |
| `unitPriceWithVat` | string | ne* | Cena s DPH |
| `unitPriceWithoutVat` | string | ne* | Cena bez DPH |
| `statusId` | integer | ne | ID stavu položky |

---

## POST /api/orders/{code}/shipping — Přidání dopravy / Add shipping

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `guid` | string | **ANO** | GUID způsobu dopravy |
| `vatRate` | string | **ANO** | DPH jako string `"21.00"` |
| `unitPriceWithVat` | string | ne* | Cena s DPH |
| `unitPriceWithoutVat` | string | ne* | Cena bez DPH |
| `additionalField` | string\|null | ne | Pro výdejní místa: unikátní ID pobočky |
| `statusId` | integer | ne | ID stavu položky |

---

## POST /api/orders/{code}/history — Přidání záznamu do historie

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `text` | string | **ANO** | Text záznamu |
| `type` | enum | ne | `comment` \| `system` |

---

## GET /api/orders/changes — Změny od data / Changes since date

| Parametr | Typ | Povinné | Popis |
|----------|-----|---------|-------|
| `from` | string | **ANO** | ISO 8601 datetime (garantováno 30 dní) |
| `changeType` | string | ne | `edit` \| `delete` |
| `itemsPerPage` | integer | ne | Default: 20, max: 1000 |

---

## GET /api/orders/snapshot — Kompletní snapshot (async)

| Parametr | Typ | Popis |
|----------|-----|-------|
| `include` | string | `notes,images,shippingDetails,salesChannels,...` |
| `statusId` | integer | Filtr stavu |
| `creationTimeFrom/To` | string | ISO 8601 |
| `changeTimeFrom/To` | string | ISO 8601 |

---

## POST /api/orders/{code}/copy — Kopie objednávky / Copy order

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `scope` | enum | **ANO** | `all` \| `no-billing-shipping` \| `contact-only` |

---

## FAKTURY / INVOICES

### GET /api/invoices — Seznam faktur

| Parametr | Typ | Popis |
|----------|-----|-------|
| `isValid` | boolean | Filtr platnosti |
| `creationTimeFrom` | string | ISO 8601 |
| `creationTimeTo` | string | ISO 8601 |
| `orderCode` | string | Filtr podle objednávky |
| `codeFrom/codeTo` | string | Rozsah kódů faktur |
| `varSymbol` | string | Variabilní symbol |
| `proformaInvoiceCode` | string | Filtr podle proformy |
| `itemsPerPage` | integer | Default: 20, max: 1000 |

### POST /api/orders/{code}/invoice — Faktura z objednávky

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `invoiceCode` | string | ne | Kód faktury (generuje se pokud chybí) |
| `varSymbol` | integer | ne | Variabilní symbol |
| `dueDate` | string\|null | ne | Datum splatnosti |
| `taxDate` | string\|null | ne | Datum zdanitelného plnění |
| `constSymbol` | string | ne | Max 4 číslice |
| `billingMethodId` | integer\|null | ne | ID způsobu fakturace |
| `proofPaymentCodes` | array\<string\> | ne | Propojené doklady o platbě |

**Query:** `suppressExistenceCheck` — povolí více faktur na objednávku

### PATCH /api/invoices/{code}/link-proforma-invoice

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `proformaInvoiceCodes` | array\<string\> | **ANO** | Kódy proforma faktur |

### PATCH /api/invoices/{code}/link-proof-payment

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `proofPaymentCodes` | array\<string\> | **ANO** | Kódy dokladů o platbě |

---

## DOBROPISY / CREDIT NOTES

### POST /api/invoices/{code}/credit-note — Dobropis z faktury

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `creditNoteCode` | string | ne | Kód dobropisu |
| `useItemIds` | array\<integer\> | ne | ID položek faktury (z `items.itemId`) |
| `items` | array | ne | [{invoiceItemId: int (required), amount: string\|null}] |
| `reasonRemark` | string\|null | ne | Důvod dobropisu |

### POST /api/credit-notes/{code}/item — Položka dobropisu

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `itemType` | string | **ANO** | `product` nebo `product-set` |
| `name` | string\|null | **ANO** | Název položky |
| `amount` | string\|null | **ANO** | Množství (string!) |
| `code` | string | ne | Kód produktu |
| `price` | string | ne | Cena (2 desetinná místa), default `"0.00"` |
| `includingVat` | boolean | ne | Cena zahrnuje DPH, default false |
| `vatRate` | string | ne | Sazba DPH |

---

## DOKLADY O PLATBĚ / PROOF PAYMENTS

### POST /api/proof-payments — Vytvoření dokladu

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `payment` | string\|null | **ANO** | Platba |
| `currencyCode` | string | **ANO** | Kód měny |
| `varSymbol` | integer | **ANO** | Variabilní symbol |
| `orderCode` | string | ne* | Kód objednávky |
| `proformaInvoiceCode` | string | ne* | Kód proformy |
| `issueDate` | string\|null | ne | Datum vystavení |
| `taxDate` | string\|null | ne | Datum zdanitelného plnění |

\* Musí být zadáno `orderCode` nebo `proformaInvoiceCode` (ne obě / not both).

---

## DODACÍ LISTY / DELIVERY NOTES

### POST /api/orders/{code}/delivery-notes — Dodací list z objednávky

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `code` | string | **ANO** | Kód dodacího listu |
| `date` | string | ne | Datum (ISO 8601) |

---

## PLATEBNÍ GATEWAY / PAYMENT GATEWAY

### PATCH /api/payment-status/{paymentCode} — Aktualizace stavu platby

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `status` | enum | **ANO** | `FAILED` \| `OK` \| `PENDING` |
| `message` | string\|null | ne | Popis (max délka platí, NEPŘEPISUJ SQL chars) |

---

## DÁRKY K OBJEDNÁVKÁM / ORDER GIFTS

### POST /api/orders/gifts — Přidání dárku

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `code` | string | **ANO** | Kód varianty produktu |
| `currencyCode` | string | **ANO** | Kód měny |
| `orderPrice` | string\|null | **ANO** | Cena (string!) |
| `includingVat` | boolean | ne | Cena zahrnuje DPH |
