# Shoptet API — Zákazníci / Customers

<!-- 
  CZ: Zákazníci, skupiny, účty, doručovací adresy, poznámky.
  EN: Customers, groups, accounts, delivery addresses, remarks.
-->

## POST /api/customers — Vytvoření zákazníka / Create customer

**Query parametry:**

| Parametr | Typ | Popis |
|----------|-----|-------|
| `suppressMandatoryFieldsCheck` | boolean | Vypni kontrolu povinných polí |
| `sendRegistrationEmail` | boolean | Pošli registrační email |
| `language` | string | Jazyk registračního emailu |

**Request body — `data` objekt (všechna pole volitelná):**

| Pole | Typ | Popis / Description |
|------|-----|---------------------|
| `billingAddress` | object | Fakturační adresa (viz níže) |
| `remark` | string\|null | Poznámka k zákazníkovi |
| `priceRatio` | string | Procentuální sleva (**string!**) |
| `birthDate` | string\|null | Datum narození YYYY-MM-DD |
| `disabledOrders` | boolean | Zakázat objednávky |
| `customerGroupCode` | string | Kód skupiny zákazníků (musí existovat) |
| `pricelistId` | integer | ID ceníku |

**billingAddress objekt:**

| Pole | Typ | Popis |
|------|-----|-------|
| `company` | string\|null | Firma |
| `fullName` | string\|null | Celé jméno |
| `street` | string\|null | Ulice |
| `houseNumber` | string\|null | Číslo popisné |
| `city` | string\|null | Město |
| `district` | string\|null | Okres |
| `additional` | string\|null | Doplňkové info |
| `zip` | string\|null | PSČ |
| `countryCode` | string | **3-znakový ISO** (CZE, SVK, DEU, AUT, POL...) |
| `regionName` | string\|null | Kraj |
| `regionShortcut` | string\|null | Zkratka kraje |
| `companyId` | string\|null | IČO |
| `vatId` | string\|null | DIČ |
| `taxId` | string\|null | Daňové ID (= vatId pro CZ) |

---

## GET /api/customers — Seznam zákazníků / List customers

| Parametr | Typ | Popis |
|----------|-----|-------|
| `email` | string | Přesná shoda emailu |
| `phone` | string | Telefon |
| `itemsPerPage` | integer | Default: 20, max: 1000 |

---

## GET /api/customers/{guid} — Detail zákazníka / Customer detail

**Path:** `guid` = UUID zákazníka

**Klíčová pole response:**

| Pole | Typ | Popis |
|------|-----|-------|
| `guid` | string | UUID zákazníka |
| `billingAddress` | object | Fakturační adresa |
| `deliveryAddress[]` | array | Doručovací adresy |
| `customerGroup.id` | integer | ID skupiny zákazníků |
| `customerGroup.name` | string | Název skupiny |
| `priceList` | object | Přiřazený ceník |
| `priceRatio` | string | Procentuální sleva (string!) |
| `disabledOrders` | boolean | Zakázané objednávky |
| `accounts[]` | array | Přihlašovací účty |
| `remarks[]` | array | Hodnocení a poznámky |
| `adminUrl` | string | Odkaz do administrace |

---

## PATCH /api/customers/{guid} — Aktualizace zákazníka / Update customer

Stejná pole jako POST — všechna volitelná.

---

## DELETE /api/customers/{guid}

---

## GET /api/customers/changes — Změny zákazníků / Customer changes

| Parametr | Typ | Povinné | Popis |
|----------|-----|---------|-------|
| `from` | string | **ANO** | ISO 8601 datetime (garantováno 30 dní) |
| `changeType` | string | ne | `edit` \| `delete` |

---

## ZÁKAZNICKÉ SKUPINY / CUSTOMER GROUPS

### GET /api/customers/groups — Seznam skupin

Vrátí všechny skupiny najednou (bez paginace), seřazené podle priority.

