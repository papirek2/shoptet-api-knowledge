# Shoptet API — Marketing, Slevové kupony / Discount Coupons & Marketing

## SLEVOVÉ KUPONY / DISCOUNT COUPONS

### POST /api/discount-coupons — Vytvoření kuponů / Create coupons

Max 999 kuponů na jedno volání.

**Request body — `data` objekt:**

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `coupons` | array | **ANO** | Pole kuponů, 1-999 položek |
| `coupons[].discountType` | enum | **ANO** | `percentual` \| `fixed` |
| `coupons[].template` | string | **ANO** | GUID šablony kuponu |
| `coupons[].shippingPrice` | enum | **ANO** | `cart` \| `free` \| `beforeDiscount` |
| `coupons[].code` | string\|null | ne | Kód kuponu (generuje se pokud chybí) |
| `coupons[].amount` | string\|null | ne | Výše fixní slevy (**string!**) |
| `coupons[].ratio` | string\|null | ne | Výše procentuální slevy (4 des. místa, **string!**) — jen pro `percentual` |
| `coupons[].minPrice` | string\|null | ne | Minimální cena objednávky (**string!**) |
| `coupons[].currency` | string\|null | ne | Kód měny (pro fixní slevu) |
| `coupons[].validFrom` | string\|null | ne | Platnost od (ISO 8601) |
| `coupons[].validTo` | string\|null | ne | Platnost do (ISO 8601) |

**⚠️ POZOR:** `ratio` musí být vynecháno (ne null) pokud `discountType` = `fixed`.

### POST /api/discount-coupons/set — Vytvoření sady kuponů / Create coupon set

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `count` | integer | **ANO** | Počet kuponů k vygenerování |
| `discountType` | enum | **ANO** | `percentual` \| `fixed` |
| `template` | string | **ANO** | GUID šablony kuponu |
| `shippingPrice` | enum | **ANO** | `cart` \| `free` \| `beforeDiscount` |
| `reusable` | boolean | **ANO** | Opakovaně použitelný? |
| `amount` | string\|null | ne | Výše fixní slevy (**string!**) |
| `ratio` | string\|null | ne | Výše procentuální slevy (4 des. místa) — jen pro `percentual` |
| `minPrice` | string\|null | ne | Min. cena objednávky |
| `currency` | string\|null | ne | Kód měny |
| `validFrom` | string\|null | ne | Platnost od |
| `validTo` | string\|null | ne | Platnost do |
| `remark` | string\|null | ne | Poznámka ke kuponu |

### DELETE /api/discount-coupons — Hromadné smazání / Bulk delete

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `couponCodes` | array\<string\> | **ANO** | Kódy kuponů, 1-200 položek |

### PATCH /api/discount-coupons/use/{code} — Označení jako použitý

**Path:** `code` = kód kuponu (string)

**Query:** `suppressOrderChecking` (boolean) — nevyžaduj existenci objednávky

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `orderCode` | string | **ANO** | Kód objednávky |

### GET /api/discount-coupons/snapshot — Snapshot (async, povinné params!)

| Parametr | Typ | Povinné | Popis |
|----------|-----|---------|-------|
| `template` | string | **ANO** | GUID šablony kuponu |
| `shippingPrice` | string | **ANO** | `cart` \| `free` \| `beforeDiscount` |

### POST /api/discount-coupons/templates — Vytvoření šablony

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `title` | string | **ANO** | Název šablony, 1-64 znaků |
| `guid` | string\|null | ne | Vlastní GUID |
| `customerGroupId` | integer | ne | Omezit na skupinu zákazníků |
| `categoryGuids` | array\|null | ne | Omezit na kategorie |
| `brands` | array\|null | ne | Omezit na výrobce |
| `productFlags` | array\|null | ne | Omezit na příznaky |

---

## MNOŽSTEVNÍ SLEVY / QUANTITY DISCOUNTS

### POST /api/quantity-discounts — Vytvoření

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `title` | string | **ANO** | Název slevy |
| `targetingLevel` | enum | **ANO** | `eshop` \| `product` \| `category` \| `brand` |
| `settings` | array | **ANO** | Nastavení slevy (pravidla) |
| `isActive` | boolean | ne | Aktivní?, default true |
| `validFrom` | string\|null | ne | Platnost od |
| `validTo` | string\|null | ne | Platnost do |
| `displayFlag` | boolean | ne | Zobrazit příznak, default true |
| `flagColor` | string\|null | ne | Barva příznaku (hex) |
| `customerGroupCodes` | array\|null | ne | Skupiny zákazníků |
| `includeUnregisteredCustomers` | boolean | ne | Platí i pro neregistrované, default false |
| `targeting.productGuids` | array\|null | ne | Cílené GUIDy produktů |
| `targeting.categoryGuids` | array\|null | ne | Cílené GUIDy kategorií |
| `targeting.brandCodes` | array\|null | ne | Cílené kódy výrobců |

---

## XY SLEVY / XY DISCOUNTS

### POST /api/xy-discounts — Vytvoření XY slevy

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `title` | string | **ANO** | Název slevy |
| `xAmount` | string | **ANO** | Množství X (**string!**) |
| `yAmount` | string | **ANO** | Množství Y (**string!**) |
| `validFrom` | string\|null | ne | Platnost od |
| `validTo` | string\|null | ne | Platnost do |
| `customerGroupCodes` | array\|null | ne | Skupiny zákazníků |
| `includeUnregisteredCustomers` | boolean | ne | Pro neregistrované, default false |
| `displayFlag` | boolean | ne | Zobrazit příznak, default true |
| `displayBanner` | boolean | ne | Zobrazit banner, default true |
| `usageCount` | integer\|null | ne | Max počet použití |
| `sortBefore` | integer | ne | Řadit před tuto slevu (ID) — nelze s sortAfter |

### PATCH /api/xy-discounts/settings — Nastavení XY slev

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `combineWithLoyaltyDiscounts` | boolean | ne | Kombinovat s věrnostní slevou |
| `combineWithVolumeDiscounts` | boolean | ne | Kombinovat s objemovou slevou |
| `combineWithQuantityDiscounts` | boolean | ne | Kombinovat s množstevní slevou |
| `enableMultipleDiscounts` | boolean | ne | Více XY slev najednou |
| `categoryTargeting` | enum | ne | `all-categories` \| `primary-category` |
| `enableInCashdesk` | boolean | ne | Platí i v pokladně (ne pro HU eshopy!) |

---

## EMAILY A DISTRIBUCE / MAILING LISTS

### POST /api/mailing-lists — Vytvoření distribučního listu

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `name` | string | **ANO** | Název, 1-64 znaků |
| `code` | string | ne | Kód (generuje se z name pokud chybí), 1-64 znaků |

### POST /api/mailing-lists/{code} — Přidání emailů

**Path:** `code` = kód distribučního listu

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `emails` | array\<string\> | **ANO** | Pole emailových adres |

### GET /api/mailing-lists/{code}/changes — Změny v listu

| Parametr | Typ | Povinné | Popis |
|----------|-----|---------|-------|
| `from` | string | **ANO** | ISO 8601 datetime |
| `changeType` | string | ne | `edit` \| `delete` |

### POST /api/unsubscribed-emails — Přidání na blacklist

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `email` | string | **ANO** | Email adresa |
| `unsubscribedAt` | string\|null | **ANO** | ISO 8601 datum odhlášení |

---

## ČLÁNKY / ARTICLES

### POST /api/articles — Vytvoření článku / Create article

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `title` | string | **ANO** | Titulek článku |
| `defaultSectionId` | integer | **ANO** | ID výchozí sekce |
| `language` | string | ne | Jazyk (modul cizí jazyky) |
| `sectionIds` | array\<integer\> | ne | Další sekce |
| `indexName` | string | ne | URL slug |
| `content` | string\|null | ne | Obsah (HTML ok) |
| `metaTitle` | string\|null | ne | Meta titulek |
| `metaDescription` | string\|null | ne | Meta popis |
| `publishDate` | string\|null | ne | Datum publikace |
| `visible` | boolean | ne | Viditelný? |
| `access` | enum | ne | `all` \| `logged-in` \| `logged-out` \| `admin-only` |

### GET /api/articles/snapshot — Snapshot (async)

| Parametr | Typ | Popis |
|----------|-----|-------|
| `idFrom/idTo` | integer | Rozsah ID |
| `articleLanguage` | string | Jazyk článků |
| `publishDateFrom/To` | string | Rozsah data publikace |
| `changeDateFrom/To` | string | Rozsah data změny |
| `visible` | boolean | Filtr viditelnosti |

---

## STRÁNKY / PAGES

### POST /api/pages — Vytvoření stránky / Create page

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `title` | string | **ANO** | Titulek stránky |
| `indexName` | string | ne | URL slug |
| `description` | string\|null | ne | Obsah (HTML ok) |
| `linkText` | string\|null | ne | Název v menu |
| `metaTitle` | string\|null | ne | Meta titulek |
| `metaDescription` | string\|null | ne | Meta popis |
| `canonicalUrl` | string\|null | ne | Kanonická URL |
| `visible` | boolean | ne | Viditelná? |
| `access` | enum | ne | `all` \| `logged-in` \| `logged-out` \| `admin-only` |

---

## DISKUZE / DISCUSSIONS

### POST /api/discussions-posts — Vytvoření příspěvků / Create posts

Max 100 příspěvků na jedno volání.

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `email` | string | **ANO** | Email autora |
| `content` | string | **ANO** | Obsah příspěvku |
| `productGuid` | string | ne* | GUID produktu |
| `articleId` | integer\|null | ne* | ID článku |
| `pageId` | integer\|null | ne* | ID stránky |
| `customerGuid` | string | ne | GUID zákazníka |
| `name` | string\|null | ne | Jméno autora |
| `title` | string\|null | ne | Titulek |
| `parentId` | integer\|null | ne | ID nadřazeného příspěvku |
| `creationDate` | string\|null | ne | ISO 8601 datum vytvoření |

\* Jeden z `productGuid`, `articleId`, `pageId` musí být zadán.

---

## ŠABLONY / TEMPLATES (HTML kódy do šablon eshopu)

### POST /api/template-include — Vložení kódů

| Pole | Typ | Povinné | Popis |
|------|-----|---------|-------|
| `snippets` | array | **ANO** | Pole {location, html} |
| `snippets[].location` | string | **ANO** | `common-header` \| `common-footer` \| `order-confirmed` |
| `snippets[].html` | string | **ANO** | HTML obsah |

### DELETE /api/template-include/{location}

**Path:** `location` = `common-header` \| `common-footer` \| `order-confirmed`