### POST /api/customers/groups — Vytvoření skupiny

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Unikátní název skupiny |
| `description` | string\|null | ne | Popis skupiny |
| `defaultPricelistId` | integer\|null | ne | Výchozí ceník pro skupinu |
| `emailNotification` | boolean | ne | Email při registraci (vyžaduje Wholesale modul) |
| `authRequired` | boolean | ne | Vyžaduje schválení adminem (Wholesale) |
| `maxDiscount` | string\|null | ne | Max sleva jako ratio (`0.5500` = 55%, **string!**) |
| `defaultDueDays` | integer\|null | ne | Výchozí splatnost v dnech (0-365) |
| `registrationAllowed` | boolean | ne | Lze se registrovat do skupiny (Wholesale) |
| `wholesale` | boolean | ne | Velkoobchodní skupina (Wholesale) |
| `tableLayout` | boolean | ne | Tabulkový layout (Wholesale) |
| `fullProfileRequired` | boolean | ne | Vyžaduje plný profil (Wholesale) |
| `defaultOrderStatusId` | integer\|null | ne | Výchozí stav objednávky pro skupinu |

### PATCH /api/customers/groups/{id}

**Path:** `id` = integer (ID skupiny)
**Query:** `language` (string) — jazyk aktualizace

---

## PŘIHLAŠOVACÍ ÚČTY / CUSTOMER ACCOUNTS

### POST /api/customers/{guid}/accounts — Vytvoření účtu

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `email` | string | **ANO** | Email (login) |
| `fullName` | string\|null | ne | Celé jméno |
| `phone` | string\|null | ne | Telefon |
| `mainAccount` | boolean | ne | Hlavní účet? |
| `authorized` | boolean | ne | Autorizovaný?, default true |
| `emailVerified` | boolean | ne | Email ověřen adminem?, default false |

---

## DORUČOVACÍ ADRESY / DELIVERY ADDRESSES

### POST /api/customers/{guid}/delivery-addresses — Přidání adresy

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `countryCode` | string | **ANO** | **3-znakový ISO!** (CZE, SVK, ...) |
| `fullName` | string\|null | ne | Celé jméno |
| `company` | string\|null | ne | Firma |
| `street` | string\|null | ne | Ulice |
| `houseNumber` | string\|null | ne | Číslo popisné |
| `city` | string\|null | ne | Město |
| `district` | string\|null | ne | Okres |
| `additional` | string\|null | ne | Doplňkové info |
| `zip` | string\|null | ne | PSČ |
| `regionName` | string\|null | ne | Kraj |
| `isDefault` | boolean | ne | Výchozí adresa? |

---

## ZÁKAZNICKÉ POZNÁMKY / CUSTOMER REMARKS

### POST /api/customers/{guid}/remarks — Přidání poznámky

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `rating` | string | **ANO** | Typ hodnocení |
| `remark` | string | **ANO** | Text poznámky |

---

## PHP vzory / PHP Patterns

### Vyhledání zákazníka podle emailu / Find customer by email

```php
$resp = $api->get('/api/customers', ['email' => 'jan@example.com', 'itemsPerPage' => 1]);
$customer = $resp['data']['customers'][0] ?? null;
```

### Vytvoření nebo nalezení zákazníka / Find or create customer

```php
function findOrCreateCustomer(ShoptetApiClient $api, string $email, array $data): string
{
    $existing = $api->get('/api/customers', ['email' => $email, 'itemsPerPage' => 1]);
    if (!empty($existing['data']['customers'])) {
        return $existing['data']['customers'][0]['guid'];
    }
    $created = $api->post('/api/customers', ['data' => $data], [
        'suppressMandatoryFieldsCheck' => 'true',
        'sendRegistrationEmail'         => 'false',
    ]);
    return $created['data']['customer']['guid'];
}
```

### ISO kódy zemí / Country codes (3-char ISO 3166-1 alpha-3)

| Zkratka / Code | Země / Country |
|----------------|----------------|
| `CZE` | Česká republika |
| `SVK` | Slovensko |
| `DEU` | Německo |
| `AUT` | Rakousko |
| `POL` | Polsko |
| `HUN` | Maďarsko |
| `GBR` | Velká Británie |
| `USA` | USA |
| `FRA` | Francie |
| `ITA` | Itálie |
