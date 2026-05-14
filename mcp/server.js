#!/usr/bin/env node
// CZ: Shoptet API MCP Server — automaticky generován z OpenAPI spec
// EN: Shoptet API MCP Server — auto-generated from OpenAPI spec
// 
// Verze / Version: 1.0.0
// Endpointů / Endpoints: 312
// OpenAPI spec verze / version: 928c0ee

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __dirname = dirname(fileURLToPath(import.meta.url));

// CZ: Načti token z lokálního konfiguračního souboru (nikdy neopouští tento stroj)
// EN: Load token from local config file (never leaves this machine)
function loadToken() {
  const configPath = join(__dirname, ".shoptet-token");
  try {
    return readFileSync(configPath, "utf-8").trim();
  } catch (e) {
    console.error("❌ Token not found. Run: npm run setup");
    process.exit(1);
  }
}

const BASE_URL = "https://api.myshoptet.com";
const TOKEN = loadToken();

// CZ: Shoptet API volání s automatickým error handlingem
// EN: Shoptet API call with automatic error handling
async function shoptetRequest(method, url, body) {
  const headers = {
    "Shoptet-Private-API-Token": TOKEN,
    "Content-Type": "application/json",
  };

  const options = { method, headers };
  if (body) options.body = body;

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    const errors = data.errors?.map(e => `${e.errorCode}: ${e.message}`).join(", ") || response.statusText;
    throw new Error(`Shoptet API ${response.status}: ${errors}`);
  }

  return data;
}

// CZ: Všechny dostupné tools (generováno z OpenAPI spec)
// EN: All available tools (generated from OpenAPI spec)
const TOOLS = [
  {
    name: "list_eshop",
    description: "Eshop info. Information about queried e-shop (defined by token). Returns the contact data and e-shop settings.   This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand).   If you state the 'include=im",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            }
      }
}
  },
  {
    name: "list_eshop_design",
    description: "E-shop design. Information about queried e-shop template setting (defined by token).          'backgroundImage' value can internally contain the link to a transparent        reference gif, in this case the API returns a NULL value",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_eshop_document_settings",
    description: "E-shop document settings. Information about financial documents settings",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_eshop_customer_fields",
    description: "E-shop mandatory fields. Information about queried e-shop mandatory fields setting (defined by token).  Returns the values, which are set by e-shop administrator in  Settings -> Customers -> Mandatory fields",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_products",
    description: "List of products. Returns the list of products - only basic info and GUID, using this you can determine the details  with another API call. Endpoint supports [Paging](#section/basic-principles/paging).   This endpoint has several sections, which are sent only when requested in the 'include' parameter (see [Section on",
    inputSchema: {
      "type": "object",
      "properties": {
            "availabilityId": {
                  "type": "integer",
                  "description": "product availability id. Optional."
            },
            "availabilityWhenSoldOutId": {
                  "type": "integer",
                  "description": "product availability id when not stocked. Optional."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "date of product creation, lower limit. Optional."
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "date of product creation, upper limit. Optional."
            },
            "visibility": {
                  "type": "string",
                  "description": "Product visibility (visible, hidden, only for logged-in users...) - see also [Product visibility](#section/code-lists/product-visibility) code list. O"
            },
            "type": {
                  "type": "string",
                  "description": "Product type (product, service, bazar...) - see also [Product types](#section/code-lists/product-types) code list. Optional."
            },
            "brandName": {
                  "type": "string",
                  "description": "product brand (manufacturer) name. Optional."
            },
            "brandCode": {
                  "type": "string",
                  "description": "product brand (manufacturer) code from `/api/brands` endpoint. Optional."
            },
            "defaultCategoryGuid": {
                  "type": "string",
                  "description": "product default category. Optional."
            },
            "categoryGuid": {
                  "type": "string",
                  "description": "product category - only the products added to specific category will be included. Optional."
            },
            "flag": {
                  "type": "string",
                  "description": "product flag - only products with selected flag will be included"
            },
            "include": {
                  "type": "string",
                  "description": "optional parts of response"
            },
            "productCodes": {
                  "type": "string",
                  "description": "Define the output set of products. Use max. 50 product codes separated by a comma. No additional filters take effect. Cannot be combined with `product"
            },
            "productGuids": {
                  "type": "string",
                  "description": "Define the output set of products. Use max. 50 product GUIDs separated by a comma. No additional filters take effect. Cannot be combined with `product"
            },
            "supplierGuid": {
                  "type": "string",
                  "description": "supplier GUID - only products with selected supplier will be included"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "date of product last update, lower limit. Optional."
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "date of product last update, upper limit. Optional."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 1000."
            }
      }
}
  },
  {
    name: "create_products",
    description: "Product insertion. This endpoint allows you to insert products into Shoptet. You can use it for an import from an external system.  Request is sent in JSON format in its body. For detailed description of items, which can be provided, see the right-most pane, section \"Request\" » \"Attributes\".   When creating a product",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "type": {
                              "type": "string",
                              "enum": [
                                    "product",
                                    "bazar",
                                    "service",
                                    "product-set"
                              ],
                              "description": "Product type. Optional, default value 'product'. Please note that 'product-set' requires 'sets' module to be enabled. Enum - see [Product types](#section/code-lists/product-types) code list."
                        },
                        "visibility": {
                              "type": "string",
                              "enum": [
                                    "hidden",
                                    "visible",
                                    "blocked",
                                    "show-registered",
                                    "block-unregistered",
                                    "cash-desk-only",
                                    "detail-only"
                              ],
                              "description": "Product visibility. Optional, default value `visible`. Enum - see [Product visibility](#section/code-lists/product-visibility) code list."
                        },
                        "name": {
                              "type": "string",
                              "description": "Product's name. Mandatory. Maximal length of 250 characters."
                        },
                        "adult": {
                              "type": "boolean",
                              "description": "Whether the product is for adults only. Optional, default value `false`."
                        },
                        "shortDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's short description."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's full description."
                        },
                        "additionalName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's additional name. Optional. Maximal length of 150 characters."
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's seo title. Maximal length of 255 characters."
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's full description."
                        },
                        "conditionGrade": {
                              "type": "string",
                              "nullable": true,
                              "description": "Grade condition of second-hand product. Allowed only for `bazar` type."
                        },
                        "conditionDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Condition description of second-hand product. Allowed only for `bazar` type."
                        },
                        "defaultCategoryGuid": {
                              "type": "string"
                        },
                        "brandCode": {
                              "type": "string",
                              "description": "Product's brand indexName/code. Must exist if set."
                        },
                        "internalNote": {
                              "type": "string",
                              "description": "Product internal note."
                        },
                        "preauthorizationRequired": {
                              "type": "boolean",
                              "description": "whether the preauthorization is required; available only if shoptet pay module is enabled"
                        },
                        "supplierGuid": {
                              "type": "string"
                        },
                        "categoryGuids": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "warrantyId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Warranty ID."
                        },
                        "flags": {
                              "type": "array",
                              "description": "Must exist if set.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "flag identifier."
                                          },
                                          "dateFrom": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "dateTo": {
                                                "type": "string",
                                                "nullable": true
                                          }
                                    },
                                    "required": [
                                          "code"
                                    ]
                              }
                        },
                        "descriptiveParameters": {
                              "type": "array",
                              "description": "Product descriptive parameters.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Parameter name."
                                          },
                                          "value": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "value of the descriptive parameter."
                                          },
                                          "description": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Description of the descriptive parameter."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Priority of the parameter."
                                          }
                                    },
                                    "required": [
                                          "name"
                                    ]
                              }
                        },
                        "filteringParameters": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "Filtering parameter code."
                                          },
                                          "values": {
                                                "type": "array",
                                                "description": "Product filtering parameter values.",
                                                "items": {
                                                      "type": "string"
                                                }
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "values"
                                    ]
                              }
                        },
                        "surchargeParameters": {
                              "type": "array",
                              "description": "Product surcharge parameters. Not allowed for products with multiple tax classes.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "parameter identifier, language dependent"
                                          },
                                          "values": {
                                                "type": "array",
                                                "description": "Product surcharge parameter values.",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "valueIndex": {
                                                                  "type": "string",
                                                                  "description": "parameter value identifier, language dependent"
                                                            },
                                                            "price": {
                                                                  "type": "string",
                                                                  "nullable": true
                                                            },
                                                            "visible": {
                                                                  "type": "boolean",
                                                                  "description": "flag, whether the parameter value is visible"
                                                            }
                                                      },
                                                      "required": [
                                                            "valueIndex"
                                                      ]
                                                }
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "values"
                                    ]
                              }
                        },
                        "variants": {
                              "type": "array",
                              "description": "Product's variants",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "Variant's code. Must be unique if set. After processing it will be converted to uppercase. Generated automatically if not set."
                                          },
                                          "ean": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's ean."
                                          },
                                          "unitId": {
                                                "type": "integer",
                                                "description": "Variant's unit id. Optional"
                                          },
                                          "weight": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "width": {
                                                "type": "string"
                                          },
                                          "height": {
                                                "type": "string"
                                          },
                                          "depth": {
                                                "type": "string"
                                          },
                                          "visible": {
                                                "type": "boolean",
                                                "description": "Is variant visible?"
                                          },
                                          "price": {
                                                "type": "string"
                                          },
                                          "currencyCode": {
                                                "type": "string",
                                                "description": "Currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                                          },
                                          "manufacturerCode": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's manufacturer code."
                                          },
                                          "pluCode": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's plu."
                                          },
                                          "isbn": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's ISBN."
                                          },
                                          "serialNo": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's serial number."
                                          },
                                          "mpn": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's MPN."
                                          },
                                          "availabilityId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product availability id"
                                          },
                                          "availabilityWhenSoldOutId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product availability id when not stocked"
                                          },
                                          "parameters": {
                                                "type": "array",
                                                "description": "Variant's parameters",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "nameIndex": {
                                                                  "type": "string",
                                                                  "description": "indexName of parameter name"
                                                            },
                                                            "valueIndex": {
                                                                  "type": "string",
                                                                  "description": "indexName of parameter value"
                                                            }
                                                      },
                                                      "required": [
                                                            "nameIndex",
                                                            "valueIndex"
                                                      ]
                                                }
                                          },
                                          "minStockSupply": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "stocksLocations": {
                                                "type": "array",
                                                "description": "Locations and amounts in stocks.",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "stockId": {
                                                                  "type": "integer",
                                                                  "description": "Id of stock. Required if stocksLocations is set. Must fit existing stock Id. Check List of Stocks."
                                                            },
                                                            "amount": {
                                                                  "type": "string",
                                                                  "nullable": true
                                                            },
                                                            "location": {
                                                                  "type": "string",
                                                                  "description": "Stock location."
                                                            }
                                                      },
                                                      "required": [
                                                            "stockId"
                                                      ]
                                                }
                                          },
                                          "negativeStockAllowed": {
                                                "type": "boolean",
                                                "description": "Product stock can be in negative numbers"
                                          },
                                          "measureUnit": {
                                                "type": "object",
                                                "nullable": true,
                                                "properties": {
                                                      "packagingUnitId": {
                                                            "type": "integer",
                                                            "nullable": true,
                                                            "description": "Packaging unit id"
                                                      },
                                                      "packagingAmount": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "measureUnitId": {
                                                            "type": "integer",
                                                            "nullable": true,
                                                            "description": "Measure unit id"
                                                      },
                                                      "measureAmount": {
                                                            "type": "string",
                                                            "nullable": true
                                                      }
                                                },
                                                "required": [
                                                      "packagingUnitId",
                                                      "packagingAmount",
                                                      "measureUnitId",
                                                      "measureAmount"
                                                ]
                                          },
                                          "recyclingFeeId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product recycling fee id"
                                          },
                                          "consumptionTaxId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product consumption tax identifier"
                                          },
                                          "amountDecimalPlaces": {
                                                "type": "integer",
                                                "enum": [
                                                      0,
                                                      1,
                                                      2,
                                                      3
                                                ],
                                                "description": "Amount of product variant decimal places."
                                          },
                                          "atypicalBilling": {
                                                "type": "boolean",
                                                "description": "Has atypical billing?"
                                          },
                                          "atypicalShipping": {
                                                "type": "boolean",
                                                "description": "Has atypical shipping?"
                                          },
                                          "boxRestriction": {
                                                "type": "boolean",
                                                "description": "When enabled, pickup lockers cannot be selected in the cart."
                                          },
                                          "ossVatLevels": {
                                                "type": "array",
                                                "description": "OSS Tax setup",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "countryCode": {
                                                                  "type": "string",
                                                                  "description": "Country code"
                                                            },
                                                            "taxLevel": {
                                                                  "enum": [
                                                                        "high",
                                                                        "low",
                                                                        "third",
                                                                        "none",
                                                                        "superLow",
                                                                        "parking"
                                                                  ],
                                                                  "description": "Tax level type. Use Enums: high: Standard tax rate, none: Zero tax rate, low: First reduced tax rate, third: Second reduced tax rate, superLow: Super low tax rate, parking: Parking tax rate."
                                                            }
                                                      },
                                                      "required": [
                                                            "countryCode",
                                                            "taxLevel"
                                                      ]
                                                }
                                          }
                                    }
                              }
                        },
                        "indexName": {
                              "type": "string",
                              "description": "String which defines product url. Value is sanitized to fits url needs = All characters except [a-zA-Z0-9_] will be converted to `-`. If value is not present, indexName is created from product name."
                        },
                        "relatedVideos": {
                              "type": "array",
                              "description": "Product related videos.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "related video code."
                                          },
                                          "title": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "related video title."
                                          },
                                          "type": {
                                                "enum": [
                                                      "youtube",
                                                      "youtube-short"
                                                ],
                                                "description": "related video type."
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "type"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "name",
                        "defaultCategoryGuid",
                        "variants"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "create_products_copy",
    description: "Product copy. This endpoint allows you to copy a product identified by a GUID.  The new product will have the same attributes as the original product. Many settings can be copied from the original product,but some settings require an active module. See the details below.  By default, all parameters are copied and",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Product`s name. Maximal length of 250 characters. Mandatory."
                        },
                        "isVisible": {
                              "type": "boolean",
                              "description": "Determine whether the copied product will be `visible` or `hidden`. This is optional; if not set, the visibility will be inherited from the source product."
                        },
                        "copyProperties": {
                              "type": "object",
                              "description": "Properties to copy. All properties are optional; if not set, the default value is true.",
                              "properties": {
                                    "generalData": {
                                          "type": "boolean",
                                          "description": "Whether to copy general data, which includes 'shortDescription', 'description', 'internalNote', 'manufacturer', 'warranty', 'supplier', 'itemType' and 'visibility' (if not set `isVisible` property)."
                                    },
                                    "images": {
                                          "type": "boolean",
                                          "description": "Whether to copy product gallery images."
                                    },
                                    "images360": {
                                          "type": "boolean",
                                          "description": "Whether to copy product 360° gallery images."
                                    },
                                    "pricelist": {
                                          "type": "boolean",
                                          "description": "Whether to copy the pricelist with all settings, including any variants from the source product."
                                    },
                                    "categories": {
                                          "type": "boolean",
                                          "description": "Whether to copy all categories."
                                    },
                                    "properties": {
                                          "type": "boolean",
                                          "description": "Whether to copy properties, which includes `descriptiveParameters` and `surchargeParameters`."
                                    },
                                    "related": {
                                          "type": "boolean",
                                          "description": "Whether to copy all related properties. It includes `relatedProducts` (only when the relatedProducts module is active), `alternativeProducts` (only when the `alternativeProducts` module is active), `r"
                                    },
                                    "advanced": {
                                          "type": "boolean",
                                          "description": "Whether to copy advanced properties like `metaDescription`, `appendix`, `xmlFeedName`, `seoTitle`, `IPlatba`, `PayOnline`, `adult`. If `categoryPairing` is set to `true`, the `categoryPairing` setting"
                                    },
                                    "stocks": {
                                          "type": "boolean",
                                          "description": "Whether to copy stocks. Available only with active `Stock` module. The pricelist must be also setted to `true` in order for the stock requirements to be copied."
                                    },
                                    "globalSaleVat": {
                                          "type": "boolean",
                                          "description": "Whether to copy global sale VAT. Available only with active `Global Sale` module."
                                    },
                                    "zboziCzSettings": {
                                          "type": "boolean",
                                          "description": "Whether to copy Zboží.cz settings. Available only with active `Seznam` module."
                                    },
                                    "heurekaSettings": {
                                          "type": "boolean",
                                          "description": "Whether to copy Heureka settings. Available only with active `HeurekaCZ` module."
                                    },
                                    "categoryPairing": {
                                          "type": "boolean",
                                          "description": "Whether to copy category pairing settings for Google, Glami, Heureka, Zbozi.cz. Property `advanced` must be set to `true`."
                                    }
                              }
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "list_products_snapshot",
    description: "List of all products. Using this endpoint, you can get list of all products with detailed info of each product (like in Product Detail endpoint) asynchronously. See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will be in [jsonlines](https://",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            },
            "productCodes": {
                  "type": "string",
                  "description": "Define the output set of products. Use max. 50 product codes separated by a comma. No additional filters take effect. Cannot be combined with `product"
            },
            "productGuids": {
                  "type": "string",
                  "description": "Define the output set of products. Use max. 50 product GUIDs separated by a comma. No additional filters take effect. Cannot be combined with `product"
            },
            "availabilityId": {
                  "type": "integer",
                  "description": "product availability id. Optional."
            },
            "availabilityWhenSoldOutId": {
                  "type": "integer",
                  "description": "product availability id when not stocked. Optional."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "date of product creation, lower limit. Optional."
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "date of product creation, upper limit. Optional."
            },
            "visibility": {
                  "type": "string",
                  "description": "Product visibility (visible, hidden, only for logged-in users...) - see also [Product visibility](#section/code-lists/product-visibility) code list. O"
            },
            "type": {
                  "type": "string",
                  "description": "Product type (product, service, bazar...) - see also [Product types](#section/code-lists/product-types) code list. Optional."
            },
            "brandName": {
                  "type": "string",
                  "description": "product brand (manufacturer) name. Optional."
            },
            "brandCode": {
                  "type": "string",
                  "description": "product brand (manufacturer) code from `/api/brands` endpoint. Optional."
            },
            "defaultCategoryGuid": {
                  "type": "string",
                  "description": "product default category. Optional."
            },
            "categoryGuid": {
                  "type": "string",
                  "description": "product category - only the products added to specific category will be included. Optional."
            },
            "flag": {
                  "type": "string",
                  "description": "product flag - only products with selected flag will be included"
            },
            "supplierGuid": {
                  "type": "string",
                  "description": "supplier GUID - only products with selected supplier will be included"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "date of product last update, lower limit. Optional."
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "date of product last update, upper limit. Optional."
            }
      }
}
  },
  {
    name: "list_products_snapshot_pricelists",
    description: "List of all products and pricelist prices. Using this endpoint, you can get list of all products with basic data such as  product guid, id, code and its prices across all pricelists.   Response will be in [jsonlines](https://jsonlines.org/) format with each product taking one line of output file. See [Product price list snapshot schema](/sho",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "get_products",
    description: "Product detail. Returns detailed information about one product. The product includes the variant field. In case the product comes in variants, the field contains all the available variants. If the product does not have any variants, it contains only one variant with product information.   This endpoint has several",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "update_products",
    description: "Product update. This endpoint allows you to update a product identified by its 'guid'.  Request is sent in JSON format in its body. For detailed description of items which can be updated and their format, check the right-most pane, section \"Request\" » \"Attributes\".   **Updating variants**  Specify 'code' to update",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "type": {
                              "type": "string",
                              "enum": [
                                    "product",
                                    "bazar",
                                    "service",
                                    "product-set"
                              ],
                              "description": "Product type. Please note that 'product-set' requires 'sets' module to be enabled. Enum - see [Product types](#section/code-lists/product-types) code list."
                        },
                        "visibility": {
                              "type": "string",
                              "enum": [
                                    "hidden",
                                    "visible",
                                    "blocked",
                                    "show-registered",
                                    "block-unregistered",
                                    "cash-desk-only",
                                    "detail-only"
                              ],
                              "description": "Product visibility. Optional, default value `visible`. Enum - see [Product visibility](#section/code-lists/product-visibility) code list."
                        },
                        "name": {
                              "type": "string",
                              "description": "Product's name. Mandatory. Maximal length of 250 characters."
                        },
                        "adult": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "Whether the product is for adults only. Optional, default value `false`."
                        },
                        "shortDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's short description."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's full description."
                        },
                        "additionalName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's additional name. Optional. Maximal length of 150 characters."
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's seo title. Maximal length of 255 characters."
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's full description."
                        },
                        "conditionGrade": {
                              "type": "string",
                              "nullable": true,
                              "description": "Grade condition of second-hand product. Allowed only for `bazar` type."
                        },
                        "conditionDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Condition description of second-hand product. Allowed only for `bazar` type."
                        },
                        "defaultCategoryGuid": {
                              "type": "string"
                        },
                        "brandCode": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's brand indexName/code. Must exist if set."
                        },
                        "internalNote": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product internal note."
                        },
                        "preauthorizationRequired": {
                              "type": "boolean",
                              "description": "whether the preauthorization is required; available only if shoptet pay module is enabled"
                        },
                        "supplierGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "categoryGuids": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "warrantyId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Warranty ID."
                        },
                        "flags": {
                              "type": "array",
                              "nullable": true,
                              "description": "Must exist if set. Cannot be set together with the param `flagsManagement`."
                        },
                        "flagsManagement": {
                              "type": "array",
                              "nullable": true,
                              "description": "Alternative way to manage the flags by specific `actions`. Cannot be set together with the param `flags`."
                        },
                        "descriptiveParameters": {
                              "type": "array",
                              "description": "Product descriptive parameters.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Parameter name."
                                          },
                                          "value": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "value of the descriptive parameter."
                                          },
                                          "description": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Description of the descriptive parameter."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Priority of the parameter."
                                          }
                                    },
                                    "required": [
                                          "name"
                                    ]
                              }
                        },
                        "filteringParameters": {
                              "type": "array",
                              "nullable": true
                        },
                        "surchargeParameters": {
                              "type": "array",
                              "description": "Product surcharge parameters. Not allowed for products with multiple tax classes.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "parameter identifier, language dependent"
                                          },
                                          "values": {
                                                "type": "array",
                                                "description": "Product surcharge parameter values.",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "valueIndex": {
                                                                  "type": "string",
                                                                  "description": "parameter value identifier, language dependent"
                                                            },
                                                            "price": {
                                                                  "type": "string",
                                                                  "nullable": true
                                                            },
                                                            "visible": {
                                                                  "type": "boolean",
                                                                  "description": "flag, whether the parameter value is visible"
                                                            }
                                                      },
                                                      "required": [
                                                            "valueIndex"
                                                      ]
                                                }
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "values"
                                    ]
                              }
                        },
                        "variants": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "Variant's code. Must be unique if set. After processing it will be converted to uppercase. Generated automatically if not set."
                                          },
                                          "newCode": {
                                                "type": "string",
                                                "description": "New code of existing variant."
                                          },
                                          "ean": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's ean."
                                          },
                                          "unitId": {
                                                "type": "integer",
                                                "description": "Variant's unit id. Optional"
                                          },
                                          "weight": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "width": {
                                                "type": "string"
                                          },
                                          "height": {
                                                "type": "string"
                                          },
                                          "depth": {
                                                "type": "string"
                                          },
                                          "visible": {
                                                "type": "boolean",
                                                "description": "Is variant visible?"
                                          },
                                          "manufacturerCode": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's manufacturer code."
                                          },
                                          "pluCode": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's plu."
                                          },
                                          "isbn": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's ISBN."
                                          },
                                          "serialNo": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's serial number."
                                          },
                                          "mpn": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's MPN."
                                          },
                                          "availabilityId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product availability id"
                                          },
                                          "availabilityWhenSoldOutId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product availability id when not stocked"
                                          },
                                          "image": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "image filename of this variant (image must exist within product)."
                                          },
                                          "parameters": {
                                                "type": "array",
                                                "description": "Variant's parameters",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "nameIndex": {
                                                                  "type": "string",
                                                                  "description": "indexName of parameter name"
                                                            },
                                                            "valueIndex": {
                                                                  "type": "string",
                                                                  "description": "indexName of parameter value"
                                                            }
                                                      },
                                                      "required": [
                                                            "nameIndex",
                                                            "valueIndex"
                                                      ]
                                                }
                                          },
                                          "minStockSupply": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "stocksLocations": {
                                                "type": "array",
                                                "description": "Locations and amounts in stocks.",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "stockId": {
                                                                  "type": "integer",
                                                                  "description": "Id of stock. Required if stocksLocations is set. Must fit existing stock Id. Check List of Stocks."
                                                            },
                                                            "location": {
                                                                  "type": "string",
                                                                  "nullable": true,
                                                                  "description": "Stock location."
                                                            }
                                                      },
                                                      "required": [
                                                            "stockId",
                                                            "location"
                                                      ]
                                                }
                                          },
                                          "negativeStockAllowed": {
                                                "type": "boolean",
                                                "description": "Product stock can be in negative numbers"
                                          },
                                          "measureUnit": {
                                                "type": "object",
                                                "nullable": true,
                                                "properties": {
                                                      "packagingUnitId": {
                                                            "type": "integer",
                                                            "nullable": true,
                                                            "description": "Packaging unit id"
                                                      },
                                                      "packagingAmount": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "measureUnitId": {
                                                            "type": "integer",
                                                            "nullable": true,
                                                            "description": "Measure unit id"
                                                      },
                                                      "measureAmount": {
                                                            "type": "string",
                                                            "nullable": true
                                                      }
                                                },
                                                "required": [
                                                      "packagingUnitId",
                                                      "packagingAmount",
                                                      "measureUnitId",
                                                      "measureAmount"
                                                ]
                                          },
                                          "recyclingFeeId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product recycling fee id"
                                          },
                                          "consumptionTaxId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product consumption tax identifier"
                                          },
                                          "amountDecimalPlaces": {
                                                "type": "integer",
                                                "enum": [
                                                      0,
                                                      1,
                                                      2,
                                                      3
                                                ],
                                                "description": "Amount of product variant decimal places."
                                          },
                                          "atypicalBilling": {
                                                "type": "boolean",
                                                "description": "Has atypical billing?"
                                          },
                                          "atypicalShipping": {
                                                "type": "boolean",
                                                "description": "Has atypical shipping?"
                                          },
                                          "boxRestriction": {
                                                "type": "boolean",
                                                "description": "When enabled, pickup lockers cannot be selected in the cart."
                                          },
                                          "ossVatLevels": {
                                                "type": "array",
                                                "description": "OSS Tax setup",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "countryCode": {
                                                                  "type": "string",
                                                                  "description": "Country code"
                                                            },
                                                            "taxLevel": {
                                                                  "enum": [
                                                                        "high",
                                                                        "low",
                                                                        "third",
                                                                        "none",
                                                                        "superLow",
                                                                        "parking"
                                                                  ],
                                                                  "description": "Tax level type. Use Enums: high: Standard tax rate, none: Zero tax rate, low: First reduced tax rate, third: Second reduced tax rate, superLow: Super low tax rate, parking: Parking tax rate."
                                                            }
                                                      },
                                                      "required": [
                                                            "countryCode",
                                                            "taxLevel"
                                                      ]
                                                }
                                          }
                                    }
                              }
                        },
                        "indexName": {
                              "type": "string",
                              "description": "String which defines product url. Value is sanitized to fits url needs = All characters except [a-zA-Z0-9_] will be converted to `-`. If value is not present, indexName is created from product name."
                        },
                        "relatedVideos": {
                              "type": "array",
                              "description": "Product related videos.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "related video code."
                                          },
                                          "title": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "related video title."
                                          },
                                          "type": {
                                                "enum": [
                                                      "youtube",
                                                      "youtube-short"
                                                ],
                                                "description": "related video type."
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "type"
                                    ]
                              }
                        }
                  }
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "delete_products",
    description: "Product deletion. Deletes product as per entered 'guid'. If successful, returns the code 200.  If the product does not exist within the e-shop, a 404 code is returned.  If the product cannot be deleted, because it is part of set or used as a gift to some product, a 409 code is returned",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "update_products_batch",
    description: "Product BATCH update. This endpoint allows you to update multiple products at once. Batch update is processed asynchronously in same way as for example products snapshot, but it does not have 'resultUrl' with products to download in response. Instead, you can check attribute 'log' which contains successfully updated prod",
    inputSchema: {
      "type": "object",
      "properties": {
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "delete_products_batch",
    description: "Product BATCH delete. This endpoint allows you to delete multiple products or product variants at once. Batch delete is processed asynchronously.   See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   File with data must be in JSONL ([jsonlines](https://",
    inputSchema: {
      "type": "object",
      "properties": {
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "get_products_code",
    description: "Product detail by code. Retrieve details about one product. Optional sections can be requested using '?include=' parameter The response format is the same as for [Product detail](#tag/products/getlistofproducts) endpoint",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "product or variant code."
            },
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_products_code",
    description: "Product update by code. This endpoint allows you to update products identified by a product code in Shoptet.  Request is sent in JSON format in its body. For detailed description of items, which can be updated and their format,  check the right-most pane, section \"Request\" » \"Attributes\".   Product variant can be updated b",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Product or variant code"
            },
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "type": {
                              "type": "string",
                              "enum": [
                                    "product",
                                    "bazar",
                                    "service",
                                    "product-set"
                              ],
                              "description": "Product type. Please note that 'product-set' requires 'sets' module to be enabled. Enum - see [Product types](#section/code-lists/product-types) code list."
                        },
                        "visibility": {
                              "type": "string",
                              "enum": [
                                    "hidden",
                                    "visible",
                                    "blocked",
                                    "show-registered",
                                    "block-unregistered",
                                    "cash-desk-only",
                                    "detail-only"
                              ],
                              "description": "Product visibility. Optional, default value `visible`. Enum - see [Product visibility](#section/code-lists/product-visibility) code list."
                        },
                        "name": {
                              "type": "string",
                              "description": "Product's name. Mandatory. Maximal length of 250 characters."
                        },
                        "adult": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "Whether the product is for adults only. Optional, default value `false`."
                        },
                        "shortDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's short description."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's full description."
                        },
                        "additionalName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's additional name. Optional. Maximal length of 150 characters."
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's seo title. Maximal length of 255 characters."
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's full description."
                        },
                        "conditionGrade": {
                              "type": "string",
                              "nullable": true,
                              "description": "Grade condition of second-hand product. Allowed only for `bazar` type."
                        },
                        "conditionDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Condition description of second-hand product. Allowed only for `bazar` type."
                        },
                        "defaultCategoryGuid": {
                              "type": "string"
                        },
                        "brandCode": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product's brand indexName/code. Must exist if set."
                        },
                        "internalNote": {
                              "type": "string",
                              "nullable": true,
                              "description": "Product internal note."
                        },
                        "preauthorizationRequired": {
                              "type": "boolean",
                              "description": "whether the preauthorization is required; available only if shoptet pay module is enabled"
                        },
                        "supplierGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "categoryGuids": {
                              "type": "array",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "warrantyId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Warranty ID."
                        },
                        "flags": {
                              "type": "array",
                              "nullable": true,
                              "description": "Must exist if set. Cannot be set together with the param `flagsManagement`."
                        },
                        "flagsManagement": {
                              "type": "array",
                              "nullable": true,
                              "description": "Alternative way to manage the flags by specific `actions`. Cannot be set together with the param `flags`."
                        },
                        "descriptiveParameters": {
                              "type": "array",
                              "description": "Product descriptive parameters.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Parameter name."
                                          },
                                          "value": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "value of the descriptive parameter."
                                          },
                                          "description": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Description of the descriptive parameter."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Priority of the parameter."
                                          }
                                    },
                                    "required": [
                                          "name"
                                    ]
                              }
                        },
                        "filteringParameters": {
                              "type": "array",
                              "nullable": true
                        },
                        "surchargeParameters": {
                              "type": "array",
                              "description": "Product surcharge parameters. Not allowed for products with multiple tax classes.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "parameter identifier, language dependent"
                                          },
                                          "values": {
                                                "type": "array",
                                                "description": "Product surcharge parameter values.",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "valueIndex": {
                                                                  "type": "string",
                                                                  "description": "parameter value identifier, language dependent"
                                                            },
                                                            "price": {
                                                                  "type": "string",
                                                                  "nullable": true
                                                            },
                                                            "visible": {
                                                                  "type": "boolean",
                                                                  "description": "flag, whether the parameter value is visible"
                                                            }
                                                      },
                                                      "required": [
                                                            "valueIndex"
                                                      ]
                                                }
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "values"
                                    ]
                              }
                        },
                        "variants": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "Variant's code. Must be unique if set. After processing it will be converted to uppercase. Generated automatically if not set."
                                          },
                                          "newCode": {
                                                "type": "string",
                                                "description": "New code of existing variant."
                                          },
                                          "ean": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's ean."
                                          },
                                          "unitId": {
                                                "type": "integer",
                                                "description": "Variant's unit id. Optional"
                                          },
                                          "weight": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "width": {
                                                "type": "string"
                                          },
                                          "height": {
                                                "type": "string"
                                          },
                                          "depth": {
                                                "type": "string"
                                          },
                                          "visible": {
                                                "type": "boolean",
                                                "description": "Is variant visible?"
                                          },
                                          "manufacturerCode": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's manufacturer code."
                                          },
                                          "pluCode": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's plu."
                                          },
                                          "isbn": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's ISBN."
                                          },
                                          "serialNo": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's serial number."
                                          },
                                          "mpn": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Variant's MPN."
                                          },
                                          "availabilityId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product availability id"
                                          },
                                          "availabilityWhenSoldOutId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product availability id when not stocked"
                                          },
                                          "image": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "image filename of this variant (image must exist within product)."
                                          },
                                          "parameters": {
                                                "type": "array",
                                                "description": "Variant's parameters",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "nameIndex": {
                                                                  "type": "string",
                                                                  "description": "indexName of parameter name"
                                                            },
                                                            "valueIndex": {
                                                                  "type": "string",
                                                                  "description": "indexName of parameter value"
                                                            }
                                                      },
                                                      "required": [
                                                            "nameIndex",
                                                            "valueIndex"
                                                      ]
                                                }
                                          },
                                          "minStockSupply": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "stocksLocations": {
                                                "type": "array",
                                                "description": "Locations and amounts in stocks.",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "stockId": {
                                                                  "type": "integer",
                                                                  "description": "Id of stock. Required if stocksLocations is set. Must fit existing stock Id. Check List of Stocks."
                                                            },
                                                            "location": {
                                                                  "type": "string",
                                                                  "nullable": true,
                                                                  "description": "Stock location."
                                                            }
                                                      },
                                                      "required": [
                                                            "stockId",
                                                            "location"
                                                      ]
                                                }
                                          },
                                          "negativeStockAllowed": {
                                                "type": "boolean",
                                                "description": "Product stock can be in negative numbers"
                                          },
                                          "measureUnit": {
                                                "type": "object",
                                                "nullable": true,
                                                "properties": {
                                                      "packagingUnitId": {
                                                            "type": "integer",
                                                            "nullable": true,
                                                            "description": "Packaging unit id"
                                                      },
                                                      "packagingAmount": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "measureUnitId": {
                                                            "type": "integer",
                                                            "nullable": true,
                                                            "description": "Measure unit id"
                                                      },
                                                      "measureAmount": {
                                                            "type": "string",
                                                            "nullable": true
                                                      }
                                                },
                                                "required": [
                                                      "packagingUnitId",
                                                      "packagingAmount",
                                                      "measureUnitId",
                                                      "measureAmount"
                                                ]
                                          },
                                          "recyclingFeeId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product recycling fee id"
                                          },
                                          "consumptionTaxId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Product consumption tax identifier"
                                          },
                                          "amountDecimalPlaces": {
                                                "type": "integer",
                                                "enum": [
                                                      0,
                                                      1,
                                                      2,
                                                      3
                                                ],
                                                "description": "Amount of product variant decimal places."
                                          },
                                          "atypicalBilling": {
                                                "type": "boolean",
                                                "description": "Has atypical billing?"
                                          },
                                          "atypicalShipping": {
                                                "type": "boolean",
                                                "description": "Has atypical shipping?"
                                          },
                                          "boxRestriction": {
                                                "type": "boolean",
                                                "description": "When enabled, pickup lockers cannot be selected in the cart."
                                          },
                                          "ossVatLevels": {
                                                "type": "array",
                                                "description": "OSS Tax setup",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "countryCode": {
                                                                  "type": "string",
                                                                  "description": "Country code"
                                                            },
                                                            "taxLevel": {
                                                                  "enum": [
                                                                        "high",
                                                                        "low",
                                                                        "third",
                                                                        "none",
                                                                        "superLow",
                                                                        "parking"
                                                                  ],
                                                                  "description": "Tax level type. Use Enums: high: Standard tax rate, none: Zero tax rate, low: First reduced tax rate, third: Second reduced tax rate, superLow: Super low tax rate, parking: Parking tax rate."
                                                            }
                                                      },
                                                      "required": [
                                                            "countryCode",
                                                            "taxLevel"
                                                      ]
                                                }
                                          }
                                    }
                              }
                        },
                        "indexName": {
                              "type": "string",
                              "description": "String which defines product url. Value is sanitized to fits url needs = All characters except [a-zA-Z0-9_] will be converted to `-`. If value is not present, indexName is created from product name."
                        },
                        "relatedVideos": {
                              "type": "array",
                              "description": "Product related videos.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "related video code."
                                          },
                                          "title": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "related video title."
                                          },
                                          "type": {
                                                "enum": [
                                                      "youtube",
                                                      "youtube-short"
                                                ],
                                                "description": "related video type."
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "type"
                                    ]
                              }
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_products_code",
    description: "Product variant deletion. Deletes product variant as per entered 'code'. If this is the last product variant, the entire product is deleted.  If successful, returns the code 200.  If the product variant does not exist within the e-shop, a 404 code is returned.  If the product variant cannot be deleted, because it is part of",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "product variant code."
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_products_images",
    description: "List of product images. Returns list of product's images.  Data from this endpoint and from product's detail endpoint (list named 'images' when using '?include=images' parameter) are the same.  Use this endpoint when working only with product images to save time",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "gallery": {
                  "type": "string",
                  "description": "Gallery identifier - use `shop` for normal and `shop360` for 360 photos"
            }
      },
      "required": [
            "guid",
            "gallery"
      ]
}
  },
  {
    name: "create_products_images",
    description: "Product images insertion. Using this endpoint you can upload new images to a product. This is an asynchronous request,  see how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our  developer's portal. Maximum of 100 images can be sent at once",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "gallery": {
                  "type": "string",
                  "description": "Gallery identifier - use `shop` for normal and `shop360` for 360 photos"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "images": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "sourceUrl": {
                                                "type": "string",
                                                "description": "URL of the image."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "description": "Image priority."
                                          },
                                          "description": {
                                                "type": "string",
                                                "description": "Image description."
                                          }
                                    },
                                    "required": [
                                          "sourceUrl"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "images"
                  ]
            }
      },
      "required": [
            "guid",
            "gallery",
            "data"
      ]
}
  },
  {
    name: "update_products_images",
    description: "Product images update. Using this endpoint you can modify product images attributes, such as description and priority (order). Maximum of 100 images can be sent at once",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "gallery": {
                  "type": "string",
                  "description": "Gallery identifier - use `shop` for normal and `shop360` for 360 photos"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "images": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Name of image."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "description": "Image priority."
                                          },
                                          "description": {
                                                "type": "string",
                                                "description": "Image description."
                                          }
                                    },
                                    "required": [
                                          "name"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "images"
                  ]
            }
      },
      "required": [
            "guid",
            "gallery",
            "data"
      ]
}
  },
  {
    name: "delete_products_images",
    description: "Delete all product images in gallery. Deletes all product's images by gallery name. If 'removeReference' parameter is not present or set to 'false' and if image is referenced  as variant image, then image will be skipped and present in 'errors' in response.  If 'removeReference' is set to true, then this reference will be removed with t",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "gallery": {
                  "type": "string",
                  "description": "Gallery name (shop or shop360)"
            },
            "removeReference": {
                  "type": "boolean",
                  "description": "If product's variant image reference should be removed. Default `false`."
            }
      },
      "required": [
            "guid",
            "gallery"
      ]
}
  },
  {
    name: "update_products_images_source",
    description: "Product images source update. Using this endpoint you can modify product image attributes and also upload a new image and replace the existing one.  This is an asynchronous request,  see how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "gallery": {
                  "type": "string",
                  "description": "Gallery identifier - use `shop` for normal and `shop360` for 360 photos"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "images": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Name of the image"
                                          },
                                          "sourceUrl": {
                                                "type": "string",
                                                "description": "URL of the image"
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "description": "Priority of the image"
                                          },
                                          "description": {
                                                "type": "string",
                                                "description": "Description of the image"
                                          }
                                    },
                                    "required": [
                                          "name",
                                          "sourceUrl"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "images"
                  ]
            }
      },
      "required": [
            "guid",
            "gallery",
            "data"
      ]
}
  },
  {
    name: "delete_products_images_by_gallery_and_imagename",
    description: "Delete one product image. Deletes product's image. If 'removeReference' parameter is not present or set to 'false' and if image is referenced  as variant image, then image won't be deleted and response will have status code '409 Conflict'.  If 'removeReference' is set to true, then this reference will be removed with the ima",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "gallery": {
                  "type": "string",
                  "description": "Gallery name (shop or shop360)"
            },
            "imageName": {
                  "type": "string",
                  "description": "Filename"
            },
            "removeReference": {
                  "type": "boolean",
                  "description": "If product's variant image reference should be removed. Default `false`."
            }
      },
      "required": [
            "guid",
            "gallery",
            "imageName"
      ]
}
  },
  {
    name: "create_products_related_files",
    description: "Product related file link. Linking related file from temporary storage to product",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "sourceFileName": {
                              "type": "string",
                              "description": "Source file name uploaded to temporary storage or url path to external file"
                        },
                        "description": {
                              "type": "string",
                              "description": "File description."
                        }
                  },
                  "required": [
                        "sourceFileName"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "delete_products_related_files",
    description: "Unlink all product related files. Unlink all related files linked to a specific product",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "delete_products_related_files_by_guid_and_id",
    description: "Delete one product related file. Deletes product's related file",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product's guid"
            },
            "id": {
                  "type": "integer",
                  "description": "Related file id"
            }
      },
      "required": [
            "guid",
            "id"
      ]
}
  },
  {
    name: "list_products_changes",
    description: "Last product changes. Returns the list of products, which were changed (added/edited or deleted). Endpoint is intended to determine the changes after you have loaded the complete list of products and you need to know if any of these have been changed. Guaranteed history is 30 days, older data are deleted progressively",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_categories",
    description: "List of product categories. Returns the list of product categories",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 500. Max value is 1000."
            }
      }
}
  },
  {
    name: "create_categories",
    description: "Product category create. Creates new category",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "name": {
                              "type": "string",
                              "description": "Category name"
                        },
                        "parentGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Category description. Max length 65535 bytes. Optional."
                        },
                        "secondDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Bottom category description. Max length 65535 bytes. Optional."
                        },
                        "imageName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Category image. File must exist on the server. Optional. (Use `sourceImageName` instead)"
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "sortBefore": {
                              "type": "string"
                        },
                        "sortAfter": {
                              "type": "string"
                        },
                        "indexName": {
                              "type": "string",
                              "description": "Last part of url. Optional, generated from name if not set."
                        },
                        "menuTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Label for menu. Optional."
                        },
                        "title": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag title. Optional."
                        },
                        "metaTagDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag description. Optional."
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "Whether the category is visible. Optional, default `true`."
                        },
                        "customerVisibility": {
                              "type": "string",
                              "enum": [
                                    "all",
                                    "registered",
                                    "unregistered",
                                    "admin-only"
                              ],
                              "description": "defines users of the e-shop who can see the category - `all` = all (default), `registered` = registered users, `unregistered` = non-registered users. Optional."
                        },
                        "productOrdering": {
                              "type": "string",
                              "enum": [
                                    "default",
                                    "most-selling",
                                    "cheapest",
                                    "most-expensive",
                                    "oldest",
                                    "newest",
                                    "alphabetically",
                                    "alphabetically-desc",
                                    "product-code",
                                    "product-code-desc",
                                    "category-priority",
                                    "category-priority-desc"
                              ],
                              "description": "Defines how products are sorted in a category. See also [Sorting of products in category](#section/code-lists/sorting-of-products-in-category) code list."
                        },
                        "similarProductsCategory": {
                              "type": "string",
                              "nullable": true
                        },
                        "relatedProductsCategory": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_categories",
    description: "Product category detail. Returns category info",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Product category."
            }
      },
      "required": [
            "categoryGuid"
      ]
}
  },
  {
    name: "update_categories",
    description: "Product category update. Updates existing category",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Category's guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "name": {
                              "type": "string",
                              "description": "Category name. Optional."
                        },
                        "parentGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Category description. Max length 65535 bytes. Optional."
                        },
                        "secondDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Bottom category description. Max length 65535 bytes. Optional."
                        },
                        "imageName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Category image. File must exist on the server. Optional. (Use `sourceImageName` instead)"
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "sortBefore": {
                              "type": "string"
                        },
                        "sortAfter": {
                              "type": "string"
                        },
                        "indexName": {
                              "type": "string",
                              "description": "Last part of url. Optional, generated from name if not set."
                        },
                        "menuTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Label for menu. Optional."
                        },
                        "title": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag title. Optional."
                        },
                        "metaTagDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag description. Optional."
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "Whether the category is visible. Optional, default `true`."
                        },
                        "customerVisibility": {
                              "type": "string",
                              "enum": [
                                    "all",
                                    "registered",
                                    "unregistered",
                                    "admin-only"
                              ],
                              "description": "defines users of the e-shop who can see the category - `all` = all (default), `registered` = registered users, `unregistered` = non-registered users. Optional."
                        },
                        "productOrdering": {
                              "type": "string",
                              "enum": [
                                    "default",
                                    "most-selling",
                                    "cheapest",
                                    "most-expensive",
                                    "oldest",
                                    "newest",
                                    "alphabetically",
                                    "alphabetically-desc",
                                    "product-code",
                                    "product-code-desc",
                                    "category-priority",
                                    "category-priority-desc"
                              ],
                              "description": "defines how products are sorted in a category; see also [Sorting of products in category](#section/code-lists/sorting-of-products-in-category) code list"
                        },
                        "similarProductsCategory": {
                              "type": "string",
                              "nullable": true
                        },
                        "relatedProductsCategory": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "categoryGuid",
            "data"
      ]
}
  },
  {
    name: "delete_categories",
    description: "Product category deletion. Deletes product category as per entered 'categoryGuid'. If successful, returns the code 200.  If the category does not exist within the e-shop, a 404 code is returned.  If the category cannot be deleted, because it is used by some product or has children, a 409 code is returned.  Optional parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Category guid"
            },
            "deleteUsed": {
                  "type": "boolean",
                  "description": "Allows deleting categories used by products if set to `true`"
            },
            "deleteChildren": {
                  "type": "boolean",
                  "description": "Allows deleting categories with children if set to `true`"
            }
      },
      "required": [
            "categoryGuid"
      ]
}
  },
  {
    name: "update_categories_batch",
    description: "Product category BATCH update. This endpoint allows you to update multiple categories at once. Batch update is processed asynchronously in same way as for example products snapshot, but it does not have 'resultUrl' with categories to download in response. Instead, you can check attribute 'log' which contains successfully updated",
    inputSchema: {
      "type": "object",
      "properties": {
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "update_categories_products_priority_batch",
    description: "Category products priority BATCH update. This endpoint allows you to update multiple categories with product priorities at once. Batch update is processed asynchronously in same way as for example products snapshot, but it does not have 'resultUrl' in response. Instead, you can check attribute 'log' which contains successfully updated cate",
    inputSchema: {
      "type": "object",
      "properties": {
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "get_categories_productsPriority",
    description: "List of products order in category. Retrieves products and their priorities within a category",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Product category."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 500. Max value is 2000."
            }
      },
      "required": [
            "categoryGuid"
      ]
}
  },
  {
    name: "update_categories_productsPriority",
    description: "Update product order in category. Using this endpoint you can update product priority within a category.  You can request multiple updates at once; the maximum is 300 updates per request.  Each item must identify the product by either 'productGuid' or 'productCode' (exactly one must be provided per item).  In case of a partial failu",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Product category."
            },
            "data": {
                  "type": "array",
                  "items": {}
            }
      },
      "required": [
            "categoryGuid",
            "data"
      ]
}
  },
  {
    name: "list_parametric_categories",
    description: "List of parametric categories. Returns the list of product categories",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Include additional data in response. Possible values: `parameters`."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 100."
            }
      }
}
  },
  {
    name: "create_parametric_categories",
    description: "Creation of parametric category. Creates a new combination for a parametric category.  **Prerequisites:** Before creating a combination, a parametric category definition for the selected 'parameterCodes' and the given category must exist. Create one via 'POST /parametric-categories-definition'. To discover which 'parameterCodes' ar",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Include additional data in response. Possible values: `parameters`."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Parametric category name"
                        },
                        "originalCategoryGuid": {
                              "type": "string"
                        },
                        "parameters": {
                              "type": "array",
                              "description": "Parameters of the parametric category",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "parameterCode": {
                                                "type": "string",
                                                "description": "Code of the parameter"
                                          },
                                          "valueCode": {
                                                "type": "string",
                                                "description": "Code of the parameter value"
                                          }
                                    },
                                    "required": [
                                          "parameterCode",
                                          "valueCode"
                                    ]
                              }
                        },
                        "indexName": {
                              "type": "string",
                              "description": "Last part of url. Optional, generated from `valueCodes` if not set."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Top parametric category description. Max length 65535 bytes. Optional."
                        },
                        "secondDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Bottom parametric category description. Max length 65535 bytes. Optional."
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "title": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag title. Optional."
                        },
                        "metaTagDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag description. Optional."
                        },
                        "showInList": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "Flag, whether the parametric category is visible in category list. Default is `false`. Optional"
                        },
                        "showInDetail": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "Flag, whether the parametric category is visible in product detail. Default is `true`. Optional"
                        }
                  },
                  "required": [
                        "name",
                        "originalCategoryGuid",
                        "parameters"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_parametric_categories",
    description: "Parametric category detail. Returns parametric category info",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Guid of parametric category."
            }
      },
      "required": [
            "categoryGuid"
      ]
}
  },
  {
    name: "update_parametric_categories",
    description: "Update of parametric category. Updates existing parametric category.   The \"Advanced SEO\" module must be active to use this endpoint.  This endpoint is language dependent. While active module \"Foreign languages\"  you can use language query parameter to specify the language of updated parametric category",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Guid of parametric category."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Parametric category name"
                        },
                        "indexName": {
                              "type": "string",
                              "description": "Last part of url. Optional, generated from `valueCodes` if not set."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Top parametric category description. Max length 65535 bytes. Optional."
                        },
                        "secondDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Bottom parametric category description. Max length 65535 bytes. Optional."
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "title": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag title. Optional."
                        },
                        "metaTagDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta tag description. Optional."
                        },
                        "showInList": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "Flag, whether the parametric category is visible in category list. Default is `false`. Optional"
                        },
                        "showInDetail": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "Flag, whether the parametric category is visible in product detail. Default is `true`. Optional"
                        }
                  }
            }
      },
      "required": [
            "categoryGuid",
            "data"
      ]
}
  },
  {
    name: "delete_parametric_categories",
    description: "Delete of parametric category. Delete existing parametric category. The \"Advanced SEO\" module must be active to use this endpoint",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Guid of parametric category."
            }
      },
      "required": [
            "categoryGuid"
      ]
}
  },
  {
    name: "get_parametric_categories_available_parameters",
    description: "Parametric category available parameters. Returns all available parameters for a parent category that can be used when creating parametric categories and their combinations.  The \"Advanced SEO\" module must be active to use this endpoint",
    inputSchema: {
      "type": "object",
      "properties": {
            "categoryGuid": {
                  "type": "string",
                  "description": "Guid of the parent category."
            }
      },
      "required": [
            "categoryGuid"
      ]
}
  },
  {
    name: "create_parametric_categories_definition",
    description: "Creation of parametric category definition. Creates a new parametric category definition for a given category and set of parameters.  The definition specifies which parameters are used to generate parametric category pages for the specified category. You can specify 1 to 4 parameters. Each 'parameterCode' must exist and must be unique within",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "categoryGuid": {
                              "type": "string"
                        },
                        "parameters": {
                              "type": "array",
                              "description": "List of parameter codes that define the parametric category parent (1–4 parameters)",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "parameterCode": {
                                                "type": "string",
                                                "description": "Code of the parameter"
                                          }
                                    },
                                    "required": [
                                          "parameterCode"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "categoryGuid",
                        "parameters"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_products_flags",
    description: "List of products flags. Returns the list of product flags within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_products_flags",
    description: "Product flag insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "Name of flag."
                        },
                        "color": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "title"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_products_flags",
    description: "Product flag update. Updates the flag",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "Name of flag."
                        },
                        "color": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_products_flags",
    description: "Product flag delete. Deletes the flag. System flags cannot be deleted",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "list_products_measure_units",
    description: "List of products measure units. Returns the list of product measure units within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_products_availabilities",
    description: "List of products availabilities. Returns the list of product availabilities within the e-shop and default availabilities ids",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_products_availabilities",
    description: "Product availability creation. Creates a new product availability",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of the availability"
                        },
                        "indexName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Code name of the availability"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of the availability"
                        },
                        "color": {
                              "type": "string",
                              "nullable": true
                        },
                        "onStockInHours": {
                              "type": "integer",
                              "nullable": true,
                              "description": "When will a product be on stock. (in hours)"
                        },
                        "deliveryInHours": {
                              "type": "integer",
                              "nullable": true,
                              "description": "When will a product be delivered. (in hours)"
                        },
                        "googleAvailabilityId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of the google availability. Possible values: `1` (in stock), `3` (out of stock), `4` (preorder), `5` (backorder)."
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_products_availabilities",
    description: "Update of product availability. Updates a product availability",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "product availability ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of the availability"
                        },
                        "indexName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Code name of the availability"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of the availability"
                        },
                        "color": {
                              "type": "string",
                              "nullable": true
                        },
                        "onStockInHours": {
                              "type": "integer",
                              "nullable": true,
                              "description": "When will a product be on stock. (in hours)"
                        },
                        "deliveryInHours": {
                              "type": "integer",
                              "nullable": true,
                              "description": "When will a product be delivered. (in hours)"
                        },
                        "googleAvailabilityId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of the google availability. Possible values: `1` (in stock), `3` (out of stock), `4` (preorder), `5` (backorder)."
                        }
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_products_availabilities",
    description: "Deletion of product availability. Deletes a product availability",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "product availability ID"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_products_surcharge_parameters",
    description: "List of surcharge parameters. Returns the list of available surcharge parameters with their available values within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 500."
            }
      }
}
  },
  {
    name: "create_products_surcharge_parameters",
    description: "Creation of surcharge parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "currency": {
                              "type": "string",
                              "nullable": true,
                              "description": "currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                        },
                        "displayName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Name of surcharge parameter."
                        },
                        "name": {
                              "type": "string",
                              "description": "Name of surcharge parameter."
                        },
                        "code": {
                              "type": "string",
                              "description": "Url friendly name of parameter. If is not set, code is generated from name. When changed, you must use the new code in the next API calls."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of surcharge parameter."
                        },
                        "required": {
                              "type": "boolean",
                              "description": "default value is false."
                        },
                        "includingVat": {
                              "type": "boolean",
                              "description": "default value is true."
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Parameter priority"
                        },
                        "googleMapping": {
                              "type": "string",
                              "nullable": true,
                              "description": "Mapping for google."
                        },
                        "values": {
                              "type": "array",
                              "description": "Values of parameter.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Name of parameter value"
                                          },
                                          "price": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "valueIndex": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Url friendly name of parameter value. Maximal length of 255 characters. If is not set, code is generated from name."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Priority of parameter value."
                                          }
                                    },
                                    "required": [
                                          "name",
                                          "price"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "name",
                        "values"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_products_surcharge_parameters",
    description: "Detail of surcharge parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_products_surcharge_parameters_by_code",
    description: "Creation of surcharge parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "paramValues": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Name of parameter value."
                                          },
                                          "price": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "valueIndex": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Url friendly name of parameter value. Maximal length of 255 characters. If is not set, code is generated from name."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Parameter value priority"
                                          }
                                    },
                                    "required": [
                                          "name",
                                          "price"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "paramValues"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_products_surcharge_parameters",
    description: "Update of surcharge parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of surcharge parameter."
                        },
                        "code": {
                              "type": "string",
                              "description": "Url friendly name of parameter. If is not set, code is generated from name. When changed, you must use the new code in the next API calls."
                        },
                        "displayName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Name of surcharge parameter."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of surcharge parameter."
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Parameter priority"
                        },
                        "googleMapping": {
                              "type": "string",
                              "nullable": true,
                              "description": "Mapping for google."
                        },
                        "currency": {
                              "type": "string",
                              "nullable": true,
                              "description": "currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                        },
                        "required": {
                              "type": "boolean",
                              "description": "default value is false."
                        },
                        "includingVat": {
                              "type": "boolean",
                              "description": "default value is true."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_products_surcharge_parameters",
    description: "Removal of surcharge parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_products_surcharge_parameters_by_paramindex_and_value",
    description: "Update of surcharge parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            },
            "valueIndex": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of the parameter value"
                        },
                        "valueIndex": {
                              "type": "string",
                              "nullable": true,
                              "description": "Url friendly name of parameter value. If is not set, code is generated from name. When changed, you must use the new valueIndex in the next API calls."
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Parameter value priority."
                        },
                        "price": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "paramIndex",
            "valueIndex",
            "data"
      ]
}
  },
  {
    name: "delete_products_surcharge_parameters_by_paramindex_and_value",
    description: "Removal of surcharge parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            },
            "valueIndex": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "paramIndex",
            "valueIndex"
      ]
}
  },
  {
    name: "list_products_filtering_parameters",
    description: "List of filtering parameters. Returns the list of available filtering parameters with their available values within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 100."
            }
      }
}
  },
  {
    name: "create_products_filtering_parameters",
    description: "Creation of filtering parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Parameter name"
                        },
                        "code": {
                              "type": "string",
                              "description": "Url friendly name of parameter. When changed, in next API call you must use the new parameter code."
                        },
                        "displayName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Parameter display name"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Parameter description"
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Parameter priority"
                        },
                        "googleMapping": {
                              "type": "string",
                              "nullable": true,
                              "description": "Mapping for google."
                        },
                        "values": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Name of parameter value."
                                          },
                                          "valueIndex": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Url friendly name of parameter value."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Parameter value priority."
                                          },
                                          "color": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "image": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Image name. Image needs to exist in your file folder."
                                          }
                                    },
                                    "required": [
                                          "name"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "name",
                        "values"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_products_filtering_parameters",
    description: "Detail of filtering parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_products_filtering_parameters_by_code",
    description: "Creation of filtering parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "paramValues": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "name": {
                                                "type": "string",
                                                "description": "Name of parameter value."
                                          },
                                          "valueIndex": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Url friendly name of parameter value."
                                          },
                                          "priority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Parameter value priority."
                                          },
                                          "color": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "image": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Image name. Image needs to exist in your file folder."
                                          }
                                    },
                                    "required": [
                                          "name"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "paramValues"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_products_filtering_parameters",
    description: "Update of filtering parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Parameter name"
                        },
                        "code": {
                              "type": "string",
                              "description": "Url friendly name of parameter. When changed, in next API call you must use the new parameter code."
                        },
                        "displayName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Parameter display name"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Parameter description"
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Parameter priority"
                        },
                        "googleMapping": {
                              "type": "string",
                              "nullable": true,
                              "description": "Mapping for google."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_products_filtering_parameters",
    description: "Removal of filtering parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_products_filtering_parameters_by_code_and_valueindex",
    description: "Update of filtering parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "valueIndex": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of parameter value."
                        },
                        "valueIndex": {
                              "type": "string",
                              "nullable": true,
                              "description": "Url friendly name of parameter value."
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Parameter value priority."
                        },
                        "color": {
                              "type": "string",
                              "nullable": true
                        },
                        "image": {
                              "type": "string",
                              "nullable": true,
                              "description": "Image name. Image needs to exist in your file folder."
                        }
                  }
            }
      },
      "required": [
            "code",
            "valueIndex",
            "data"
      ]
}
  },
  {
    name: "delete_products_filtering_parameters_by_code_and_valueindex",
    description: "Removal of filtering parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "valueIndex": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code",
            "valueIndex"
      ]
}
  },
  {
    name: "list_products_variant_parameters",
    description: "List of variant parameters. Returns the list of available variant parameters with their available values within the e-shop.   List of variant parameters endpoint has section, which is only sent when requested in the 'include' parameter.  Value | Section --------|------ 'values' | Variant parameter values",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 50. Max value is 100."
            }
      }
}
  },
  {
    name: "create_products_variant_parameters",
    description: "Creation of variant parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "paramName": {
                              "type": "string",
                              "description": "Name of parameter. Maximal length of 255 characters"
                        },
                        "paramIndex": {
                              "type": "string",
                              "nullable": true,
                              "description": "Url friendly name of parameter. Maximal length of 255 characters."
                        },
                        "displayName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Parameter display name"
                        },
                        "priority": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Priority of parameter"
                        },
                        "values": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "paramValue": {
                                                "type": "string",
                                                "description": "Name of parameter value. Maximal length of 255 characters."
                                          },
                                          "rawValue": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Url friendly name of parameter value. Maximal length of 255 characters."
                                          },
                                          "color": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "image": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Image name. Image needs to exist in your file folder."
                                          },
                                          "valuePriority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Parameter value priority."
                                          }
                                    },
                                    "required": [
                                          "paramValue"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "paramName"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_products_variant_parameters",
    description: "Detail of variant parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "paramIndex"
      ]
}
  },
  {
    name: "create_products_variant_parameters_by_paramindex",
    description: "Creation of variant parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "paramValues": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "paramValue": {
                                                "type": "string",
                                                "description": "Name of parameter value. Maximal length of 255 characters."
                                          },
                                          "rawValue": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Url friendly name of parameter value. Maximal length of 255 characters."
                                          },
                                          "color": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "image": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Image name. Image needs to exist in your file folder."
                                          },
                                          "valuePriority": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Parameter value priority."
                                          }
                                    },
                                    "required": [
                                          "paramValue"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "paramValues"
                  ]
            }
      },
      "required": [
            "paramIndex",
            "data"
      ]
}
  },
  {
    name: "update_products_variant_parameters",
    description: "Update of variant parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "paramName": {
                              "type": "string",
                              "description": "Name of parameter value. Maximal length of 255 characters."
                        },
                        "displayName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Parameter display name"
                        },
                        "paramIndex": {
                              "type": "string",
                              "description": "Url friendly name of parameter value. Maximal length of 255 characters. When changed, you must use the new paramIndex in the next API calls."
                        },
                        "priority": {
                              "type": "integer",
                              "description": "Parameter value priority."
                        }
                  }
            }
      },
      "required": [
            "paramIndex",
            "data"
      ]
}
  },
  {
    name: "delete_products_variant_parameters",
    description: "Removal of variant parameter",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "paramIndex"
      ]
}
  },
  {
    name: "update_products_variant_parameters_by_paramindex_and_rawvalu",
    description: "Update of variant parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            },
            "rawValue": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "paramValue": {
                              "type": "string",
                              "description": "Name of parameter value. Maximal length of 255 characters."
                        },
                        "rawValue": {
                              "type": "string",
                              "description": "Url friendly name of parameter value. Maximal length of 255 characters. When changed, you must use the new rawValue in the next API calls."
                        },
                        "color": {
                              "type": "string",
                              "nullable": true
                        },
                        "image": {
                              "type": "string",
                              "nullable": true,
                              "description": "Image name. Image needs to exist in your file folder."
                        },
                        "valuePriority": {
                              "type": "integer",
                              "description": "Parameter value priority."
                        }
                  }
            }
      },
      "required": [
            "paramIndex",
            "rawValue",
            "data"
      ]
}
  },
  {
    name: "delete_products_variant_parameters_by_paramindex_and_rawvalu",
    description: "Removal of variant parameter value",
    inputSchema: {
      "type": "object",
      "properties": {
            "paramIndex": {
                  "type": "string",
                  "description": ""
            },
            "rawValue": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "paramIndex",
            "rawValue"
      ]
}
  },
  {
    name: "list_products_consumption_taxes",
    description: "List of product consumption taxes. Returns the list of consumption taxes within the e-shop. In order to list consuption taxes, you will need to have the Consumption tax module activated on the customer's e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_products_consumption_taxes",
    description: "Creation of consumption tax",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Consumption tax name."
                        },
                        "price": {
                              "type": "string"
                        },
                        "currency": {
                              "type": "string",
                              "description": "Consumption tax currency."
                        },
                        "isVisible": {
                              "type": "boolean",
                              "description": "Flag, whether the consumption tax is visible in documents or not. If not set, default value is `true`."
                        }
                  },
                  "required": [
                        "name",
                        "price",
                        "currency"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_products_consumption_taxes",
    description: "Update of consumption tax",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "consumption tax identifier"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Consumption tax name."
                        },
                        "price": {
                              "type": "string"
                        },
                        "currency": {
                              "type": "string",
                              "description": "Consumption tax currency."
                        },
                        "isVisible": {
                              "type": "boolean",
                              "description": "Flag, whether the consumption tax is visible in documents or not."
                        }
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_products_consumption_taxes",
    description: "Deletion of consumption tax",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "consumption tax identifier"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_products_recycling_fee_categories",
    description: "List of recycling fee categories. Returns the list of recycling fee categories within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_products_warranties",
    description: "List of product warranties. Returns list of product warranties",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "get_products_alternativeProducts",
    description: "List of product alternative products. Returns list of alternative products related to product defined by 'guid', list is ordered by priority parameter.  If 'Pair reciprocally' option ('Settings > Product > Related and Alternative products') is enabled, list of  items will be enriched by items that has called product in own alternative t",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "visible": {
                  "type": "boolean",
                  "description": "If set to `true`, only visible products are returned (those, which does not have `visibility: hidden`)"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "create_products_alternativeProducts",
    description: "Add alternative product. This method add given product, defined with 'guid' at the end of the alternative product list. After product  is successfully saved, complete list of alternative product is returned in response",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "alternativeProduct": {
                              "type": "object",
                              "properties": {
                                    "guid": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "guid"
                              ]
                        }
                  },
                  "required": [
                        "alternativeProduct"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "set_products_alternativeProducts",
    description: "Set alternative products. This method set given products (minimum 0, maximum 50), defined with 'guid' to the alternative product list. After product  is successfully saved, complete list of alternative product is returned in response",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "alternativeProducts": {
                              "type": "array",
                              "description": "Array of new alternative products, minimum 0 item, maximum 50 items on request",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "guid": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "guid"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "alternativeProducts"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "get_products_relatedProducts",
    description: "List of product related products. Returns list of related products related to product defined by 'guid', list is ordered by priority parameter.  If 'Pair reciprocally' option ('Settings > Product > Related and Alternative products') is enabled, list of  items will be enriched by items that has called product in own related table",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "visible": {
                  "type": "boolean",
                  "description": "If set to `true`, only visible products are returned (those, which does not have `visibility: hidden`)"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "create_products_relatedProducts",
    description: "Add related product. This method add given product, defined with 'guid' at the end of the related product list. After product  is successfully saved, complete list of related product is returned in response",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "relatedProduct": {
                              "type": "object",
                              "properties": {
                                    "guid": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "guid"
                              ]
                        }
                  },
                  "required": [
                        "relatedProduct"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "set_products_relatedProducts",
    description: "Set related products. This method set given products (minimum 0, maximum 50), defined with 'guid' to the related product list. After product  is successfully saved, complete list of related product is returned in response",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "relatedProducts": {
                              "type": "array",
                              "description": "Array of new related products, minimum 0 item, maximum 50 items on request",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "guid": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "guid"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "relatedProducts"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "create_products_set",
    description: "Add item to product-set. This method adding product defined by product variant 'code' to the bundle (product set). Product defined in url by 'guid', must be set as 'type' : 'product-set'. When successfully saved, complete list of products in the set is returned in response. It is not allowed to add a product of the 'product",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid - Must be `product-set` type."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "setItem": {
                              "type": "object",
                              "properties": {
                                    "code": {
                                          "type": "string",
                                          "description": "product variant identifier"
                                    },
                                    "amount": {
                                          "type": "string"
                                    }
                              },
                              "required": [
                                    "code",
                                    "amount"
                              ]
                        }
                  },
                  "required": [
                        "setItem"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "set_products_set",
    description: "Set product-set items. This method set given products (minimum 0, maximum 50), defined by product variant 'code' to the bundle of products (product-set). Product defined in url by 'guid', must be set as 'type' : 'product-set'. When successfully saved, complete list of products in the set is returned in response. It is not",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid - Must be `product-set` type."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "setItems": {
                              "type": "array",
                              "description": "Array of new products assigned to set, minimum 0 item, maximum 50 items on request",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "product variant identifier"
                                          },
                                          "amount": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "code",
                                          "amount"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "setItems"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "list_products_units",
    description: "List of product units",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "get_products_gifts",
    description: "List of product gifts. Returns list of gifts related (product variants) to product",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "create_products_gifts",
    description: "Insertion gift product",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "giftCode": {
                              "type": "string",
                              "description": "Code of product variant."
                        }
                  },
                  "required": [
                        "giftCode"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "set_products_gifts",
    description: "Setting gifts to product",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Product guid"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "giftCodes": {
                              "type": "array",
                              "description": "array of gift codes.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "description": "Code of product variant."
                                          }
                                    },
                                    "required": [
                                          "code"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "giftCodes"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "list_pricelists",
    description: "List of price lists. Listing of all price lists set up in e-shop. Does not contain the paging, always lists all price lists",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_pricelists",
    description: "Pricelist insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of the pricelist"
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_pricelists",
    description: "Pricelist detail. Price list detail with product prices (variants) and info on discounts and limitations of purchase (minimum and maximum price)",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "Price list ID"
            },
            "code": {
                  "type": "string",
                  "description": "Product variant code"
            },
            "guid": {
                  "type": "string",
                  "description": "Product GUID"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 100."
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "update_pricelists",
    description: "Update pricelist. This endpoint allows updating price fields and other attributes from a pricelist of a product (variant).  You can request multiple updates at once; the maximum is 300 updates per request.  The request must contain a product variant code 'code' and at least one of the 'price',  'priceWithVat', 'price",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "string",
                  "description": "Pricelist id"
            },
            "data": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "code": {
                                    "type": "string",
                                    "description": "Product variant code"
                              },
                              "currencyCode": {
                                    "type": "string",
                                    "description": "Currency code. List of available currencies within the e-shop can be found in [Eshop info](#tag/eshop/geteshopinfo) endpoint."
                              },
                              "vatRate": {
                                    "type": "string",
                                    "nullable": true
                              },
                              "includingVat": {
                                    "type": "boolean",
                                    "description": "Whether the product prices are saved with vat or without."
                              },
                              "orderableAmount": {
                                    "type": "object",
                                    "description": "Orderable quantity",
                                    "properties": {
                                          "minimumAmount": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "maximumAmount": {
                                                "type": "string",
                                                "nullable": true
                                          }
                                    }
                              },
                              "sales": {
                                    "type": "object",
                                    "description": "Definition of discounts",
                                    "properties": {
                                          "minPriceRatio": {
                                                "type": "string"
                                          },
                                          "freeShipping": {
                                                "type": "boolean",
                                                "description": "flag, whether the product will have a free transport after it is placed in the cart."
                                          },
                                          "freeBilling": {
                                                "type": "boolean",
                                                "description": "flag, whether the product will have a free payment after it is placed in the cart."
                                          },
                                          "loyaltyDiscount": {
                                                "type": "boolean",
                                                "description": "flag, whether the loyalty discount should be used."
                                          },
                                          "volumeDiscount": {
                                                "type": "boolean",
                                                "description": "flag, whether the volume discount should be used."
                                          },
                                          "quantityDiscount": {
                                                "type": "boolean",
                                                "description": "flag, whether the volume/multibuy discount should be used."
                                          },
                                          "discountCoupon": {
                                                "type": "boolean",
                                                "description": "flag, whether a discount coupon can be applied."
                                          }
                                    }
                              },
                              "price": {
                                    "type": "object",
                                    "description": "Prices",
                                    "properties": {
                                          "price": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "commonPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "buyPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "priceRatio": {
                                                "type": "string"
                                          },
                                          "actionPrice": {
                                                "type": "object",
                                                "nullable": true,
                                                "description": "Special discounted price",
                                                "properties": {
                                                      "price": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "fromDate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "toDate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      }
                                                }
                                          }
                                    }
                              },
                              "priceWithVat": {
                                    "type": "object",
                                    "description": "Prices with VAT",
                                    "properties": {
                                          "price": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "commonPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "buyPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "priceRatio": {
                                                "type": "string"
                                          },
                                          "actionPrice": {
                                                "type": "object",
                                                "nullable": true,
                                                "description": "Special discounted price",
                                                "properties": {
                                                      "price": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "fromDate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "toDate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      }
                                                }
                                          }
                                    }
                              },
                              "priceWithoutVat": {
                                    "type": "object",
                                    "description": "Prices without VAT",
                                    "properties": {
                                          "price": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "commonPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "buyPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "priceRatio": {
                                                "type": "string"
                                          },
                                          "actionPrice": {
                                                "type": "object",
                                                "nullable": true,
                                                "description": "Special discounted price",
                                                "properties": {
                                                      "price": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "fromDate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "toDate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      }
                                                }
                                          }
                                    }
                              },
                              "prices": {
                                    "type": "object",
                                    "properties": {
                                          "purchasePrice": {
                                                "type": "object",
                                                "description": "Purchase price. Currently for preview only! Will be used as replace for buy price. Please watch API news.",
                                                "properties": {
                                                      "price": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "vatRate": {
                                                            "type": "string",
                                                            "nullable": true
                                                      },
                                                      "includingVat": {
                                                            "type": "boolean",
                                                            "description": "flag, whether the purchase price is including VAT"
                                                      }
                                                }
                                          }
                                    }
                              }
                        },
                        "required": [
                              "code"
                        ]
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_pricelists",
    description: "Pricelist delete. Deletion of pricelist can fail with error '423' in case of running import",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "string",
                  "description": "pricelist ID (number)"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "get_pricelists_snapshot",
    description: "List of all price list details. Using this endpoint, you can get list of all price list details with information on each price (like in Price list Detail endpoint) asynchronously. See how  [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer’s portal.   Response will be in [jsonlines",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "Price list ID"
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Export price list items with code after given value"
            },
            "codeTo": {
                  "type": "string",
                  "description": "Export price list items with code before given value"
            },
            "actionPriceDateFrom": {
                  "type": "string",
                  "description": "Export price list items with active action price date after date"
            },
            "actionPriceDateTo": {
                  "type": "string",
                  "description": "Export price list items with active action price before date"
            },
            "vatRate": {
                  "type": "string",
                  "description": "Export price list items with given vat rate"
            },
            "currencyCode": {
                  "type": "string",
                  "description": "Export price list items with given currency code"
            },
            "orderableMinAmount": {
                  "type": "number",
                  "description": "Export price list items with orderable minimal amount"
            },
            "orderableMinAmountFrom": {
                  "type": "number",
                  "description": "Export price list items with orderable minimal amount amount after given value"
            },
            "orderableMinAmountTo": {
                  "type": "number",
                  "description": "Export price list items with orderable minimal amount before given value"
            },
            "orderableMaxAmount": {
                  "type": "number",
                  "description": "Export price list items with orderable maximal amount"
            },
            "orderableMaxAmountFrom": {
                  "type": "number",
                  "description": "Export price list items with orderable maximal amount after given value"
            },
            "orderableMaxAmountTo": {
                  "type": "number",
                  "description": "Export price list items with orderable maximal amount before given value"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "update_pricelists_batch",
    description: "Batch pricelist update. This endpoint allows updating multiple prices at once. Price fields and other attributes from a pricelist of a product (variant) can be updated. Batch update  is processed asynchronously in same way as for example products snapshot, but  it does not have 'resultUrl' with prices to download in respon",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "Pricelist id"
            },
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "id",
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "list_sales_channels",
    description: "List of all sales channels. Provides a list of all sales channels",
    inputSchema: {
      "type": "object",
      "properties": {
            "type": {
                  "type": "string",
                  "description": "supported values: `in_store`, `online_store`, `marketplace`"
            }
      }
}
  },
  {
    name: "list_orders",
    description: "List of orders. List of orders in e-shop and cash desks. Endpoint supports  [Paging](#section/basic-principles/paging). For default calls, it returns 50 orders,  using the parameter '?itemsPerPage=100', you can request up to 100 orders at a time. Temporarily disabled, only 50 orders per page is supported. We apolog",
    inputSchema: {
      "type": "object",
      "properties": {
            "statusId": {
                  "type": "integer",
                  "description": "Purchase order filtering, according to order status id."
            },
            "shippingGuid": {
                  "type": "string",
                  "description": "Purchase order filtering, according to forwarder GUID."
            },
            "shippingCompanyCode": {
                  "type": "string",
                  "description": "Purchase order filtering, according to forwarder [company code](#tag/shipping-methods/getlistofshippingmethods)."
            },
            "paymentMethodGuid": {
                  "type": "string",
                  "description": "Purchase order filtering, according to payment method."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of creation. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of creation. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Purchase order filtering, according to order code."
            },
            "codeTo": {
                  "type": "string",
                  "description": "Purchase order filtering, according to order code."
            },
            "customerGuid": {
                  "type": "string",
                  "description": "Purchase order filtering, according to customer number."
            },
            "email": {
                  "type": "string",
                  "description": "Purchase order filtering, according to customer e-mail. The accurate match is searched for, regardless of capitalization."
            },
            "phone": {
                  "type": "string",
                  "description": "Purchase order filtering, according to customer phone. International format only (+420123456789)"
            },
            "productCode": {
                  "type": "string",
                  "description": "Order filter by product's code that is in order."
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of last update. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of last update. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "sourceId": {
                  "type": "integer",
                  "description": "Order source filtering according to source id. For more information, see List of order sources endpoint."
            },
            "orderCodes": {
                  "type": "string",
                  "description": "Define the output set of orders. Use max. 50 order codes separated by a comma. No additional filters take effect."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 50."
            }
      }
}
  },
  {
    name: "create_orders",
    description: "Order insertion. This endpoint enables insert the order into Shoptet, which was created in other system. You can use it for an import  from an older e-shop solution, or to transfer orders from external sales channels.  A large amount of info can be set, but for regular usage only a few attributes are needed. Values",
    inputSchema: {
      "type": "object",
      "properties": {
            "suppressDocumentGeneration": {
                  "type": "boolean",
                  "description": "suppress the generation of linked documents."
            },
            "suppressEmailSending": {
                  "type": "boolean",
                  "description": "suppress sending the linked information e-mails."
            },
            "suppressProductChecking": {
                  "type": "boolean",
                  "description": "suppress the product existence check as per `code` and GUID"
            },
            "suppressStockMovements": {
                  "type": "boolean",
                  "description": "suppress deduction of the products from stock"
            },
            "suppressHistoricalMandatoryFields": {
                  "type": "boolean",
                  "description": "set the flag that disables mandatory fields checking"
            },
            "suppressHistoricalPaymentChecking": {
                  "type": "boolean",
                  "description": "set the flag that `paymentMethodGuid` can be `null`"
            },
            "suppressHistoricalShippingChecking": {
                  "type": "boolean",
                  "description": "set the flag that `shippingGuid` can be `null`"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "creationTime": {
                              "type": "string",
                              "description": "time of order creation. Optional, current time is the default value."
                        },
                        "code": {
                              "type": "string",
                              "description": "Unique identifier for an e-shop order. Caution! This does not have to be just a number, it can also contain letters, a dash, etc."
                        },
                        "language": {
                              "type": "string",
                              "description": "Language of order. Available only if module foreignLanguages is active and initialized."
                        },
                        "externalCode": {
                              "type": "string",
                              "description": "order identification within the external system (mandatory, must be unique)."
                        },
                        "cashDeskOrder": {
                              "type": "boolean",
                              "description": "flag, if the order was created via the cash desk. Optional. `false` is the default value."
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order status. Optional. If not indicated, the default status of the order is used, as per e-shop settings. If the status definition sets the payment flag, the parameter `paid` is set to `true`. if the"
                        },
                        "sourceId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Order source id. Optional. If not indicated, no source will be used (null). If `sourceId` is positive, `cashDeskOnly` must also be set to `true`, otherwise if `sourceId` is negative, `cashDeskOnly` mu"
                        },
                        "salesChannelGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "email": {
                              "type": "string",
                              "description": "customer e-mail (can be omitted only when ordering via cash desk)."
                        },
                        "phone": {
                              "type": "string",
                              "nullable": true,
                              "description": "phone number of the customer. Optional, if not set as mandatory item in shop settings."
                        },
                        "birthDate": {
                              "type": "string",
                              "nullable": true,
                              "description": "customer birth date (optional, if not made mandatory by the e-shop settings)."
                        },
                        "vatPayer": {
                              "type": "boolean",
                              "description": "Flag, whether the invoice was issued in VAT payer mode, or VAT non-payer mode. Optional, if not indicated, it is used as per current settings of the e-shop (only makes sense for historical orders, if "
                        },
                        "paymentMethodGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "shippingGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "shippingDetails": {
                              "type": "null"
                        },
                        "paid": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "flag, whether the order was paid"
                        },
                        "billingMethodCode": {
                              "type": "integer",
                              "description": "Billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list. Optional."
                        },
                        "clientIPAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "IP address of the customer, from where the order was made"
                        },
                        "customerGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "billingAddress": {
                              "type": "object",
                              "description": "invoicing address",
                              "properties": {
                                    "company": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "company name. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "customer name. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "street": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "(string, optional) - street of the customer. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "streetWithNr": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Street, including street number. Optional, if necessary, to be divided to street and street number and saved in respective fields. Use if you only have the combined data. Usually, the `street` and `ho"
                                    },
                                    "houseNumber": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street number. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "city": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "City/Town. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "district": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "County. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "additional": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Additional information for the address. Optional."
                                    },
                                    "zip": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "ZIP or postal code. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "countryCode": {
                                          "type": "string",
                                          "description": "(string, optional) - country of the customer. Optional, the default delivery country is used as the default value, taken from eshop settings."
                                    },
                                    "regionName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region. Optional."
                                    },
                                    "regionShortcut": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region abbreviation. Optional."
                                    },
                                    "companyId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Company registration number of the customer, if purchasing as a company. Optional."
                                    },
                                    "vatId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "VAT identification number of the customer, if purchasing on the company."
                                    },
                                    "taxId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "TAX identification number of the customer, if purchasing on the company. For Czech address, taxId must be the same as vatId, or left empty. Optional."
                                    }
                              }
                        },
                        "addressesEqual": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "flag, whether the billing and delivery addresses are the same"
                        },
                        "deliveryAddress": {
                              "type": "null"
                        },
                        "notes": {
                              "type": "null"
                        },
                        "stockId": {
                              "type": "integer",
                              "description": "stock number. Optional, the default value is the default stock, taken from e-shop settings. In Shoptet, the only alternative to the default stock is to collect in person at the shop, otherwise the def"
                        },
                        "currency": {
                              "type": "object",
                              "properties": {
                                    "code": {
                                          "type": "string",
                                          "description": "Currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                                    },
                                    "exchangeRate": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "exchange rate for main e-shop currency."
                                    }
                              },
                              "required": [
                                    "code"
                              ]
                        },
                        "vatMode": {
                              "type": "string",
                              "description": "VAT mode, `Normal` is used by default, possible values: `Normal`, `One Stop Shop`*, `Reverse charge`, `Outside the EU`. Please note, that `One Stop Shop` value requires eshop `OSS` setting to be `true"
                        },
                        "items": {
                              "type": "array",
                              "description": "order items. The order must have at least one product item",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "itemType": {
                                                "type": "string",
                                                "description": "Item type. Mandatory field. See also [Type of order items](#section/code-lists/types-of-order-items) code list. `product` item type is min required. If `billing` type is present paymentMethodGuid must"
                                          },
                                          "name": {
                                                "type": "string",
                                                "description": "Product name (optional, but usually filled in). Mandatory only for transport and payment, for other items, it is loaded according to `code`."
                                          },
                                          "variantName": {
                                                "type": "string",
                                                "description": "Product variant name."
                                          },
                                          "brand": {
                                                "type": "string",
                                                "description": "brand (manufacturer). Optional."
                                          },
                                          "supplierName": {
                                                "type": "string",
                                                "description": "supplier name."
                                          },
                                          "productGuid": {
                                                "type": "string"
                                          },
                                          "code": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "remark": {
                                                "type": "string",
                                                "description": "remark for the item. Optional."
                                          },
                                          "warrantyDescription": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "textual description of warranty length (can be `null`)"
                                          },
                                          "amountCompleted": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "additionalField": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "additional information. Used for transport to specify the branch (can be `null`)"
                                          },
                                          "amount": {
                                                "type": "string",
                                                "description": "amount, 3 decimal places accuracy, optional, default value `1.000`."
                                          },
                                          "amountUnit": {
                                                "type": "string",
                                                "description": "unit of quantity (optional)"
                                          },
                                          "weight": {
                                                "type": "string",
                                                "description": "product weight in kilograms. Maximum 3 decimal places, and maximum value of 99999."
                                          },
                                          "priceRatio": {
                                                "type": "string",
                                                "description": "discount in the form of coefficient (0.7 = 70 % of the original price, i.e. 30 % discount). Optional, default value is `1.0000`"
                                          },
                                          "vatRate": {
                                                "type": "string",
                                                "description": "VAT rate (`0.00` for VAT non-payers). Mandatory."
                                          },
                                          "itemPriceWithVat": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                                          },
                                          "itemPriceWithoutVat": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                                          },
                                          "unitPriceWithVat": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Unit price including VAT. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                                          },
                                          "unitPriceWithoutVat": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Unit price excluding VAT. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                                          },
                                          "buyPriceWithVat": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Purchase price, including VAT. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                                          },
                                          "buyPriceWithoutVat": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Purchase price, excluding VAT. Optional. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                                          },
                                          "buyPriceVatRate": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "VAT rate for purchase price."
                                          },
                                          "statusId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                                          },
                                          "recyclingFeeId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "ID of the recycling fee."
                                          },
                                          "surchargeParameters": {
                                                "type": "array",
                                                "items": {
                                                      "type": "object",
                                                      "properties": {
                                                            "parameterCode": {
                                                                  "type": "string"
                                                            },
                                                            "valueIndex": {
                                                                  "type": "string"
                                                            },
                                                            "price": {
                                                                  "type": "string"
                                                            }
                                                      },
                                                      "required": [
                                                            "parameterCode",
                                                            "valueIndex"
                                                      ]
                                                }
                                          },
                                          "consumptionTaxId": {
                                                "type": "integer",
                                                "nullable": true,
                                                "description": "ID of the consumption tax. You can send this parameter, only if consumption tax module is enabled."
                                          }
                                    },
                                    "required": [
                                          "itemType",
                                          "vatRate"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "externalCode",
                        "currency"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_orders_history_snapshot",
    description: "List of all remarks. Using this endpoint, you can get list of all remarks with detailed info of each remark asynchronously.  See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.  Response will be in [jsonlines](https://jsonlines.org/) format with each rem",
    inputSchema: {
      "type": "object",
      "properties": {
            "orderCodes": {
                  "type": "string",
                  "description": "Define the output set of orders remarks. Use max. 50 order codes separated by a comma."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "date and time of remark creation - lower limit"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "date and time of remark creation - upper limit"
            },
            "userId": {
                  "type": "string",
                  "description": "identification of change originator, either user’s e-mail, or system process identifier"
            }
      }
}
  },
  {
    name: "list_orders_snapshot",
    description: "List of all orders. Using this endpoint, you can get list of all orders with detailed info of each order (like in Order Detail endpoint) asynchronously. See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   The list may be filtered by date of creation a",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Optional parts of response. Available values are `notes,images,shippingDetails,stockLocation,surchargeParameters`."
            },
            "orderCodes": {
                  "type": "string",
                  "description": "Define the output set of orders. Use max. 50 order codes separated by a comma. No additional filters take effect."
            },
            "statusId": {
                  "type": "integer",
                  "description": "Purchase order filtering, according to order status id."
            },
            "shippingGuid": {
                  "type": "string",
                  "description": "Purchase order filtering, according to forwarder GUID."
            },
            "shippingCompanyCode": {
                  "type": "string",
                  "description": "Purchase order filtering, according to forwarder [company code](#tag/shipping-methods/getlistofshippingmethods)."
            },
            "paymentMethodGuid": {
                  "type": "string",
                  "description": "Purchase order filtering, according to payment method."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of creation. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of creation. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Purchase order filtering, according to order code."
            },
            "codeTo": {
                  "type": "string",
                  "description": "Purchase order filtering, according to order code."
            },
            "customerGuid": {
                  "type": "string",
                  "description": "Purchase order filtering, according to customer number."
            },
            "email": {
                  "type": "string",
                  "description": "Purchase order filtering, according to customer e-mail. The accurate match is searched for, regardless of capitalization."
            },
            "phone": {
                  "type": "string",
                  "description": "Purchase order filtering, according to customer phone. International format only (+420123456789)"
            },
            "productCode": {
                  "type": "string",
                  "description": "Order filter by product's code that is in order."
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of last update. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Purchase order filtering, according to date of last update. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "sourceId": {
                  "type": "integer",
                  "description": "Order source filtering according to source id. For more information, see List of order sources endpoint."
            }
      }
}
  },
  {
    name: "update_orders_status_change",
    description: "Bulk order status change. The endpoint allows you to change the status for multiple order codes simultaneously.    Non-existing order codes are skipped and summarized in response errors. The request process continues even if some  order codes are skipped.    If you try to set the status that the order already has, no change",
    inputSchema: {
      "type": "object",
      "properties": {
            "suppressDocumentGeneration": {
                  "type": "boolean",
                  "description": "Suppress the generation of linked documents."
            },
            "suppressEmailSending": {
                  "type": "boolean",
                  "description": "Suppress sending the linked information e-mails."
            },
            "suppressSmsSending": {
                  "type": "boolean",
                  "description": "Suppress sending the linked information SMS messages."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "orderCodes": {
                              "type": "array",
                              "description": "order codes",
                              "items": {
                                    "type": "string"
                              }
                        },
                        "statusId": {
                              "type": "number",
                              "description": "order status identifier"
                        }
                  },
                  "required": [
                        "orderCodes",
                        "statusId"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_orders",
    description: "Order detail. This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand)).   Value | Section --------|------ 'notes' | Order remarks, including up to six additional fields, which can be freely used by e-sh",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "include": {
                  "type": "string",
                  "description": "optional parts of response"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "delete_orders",
    description: "Order deletion",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_orders_head",
    description: "Order head change. You can change basic info (head) of order with this method.  **Please note following rules**  - 'email' .. maxLength 100 characters  - 'phone' .. maxLength 32 characters  - 'billingAddress.company' .. maxLength 255 characters  - 'billingAddress.fullName' .. maxLength 255 characters  - 'billingAddres",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code (number)"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "creationTime": {
                              "type": "string",
                              "description": "time of order creation. Optional, current time is the default value."
                        },
                        "email": {
                              "type": "string",
                              "nullable": true,
                              "description": "customer e-mail (can be omitted only when ordering via cash desk)."
                        },
                        "phone": {
                              "type": "string",
                              "nullable": true,
                              "description": "phone number of the customer. Optional, if not set as mandatory item in shop settings."
                        },
                        "birthDate": {
                              "type": "string",
                              "nullable": true,
                              "description": "customer birth date (optional, if not made mandatory by the e-shop settings)."
                        },
                        "customerGuid": {
                              "type": "string"
                        },
                        "addressesEqual": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "flag, whether the billing and delivery addresses are the same"
                        },
                        "billingAddress": {
                              "type": "object",
                              "properties": {
                                    "company": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "company name. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "customer name. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "street": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "(string, optional) - street of the customer. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "houseNumber": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street number. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "city": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "City/Town. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "district": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "County. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "additional": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Additional information for the address. Optional."
                                    },
                                    "zip": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "ZIP or postal code. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "countryCode": {
                                          "type": "string",
                                          "description": "(string, optional) - country of the customer. Optional, the default delivery country is used as the default value, taken from eshop settings."
                                    },
                                    "regionName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region. Optional."
                                    },
                                    "regionShortcut": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region abbreviation. Optional."
                                    },
                                    "companyId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Company registration number of the customer, if purchasing as a company. Optional."
                                    },
                                    "vatId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "VAT identification number of the customer, if purchasing on the company."
                                    },
                                    "taxId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "TAX identification number of the customer, if purchasing on the company. For Czech address, taxId must be the same as vatId, or left empty. Optional."
                                    }
                              }
                        },
                        "deliveryAddress": {
                              "type": "object",
                              "nullable": true,
                              "properties": {
                                    "company": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "company name. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "customer name. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "street": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "(string, optional) - street for delivery. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "houseNumber": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street number. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "city": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "City/Town. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "district": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "County. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "additional": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Additional information for the address. Optional."
                                    },
                                    "zip": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "ZIP or postal code. Optional, if not set as mandatory item in shop settings."
                                    },
                                    "countryCode": {
                                          "type": "string",
                                          "description": "country of the customer. Optional, the default delivery country is used as the default value, taken from eshop settings."
                                    },
                                    "regionName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region. Optional."
                                    },
                                    "regionShortcut": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region abbreviation. Optional."
                                    }
                              }
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_orders_item",
    description: "Order item add",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "suppressProductChecking": {
                  "type": "boolean",
                  "description": "suppress the product existence check as per `code` and GUID"
            },
            "suppressStockMovements": {
                  "type": "boolean",
                  "description": "suppress deduction of the products from stock"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "itemType": {
                              "type": "string",
                              "description": "Item type. Mandatory field. See also [Types of order items](#section/code-lists/types-of-order-items) code list. Only `product`, `product-set`, `service`, `bazar`, `volume-discount` or `discount-coupo"
                        },
                        "code": {
                              "type": "string",
                              "description": "Item code. For transportation, payment and discounts the (`discount-coupon` and `volume-discount`) must remain `null`, for the other types of items, this is mandatory."
                        },
                        "vatRate": {
                              "type": "string",
                              "description": "VAT rate (`0.00` for VAT non-payers). Mandatory."
                        },
                        "itemPriceWithVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "itemPriceWithoutVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithVat": {
                              "type": "string",
                              "description": "Unit price including VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithoutVat": {
                              "type": "string",
                              "description": "Unit price excluding VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "buyPriceWithVat": {
                              "type": "string",
                              "description": "Purchase price, including VAT. Optional. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                        },
                        "buyPriceWithoutVat": {
                              "type": "string",
                              "description": "Purchase price, excluding VAT. Optional. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                        },
                        "buyPriceVatRate": {
                              "type": "string",
                              "description": "VAT rate for purchase price. Optional."
                        },
                        "name": {
                              "type": "string",
                              "description": "Product name (optional, but usually filled in). Mandatory only for volume-discount, discount-coupon, transport and payment, for other items, it is loaded according to `code`."
                        },
                        "variantName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Variant name. Optional."
                        },
                        "brand": {
                              "type": "string",
                              "nullable": true,
                              "description": "brand (manufacturer). Optional."
                        },
                        "supplierName": {
                              "type": "string",
                              "nullable": true,
                              "description": "supplier. Optional."
                        },
                        "productGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "With cubicles"
                        },
                        "warrantyDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "textual description of warranty length (can be `null`)"
                        },
                        "amountCompleted": {
                              "type": "string",
                              "nullable": true
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional information. Used for transport to specify the branch."
                        },
                        "amount": {
                              "type": "string",
                              "description": "amount, 3 decimal places accuracy, optional, default value `1.000`."
                        },
                        "amountUnit": {
                              "type": "string",
                              "description": "unit of quantity (optional)"
                        },
                        "weight": {
                              "type": "string",
                              "description": "product weight in kilograms. Maximum 3 decimal places, and maximum value of 99999."
                        },
                        "priceRatio": {
                              "type": "string",
                              "description": "discount in the form of coefficient (0.7 = 70 % of the original price, i.e. 30 % discount). Optional, default value is `1.0000`"
                        },
                        "recyclingFeeId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Product recycling fee id, replacement for `recyclingFee`"
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                        },
                        "surchargeParameters": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "parameterCode": {
                                                "type": "string"
                                          },
                                          "valueIndex": {
                                                "type": "string"
                                          },
                                          "price": {
                                                "type": "string"
                                          }
                                    },
                                    "required": [
                                          "parameterCode",
                                          "valueIndex"
                                    ]
                              }
                        },
                        "consumptionTaxId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of the consumption tax. You can send this parameter, only if consumption tax module is enabled."
                        }
                  },
                  "required": [
                        "itemType"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_orders_item",
    description: "Order item change",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code (number)"
            },
            "id": {
                  "type": "string",
                  "description": "order item id. Can be found in field `data.order.items.itemId` in Order detail.  (number)"
            },
            "suppressProductGuidCheck": {
                  "type": "boolean",
                  "description": "suppress the product existence check per GUID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "itemType": {
                              "type": "string",
                              "description": "Item type. Mandatory field; see also [Types of order items](#section/code-lists/types-of-order-items) code list. Only `product`, `product-set`, `service`, `bazar`, `volume-discount` or `discount-coupo"
                        },
                        "code": {
                              "type": "string",
                              "description": "Item code. For transportation, payment and discounts the (`discount-coupon` and `volume-discount`) must remain `null`, for the other types of items, this is mandatory."
                        },
                        "vatRate": {
                              "type": "string",
                              "description": "VAT rate (`0.00` for VAT non-payers). Mandatory."
                        },
                        "itemPriceWithVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "itemPriceWithoutVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithVat": {
                              "type": "string",
                              "description": "Unit price including VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithoutVat": {
                              "type": "string",
                              "description": "Unit price excluding VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "buyPriceWithVat": {
                              "type": "string",
                              "description": "Purchase price, including VAT. Optional. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                        },
                        "buyPriceWithoutVat": {
                              "type": "string",
                              "description": "Purchase price, excluding VAT. Optional. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                        },
                        "buyPriceVatRate": {
                              "type": "string",
                              "description": "VAT rate for purchase price. Optional."
                        },
                        "name": {
                              "type": "string",
                              "description": "Product name (optional, but usually filled in). Mandatory only for transport and payment, for other items, it is loaded according to `code`."
                        },
                        "variantName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Variant name. Optional."
                        },
                        "brand": {
                              "type": "string",
                              "nullable": true,
                              "description": "brand (manufacturer). Optional."
                        },
                        "supplierName": {
                              "type": "string",
                              "nullable": true,
                              "description": "supplier. Optional."
                        },
                        "productGuid": {
                              "type": "string",
                              "nullable": true
                        },
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "With cubicles"
                        },
                        "warrantyDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "textual description of warranty length (can be `null`)"
                        },
                        "amountCompleted": {
                              "type": "string",
                              "nullable": true
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional information. Used for transport to specify the branch."
                        },
                        "amount": {
                              "type": "string",
                              "description": "amount, 3 decimal places accuracy, optional, default value `1.000`."
                        },
                        "amountUnit": {
                              "type": "string",
                              "description": "unit of quantity (optional)"
                        },
                        "weight": {
                              "type": "string",
                              "description": "product weight in kilograms. Maximum 3 decimal places, and maximum value of 99999."
                        },
                        "priceRatio": {
                              "type": "string",
                              "description": "discount in the form of coefficient (0.7 = 70 % of the original price, i.e. 30 % discount). Optional, default value is `1.0000`"
                        },
                        "recyclingFeeId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Product recycling fee id, replacement for `recyclingFee`"
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                        },
                        "consumptionTaxId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of the consumption tax. You can send this parameter, only if consumption tax module is enabled."
                        },
                        "consumptionTax": {
                              "type": "object",
                              "nullable": true,
                              "description": "consumption tax with custom value, cannot be used together with `consumptionTaxId`. You can send this parameter, only if consumption tax module is enabled.",
                              "properties": {
                                    "currency": {
                                          "type": "string",
                                          "description": "Currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                                    },
                                    "price": {
                                          "type": "string",
                                          "nullable": true
                                    }
                              },
                              "required": [
                                    "currency",
                                    "price"
                              ]
                        }
                  },
                  "required": [
                        "itemType"
                  ]
            }
      },
      "required": [
            "code",
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_orders_item",
    description: "Order item delete",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code (number)"
            },
            "id": {
                  "type": "string",
                  "description": "order item id. Can be found in field `data.order.items.itemId` in Order detail. (number)"
            }
      },
      "required": [
            "code",
            "id"
      ]
}
  },
  {
    name: "create_orders_item_surcharge_parameters",
    description: "Order item surcharge parameters insertion. There is possibility to edit surcharge parameters related to order item. For that purpose, there is in get order item detail endpoint attribute 'specificSurchargeParameters' which returned adjusted surcharge  parameters data (see order item detail [endpoint](#tag/orders/getorderdetail))   This mean",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "id": {
                  "type": "integer",
                  "description": "order item id"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "parameterCode": {
                              "type": "string",
                              "description": "Code of the parameter"
                        },
                        "valueIndex": {
                              "type": "string",
                              "description": "Index of the value"
                        },
                        "price": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "parameterCode",
                        "valueIndex"
                  ]
            }
      },
      "required": [
            "code",
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_orders_item_surcharge_parameters",
    description: "Order item surcharge parameters deletion. You have to provide dynamically generated 'relationId' which identify which surcharge parameter related to order item you want to delete",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "id": {
                  "type": "integer",
                  "description": "order item id"
            },
            "relationId": {
                  "type": "string",
                  "description": "key to identify, which surcharge parameter in relation to order item, should be delete"
            }
      },
      "required": [
            "code",
            "id",
            "relationId"
      ]
}
  },
  {
    name: "create_orders_payment",
    description: "Order payment add",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "vatRate": {
                              "type": "string"
                        },
                        "itemPriceWithVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "itemPriceWithoutVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithVat": {
                              "type": "string",
                              "description": "Unit price including VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithoutVat": {
                              "type": "string",
                              "description": "Unit price excluding VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "buyPriceWithVat": {
                              "type": "string",
                              "description": "Purchase price, including VAT. Optional. Price including tax and price excluding tax cannot be combined. This is used for profit margin calculation and statistics."
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional information."
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                        }
                  },
                  "required": [
                        "guid",
                        "vatRate"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_orders_payment",
    description: "Order payment update",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "id": {
                  "type": "integer",
                  "description": "id of order item"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "vatRate": {
                              "type": "string",
                              "description": "VAT rate (`0.00` for VAT non-payers)."
                        },
                        "itemPriceWithVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "itemPriceWithoutVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithVat": {
                              "type": "string",
                              "description": "Unit price including VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithoutVat": {
                              "type": "string",
                              "description": "Unit price excluding VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional information."
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                        }
                  }
            }
      },
      "required": [
            "code",
            "id",
            "data"
      ]
}
  },
  {
    name: "create_orders_shipping",
    description: "Order shipping add",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "vatRate": {
                              "type": "string",
                              "description": "VAT rate (`0.00` for VAT non-payers)."
                        },
                        "itemPriceWithVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "itemPriceWithoutVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithVat": {
                              "type": "string",
                              "description": "Unit price including VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithoutVat": {
                              "type": "string",
                              "description": "Unit price excluding VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "In case of pickup, given value must be a unique identificator of pickup place. You can find these identificators on website of delivery company. In case of other delivery type (e.g. home delivery) it "
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                        }
                  },
                  "required": [
                        "guid",
                        "vatRate"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_orders_shipping",
    description: "Order shipping update",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "order code"
            },
            "id": {
                  "type": "integer",
                  "description": "id of order item"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string"
                        },
                        "vatRate": {
                              "type": "string",
                              "description": "VAT rate (`0.00` for VAT non-payers)."
                        },
                        "itemPriceWithVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithVat` instead. Item price including VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "itemPriceWithoutVat": {
                              "type": "string",
                              "description": "Deprecated: use `unitPriceWithoutVat` instead. Item price excluding VAT. Optional. Only one of the items `itemPriceWithVat` or `itemPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithVat": {
                              "type": "string",
                              "description": "Unit price including VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "unitPriceWithoutVat": {
                              "type": "string",
                              "description": "Unit price excluding VAT. Optional. Only one of the items `unitPriceWithVat` or `unitPriceWithoutVat` must be entered."
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "In case of pickup, given value must be a unique identificator of pickup place. You can find these identificators on website of delivery company. In case of other delivery type (e.g. home delivery) it "
                        },
                        "statusId": {
                              "type": "integer",
                              "description": "Order item status. Optional, if not indicated, default value is guided by the order status. If the order status was indicated and this status has the `Change status of items in the order` flag set, th"
                        }
                  }
            }
      },
      "required": [
            "code",
            "id",
            "data"
      ]
}
  },
  {
    name: "get_orders_pdf",
    description: "Download order as PDF. You can request the order as PDF file, response will be as application/octet-stream. You can download pdf documents  only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_orders_history",
    description: "List of remarks for the order. The endpoint shows the order history which is displayed in Shoptet administration in the  “History” tab, in the order detail. Thus they are the most important system actions that have affected the order (they cannot be  changed by the user) and then the notes added by the e-shop, primarily intended",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Order code"
            },
            "system": {
                  "type": "boolean",
                  "description": "allows filtering only system/non-system remarks"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_orders_history",
    description: "Insertion of remark to order. This endpoint may be used to add the user remark into the order history.  For example the payment gateway may give the payment identification at its side, or  add the remarks during the process of payment or order processing. The remarks  are displayed in administration, in the “History” tab, in the",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "text": {
                              "type": "string"
                        },
                        "type": {
                              "type": "string",
                              "enum": [
                                    "comment",
                                    "system"
                              ],
                              "description": "Record type"
                        }
                  },
                  "required": [
                        "text"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_orders_history",
    description: "Delete order history item. Delete order history item by primary key",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Order code"
            },
            "id": {
                  "type": "integer",
                  "description": "ID of history item"
            }
      },
      "required": [
            "code",
            "id"
      ]
}
  },
  {
    name: "update_orders_notes",
    description: "Update remarks for the order. The endpoint enables the remarks and additional fields (index 1 - 6) to be updated for the order. Within a call, the update  of more data can be called for.   The individual data object keys are not optional. Only the key values, which are included in the data object, will be updated.   If \"customer",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "customerRemark": {
                              "type": "string",
                              "nullable": true
                        },
                        "trackingNumber": {
                              "type": "string",
                              "nullable": true
                        },
                        "additionalFields": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "index": {
                                                "type": "integer",
                                                "enum": [
                                                      1,
                                                      2,
                                                      3,
                                                      4,
                                                      5,
                                                      6
                                                ]
                                          },
                                          "text": {
                                                "type": "string",
                                                "nullable": true
                                          }
                                    },
                                    "required": [
                                          "index",
                                          "text"
                                    ]
                              }
                        },
                        "eshopRemark": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_orders_status",
    description: "Update of order status. The endpoint enables the order status, “paid” flag and payment method to be updated. This data must be set during a call.  All the fields to be updated are optional, but at least one has to be specified.   If the key value is \"text\" for NULL additional field, the originally saved text in this field",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "suppressDocumentGeneration": {
                  "type": "boolean",
                  "description": "suppress the generation of linked documents."
            },
            "suppressEmailSending": {
                  "type": "boolean",
                  "description": "suppress sending the linked information e-mails."
            },
            "suppressSmsSending": {
                  "type": "boolean",
                  "description": "suppress sending the linked information SMS messages."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "statusId": {
                              "type": "integer",
                              "description": "New order status. The order statuses are specific for each e-shop and it is possible to gain these from the endpoint [Eshop info](#tag/eshop/geteshopinfo) with the `include=orderStatuses` parameter"
                        },
                        "paid": {
                              "type": "boolean",
                              "nullable": true,
                              "description": "paid flag"
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "description": "billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list"
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_orders_copy",
    description: "Order copy. This endpoint allows you to copy a order identified by its code.  You can choose scope in which will be the order copied. The scope can be - 'all' - copy the order with all its items - 'no-billing-shipping' - copy the order without billing and shipping items - 'contact-only' - copy the order without",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "include": {
                  "type": "string",
                  "description": "optional parts of response"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "scope": {
                              "type": "string",
                              "enum": [
                                    "all",
                                    "no-billing-shipping",
                                    "contact-only"
                              ],
                              "description": "Scope of the order copy. Check endpoint description for more information."
                        }
                  },
                  "required": [
                        "scope"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_orders_delivery_notes",
    description: "Delivery note from Order creation. Creating delivery note from existing order",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Order code"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "code": {
                              "type": "string",
                              "description": "Delivery note code."
                        },
                        "date": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "code"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "list_orders_statuses",
    description: "List of order statuses. Detailed information on order status within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_orders_sources",
    description: "List of order sources. Detailed information on current possible order sources within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_orders_changes",
    description: "Last order changes. The Endpoint is intended to determine the changes after you have loaded the complete list of orders and you need to know, if any of these has been changed (or deleted). Guaranteed history is 30 days, the older data are deleted progressively.   Each order in the log is only mentioned with its last ch",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 1000."
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_orders_claims",
    description: "Orders with product claims. Endpoint listing all ordered products with unfulfilled claims.  Endpoint supports [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "includeClosedAndCancelledOrders": {
                  "type": "boolean",
                  "description": "Include orders in final state - such as closed and cancelled orders. Default `false`. DEPRECATED due to misleading name and actual irrelevance. To be "
            },
            "productCode": {
                  "type": "string",
                  "description": "Filter order claims by product code"
            },
            "orderCode": {
                  "type": "string",
                  "description": "Filter order claims by order code"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 100. Max value is 250."
            }
      }
}
  },
  {
    name: "create_orders_batch",
    description: "Order BATCH insertion. **Beta/Experimental feature: This endpoint is currently in beta and may exhibit unexpected behavior.**     This endpoint allows you to create multiple orders at once. Batch insertion is processed asynchronously in the same way as, for example, [List of all orders](#Orders/list-of-all-orders), but it",
    inputSchema: {
      "type": "object",
      "properties": {
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "list_orders_gifts",
    description: "Get order gifts list. This endpoint allow get, add or delete order related gifts. Gifts is relation to product variant by its 'code' identifier and is ordered by 'priority' field",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_orders_gifts",
    description: "Add order gift at the end of the list. Add order gift (product variant) at the end of the order gift list. Gift is defined by 'code'.  'code', 'orderPrice' and 'currencyCode' is required",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "code": {
                              "type": "string",
                              "description": "code od product variant"
                        },
                        "currencyCode": {
                              "type": "string",
                              "description": "Currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                        },
                        "orderPrice": {
                              "type": "string",
                              "nullable": true
                        },
                        "includingVat": {
                              "type": "boolean",
                              "description": "if true, orderPrice is including VAT"
                        }
                  },
                  "required": [
                        "code",
                        "orderPrice",
                        "currencyCode"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "delete_orders_gifts",
    description: "Delete order gift. Delete order gift item by primary key",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "ID of gift"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_orders_gifts_settings",
    description: "Get order gift settings. There are order gift setting, which influence general behaviour.  - The behavior of the gifts - set if gifts are dependent on each product or whole order (stock dependent/independent) - Offer to wholesale customers - define if customer with wholesale module have gifts offer available - Gift to whole",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "update_orders_gifts_settings",
    description: "Update order gift settings. Method updates order gift settings. Every item in request body is optional, but at least one setting is required",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "stockDependent": {
                              "type": "boolean",
                              "description": "define if gifts are dependent on each product or whole order, stock dependent/independent"
                        },
                        "wholesaleGiftsEnabled": {
                              "type": "boolean",
                              "description": "define if customer with wholesale module have gifts offer available"
                        },
                        "productGifts": {
                              "type": "string",
                              "enum": [
                                    "per-amount",
                                    "per-order"
                              ],
                              "description": "set if gifts are dependent on each product or whole order, possible values are `per-amount` and `per-order"
                        }
                  }
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_invoices",
    description: "List of invoices. Returns the list of invoices with basic information.  The list of invoices supports [Paging](#section/basic-principles/paging)   The code ('code') is the invoice identifier. Although this is usually a number,  it is necessary to take into account that this might also include letters, a dash, etc. Fi",
    inputSchema: {
      "type": "object",
      "properties": {
            "isValid": {
                  "type": "boolean",
                  "description": "filtering according to document validity"
            },
            "proformaInvoiceCode": {
                  "type": "string",
                  "description": "filtering according to number of proforma invoice"
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "filtering according to date of invoice issue"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "filtering according to date of invoice issue"
            },
            "taxDateFrom": {
                  "type": "string",
                  "description": "filtering according to tax date of invoice"
            },
            "orderCode": {
                  "type": "string",
                  "description": "filtering according to order code of invoice"
            },
            "codeFrom": {
                  "type": "string",
                  "description": "filtering according to code of invoice"
            },
            "codeTo": {
                  "type": "string",
                  "description": "filtering according to code of invoice"
            },
            "varSymbol": {
                  "type": "string",
                  "description": "filtering according to variable symbol of invoice"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 1000."
            }
      }
}
  },
  {
    name: "list_invoices_snapshot",
    description: "List of all invoices. Using this endpoint, you can get list of all invoices with detailed info of each invoice (like in Invoice Detail endpoint) asynchronously.    See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will be in [jsonlines](https",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export invoices created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export invoices created before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Export invoices updated after date"
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Export invoices updated before date"
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Export invoices with code after given value"
            },
            "codeTo": {
                  "type": "string",
                  "description": "Export invoices with code before given value"
            },
            "proformaInvoiceCodeFrom": {
                  "type": "string",
                  "description": "Export invoices with proforma invoice code after given value"
            },
            "proformaInvoiceCodeTo": {
                  "type": "string",
                  "description": "Export invoices with proforma invoice code befor given value"
            },
            "dueDateFrom": {
                  "type": "string",
                  "description": "Export invoices with due date after date"
            },
            "dueDateTo": {
                  "type": "string",
                  "description": "Export invoices with due date before date"
            },
            "taxDateFrom": {
                  "type": "string",
                  "description": "Export invoices with tax date after date"
            },
            "taxDateTo": {
                  "type": "string",
                  "description": "Export invoices with tax date before date"
            },
            "orderCodeFrom": {
                  "type": "string",
                  "description": "Export invoices with order code after given value"
            },
            "orderCodeTo": {
                  "type": "string",
                  "description": "Export invoices with order code before given value"
            },
            "customerGuid": {
                  "type": "string",
                  "description": "Export invoices with given customer"
            },
            "varSymbol": {
                  "type": "string",
                  "description": "Export invoices with given variable symbol"
            },
            "isValid": {
                  "type": "boolean",
                  "description": "Filtering according to document validity"
            },
            "hasTaxId": {
                  "type": "boolean",
                  "description": "Filtering according to the presence of a TAX identification number"
            },
            "hasVatId": {
                  "type": "boolean",
                  "description": "Filtering according to the presence of a VAT identification number"
            },
            "hasCompanyId": {
                  "type": "boolean",
                  "description": "Filtering according to the presence of a company registration number"
            }
      }
}
  },
  {
    name: "get_invoices",
    description: "Invoice detail. Detailed information about one invoice.   In most cases the items in the response are the same as you can see in the administration of PDF printout of an invoice. There are however some advanced cases (in case of coupon discount with absolute value or in case of a volume discount and products with m",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_orders_invoice",
    description: "Invoice from order creation. Creating invoice from existing order",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Code of order"
            },
            "suppressExistenceCheck": {
                  "type": "boolean",
                  "description": "suppress checking of existing invoices per order (allows multiple invoices per order)"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "invoiceCode": {
                              "type": "string",
                              "description": "Invoice code. Optional, generated by eshop settings if not set."
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "dueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "taxDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "constSymbol": {
                              "type": "string",
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer"
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list. Defaults to order's."
                        },
                        "proformaInvoiceCode": {
                              "type": "string",
                              "description": "Code of proforma invoice. Must exist if set."
                        },
                        "proofPaymentCodes": {
                              "type": "array",
                              "description": "List of linked proof payments.",
                              "items": {
                                    "type": "string"
                              }
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_api_orders_{code}_proforma_invoice.yaml",
    description: "Proforma invoice from order creation. Creating proforma invoice from existing order",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Code of order"
            },
            "suppressExistenceCheck": {
                  "type": "boolean",
                  "description": "suppress checking of existing proforma invoices per order (allows multiple proforma invoices per order)"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "proformaInvoiceCode": {
                              "type": "string",
                              "description": "Proforma invoice code. Optional, generated by eshop settings if not set."
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "creationTime": {
                              "type": "string",
                              "nullable": true
                        },
                        "dueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "constSymbol": {
                              "type": "string",
                              "nullable": true,
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer",
                              "nullable": true
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list. Defaults to order's."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_proforma_invoices_invoice",
    description: "Invoice from proforma invoice creation. Creating invoice from existing proforma invoice",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Code of proforma invoice"
            },
            "suppressExistenceCheck": {
                  "type": "boolean",
                  "description": "suppress checking of existing invoices per order (allows multiple invoices per order)"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "invoiceCode": {
                              "type": "string",
                              "description": "Invoice code. Optional, generated by eshop settings if not set."
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "dueDate": {
                              "type": "string"
                        },
                        "taxDate": {
                              "type": "string"
                        },
                        "constSymbol": {
                              "type": "string",
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer"
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Id of [billing method](#section/code-lists/Invoice-Billing-Methods). Defaults to order's."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_invoices_link_proforma_invoice",
    description: "Invoice link proforma invoices. Linking proforma invoices to invoice. Proforma invoices must be related to the order, must be in same currency as the order, must be valid and cannot be linked to another invoice. Multiple proforma invoices are allowed to link to the invoice. This endpoint has several sections, which are only sent w",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Code of the invoice"
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "proformaInvoiceCodes": {
                              "type": "array",
                              "description": "List of linked proforma invoices.",
                              "items": {
                                    "type": "string",
                                    "description": "Proforma invoice code. The proforma payment invoice be related to the order, must be in same currency as the order, must be valid and cannot be linked to another invoice."
                              }
                        }
                  },
                  "required": [
                        "proformaInvoiceCodes"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_invoices_link_proof_payment",
    description: "Invoice link proof payments. Linking proof payments to invoice. Proof payments must be related to the order, must be in same currency  as the order, must be valid and cannot be linked to another invoice.   This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Code of the invoice"
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "proofPaymentCodes": {
                              "type": "array",
                              "description": "List of linked proof payments.",
                              "items": {
                                    "type": "string",
                                    "description": "Proof payment code. The proof payment must be related to the order, must be in same currency as the order, must be valid and cannot be linked to another invoice."
                              }
                        }
                  },
                  "required": [
                        "proofPaymentCodes"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "get_invoices_pdf",
    description: "Download invoice as PDF. You can request the invoice as PDF file, response will be as application/octet-stream. You can download pdf documents only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_invoices_isdoc",
    description: "Download invoice as ISDOC. You can request the invoice as ISDOC file, response will be as application/octet-stream. You can download the documents only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "list_invoices_changes",
    description: "Last invoice changes. Returns the list of invoices, which were changed (added/changed or deleted). Endpoint is intended to determine the changes after you have loaded the complete list of invoices and you need to know if any of these was been changed (or deleted). Guaranteed history is 30 days, the older data are deleted",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_proforma_invoices",
    description: "List of proforma invoices. Returns the list of proforma invoices. Supports the  [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "isValid": {
                  "type": "boolean",
                  "description": "filtering according to document validity"
            },
            "orderCode": {
                  "type": "string",
                  "description": "filtering according to number of order."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "filtering items created after or same as requested datetime. ISO 8601 format (\"2017-12-12T22:08:01+0100\")."
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "filtering items created before or same as requested datetime. ISO 8601 format (\"2017-12-12T22:08:01+0100\")"
            },
            "varSymbol": {
                  "type": "string",
                  "description": "filtering according to variable symbol of proforma invoice"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 100."
            }
      }
}
  },
  {
    name: "list_proforma_invoices_snapshot",
    description: "List of all proforma invoices. Using this endpoint, you can get list of all proforma invoices with detailed info of each proforma invoice (like in Proforma invoice detail endpoint) asynchronously. See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will",
    inputSchema: {
      "type": "object",
      "properties": {
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export proforma invoices created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export proforma invoices created before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Export proforma invoices updated after date"
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Export proforma invoices updated before date"
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Export proforma invoices with code after given value (given code included)"
            },
            "codeTo": {
                  "type": "string",
                  "description": "Export proforma invoices with code before given value (given code included)"
            },
            "proformaInvoiceCodeFrom": {
                  "type": "string",
                  "description": "Export invoices with proforma invoice code after given value"
            },
            "proformaInvoiceCodeTo": {
                  "type": "string",
                  "description": "Export invoices with proforma invoice code befor given value"
            },
            "isValid": {
                  "type": "boolean",
                  "description": "Filtering according to document validity"
            },
            "paid": {
                  "type": "boolean",
                  "description": "Filtering according to if proforma invoice is paid"
            },
            "currencyCode": {
                  "type": "string",
                  "description": "Export proforma invoices with given currency code, if given currency code does not exists, or is not valid, it will throw an exception"
            }
      }
}
  },
  {
    name: "get_proforma_invoices",
    description: "Proforma invoice detail. Additional information about one proforma invoice.  This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand)).  Value | Section --------|------ 'surchargeParameters'| Item surcharge paramet",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_proforma_invoices_pdf",
    description: "Download proforma invoice as PDF. You can request the proforma invoice as PDF file, response will be as application/octet-stream. You can download pdf documents  only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "list_proforma_invoices_changes",
    description: "Last proforma invoice changes. Returns the list of proforma invoices, which were changed. The Endpoint is intended to determine the changes after you have loaded the list of proforma invoices and you need to know the changes. The guaranteed history of changes is 30 days.   Each proforma invoice is only given in the listing with i",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_proof_payments",
    description: "List of proof payments. The list of proof payments supports [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "filtering according to proof payments code. Optional."
            },
            "orderCode": {
                  "type": "string",
                  "description": "filtering according to order code. Optional."
            },
            "proformaInvoiceCode": {
                  "type": "string",
                  "description": "filtering according to proforma invoice code. Optional."
            },
            "invoiceCode": {
                  "type": "string",
                  "description": "filtering by invoice code"
            },
            "issueDate": {
                  "type": "string",
                  "description": "filtering according to date on which was proof payment issued. In ISO 8601 format. Optional."
            },
            "isValid": {
                  "type": "boolean",
                  "description": "filtering according to proof payments validity. Optional."
            },
            "closed": {
                  "type": "boolean",
                  "description": "filtering by proof payment closed/open"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 100."
            }
      }
}
  },
  {
    name: "create_proof_payments",
    description: "Proof payment insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "proformaInvoiceCode": {
                              "type": "string",
                              "description": "proforma invoice code; required if no `orderCode`"
                        },
                        "orderCode": {
                              "type": "string",
                              "description": "order code; required if no `proformaInvoiceCode`"
                        },
                        "payment": {
                              "type": "string",
                              "nullable": true
                        },
                        "currencyCode": {
                              "type": "string",
                              "description": "Currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "issueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "taxDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "constSymbol": {
                              "type": "string",
                              "nullable": true,
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer",
                              "nullable": true
                        },
                        "invoiceBillingMethodId": {
                              "type": "integer",
                              "description": "billing method identifier (can be `null`) - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list"
                        },
                        "billBankAccount": {
                              "type": "string",
                              "nullable": true,
                              "description": "bank account on the bill (can be `null`)"
                        },
                        "billIban": {
                              "type": "string",
                              "nullable": true,
                              "description": "e-shop IBAN on the bill (can be `null`)"
                        },
                        "billBic": {
                              "type": "string",
                              "nullable": true,
                              "description": "bank code - SWIFT on the bill (can be `null`)"
                        },
                        "documentRemark": {
                              "type": "string",
                              "nullable": true,
                              "description": "document remark (can be `null`)"
                        }
                  },
                  "required": [
                        "payment",
                        "currencyCode",
                        "varSymbol"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_proof_payments",
    description: "Proof payment detail. Additional information about one proof payment",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_proof_payments",
    description: "Proof payment update. If the proof payment is closed, response code '409' is returned and the document cannot be updated. Proof payment is closed if:   - proof payment is/was linked to the invoice or   - there is a manual lock of proof payment",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "taxDate": {
                              "type": "string"
                        },
                        "issueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "constSymbol": {
                              "type": "string",
                              "nullable": true,
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer",
                              "nullable": true
                        },
                        "invoiceBillingMethodId": {
                              "type": "integer",
                              "description": "billing method identifier (can be `null`) - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list"
                        },
                        "billBankAccount": {
                              "type": "string",
                              "nullable": true,
                              "description": "bank account on the bill (can be `null`)"
                        },
                        "billIban": {
                              "type": "string",
                              "nullable": true,
                              "description": "e-shop IBAN on the bill (can be `null`)"
                        },
                        "billBic": {
                              "type": "string",
                              "nullable": true,
                              "description": "bank code - SWIFT on the bill (can be `null`)"
                        },
                        "bankAccount": {
                              "type": "string",
                              "nullable": true,
                              "description": "bank account (can be `null`)"
                        },
                        "iban": {
                              "type": "string",
                              "nullable": true,
                              "description": "e-shop IBAN (can be `null`)"
                        },
                        "bic": {
                              "type": "string",
                              "nullable": true,
                              "description": "bank code - SWIFT (can be `null`)"
                        },
                        "isValid": {
                              "type": "boolean",
                              "description": "is proof payment valid?"
                        },
                        "documentRemark": {
                              "type": "string",
                              "nullable": true,
                              "description": "remark on the document"
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_proof_payments",
    description: "Proof payment deletion. If the proof payment is closed, response code '409' is returned and the document cannot be deleted. Proof payment is closed if:   - proof payment is/was linked to the invoice or   - there is a manual lock of proof payment",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "list_proof_payments_snapshot",
    description: "List of all proof payments. Using this endpoint, you can get list of all proof payments with detailed info of each proof payment (like in Proof payment Detail endpoint).  Response will be in [jsonlines](https://jsonlines.org/) format with each proof payment taking one line of output file.   One proof payment in response has th",
    inputSchema: {
      "type": "object",
      "properties": {
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export proof payments created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export proof payments created before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Export proof payments updated after date"
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Export proof payments updated before date"
            },
            "taxDateFrom": {
                  "type": "string",
                  "description": "Export proof payments with tax date after date"
            },
            "taxDateTo": {
                  "type": "string",
                  "description": "Export proof payments with tax date before date"
            },
            "isValid": {
                  "type": "boolean",
                  "description": "Filtering according to document validity"
            },
            "currencyCode": {
                  "type": "string",
                  "description": "Proof payment currency"
            },
            "closed": {
                  "type": "boolean",
                  "description": "Is the proof payment closed?"
            }
      }
}
  },
  {
    name: "get_proof_payments_order",
    description: "Proof payment detail by order code",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_proof_payments_order",
    description: "Proof payment insertion by order code",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_proof_payments_proforma_invoice",
    description: "Proof payment detail by proforma invoice code",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_proof_payments_proforma_invoice",
    description: "Proof payment insertion by proforma invoice code",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_proof_payments_document_settings",
    description: "Proof payment document settings. Using this endpoint, you can unlink an invoice from a proof of payment. After successfully unlinking the invoice, the price of the linked  invoice will be recalculated and increased by the price of the proof of payment.  Linking of the invoice to the proof of payment is not possible at this endpoint",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "unlink": {
                              "type": "boolean",
                              "description": "`true` if you want to unlink the proof of payment from the invoice"
                        },
                        "closed": {
                              "type": "boolean",
                              "description": "`true` if you want to close the proof of payment, `false` if you want to open the proof of payment"
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "get_proof_payments_pdf",
    description: "Download proof of payment as PDF. You can request the proof of payment as PDF file, response will be as application/octet-stream. You can download pdf documents  only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_proof_payments_isdoc",
    description: "Download proof payment as ISDOC. You can request the proof payment as ISDOC file, response will be as application/octet-stream. You can download the documents only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "list_proof_payments_changes",
    description: "Last proof payments changes. Returns the list of proof payments, which were changed. The Endpoint is intended to determine the changes after you have loaded the list of proof payments and you need to know the changes. The guaranteed history of changes is 30 days.   Each proof payment is only given in the listing with its last c",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_credit_notes",
    description: "List of credit notes. The list of credit notes supports [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "isValid": {
                  "type": "boolean",
                  "description": "filtering according to document validity. Optional."
            },
            "invoiceCode": {
                  "type": "string",
                  "description": "filtering according to number of invoice. Optional."
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "date of credit note creation, in ISO 8601 format, lower limit. Optional."
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "date of credit note creation, in ISO 8601 format, upper limit. Optional."
            },
            "varSymbol": {
                  "type": "string",
                  "description": "filtering according to variable symbol of credit note"
            },
            "proofPaymentCode": {
                  "type": "string",
                  "description": "filtering according to proof payment code. Optional."
            }
      }
}
  },
  {
    name: "list_credit_notes_snapshot",
    description: "List of all credit notes. Using this endpoint, you can get list of all credit notes with detailed info of each credit note (like in Credit note detail endpoint) asynchronously. See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will be in [jsonlin",
    inputSchema: {
      "type": "object",
      "properties": {
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export credit notes created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export credit notes created before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Export credit notes updated after date"
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Export credit notes updated before date"
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Export credit notes with code after given value"
            },
            "codeTo": {
                  "type": "string",
                  "description": "Export credit notes with code before given value"
            },
            "invoiceCodeFrom": {
                  "type": "string",
                  "description": "Export credit notes with invoice code after given value"
            },
            "invoiceCodeTo": {
                  "type": "string",
                  "description": "Export credit notes with invoice code before given value"
            },
            "dueDateFrom": {
                  "type": "string",
                  "description": "Export credit notes with due date after date"
            },
            "dueDateTo": {
                  "type": "string",
                  "description": "Export credit notes with due date before date"
            },
            "hasProofPaymentCode": {
                  "type": "boolean",
                  "description": "Export credit notes with or without proof payment codes only"
            },
            "taxDateFrom": {
                  "type": "string",
                  "description": "Export credit notes with tax date after date"
            },
            "taxDateTo": {
                  "type": "string",
                  "description": "Export credit notes with tax date before date"
            },
            "orderCodeFrom": {
                  "type": "string",
                  "description": "Export credit notes with order code after given value"
            },
            "orderCodeTo": {
                  "type": "string",
                  "description": "Export credit notes with order code before given value"
            },
            "customerGuid": {
                  "type": "string",
                  "description": "Export credit notes with given customer"
            },
            "varSymbol": {
                  "type": "string",
                  "description": "Export credit notes with given variable symbol"
            },
            "restocked": {
                  "type": "boolean",
                  "description": "Export restocked or not restocked credit notes"
            },
            "isValid": {
                  "type": "boolean",
                  "description": "Filtering according to document validity"
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            }
      }
}
  },
  {
    name: "get_credit_notes",
    description: "Credit note detail. Additional information about one credit note.  This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand)).  Value | Section --------|------ 'surchargeParameters'| Item surcharge parameters",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_credit_notes",
    description: "Credit note update",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "varSymbol": {
                              "type": "integer"
                        },
                        "dueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "taxDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "constSymbol": {
                              "type": "string",
                              "nullable": true,
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer",
                              "nullable": true
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "description": "Billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list. Defaults to order's."
                        },
                        "orderCode": {
                              "type": "string",
                              "nullable": true,
                              "description": "Order code. Optional."
                        },
                        "reasonRemark": {
                              "type": "string",
                              "nullable": true,
                              "description": "Reason for credit note; default reason can be applied if not send."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_credit_notes",
    description: "Credit note deletion",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_credit_notes_restock",
    description: "Credit note restock. Restock items from credit note",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_invoices_credit_note",
    description: "Credit note from invoice creation. Creating credit note from existing invoice.  This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand)).   Value | Section  --------|------  'surchargeParameters'| Item surcharge parameters",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Code of invoice"
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "creditNoteCode": {
                              "type": "string",
                              "description": "Credit nore code. Optional, generated by eshop settings if not set."
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "dueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "taxDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "constSymbol": {
                              "type": "string",
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer"
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "description": "Billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list. Defaults to order."
                        },
                        "orderCode": {
                              "type": "string",
                              "description": "Order Code. Optional."
                        },
                        "useItemIds": {
                              "type": "array",
                              "description": "List of invoice item ids. Can be found in field `data.invoice.items.itemId` in Invoice detail.",
                              "items": {
                                    "type": "integer"
                              }
                        },
                        "items": {
                              "type": "array",
                              "description": "List of invoice item ids and their amounts.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "invoiceItemId": {
                                                "type": "integer",
                                                "description": "Id of invoice item. Can be found in field `data.invoice.items.itemId` in Invoice detail."
                                          },
                                          "amount": {
                                                "type": "string",
                                                "nullable": true
                                          }
                                    },
                                    "required": [
                                          "invoiceItemId"
                                    ]
                              }
                        },
                        "reasonRemark": {
                              "type": "string",
                              "nullable": true,
                              "description": "Reason for credit note; default reason can be applied if not send."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_proof_payments_credit_note",
    description: "Credit note from proof of payment. Creating credit note from existing proof of payment.  It will create a credit note from the given proof of payment. It will automatically take all proof of payment items and add them to the credit note",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "Proof of payment code"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "creditNoteCode": {
                              "type": "string",
                              "description": "Credit note code. Optional, generated by eshop settings if not set."
                        },
                        "varSymbol": {
                              "type": "integer"
                        },
                        "dueDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "taxDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "constSymbol": {
                              "type": "string",
                              "description": "Const symbol. Only numbers are allowed (max length 4)."
                        },
                        "specSymbol": {
                              "type": "integer"
                        },
                        "billingMethodId": {
                              "type": "integer",
                              "description": "Billing method identifier - see also [Invoice billing methods](#section/code-lists/invoice-billing-methods) code list. Optional."
                        },
                        "orderCode": {
                              "type": "string",
                              "description": "Order Code. Optional, defaults to proof payment's order code if not set."
                        },
                        "reasonRemark": {
                              "type": "string",
                              "nullable": true,
                              "description": "Reason for credit note; default reason can be applied if not send."
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "create_credit_notes_item",
    description: "Creation of credit note item. Creates a new credit note item to an existing credit note",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "credit note code (number)"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "itemType": {
                              "type": "string",
                              "description": "item type, required (allowed `product` or `product-set` only)"
                        },
                        "code": {
                              "type": "string"
                        },
                        "amount": {
                              "type": "string",
                              "nullable": true
                        },
                        "name": {
                              "type": "string",
                              "nullable": true,
                              "description": "name of item, required"
                        },
                        "variantName": {
                              "type": "string",
                              "nullable": true,
                              "description": "name of variant (can be `null`)"
                        },
                        "amountUnit": {
                              "type": "string",
                              "nullable": true,
                              "description": "unit of amount (`kg`, `ks`) (can be `null`)"
                        },
                        "price": {
                              "type": "string",
                              "description": "price of item, 2 decimal places accuracy (can be `null`), default value `0.00`"
                        },
                        "priceRatio": {
                              "type": "string"
                        },
                        "includingVat": {
                              "type": "boolean",
                              "description": "default value is false; whether the credit note item price is saved with VAT or without"
                        },
                        "vatRate": {
                              "type": "string"
                        },
                        "weight": {
                              "type": "string",
                              "nullable": true
                        },
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "item note (can be `null`)"
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "field for additional info (can be `null`)"
                        }
                  },
                  "required": [
                        "itemType",
                        "name",
                        "amount"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "update_credit_notes_item",
    description: "Update of credit note item. Updates credit note item. It's not possible to change 'productType' property and it's not possible to update credit note item of another type then 'product' or 'product-set'",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "credit note code (number)"
            },
            "id": {
                  "type": "integer",
                  "description": "credit note item id. Can be found in field `data.creditNote.items.itemId` in Credit note detail."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "code": {
                              "type": "string"
                        },
                        "amount": {
                              "type": "string",
                              "nullable": true
                        },
                        "name": {
                              "type": "string",
                              "nullable": true,
                              "description": "name of item (can be `null`)"
                        },
                        "variantName": {
                              "type": "string",
                              "nullable": true,
                              "description": "name of variant (can be `null`)"
                        },
                        "amountUnit": {
                              "type": "string",
                              "nullable": true,
                              "description": "unit of amount (can be `null`)"
                        },
                        "price": {
                              "type": "string",
                              "description": "price of item, 3 decimal places accuracy (can be `null`), default value `0.00`"
                        },
                        "includingVat": {
                              "type": "boolean",
                              "description": "default value is false; whether the credit note item price is saved with VAT or without"
                        },
                        "vatRate": {
                              "type": "string"
                        },
                        "priceRatio": {
                              "type": "string"
                        },
                        "weight": {
                              "type": "string",
                              "nullable": true
                        },
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "item note (can be `null`)"
                        },
                        "additionalField": {
                              "type": "string",
                              "nullable": true,
                              "description": "field for additional info (can be `null`)"
                        }
                  }
            }
      },
      "required": [
            "code",
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_credit_notes_item",
    description: "Deletion of credit note item. Deletes credit note item. It's not possible to delete credit note item of another type then 'product' or 'product-set'",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "credit note code (number)"
            },
            "id": {
                  "type": "integer",
                  "description": "credit note item id. Can be found in field `data.creditNote.items.itemId` in Credit note detail."
            }
      },
      "required": [
            "code",
            "id"
      ]
}
  },
  {
    name: "get_credit_notes_pdf",
    description: "Download credit note as PDF. You can request the credit note as PDF file, response will be as application/octet-stream. You can download pdf documents  only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_credit_notes_isdoc",
    description: "Download credit note as ISDOC. You can request the credit note as ISDOC file, response will be as application/octet-stream. You can download the documents only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "list_credit_notes_changes",
    description: "Last credit note changes. Returns the list of credit notes, which were changed. The Endpoint is intended to determine the changes after you have loaded the list of credit notes and you need to know the changes.  The guaranteed history of changes is 30 days.   Each credit note is only given in the listing with its last change",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_delivery_notes",
    description: "List of delivery notes. The list of delivery notes supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "isValid": {
                  "type": "boolean",
                  "description": "sorting according to document validity"
            },
            "orderCode": {
                  "type": "string",
                  "description": "sorting according to number of order"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 100."
            }
      }
}
  },
  {
    name: "list_delivery_notes_snapshot",
    description: "List of all delivery notes. Using this endpoint, you can get list of all delivery notes with detailed info of each delivery note  (like in Delivery note detail endpoint) asynchronously.    See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will be i",
    inputSchema: {
      "type": "object",
      "properties": {
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export delivery notes created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export delivery notes created before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Export delivery notes updated after date"
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Export delivery notes updated before date"
            },
            "codeFrom": {
                  "type": "string",
                  "description": "Export delivery notes with code after given value"
            },
            "codeTo": {
                  "type": "string",
                  "description": "Export delivery notes with code befor given value"
            },
            "orderCodeFrom": {
                  "type": "string",
                  "description": "Export delivery notes with order code after given value"
            },
            "orderCodeTo": {
                  "type": "string",
                  "description": "Export delivery notes with order code before given value"
            },
            "customerGuid": {
                  "type": "string",
                  "description": "Export delivery notes with given customer"
            },
            "isValid": {
                  "type": "boolean",
                  "description": "Filtering according to document validity"
            }
      }
}
  },
  {
    name: "get_delivery_notes",
    description: "Detail of delivery note. Additional information about one delivery note.  This endpoint has several sections, which are only sent when requested in the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand)).  Value | Section --------|------ 'surchargeParameters'| Item surcharge parameters",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            },
            "include": {
                  "type": "string",
                  "description": "Optional parts of response"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_delivery_notes_pdf",
    description: "Download delivery note as PDF. You can request the delivery note as PDF file, response will be as application/octet-stream. You can download pdf documents  only one-by-one for every e-shop. Parallel requests end with '423 Locked' error",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "get_export",
    description: "General document export. You can request documents of several types in several formats in combination with settings as includes. See tables bellow for possibilities and settings. Export is processed asynchronously.  See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer'",
    inputSchema: {
      "type": "object",
      "properties": {
            "type": {
                  "type": "string",
                  "description": "See tables for all document types"
            },
            "format": {
                  "type": "string",
                  "description": "See tables for all document formats"
            },
            "currency": {
                  "type": "string",
                  "description": "Mandatory except for Delivery notes"
            },
            "codeFrom": {
                  "type": "string",
                  "description": ""
            },
            "codeTo": {
                  "type": "string",
                  "description": ""
            },
            "dateFrom": {
                  "type": "string",
                  "description": ""
            },
            "dateTo": {
                  "type": "string",
                  "description": ""
            },
            "taxDateFrom": {
                  "type": "string",
                  "description": ""
            },
            "taxDateTo": {
                  "type": "string",
                  "description": ""
            },
            "include": {
                  "type": "string",
                  "description": "Sections to include"
            }
      },
      "required": [
            "type",
            "format"
      ]
}
  },
  {
    name: "get_sales_channels",
    description: "Sales channel detail. Information about the detail of the sales channels. Module 'Sales Channel' is required",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Sales channel GUID"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "get_sales_channels_id",
    description: "Sales channel detail by ID. Information about the detail of the sales channels. Module 'Sales Channel' is required",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "string",
                  "description": "Sales channel ID"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_stocks",
    description: "List of stocks. Returns the list of stocks. There are usually not many stocks, therefore the endpoint returns all of them without [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "get_stocks",
    description: "Stock detail. Returns detailed information about one stock",
    inputSchema: {
      "type": "object",
      "properties": {
            "stockId": {
                  "type": "integer",
                  "description": ""
            }
      },
      "required": [
            "stockId"
      ]
}
  },
  {
    name: "get_stocks_movements",
    description: "Stock movements. It returns the list of changes in product quantity, which were done within one stock. Supports the [Paging](#section/basic-principles/paging) 'movements'.  This endpoint supports optional parts using the 'include' parameter (see [Section on demand](#section/basic-principles/section-on-demand)). Plea",
    inputSchema: {
      "type": "object",
      "properties": {
            "stockId": {
                  "type": "integer",
                  "description": "ID of stock for which we would like the movements."
            },
            "lastId": {
                  "type": "integer",
                  "description": "ID of last transfered record. If missing, the older records are sent."
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Date of move, in ISO 8601 format, lower limit. It is not possible to use it as break poit, it is not unique value. Optional."
            },
            "orderCode": {
                  "type": "string",
                  "description": "Filtering according to order code."
            },
            "include": {
                  "type": "string",
                  "description": "Optional parts of response. For specific include behavior, please see the general description above."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 25. Max value is 1000."
            }
      },
      "required": [
            "stockId"
      ]
}
  },
  {
    name: "update_stocks_movements",
    description: "Update quantity in stock. Endpoint enables the quantity of product in stock (relative and absolute) to be changed. Within a call, the update  of multiple products at once can be requested (max. 300 products/variants).   In case an error occurs for one of the records, the correct records will be updated, the response will be",
    inputSchema: {
      "type": "object",
      "properties": {
            "stockId": {
                  "type": "integer",
                  "description": "ID of the stock for which we would like the movements."
            },
            "data": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "productCode": {
                                    "type": "string"
                              },
                              "amountChange": {
                                    "type": "number"
                              }
                        },
                        "required": [
                              "productCode",
                              "amountChange"
                        ]
                  }
            }
      },
      "required": [
            "stockId",
            "data"
      ]
}
  },
  {
    name: "get_stocks_movements_last",
    description: "Stock movements - Last move. It returns informations about last stock move",
    inputSchema: {
      "type": "object",
      "properties": {
            "stockId": {
                  "type": "integer",
                  "description": "ID of stock for which we would like the movements."
            }
      },
      "required": [
            "stockId"
      ]
}
  },
  {
    name: "get_stocks_supplies",
    description: "Product supplies in stock. Returns the product supplies in stock for all products in a specific stock, contains GUID, code and quantity  in stock for a specific product variant. It is possible to filter the specific GUID of a product, possibly a variant code. The endpoint supports [Paging](#section/basic-principles/paging), i",
    inputSchema: {
      "type": "object",
      "properties": {
            "stockId": {
                  "type": "integer",
                  "description": ""
            },
            "productGuid": {
                  "type": "string",
                  "description": ""
            },
            "code": {
                  "type": "string",
                  "description": ""
            },
            "onlyWithClaim": {
                  "type": "boolean",
                  "description": "whether only products with claim greater than 0 should be returned. Defaults to `false`"
            },
            "changedFrom": {
                  "type": "string",
                  "description": "return only product supplies, which amount has been changed since date value of this parameter.                                It support maximum of 3"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      },
      "required": [
            "stockId"
      ]
}
  },
  {
    name: "list_suppliers",
    description: "List of suppliers. Returns the list of suppliers. Supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 200. Max value is 500."
            }
      }
}
  },
  {
    name: "list_brands",
    description: "List of brands. Returns the list of brands. Supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 500. Max value is 1000."
            }
      }
}
  },
  {
    name: "create_brands",
    description: "Creation of brand",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Brand name"
                        },
                        "indexName": {
                              "type": "string",
                              "nullable": true,
                              "description": "unique index name of brand"
                        },
                        "brandWeb": {
                              "type": "string",
                              "nullable": true,
                              "description": "Brand website"
                        },
                        "postalAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, postal address"
                        },
                        "contactEmail": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, contact email"
                        },
                        "europeanResellerPostalAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, european reseller postal address"
                        },
                        "europeanResellerContactEmail": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, reseller contact email"
                        },
                        "manufacturingCompanyName": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, manufacturing company name"
                        },
                        "europeanResellerManufacturingCompanyName": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, Reseller manufacturing company name"
                        },
                        "showInCategoriesMenu": {
                              "type": "boolean",
                              "description": "Is this brand shown in categories menu? Default is false"
                        },
                        "showInBrandList": {
                              "type": "boolean",
                              "description": "Is this brand shown in brand list? Default is false"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of brand. May contain HTML characters"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta title of brand"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta description of brand"
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_brands",
    description: "Detail of brand",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "brand GUID"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "update_brands",
    description: "Update of brand",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "brand GUID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Brand name"
                        },
                        "indexName": {
                              "type": "string",
                              "description": "unique index name of brand"
                        },
                        "brandWeb": {
                              "type": "string",
                              "nullable": true,
                              "description": "Brand website"
                        },
                        "postalAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, postal address"
                        },
                        "contactEmail": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, contact email"
                        },
                        "europeanResellerPostalAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, european reseller postal address"
                        },
                        "europeanResellerContactEmail": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, reseller contact email"
                        },
                        "manufacturingCompanyName": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, manufacturing company name"
                        },
                        "europeanResellerManufacturingCompanyName": {
                              "type": "string",
                              "nullable": true,
                              "description": "GPSR, Reseller manufacturing company name"
                        },
                        "showInCategoriesMenu": {
                              "type": "boolean",
                              "description": "Is this brand shown in categories menu?"
                        },
                        "showInBrandList": {
                              "type": "boolean",
                              "description": "Is this brand shown in brand list?"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of brand. May contain HTML characters"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta title of brand"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta description of brand"
                        }
                  }
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "delete_brands",
    description: "Deletion of brand. If the brand cannot be deleted, because it is used by some product, a 409 code is returned.  Optional parameter 'deleteUsed' with 'true' value allows deletion of brand used by products",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "brand GUID"
            },
            "deleteUsed": {
                  "type": "boolean",
                  "description": "allows deletion of brand used by products if set to `true`"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_brands_batch",
    description: "BATCH creation of brands. This endpoint allows you to create multiple brands at once. Batch creation is processed asynchronously in same way as for example products snapshot, but it does not have 'resultUrl' in response. Instead, you can check attribute 'log' which contains successfully created brands and errors.    See how",
    inputSchema: {
      "type": "object",
      "properties": {
            "batchFileUrlPath": {
                  "type": "string",
                  "description": "Url to batch file with products data. File must be in JSONL format."
            }
      },
      "required": [
            "batchFileUrlPath"
      ]
}
  },
  {
    name: "list_customers",
    description: "List of customers. Listing of customers. Supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "email": {
                  "type": "string",
                  "description": "filtering as per customer’s e-mails. An accurate match is searched for, regardless of capitalization."
            },
            "phone": {
                  "type": "string",
                  "description": ""
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 1000."
            }
      }
}
  },
  {
    name: "create_customers",
    description: "Creation of customer",
    inputSchema: {
      "type": "object",
      "properties": {
            "suppressMandatoryFieldsCheck": {
                  "type": "boolean",
                  "description": "suppress checking if new customer has filled all mandatory fields from eshop settings `Settings -> Customers -> Mandatory fields`. Suppressing this ch"
            },
            "sendRegistrationEmail": {
                  "type": "boolean",
                  "description": "If set to true, registration emails are sent to the customer. The type of email depends on the `customerGroup` settings. If the group requires verific"
            },
            "language": {
                  "type": "string",
                  "description": "Specifies the language in which the email should be sent to the customer, provided that `sendRegistrationEmail = true` and the \"Foreign Languages\" mod"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "remark for the customer (can be `null`)"
                        },
                        "priceRatio": {
                              "type": "string"
                        },
                        "birthDate": {
                              "type": "string",
                              "nullable": true,
                              "description": "date of birth. In YYYY-MM-DD format.  (can be `null`)"
                        },
                        "disabledOrders": {
                              "type": "boolean",
                              "description": "Ordering disabled? If so, newly created orders will be cancelled automatically."
                        },
                        "customerGroupCode": {
                              "type": "string",
                              "description": "customer group code, group must exists if set."
                        },
                        "pricelistId": {
                              "type": "integer",
                              "description": "Price list identifier"
                        },
                        "billingAddress": {
                              "type": "object",
                              "properties": {
                                    "company": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "company (can be `null`)"
                                    },
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "full name (can be `null`)"
                                    },
                                    "street": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street (can be `null`)"
                                    },
                                    "houseNumber": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "house number (can be `null`)"
                                    },
                                    "city": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "city/town (can be `null`)"
                                    },
                                    "district": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region (can be `null`)"
                                    },
                                    "additional": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "additional address information (can be `null`)"
                                    },
                                    "zip": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "ZIP or postal code (can be `null`)"
                                    },
                                    "countryCode": {
                                          "type": "string",
                                          "description": "country (can be `null`)"
                                    },
                                    "regionName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region name (can be `null`)"
                                    },
                                    "companyId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Company registration number of the customer, if purchasing as a company. Optional."
                                    },
                                    "vatId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "VAT identification number of the customer, if purchasing as a company. Optional."
                                    },
                                    "taxId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "TAX identification number of the customer, if purchasing on the company. For Czech address, taxId must be the same as vatId, or left empty. Optional."
                                    }
                              }
                        },
                        "account": {
                              "type": "object",
                              "properties": {
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "full name (can be `null`)"
                                    },
                                    "email": {
                                          "type": "string",
                                          "description": "email address"
                                    },
                                    "phone": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "phone number (can be `null`)"
                                    },
                                    "authorized": {
                                          "type": "boolean",
                                          "description": "Is the account authorized? Default: true"
                                    },
                                    "emailVerified": {
                                          "type": "boolean",
                                          "description": "Is the email verified by eshop owner? Needed for pairing orders created in past. Default: false"
                                    }
                              },
                              "required": [
                                    "email"
                              ]
                        }
                  },
                  "required": [
                        "account"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_customers_snapshot",
    description: "List of all customers. Using this endpoint, you can get list of all customers with detailed info of each customer (like in Customer Detail endpoint) asynchronously. See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will be in [jsonlines](https",
    inputSchema: {
      "type": "object",
      "properties": {
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export customers created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export customers created before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Export customers changed after date"
            },
            "changeTimeTo": {
                  "type": "string",
                  "description": "Export customers changed before date"
            }
      }
}
  },
  {
    name: "get_customers",
    description: "Customer detail. Additional information about one customer",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "update_customers",
    description: "Update of customer",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "remark for the customer (can be `null`)"
                        },
                        "priceRatio": {
                              "type": "string"
                        },
                        "birthDate": {
                              "type": "string",
                              "nullable": true,
                              "description": "date of birth. In YYYY-MM-DD format.  (can be `null`)"
                        },
                        "disabledOrders": {
                              "type": "boolean",
                              "description": "Ordering disabled? If so, newly created orders will be cancelled automatically."
                        },
                        "customerGroupCode": {
                              "type": "string",
                              "description": "customer group code, group must exists if set."
                        },
                        "pricelistId": {
                              "type": "integer",
                              "description": "Price list identifier"
                        },
                        "billingAddress": {
                              "type": "object",
                              "properties": {
                                    "company": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "company (can be `null`)"
                                    },
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "full name (can be `null`)"
                                    },
                                    "street": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street (can be `null`)"
                                    },
                                    "houseNumber": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "house number (can be `null`)"
                                    },
                                    "city": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "city/town (can be `null`)"
                                    },
                                    "district": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region (can be `null`)"
                                    },
                                    "additional": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "additional address information (can be `null`)"
                                    },
                                    "zip": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "ZIP or postal code (can be `null`)"
                                    },
                                    "countryCode": {
                                          "type": "string",
                                          "description": "country (can be `null`)"
                                    },
                                    "regionName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region name (can be `null`)"
                                    },
                                    "companyId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Company registration number of the customer, if purchasing as a company. Optional."
                                    },
                                    "vatId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "VAT identification number of the customer, if purchasing as a company. Optional."
                                    },
                                    "taxId": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "TAX identification number of the customer, if purchasing on the company. For Czech address, taxId must be the same as vatId, or left empty. Optional."
                                    }
                              }
                        }
                  }
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "delete_customers",
    description: "Deletion of customer",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "get_customers_accounts",
    description: "List of customer accounts. List of customer accounts supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "create_customers_accounts",
    description: "Creation of customer account",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "full name (can be `null`)"
                        },
                        "email": {
                              "type": "string",
                              "description": "email address"
                        },
                        "phone": {
                              "type": "string",
                              "nullable": true,
                              "description": "phone number (can be `null`)"
                        },
                        "mainAccount": {
                              "type": "boolean",
                              "description": "Is this account the main account?"
                        },
                        "authorized": {
                              "type": "boolean",
                              "description": "Is the account authorized? Default: true"
                        },
                        "emailVerified": {
                              "type": "boolean",
                              "description": "Is the email verified by eshop owner? Needed for pairing orders created in past. Default: false"
                        }
                  },
                  "required": [
                        "email"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "get_customers_accounts_by_guid_and_accountguid",
    description: "Detail of customer account",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "accountGuid": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid",
            "accountGuid"
      ]
}
  },
  {
    name: "update_customers_accounts",
    description: "Update of customer account",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "accountGuid": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "full name (can be `null`)"
                        },
                        "email": {
                              "type": "string",
                              "description": "email address"
                        },
                        "phone": {
                              "type": "string",
                              "nullable": true,
                              "description": "phone number (can be `null`)"
                        },
                        "mainAccount": {
                              "type": "boolean",
                              "description": "Is this account the main account?"
                        },
                        "authorized": {
                              "type": "boolean",
                              "description": "Is the account authorized? Default: true"
                        },
                        "emailVerified": {
                              "type": "boolean",
                              "description": "Is the email verified by eshop owner? Needed for pairing orders created in past. Default: false"
                        }
                  }
            }
      },
      "required": [
            "guid",
            "accountGuid",
            "data"
      ]
}
  },
  {
    name: "delete_customers_accounts",
    description: "Deletion of customer account",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "accountGuid": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid",
            "accountGuid"
      ]
}
  },
  {
    name: "get_customers_delivery_addresses",
    description: "List of customer delivery addresses. List of customer delivery addresses, supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "create_customers_delivery_addresses",
    description: "Creation of delivery address",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "full name (can be `null`)"
                        },
                        "company": {
                              "type": "string",
                              "nullable": true,
                              "description": "company (can be `null`)"
                        },
                        "street": {
                              "type": "string",
                              "nullable": true,
                              "description": "street (can be `null`)"
                        },
                        "houseNumber": {
                              "type": "string",
                              "nullable": true,
                              "description": "house number (can be `null`)"
                        },
                        "city": {
                              "type": "string",
                              "nullable": true,
                              "description": "city/town (can be `null`)"
                        },
                        "district": {
                              "type": "string",
                              "nullable": true,
                              "description": "region (can be `null`)"
                        },
                        "additional": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional info (can be `null`)"
                        },
                        "zip": {
                              "type": "string",
                              "nullable": true,
                              "description": "ZIP/postal code (can be `null`)"
                        },
                        "countryCode": {
                              "type": "string",
                              "description": "country (can be `null`)"
                        },
                        "regionName": {
                              "type": "string",
                              "nullable": true,
                              "description": "region name (can be `null`)"
                        },
                        "isDefault": {
                              "type": "boolean"
                        }
                  },
                  "required": [
                        "countryCode"
                  ]
            }
      },
      "required": [
            "guid",
            "data"
      ]
}
  },
  {
    name: "get_customers_delivery_addresses_by_guid_and_addressguid",
    description: "Detail of customer delivery address",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "addressGuid": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid",
            "addressGuid"
      ]
}
  },
  {
    name: "update_customers_delivery_addresses",
    description: "Update of customer delivery address",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "addressGuid": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "full name (can be `null`)"
                        },
                        "company": {
                              "type": "string",
                              "nullable": true,
                              "description": "company (can be `null`)"
                        },
                        "street": {
                              "type": "string",
                              "nullable": true,
                              "description": "street (can be `null`)"
                        },
                        "houseNumber": {
                              "type": "string",
                              "nullable": true,
                              "description": "house number (can be `null`)"
                        },
                        "city": {
                              "type": "string",
                              "nullable": true,
                              "description": "city/town (can be `null`)"
                        },
                        "district": {
                              "type": "string",
                              "nullable": true,
                              "description": "region (can be `null`)"
                        },
                        "additional": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional info (can be `null`)"
                        },
                        "zip": {
                              "type": "string",
                              "nullable": true,
                              "description": "ZIP/postal code (can be `null`)"
                        },
                        "countryCode": {
                              "type": "string",
                              "description": "country (can be `null`)"
                        },
                        "regionName": {
                              "type": "string",
                              "nullable": true,
                              "description": "region name (can be `null`)"
                        },
                        "isDefault": {
                              "type": "boolean"
                        }
                  }
            }
      },
      "required": [
            "guid",
            "addressGuid",
            "data"
      ]
}
  },
  {
    name: "delete_customers_delivery_addresses",
    description: "Deletion of customer delivery address",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "addressGuid": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid",
            "addressGuid"
      ]
}
  },
  {
    name: "get_customers_remarks",
    description: "List of customer remarks. List of customer remarks, supports the [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "create_customers_remarks",
    description: "Creation of customer remark",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "schema": {
                  "type": "object",
                  "properties": {
                        "data": {
                              "type": "object",
                              "properties": {
                                    "rating": {
                                          "type": "string",
                                          "description": "type of rating"
                                    },
                                    "remark": {
                                          "type": "string",
                                          "description": "Your remark, note, for customer"
                                    }
                              },
                              "required": [
                                    "rating",
                                    "remark"
                              ]
                        }
                  },
                  "required": [
                        "data"
                  ]
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "get_customers_remarks_by_guid_and_id",
    description: "Detail of customer remark",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "id": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid",
            "id"
      ]
}
  },
  {
    name: "update_customers_remarks",
    description: "Update of customer remark",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "id": {
                  "type": "string",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "rating": {
                              "type": "string",
                              "description": "type of rating"
                        },
                        "remark": {
                              "type": "string",
                              "description": "Your remark, note, for customer"
                        }
                  }
            }
      },
      "required": [
            "guid",
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_customers_remarks",
    description: "Deletion of customer remark",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": ""
            },
            "id": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "guid",
            "id"
      ]
}
  },
  {
    name: "list_customers_changes",
    description: "Last customer changes. Returns the list of customers who have been changed (added/changed or deleted). The Endpoint is intended  to determine the changes after you have loaded the complete list of customers and you need to know, if  any of these has been changed (or added or deleted).  Guaranteed history is 30 days, the o",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            }
      },
      "required": [
            "from"
      ]
}
  },
  {
    name: "list_customers_regions",
    description: "List of customer regions. Returns the list of customer regions. The regions are ordered by id. The list is not paginated",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_customers_groups",
    description: "List of customer groups. Returns list of customer groups ordered by priority. List is not paginated",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_customers_groups",
    description: "Creation of customer group. Creates a new customer group with specified settings. The customer group name must be unique. Returns the full list of customer groups including the newly created one.  **Note:** To use wholesale features ('registrationAllowed', 'wholesale', 'tableLayout', 'fullProfileRequired'), the 'wholesale' mod",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Customer group name"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of customer group"
                        },
                        "defaultPricelistId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of default pricelist for this group"
                        },
                        "emailNotification": {
                              "type": "boolean",
                              "description": "Whether e-mail will be sent on new customer registration in this group. Can only be enabled when wholesale module is active."
                        },
                        "authRequired": {
                              "type": "boolean",
                              "description": "Whether authorization of new customer by eshop administrator is required. Can only be enabled when wholesale module is active."
                        },
                        "maxDiscount": {
                              "type": "string",
                              "nullable": true,
                              "description": "Ratio of maximal discount (0.5500 -> 55% max discount)"
                        },
                        "defaultDueDays": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Default maturity for documents in days (0-365)"
                        },
                        "registrationAllowed": {
                              "type": "boolean",
                              "description": "Whether customers can register to this group. Requires wholesale module to be active."
                        },
                        "wholesale": {
                              "type": "boolean",
                              "description": "Whether customers and their orders in this group are marked as wholesale. Requires wholesale module to be active."
                        },
                        "tableLayout": {
                              "type": "boolean",
                              "description": "Whether table layout will be shown instead to classical layout. Might not be supported by all templates. Requires wholesale module to be active."
                        },
                        "fullProfileRequired": {
                              "type": "boolean",
                              "description": "Whether full profile (billing information and address) is needed for customer. Requires wholesale module to be active."
                        },
                        "defaultOrderStatusId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Default order status ID for orders placed by customers in this group."
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_customers_groups",
    description: "Update of customer group. Updates an existing customer group with specified settings. Returns the full list of customer groups including the updated one.  **Note:** To use wholesale features ('registrationAllowed', 'wholesale', 'tableLayout', 'fullProfileRequired'), the 'Wholesale' module must be active in the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "Customer group ID"
            },
            "language": {
                  "type": "string",
                  "description": "Specifies the language of updated customer group. If not provided, the default language of the e-shop will be used. This parameter is relevant only if"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Customer group name"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Description of customer group"
                        },
                        "defaultPricelistId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of default pricelist for this group"
                        },
                        "emailNotification": {
                              "type": "boolean",
                              "description": "Whether e-mail will be sent on new customer registration in this group. This option can only be enabled if the `Wholesale` module is active or for the default group."
                        },
                        "authRequired": {
                              "type": "boolean",
                              "description": "Whether authorization of new customer by eshop administrator is required. This option can only be enabled if the `Wholesale` module is active or for the default group."
                        },
                        "maxDiscount": {
                              "type": "string",
                              "nullable": true,
                              "description": "Ratio of maximal discount (0.5500 -> 55% max discount)"
                        },
                        "defaultDueDays": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Default maturity for documents in days (0-365)"
                        },
                        "registrationAllowed": {
                              "type": "boolean",
                              "description": "Whether customers can register to this group. Requires `Wholesale` module to be active and cannot be `false` for the default group."
                        },
                        "wholesale": {
                              "type": "boolean",
                              "description": "Whether customers and their orders in this group are marked as wholesale. Requires `Wholesale` module to be active."
                        },
                        "tableLayout": {
                              "type": "boolean",
                              "description": "Whether table layout will be shown instead to classical layout. Might not be supported by all templates. Requires `Wholesale` module to be active."
                        },
                        "fullProfileRequired": {
                              "type": "boolean",
                              "description": "Whether full profile (billing information and address) is needed for customer. Requires `Wholesale` module to be active."
                        },
                        "defaultOrderStatusId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of the default order status for orders placed by customers in this group."
                        }
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_customers_groups",
    description: "Deletion of customer group. Is not possible to delete default customer group. Deletion of customer group will not delete customers assigned to this group, but they will be assigned to default customer group",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": ""
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_template_include",
    description: "Listing of codes. This lists currently defined HTML codes for this addon, in all possible locations. Each addon sees only “its own” codes,  it cannot see other codes of other addons, not even from the same developer. Also, it does not see the code inserted within the administration",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_template_include",
    description: "Inserting and editing codes. This adds new or changes the current (if exists) HTML code. It is possible to enter 1-3 changes at a time (typically  3 possible locations). If the value already exists, it is simply overwritten. The limit for HTML code is 8192 characters. In case that any  of the requirements fail, the detailed inf",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "snippets": {
                              "type": "array",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "location": {
                                                "type": "string",
                                                "description": "(location) code identifier. Possible values: `common-header`, `common-footer`, `order-confirmed`"
                                          },
                                          "html": {
                                                "type": "string",
                                                "description": "HTML content to be included in the specified location"
                                          }
                                    },
                                    "required": [
                                          "location",
                                          "html"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "snippets"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "delete_template_include",
    description: "Removal of code. This call can be used to delete the existing code from the given location. if the code for the given 'location' (position) does not exist, the  API returns '404 NOT FOUND'",
    inputSchema: {
      "type": "object",
      "properties": {
            "location": {
                  "type": "string",
                  "description": "supported values: `common-header`, `common-footer`, `order-confirmed`"
            }
      },
      "required": [
            "location"
      ]
}
  },
  {
    name: "get_payment_status",
    description: "Gaining the information about payment. Returns the URL, at which the payment gateway shall redirect the users after completion of operation and order number",
    inputSchema: {
      "type": "object",
      "properties": {
            "paymentCode": {
                  "type": "string",
                  "description": "the payment code identifies the payment of a single order, it is generated when the order is completed and received by the payment gateway upon redire"
            }
      },
      "required": [
            "paymentCode"
      ]
}
  },
  {
    name: "update_payment_status",
    description: "Payment status update. Payment status update via the payment gateway. The 'paymentCode' is the identifier. Payment status can be updated when the payment has been successfully recorded.  **Please note that 'message' can not be longer than 255 characters.**",
    inputSchema: {
      "type": "object",
      "properties": {
            "paymentCode": {
                  "type": "string",
                  "description": "payment code identifies the payment of a single order, it is generated when the order is completed and received by the payment gateway upon redirectio"
            },
            "suppressDocumentGeneration": {
                  "type": "boolean",
                  "description": "suppress the generation of linked documents."
            },
            "suppressEmailSending": {
                  "type": "boolean",
                  "description": "suppress sending the linked information e-mails."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "status": {
                              "type": "string",
                              "enum": [
                                    "FAILED",
                                    "OK",
                                    "PENDING"
                              ],
                              "description": "transaction status"
                        },
                        "message": {
                              "type": "string",
                              "nullable": true,
                              "description": "Explanation of the status"
                        }
                  },
                  "required": [
                        "status"
                  ]
            }
      },
      "required": [
            "paymentCode",
            "data"
      ]
}
  },
  {
    name: "list_webhooks",
    description: "Overview of registered webhooks. Returns the list of webhooks, registered by the specific addon for a single e-shop. It is therefore bound to the specific installation.  The addon does not have any access to another addon (not even for the same e-shop, or two addons from the same developer)",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 500."
            }
      }
}
  },
  {
    name: "create_webhooks",
    description: "Registration of new webhook. Registers the webhook. For a single event ('event', for example 'order:create') **ONLY ONE** URL can be registered.  If you try to enter the webhook for an 'event' that already exists, you will  receive error '422' with message 'Webhook already exists for this event'. Successful creation (registrati",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "event": {
                                    "type": "string",
                                    "description": "event, see [Webhook event types](#section/code-lists/webhook-event-types) code list"
                              },
                              "url": {
                                    "type": "string",
                                    "description": "Webhook URL"
                              }
                        },
                        "required": [
                              "event",
                              "url"
                        ]
                  }
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_webhooks",
    description: "Detail of registered webhooks. Shows the information about a single specific registered webhook",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": ""
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "update_webhooks",
    description: "Update of existing webhook. Modification of the existing webhook. The 'id' of the webhook serves as the identifier. Using just one call, only one webhook can be modified.   **Please note that 'url' cannot be longer than 2000 characters.**",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": ""
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "url": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "url"
                  ]
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_webhooks",
    description: "Deletion of registered webhook. Deletes the registered webhook, identified by means of 'id'",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": ""
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "create_webhooks_renew_signature_key",
    description: "Generating of signature key. The endpoint call does not require any body. The endpoint always generates a new signature key  for calculating the digest mentioned in the HTTP header of the notification – 'Shoptet-Webhook-Signature'. The same key  is to be used during check after the receipt of notification. For more information",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "list_webhooks_notifications",
    description: "Webhook notification. Returns the notification (invoking) list of webhooks and provides information about these. If you do not have  a registered webhook, and the given event happens (for example creation of an order), the registered URLs are  called. A notification about a call contains information about the webhook tha",
    inputSchema: {
      "type": "object",
      "properties": {
            "status": {
                  "type": "string",
                  "description": "supported values: `new`, `failed`, `success`"
            },
            "event": {
                  "type": "string",
                  "description": "event"
            },
            "active": {
                  "type": "boolean",
                  "description": "flag that the notification was not delivered yet, and the number of attempts did not reach the maximum amount. The notification will be resent to the "
            },
            "from": {
                  "type": "string",
                  "description": "DateTime for the log, up to the present, which we are interested in. `+` in the time zone designation, html shall be coded as `%2B`."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 20. Max value is 500."
            }
      }
}
  },
  {
    name: "list_shipping_methods",
    description: "List of shipping methods. Endpoint returns a list of all available shipping methods and details of their settings. Does not use paging,  it always returns all methods at once",
    inputSchema: {
      "type": "object",
      "properties": {
            "salesChannelGuid": {
                  "type": "string",
                  "description": "Sales channel GUID. Optional parameter, if not provided, all shipping methods will be returned."
            }
      }
}
  },
  {
    name: "create_shipping_methods",
    description: "Adding a shipping method. Adds a new shipping method for the specific e-shop.  Should you wish to implement an addon implementing a shipping method, contact our partner support and request the creation  of a new \"shipping company code\" identifier.   The request body includes the mandatory attributes 'name' and 'shippingMetho",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "Name of the shipping method"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional information about the shipping method."
                        },
                        "shippingMethodCode": {
                              "type": "string",
                              "description": "type of shipping method (operator) - identifier assigned by Shoptet"
                        },
                        "visibility": {
                              "type": "boolean",
                              "description": "whether the shipping method will be visible"
                        },
                        "wholesale": {
                              "type": "boolean",
                              "description": "flag, whether the shipping method is available for wholesale customers (`false` = for retail)"
                        },
                        "logo": {
                              "type": "object",
                              "properties": {
                                    "filename": {
                                          "type": "string",
                                          "description": "Name of the file"
                                    },
                                    "content": {
                                          "type": "string",
                                          "description": "Base64 encoded image"
                                    }
                              },
                              "required": [
                                    "filename",
                                    "content"
                              ]
                        },
                        "minimalShippingPrice": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "name",
                        "shippingMethodCode"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_shipping_request",
    description: "Shipping request for getting cart details. Endpoint returns details of cart for shipping request",
    inputSchema: {
      "type": "object",
      "properties": {
            "shippingRequestCode": {
                  "type": "string",
                  "description": "Shipping request code of cart"
            },
            "shippingGuid": {
                  "type": "string",
                  "description": "Shipping method based on delivery"
            }
      },
      "required": [
            "shippingRequestCode",
            "shippingGuid"
      ]
}
  },
  {
    name: "set_shipping_request",
    description: "Update shipping price & data. Endpoint to set shipping price & data",
    inputSchema: {
      "type": "object",
      "properties": {
            "shippingRequestCode": {
                  "type": "string",
                  "description": "Shipping request code of cart"
            },
            "shippingGuid": {
                  "type": "string",
                  "description": "Shipping method based on delivery"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "description": {
                              "type": "string",
                              "description": "description of the shipping request."
                        },
                        "additionalText": {
                              "type": "string",
                              "nullable": true,
                              "description": "additional information about the shipping request. (can be null)"
                        },
                        "price": {},
                        "currency": {
                              "type": "string",
                              "nullable": true,
                              "description": "currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                        },
                        "expires": {
                              "type": "string",
                              "nullable": true
                        },
                        "deliveryAddress": {
                              "type": "object",
                              "properties": {
                                    "fullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "name of purchaser (or `null`)"
                                    },
                                    "company": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "name of purchaser''s company (or `null`)"
                                    },
                                    "street": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street of purchaser (or `null`)"
                                    },
                                    "houseNumber": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "street number (or `null`)"
                                    },
                                    "city": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "city/town (village) (or `null`)"
                                    },
                                    "district": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "county (or `null`)"
                                    },
                                    "additional": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "additional address information (or `null`)"
                                    },
                                    "zip": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "ZIP or postal code (or `null`)"
                                    },
                                    "countryCode": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "tree-character ISO country code (ISO 4217)"
                                    },
                                    "regionName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region name (or `null`)"
                                    },
                                    "regionShortcut": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "region abbreviation (or `null`)"
                                    }
                              }
                        },
                        "trackingNumber": {
                              "type": "string",
                              "description": "Tracking number for see status of delivery."
                        },
                        "branchId": {
                              "type": "string",
                              "nullable": true,
                              "description": "Identification of selected pickup point."
                        },
                        "branchName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Name of selected pickup point."
                        }
                  },
                  "required": [
                        "expires",
                        "trackingNumber"
                  ]
            }
      },
      "required": [
            "shippingRequestCode",
            "shippingGuid",
            "data"
      ]
}
  },
  {
    name: "get_shipping_request_status",
    description: "Shipping request for getting status of order. Endpoint returns status of order related to 'shippingRequestCode' & 'shippingGuid'",
    inputSchema: {
      "type": "object",
      "properties": {
            "shippingRequestCode": {
                  "type": "string",
                  "description": "Shipping request code of cart"
            },
            "shippingGuid": {
                  "type": "string",
                  "description": "Shipping method based on delivery"
            }
      },
      "required": [
            "shippingRequestCode",
            "shippingGuid"
      ]
}
  },
  {
    name: "list_payment_methods",
    description: "Listing of payment methods. The endpoint returns the listing of all available payment methods and details about their settings. Paging is not used, it always returns all methods at once",
    inputSchema: {
      "type": "object",
      "properties": {
            "salesChannelGuid": {
                  "type": "string",
                  "description": "Sales channel GUID. Optional parameter, if not provided, all payment methods will be returned."
            }
      }
}
  },
  {
    name: "create_payment_methods",
    description: "Adding the payment methods. Adds the new payment method for the specific e-shop.   **If you are a Premium client, contact your Account or Onboarding manager and request the creation of a new gateway identifier. New payment gateway has to be approved by Shoptet and client needs to be familiar with the terms of payment in advanc",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "description": "name of the payment method"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "description of payment method"
                        },
                        "submethod": {
                              "type": "string",
                              "nullable": true,
                              "description": "Additional identification of payment method"
                        },
                        "paymentType": {
                              "type": "string",
                              "description": "type of payment (operator) - identifier assigned by Shoptet"
                        },
                        "visibility": {
                              "type": "boolean",
                              "description": "whether the payment method will be visible"
                        },
                        "wholesale": {
                              "type": "boolean",
                              "description": "flag, whether the payment method is available for wholesale customers (`true` = for retail)"
                        },
                        "logo": {
                              "type": "object",
                              "properties": {
                                    "filename": {
                                          "type": "string",
                                          "description": "file name"
                                    },
                                    "content": {
                                          "type": "string",
                                          "description": "base64 encoded package"
                                    }
                              },
                              "required": [
                                    "filename",
                                    "content"
                              ]
                        }
                  },
                  "required": [
                        "name",
                        "paymentType"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "delete_payment_methods",
    description: "Payment method deletion. Deletes payment method by guid. Only payment methods related to your addon may be deleted. Private API tokens aren't currently supported",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "Payment guid"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "list_unsubscribed_emails",
    description: "Listing of unsubscribed e-mails",
    inputSchema: {
      "type": "object",
      "properties": {
            "from": {
                  "type": "string",
                  "description": "date of unsubcription (`unsubscribedAt` in response). Optional."
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      }
}
  },
  {
    name: "create_unsubscribed_emails",
    description: "Unsubscribed e-mail insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "email": {
                              "type": "string",
                              "description": "Email address"
                        },
                        "unsubscribedAt": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "email",
                        "unsubscribedAt"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_mailing_lists",
    description: "Listing of e-mail distribution lists. The e-mail distribution list named \"newsletters\" is the system one and is always available  (if the e-shop has the module installed). This e-mail distribution list includes the e-mails  of all customers who agreed to receiving e-mails",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_mailing_lists",
    description: "Insertion of e-mail distribution list",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 500."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "code": {
                              "type": "string",
                              "description": "code of distribution list. If not send, code is created from name. Minimum length is 1 characters, maximum length is 64 characters.(optional)"
                        },
                        "name": {
                              "type": "string",
                              "description": "name of distribution list. Minimum length is 1 characters, maximum length is 64 characters."
                        }
                  },
                  "required": [
                        "name"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_mailing_lists",
    description: "Detail of e-mail distribution list. This endpoint returns a list of e-mail addresses of the distribution list.   Upon initial call, it returns up to 500 e-mail addresses; using the '?itemsPerPage=20' parameter, you can  requests any number of records per page, up to 500 items limit.   Endpoint supports [Paging](#section/basic-principl",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "e-mail list code"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_mailing_lists_by_code",
    description: "Distribution list e-mails insertion. This endpoint allows you to add new e-mail addresses to the distribution list identified by its 'code'. In the response you will receive structured info about the result of the insertion. In the 'emailsInserted'  key there will be a list of e-mails successfully inserted, in the 'emailsExisting' key,",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "e-mail list code"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "emails": {
                              "type": "array",
                              "description": "E-mails to add to the list",
                              "items": {
                                    "type": "string"
                              }
                        }
                  },
                  "required": [
                        "emails"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "get_mailing_lists_changes",
    description: "Last changes in distribution list. Endpoint is intended to determine the changes after you load the complete e-mail list and you need to know  if any of these e-mails were added or removed. Guaranteed history is 30 days, the older data are deleted  progressively.   Each e-mail on single e-mail list is only mentioned with its last cha",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "e-mail list code"
            },
            "from": {
                  "type": "string",
                  "description": "DateTime from which up to the present we are interested in the changes. + in the time zone"
            },
            "changeType": {
                  "type": "string",
                  "description": "Returning only edit or delete type changed records"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 500."
            }
      },
      "required": [
            "code",
            "from"
      ]
}
  },
  {
    name: "list_discount_coupons",
    description: "List of discount coupons. List of discount coupons within the e-shop. The list is paged at 1000 coupons.  The discount coupons can be filtered according to the date of creation, validity,  repeatability of usage or their template.   If absolute price is used, the amount is interpreted with the default VAT rate of the eshop (",
    inputSchema: {
      "type": "object",
      "properties": {
            "template": {
                  "type": "string",
                  "description": "template GUID"
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "date and time of coupon creation - lower limit"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "date and time of coupon creation - upper limit"
            },
            "reusable": {
                  "type": "boolean",
                  "description": "is the discount coupon reusable?"
            },
            "validFrom": {
                  "type": "string",
                  "description": "date of discount coupon validity - lower limit"
            },
            "validTo": {
                  "type": "string",
                  "description": "date of discount coupon validity - upper limit"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 1000."
            }
      }
}
  },
  {
    name: "create_discount_coupons",
    description: "Discount coupons insertion. This endpoint allows you to insert specific discount coupons into Shoptet. Request is sent in JSON format in its body.   It is good to compare count of requested coupons with count of cooupons in response as it can be different. It is because of request validation, where it ignores invalid coupons",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "coupons": {
                              "type": "array",
                              "description": "Discount coupons. Minimal 1 item, maximal 999 items.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "code": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Code of discount coupon."
                                          },
                                          "discountType": {
                                                "type": "string",
                                                "enum": [
                                                      "percentual",
                                                      "fixed"
                                                ],
                                                "description": "Type of discount. Percentual (percentual) or fixed discount (fixed)"
                                          },
                                          "amount": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "ratio": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Amount of percentual discount. This items needs to be omitted when `discountType` is set to `fixed`. 4 decimal places accuracy, from `0.0000` (0% discount) to `1.0000` (100% discount)."
                                          },
                                          "minPrice": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "currency": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                                          },
                                          "template": {
                                                "type": "string"
                                          },
                                          "shippingPrice": {
                                                "type": "string",
                                                "enum": [
                                                      "cart",
                                                      "free",
                                                      "beforeDiscount"
                                                ],
                                                "description": "How the transport prices are calculated: according to the cart before discounts (beforeDiscount), according to the displayed value of the cart (cart), or free (free)"
                                          },
                                          "validFrom": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "validTo": {
                                                "type": "string",
                                                "nullable": true
                                          },
                                          "reusable": {
                                                "type": "boolean",
                                                "description": "Is the discount coupon reusable?"
                                          },
                                          "remark": {
                                                "type": "string",
                                                "nullable": true,
                                                "description": "Discount coupon note"
                                          }
                                    },
                                    "required": [
                                          "discountType",
                                          "template",
                                          "shippingPrice",
                                          "reusable"
                                    ]
                              }
                        }
                  },
                  "required": [
                        "coupons"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "delete_discount_coupons",
    description: "Bulk discount coupon deletion. Bulk deletion of discount coupons as per list of 'codes'. If successful, returns the code 200.  If some discount coupons does not exist within the e-shop, a 422 code is returned",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "couponCodes": {
                              "type": "array",
                              "description": "Discount coupons. Minimal 1 item, maximal 200 items.",
                              "items": {
                                    "type": "string"
                              }
                        }
                  },
                  "required": [
                        "couponCodes"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_discount_coupons_snapshot",
    description: "List of all discount coupons. Using this endpoint, you can get list of all discount coupons with detailed info of each discount coupon asynchronously. See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.    Response will be in [jsonlines](https://jsonlines.org/) f",
    inputSchema: {
      "type": "object",
      "properties": {
            "codeFrom": {
                  "type": "string",
                  "description": "Export discount coupons with code after given value"
            },
            "codeTo": {
                  "type": "string",
                  "description": "Export discount coupons with code befor given value"
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "Export discount coupons created after date"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "Export discount coupons created before date"
            },
            "discountType": {
                  "type": "string",
                  "description": "Export discount coupons with given discount type (percentual, fixed)"
            },
            "validFrom": {
                  "type": "string",
                  "description": "Export discount coupons valid after date"
            },
            "validTo": {
                  "type": "string",
                  "description": "Export discount coupons valid before date"
            },
            "reusable": {
                  "type": "boolean",
                  "description": "Is the discount coupon reusable?"
            },
            "template": {
                  "type": "string",
                  "description": "GUID of discount coupon template"
            },
            "currency": {
                  "type": "string",
                  "description": "Currency of fixed discount"
            },
            "shippingPrice": {
                  "type": "string",
                  "description": "How the transport prices are calculated: according to the cart before discounts (beforeDiscount), according to the displayed value of the cart (cart),"
            }
      },
      "required": [
            "template",
            "shippingPrice"
      ]
}
  },
  {
    name: "get_discount_coupons",
    description: "Detail of discount coupon. Detail of discount coupon within the e-shop",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "discount coupon code"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "delete_discount_coupons_by_code",
    description: "Discount coupon deletion. Deletes discount coupon as per entered 'code'. If successful, returns the code 200.  If the discount coupon does not exist within the e-shop, a 404 code is returned",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "discount coupon code"
            }
      },
      "required": [
            "code"
      ]
}
  },
  {
    name: "create_discount_coupons_set",
    description: "Discount coupons set creation. This endpoint allows you to create set of discount coupons for Shoptet.It is good to compare count of requested coupons with count of cooupons in response as it can be different. It is because of request validation,  where it ignores invalid coupons",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "count": {
                              "type": "integer"
                        },
                        "discountType": {
                              "type": "string",
                              "enum": [
                                    "percentual",
                                    "fixed"
                              ],
                              "description": "Type of discount. Percentual (percentual) or fixed discount (fixed)"
                        },
                        "amount": {
                              "type": "string",
                              "nullable": true
                        },
                        "ratio": {
                              "type": "string",
                              "nullable": true,
                              "description": "Amount of percentual discount. This items needs to be omitted when `discountType` is set to `fixed`. 4 decimal places accuracy, from `0.0000` (0% discount) to `1.0000` (100% discount)."
                        },
                        "minPrice": {
                              "type": "string",
                              "nullable": true
                        },
                        "currency": {
                              "type": "string",
                              "nullable": true,
                              "description": "currency code. List of available currencies within the e-shop can be found in endpoint `GET /api/eshop`."
                        },
                        "template": {
                              "type": "string"
                        },
                        "shippingPrice": {
                              "type": "string",
                              "enum": [
                                    "cart",
                                    "free",
                                    "beforeDiscount"
                              ],
                              "description": "How the transport prices are calculated: according to the cart before discounts (beforeDiscount), according to the displayed value of the cart (cart), or free (free)"
                        },
                        "validFrom": {
                              "type": "string",
                              "nullable": true
                        },
                        "validTo": {
                              "type": "string",
                              "nullable": true
                        },
                        "reusable": {
                              "type": "boolean",
                              "description": "Is the discount coupon reusable?"
                        },
                        "remark": {
                              "type": "string",
                              "nullable": true,
                              "description": "Discount coupon note"
                        }
                  },
                  "required": [
                        "count",
                        "discountType",
                        "template",
                        "shippingPrice",
                        "reusable"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_discount_coupons_use",
    description: "Discount coupons usage update. This endpoint allows you to set usage of discount coupon",
    inputSchema: {
      "type": "object",
      "properties": {
            "code": {
                  "type": "string",
                  "description": "discount coupon code"
            },
            "suppressOrderChecking": {
                  "type": "boolean",
                  "description": "suppress checking if order exists."
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "orderCode": {
                              "type": "string",
                              "description": "Order code"
                        }
                  },
                  "required": [
                        "orderCode"
                  ]
            }
      },
      "required": [
            "code",
            "data"
      ]
}
  },
  {
    name: "list_discount_coupons_templates",
    description: "Templates of discount coupons. Templates of discount coupons within the e-shop. All templates are listed at a time. Without possibility of  paging or filtering",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_discount_coupons_templates",
    description: "Discount coupons template insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "guid": {
                              "type": "string",
                              "nullable": true
                        },
                        "title": {
                              "type": "string",
                              "description": "Product name. MinLength 1 character, MaxLength 64 characters. Mandatory."
                        },
                        "customerGroupId": {
                              "type": "integer",
                              "description": "Group must exists if set."
                        },
                        "categoryGuids": {
                              "type": "array",
                              "nullable": true
                        },
                        "brands": {
                              "type": "array",
                              "nullable": true
                        },
                        "productFlags": {
                              "type": "array",
                              "nullable": true
                        }
                  },
                  "required": [
                        "title"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "delete_discount_coupons_templates",
    description: "Discount coupons template deletion. Deletes discount coupon template as per entered 'guid'. If successful, returns the code 200.  If the discount coupon template does not exist within the e-shop, a 404 code is returned.  If the discount coupon template cannot be deleted, because it is used as template of discount coupon, a 409 code is",
    inputSchema: {
      "type": "object",
      "properties": {
            "guid": {
                  "type": "string",
                  "description": "discount coupon template guid"
            }
      },
      "required": [
            "guid"
      ]
}
  },
  {
    name: "list_xy_discounts",
    description: "List of X + Y discounts",
    inputSchema: {
      "type": "object",
      "properties": {
            "customerGroupCode": {
                  "type": "string",
                  "description": "customer group code, possible values can be get by customer group list endpoint"
            },
            "validFrom": {
                  "type": "string",
                  "description": "date of discount validity - lower limit"
            },
            "validTo": {
                  "type": "string",
                  "description": "date of discount validity - upper limit"
            }
      }
}
  },
  {
    name: "create_xy_discounts",
    description: "X + Y discount insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "discount title"
                        },
                        "validFrom": {
                              "type": "string",
                              "nullable": true
                        },
                        "validTo": {
                              "type": "string",
                              "nullable": true
                        },
                        "customerGroupCodes": {
                              "type": "array",
                              "nullable": true,
                              "description": "customer groups connected to discount"
                        },
                        "includeUnregisteredCustomers": {
                              "type": "boolean",
                              "description": "defines if discount is valid for unregistered customers, default value is `false`."
                        },
                        "xAmount": {
                              "type": "string"
                        },
                        "yAmount": {
                              "type": "string"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "discount description"
                        },
                        "termsAndConditionsUrl": {
                              "type": "string",
                              "nullable": true,
                              "description": "URL to terms and conditions"
                        },
                        "displayFlag": {
                              "type": "boolean",
                              "description": "whether or not to display flag. If not set, default value is `true`."
                        },
                        "flagColor": {
                              "type": "string",
                              "nullable": true
                        },
                        "displayBanner": {
                              "type": "boolean",
                              "description": "whether or not to display banner. If not set, default value is `true`."
                        },
                        "bannerColor": {
                              "type": "string",
                              "nullable": true
                        },
                        "usageCount": {
                              "type": "integer",
                              "nullable": true,
                              "description": "number of how many times can be discount used."
                        },
                        "sortBefore": {
                              "type": "integer",
                              "description": "id of xy discount before which you want to move the xy discount from the request. Not possible to use with `sortAfter`."
                        },
                        "sortAfter": {
                              "type": "integer",
                              "description": "id of xy discount after which you want to move the  xy discount from the request. Not possible to use with `sortBefore`."
                        },
                        "xTargeting": {
                              "type": "object",
                              "properties": {
                                    "productGuids": {
                                          "type": "array",
                                          "description": "array of product guids",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "categoryGuids": {
                                          "type": "array",
                                          "description": "array of page guids (categories)",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "brandCodes": {
                                          "type": "array",
                                          "description": "array of brand codes",
                                          "items": {
                                                "type": "string"
                                          }
                                    }
                              }
                        },
                        "yTargeting": {
                              "type": "object",
                              "properties": {
                                    "productGuids": {
                                          "type": "array",
                                          "description": "array of product guids",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "categoryGuids": {
                                          "type": "array",
                                          "description": "array of page guids (categories)",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "brandCodes": {
                                          "type": "array",
                                          "description": "array of brand codes",
                                          "items": {
                                                "type": "string"
                                          }
                                    }
                              }
                        }
                  },
                  "required": [
                        "title",
                        "xAmount",
                        "yAmount",
                        "xTargeting",
                        "yTargeting"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_xy_discounts",
    description: "Detail of X + Y discounts",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "discount ID"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "update_xy_discounts",
    description: "X + Y discount update",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "discount ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "discount title"
                        },
                        "validFrom": {
                              "type": "string",
                              "nullable": true
                        },
                        "validTo": {
                              "type": "string",
                              "nullable": true
                        },
                        "customerGroupCodes": {
                              "type": "array",
                              "nullable": true,
                              "description": "customer groups connected to discount"
                        },
                        "includeUnregisteredCustomers": {
                              "type": "boolean",
                              "description": "defines if discount is valid for unregistered customers, default value is `false`."
                        },
                        "xAmount": {
                              "type": "string"
                        },
                        "yAmount": {
                              "type": "string"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "discount description"
                        },
                        "termsAndConditionsUrl": {
                              "type": "string",
                              "nullable": true,
                              "description": "URL to terms and conditions"
                        },
                        "displayFlag": {
                              "type": "boolean",
                              "description": "whether or not to display flag. If not set, default value is `true`."
                        },
                        "flagColor": {
                              "type": "string",
                              "nullable": true
                        },
                        "displayBanner": {
                              "type": "boolean",
                              "description": "whether or not to display banner. If not set, default value is `true`."
                        },
                        "bannerColor": {
                              "type": "string",
                              "nullable": true
                        },
                        "usageCount": {
                              "type": "integer",
                              "nullable": true,
                              "description": "number of how many times can be discount used."
                        },
                        "sortBefore": {
                              "type": "integer",
                              "description": "id of xy discount before which you want to move the xy discount from the request. Not possible to use with `sortAfter`."
                        },
                        "sortAfter": {
                              "type": "integer",
                              "description": "id of xy discount after which you want to move the  xy discount from the request. Not possible to use with `sortBefore`."
                        },
                        "xTargeting": {
                              "type": "object",
                              "properties": {
                                    "productGuids": {
                                          "type": "array",
                                          "description": "array of product guids",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "categoryGuids": {
                                          "type": "array",
                                          "description": "array of page guids (categories)",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "brandCodes": {
                                          "type": "array",
                                          "description": "array of brand codes",
                                          "items": {
                                                "type": "string"
                                          }
                                    }
                              }
                        },
                        "yTargeting": {
                              "type": "object",
                              "properties": {
                                    "productGuids": {
                                          "type": "array",
                                          "description": "array of product guids",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "categoryGuids": {
                                          "type": "array",
                                          "description": "array of page guids (categories)",
                                          "items": {
                                                "type": "string"
                                          }
                                    },
                                    "brandCodes": {
                                          "type": "array",
                                          "description": "array of brand codes",
                                          "items": {
                                                "type": "string"
                                          }
                                    }
                              }
                        }
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_xy_discounts",
    description: "Delete of X + Y discount",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "discount ID"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_xy_discounts_settings",
    description: "X + Y discounts settings. Lists & updates settings of X + Y discounts. Please note, that 'enableInCashdesk' setting is not supported on HU projects",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "update_xy_discounts_settings",
    description: "X + Y discount settings update. Updates settings for X + Y discounts. All settings are optional, but at least one should be present.  Please note, that updating \"enableInCashdesk\" setting on HU projects will throw an exception.   If you're targeting a discount to a specific category, right now, we only include products that have",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "combineWithLoyaltyDiscounts": {
                              "type": "boolean",
                              "description": "X+Y Discount can be combined with loyalty discount"
                        },
                        "combineWithVolumeDiscounts": {
                              "type": "boolean",
                              "description": "X+Y Discount can be combined with volume discount"
                        },
                        "combineWithQuantityDiscounts": {
                              "type": "boolean",
                              "description": "X+Y Discount can be combined with quantity discount"
                        },
                        "enableMultipleDiscounts": {
                              "type": "boolean",
                              "description": "Multiple X+Y discounts can be applied at once"
                        },
                        "categoryTargeting": {
                              "enum": [
                                    "all-categories",
                                    "primary-category"
                              ],
                              "description": "Enum, discount category targeting"
                        },
                        "enableInCashdesk": {
                              "type": "boolean",
                              "description": "Enable X+Y discounts in cashdesk, please note this option is not present for HU eshops"
                        }
                  }
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_quantity_discounts",
    description: "List of quantity discounts. Returns a list of quantity discounts with basic info. Supports [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "customerGroupCode": {
                  "type": "string",
                  "description": "customer group code, possible values can be get by customer group list endpoint"
            },
            "validFrom": {
                  "type": "string",
                  "description": "date of discount validity - lower limit"
            },
            "validTo": {
                  "type": "string",
                  "description": "date of discount validity - upper limit"
            },
            "status": {
                  "type": "string",
                  "description": "status of discount, possible values are `available`, `unavailable`, `expired`, `planned`"
            },
            "isActive": {
                  "type": "boolean",
                  "description": "whether or not discount is active"
            },
            "includeUnregisteredCustomers": {
                  "type": "boolean",
                  "description": "whether or not discount is valid for unregistered customers"
            }
      }
}
  },
  {
    name: "create_quantity_discounts",
    description: "Quantity discount insertion",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "Discount title."
                        },
                        "isActive": {
                              "type": "boolean",
                              "description": "Whether or not is the discount active. If not set, default value is `true`."
                        },
                        "validFrom": {
                              "type": "string",
                              "nullable": true
                        },
                        "validTo": {
                              "type": "string",
                              "nullable": true
                        },
                        "displayFlag": {
                              "type": "boolean",
                              "description": "Whether or not to display flag. If not set, default value is `true`."
                        },
                        "flagColor": {
                              "type": "string",
                              "nullable": true
                        },
                        "customerGroupCodes": {
                              "type": "array",
                              "nullable": true,
                              "description": "Customer groups connected to discount."
                        },
                        "includeUnregisteredCustomers": {
                              "type": "boolean",
                              "description": "Defines if discount is valid for unregistered customers, default value is `false`."
                        },
                        "targetingLevel": {
                              "type": "string",
                              "enum": [
                                    "eshop",
                                    "product",
                                    "category",
                                    "brand"
                              ],
                              "description": "Level of targeting."
                        },
                        "targeting": {
                              "type": "object",
                              "nullable": true,
                              "description": "Links the discount to the specific target/s. At least one of the parameters needs to be specified.",
                              "properties": {
                                    "productGuids": {
                                          "type": "array",
                                          "nullable": true,
                                          "description": "Array of product guids."
                                    },
                                    "categoryGuids": {
                                          "type": "array",
                                          "nullable": true,
                                          "description": "Array of category guids."
                                    },
                                    "brandCodes": {
                                          "type": "array",
                                          "nullable": true,
                                          "description": "Array of brand codes."
                                    }
                              }
                        },
                        "settings": {
                              "type": "array",
                              "description": "Settings of the discount.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "amountFrom": {
                                                "type": "integer",
                                                "description": "Amount/quantity of items from which the discount is applied."
                                          },
                                          "discountType": {
                                                "type": "string",
                                                "description": "Type of the discount."
                                          },
                                          "discountValue": {
                                                "type": "object",
                                                "properties": {
                                                      "priceRatio": {
                                                            "type": "number",
                                                            "description": "Price ratio of the discount. Calculate as `(100 - percentage) / 100`. Round to 2 decimal places."
                                                      }
                                                },
                                                "required": [
                                                      "priceRatio"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "amountFrom",
                                          "discountType",
                                          "discountValue"
                                    ]
                              }
                        },
                        "sortBefore": {
                              "type": "integer",
                              "description": "Id of discount before which you want to move the discount from the request. Not possible to use with `sortAfter`."
                        },
                        "sortAfter": {
                              "type": "integer",
                              "description": "Id of discount after which you want to move the discount from the request. Not possible to use with `sortBefore`."
                        }
                  },
                  "required": [
                        "title",
                        "settings",
                        "targetingLevel"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_quantity_discounts_snapshot",
    description: "List of all quantity discounts. Using this endpoint, you can get list of all quantity discounts with detailed info of each article (like in Detail of quantity discount endpoint) asynchronously.    See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will",
    inputSchema: {
      "type": "object",
      "properties": {
            "customerGroupCode": {
                  "type": "string",
                  "description": "customer group code, possible values can be get by customer group list endpoint"
            },
            "validFrom": {
                  "type": "string",
                  "description": "date of discount validity - lower limit"
            },
            "validTo": {
                  "type": "string",
                  "description": "date of discount validity - upper limit"
            },
            "status": {
                  "type": "string",
                  "description": "status of discount, possible values are `available`, `unavailable`, `expired`, `planned`"
            },
            "isActive": {
                  "type": "boolean",
                  "description": "whether or not discount is active"
            },
            "includeUnregisteredCustomers": {
                  "type": "boolean",
                  "description": "whether or not discount is valid for unregistered customers"
            }
      }
}
  },
  {
    name: "get_quantity_discounts",
    description: "Detail of quantity discounts",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "discount ID"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "update_quantity_discounts",
    description: "Quantity discount update",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "discount ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "Discount title."
                        },
                        "isActive": {
                              "type": "boolean",
                              "description": "Whether or not is the discount active. If not set, default value is `true`."
                        },
                        "validFrom": {
                              "type": "string",
                              "nullable": true
                        },
                        "validTo": {
                              "type": "string",
                              "nullable": true
                        },
                        "displayFlag": {
                              "type": "boolean",
                              "description": "Whether or not to display flag. If not set, default value is `true`."
                        },
                        "flagColor": {
                              "type": "string",
                              "nullable": true
                        },
                        "customerGroupCodes": {
                              "type": "array",
                              "nullable": true,
                              "description": "Customer groups connected to discount."
                        },
                        "includeUnregisteredCustomers": {
                              "type": "boolean",
                              "description": "Defines if discount is valid for unregistered customers, default value is `false`."
                        },
                        "targetingLevel": {
                              "type": "string",
                              "enum": [
                                    "eshop",
                                    "product",
                                    "category",
                                    "brand"
                              ],
                              "description": "Level of targeting."
                        },
                        "targeting": {
                              "type": "object",
                              "nullable": true,
                              "description": "Links the discount to the specific target/s. At least one of the parameters needs to be specified.",
                              "properties": {
                                    "productGuids": {
                                          "type": "array",
                                          "nullable": true,
                                          "description": "Array of product guids."
                                    },
                                    "categoryGuids": {
                                          "type": "array",
                                          "nullable": true,
                                          "description": "Array of category guids."
                                    },
                                    "brandCodes": {
                                          "type": "array",
                                          "nullable": true,
                                          "description": "Array of brand codes."
                                    }
                              }
                        },
                        "settings": {
                              "type": "array",
                              "description": "Settings of the discount.",
                              "items": {
                                    "type": "object",
                                    "properties": {
                                          "amountFrom": {
                                                "type": "integer",
                                                "description": "Amount/quantity of items from which the discount is applied."
                                          },
                                          "discountType": {
                                                "type": "string",
                                                "description": "Type of the discount."
                                          },
                                          "discountValue": {
                                                "type": "object",
                                                "properties": {
                                                      "priceRatio": {
                                                            "type": "number",
                                                            "description": "Price ratio of the discount. Calculate as `(100 - percentage) / 100`. Round to 2 decimal places."
                                                      }
                                                },
                                                "required": [
                                                      "priceRatio"
                                                ]
                                          }
                                    },
                                    "required": [
                                          "amountFrom",
                                          "discountType",
                                          "discountValue"
                                    ]
                              }
                        },
                        "sortBefore": {
                              "type": "integer",
                              "description": "Id of discount before which you want to move the discount from the request. Not possible to use with `sortAfter`."
                        },
                        "sortAfter": {
                              "type": "integer",
                              "description": "Id of discount after which you want to move the discount from the request. Not possible to use with `sortBefore`."
                        }
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_quantity_discounts",
    description: "Delete of quantity discount",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "discount ID"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_volume_discounts",
    description: "List of volume discounts",
    inputSchema: {
      "type": "object",
      "properties": {
            "customerGroupCode": {
                  "type": "string",
                  "description": "customer group code, possible values can be get by customer group list endpoint"
            }
      }
}
  },
  {
    name: "list_articles",
    description: "List of articles. Returns a list of articles with basic info. Supports [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 10."
            }
      }
}
  },
  {
    name: "create_articles",
    description: "Insert of article. Creates a new article",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "Title of the article"
                        },
                        "language": {
                              "type": "string",
                              "description": "Language of the article. Available and settable only if module Foreign languages is active and initialized."
                        },
                        "defaultSectionId": {
                              "type": "integer",
                              "description": "Id of the section"
                        },
                        "sectionIds": {
                              "type": "array",
                              "description": "Id of the section",
                              "items": {
                                    "type": "integer"
                              }
                        },
                        "indexName": {
                              "type": "string",
                              "description": "ending part of article URL"
                        },
                        "redirectUrl": {
                              "type": "string",
                              "nullable": true,
                              "description": "canonical URL for redirecting"
                        },
                        "content": {
                              "type": "string",
                              "nullable": true,
                              "description": "Content of the article"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta title of the article"
                        },
                        "metaKeywords": {
                              "type": "string",
                              "nullable": true,
                              "description": "DEPRECATED - Keywords of the article"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta description of the article"
                        },
                        "publishDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "Flag whether the article is visible on web"
                        },
                        "access": {
                              "enum": [
                                    "all",
                                    "logged-in",
                                    "logged-out",
                                    "admin-only"
                              ],
                              "description": "Flag indicating, whether the article can be viewed by everyone (value of the flag is: 'all'), by logged in users only ('logged-in'), by logged out users only ('logged-out'), or by administrators only "
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "sourceOgImageName": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "title",
                        "defaultSectionId"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_articles_snapshot",
    description: "List of all articles. Using this endpoint, you can get list of all articles with detailed info of each article (like in Detail of article endpoint) asynchronously.    See how [Asynchronous requests](https://developers.shoptet.com/asynchronous-requests/) work on our developer's portal.   Response will be in [jsonlines](ht",
    inputSchema: {
      "type": "object",
      "properties": {
            "idFrom": {
                  "type": "integer",
                  "description": "Export articles with id bigger or equal than given value"
            },
            "idTo": {
                  "type": "integer",
                  "description": "Export articles with id lower or equal than given value"
            },
            "articleLanguage": {
                  "type": "string",
                  "description": "Export articles written in given language"
            },
            "publishDateFrom": {
                  "type": "string",
                  "description": "Export articles published after given datetime"
            },
            "publishDateTo": {
                  "type": "string",
                  "description": "Export articles published before given datetime"
            },
            "changeDateFrom": {
                  "type": "string",
                  "description": "Export articles updated after given datetime"
            },
            "changeDateTo": {
                  "type": "string",
                  "description": "Export articles updated before given datetime"
            },
            "visible": {
                  "type": "boolean",
                  "description": "Filtering according to document visibility"
            }
      }
}
  },
  {
    name: "get_articles",
    description: "Detail of article. Returns a detail of the article",
    inputSchema: {
      "type": "object",
      "properties": {
            "articleId": {
                  "type": "integer",
                  "description": "article ID"
            }
      },
      "required": [
            "articleId"
      ]
}
  },
  {
    name: "update_articles",
    description: "Update of article. Updates the article",
    inputSchema: {
      "type": "object",
      "properties": {
            "articleId": {
                  "type": "integer",
                  "description": "article ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "Title of the article"
                        },
                        "language": {
                              "type": "string",
                              "description": "Language of the article. Available and settable only if module Foreign languages is active and initialized."
                        },
                        "defaultSectionId": {
                              "type": "integer",
                              "description": "Id of the section"
                        },
                        "sectionIds": {
                              "type": "array",
                              "description": "Id of the section",
                              "items": {
                                    "type": "integer"
                              }
                        },
                        "indexName": {
                              "type": "string",
                              "description": "ending part of article URL"
                        },
                        "redirectUrl": {
                              "type": "string",
                              "nullable": true,
                              "description": "canonical URL for redirecting"
                        },
                        "content": {
                              "type": "string",
                              "nullable": true,
                              "description": "Content of the article"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta title of the article"
                        },
                        "metaKeywords": {
                              "type": "string",
                              "nullable": true,
                              "description": "DEPRECATED - Keywords of the article"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "Meta description of the article"
                        },
                        "publishDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "Flag whether the article is visible on web"
                        },
                        "access": {
                              "enum": [
                                    "all",
                                    "logged-in",
                                    "logged-out",
                                    "admin-only"
                              ],
                              "description": "Flag indicating, whether the article can be viewed by everyone (value of the flag is: 'all'), by logged in users only ('logged-in'), by logged out users only ('logged-out'), or by administrators only "
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "sourceOgImageName": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "articleId",
            "data"
      ]
}
  },
  {
    name: "delete_articles",
    description: "Delete of article. Deletes the article",
    inputSchema: {
      "type": "object",
      "properties": {
            "articleId": {
                  "type": "integer",
                  "description": "article ID"
            }
      },
      "required": [
            "articleId"
      ]
}
  },
  {
    name: "list_articles_sections",
    description: "List of article sections. Returns a list of article sections",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_articles_sections",
    description: "Insert of article section. Creates a new article section",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "article section title"
                        },
                        "language": {
                              "type": "string",
                              "description": "Article section language. Available and settable only if module Foreign languages is active and initialized."
                        },
                        "parentId": {
                              "type": "integer",
                              "nullable": true,
                              "description": "ID of the parent article section. Maximum nesting depth of article section is 4 nodes."
                        },
                        "indexName": {
                              "type": "string",
                              "nullable": true,
                              "description": "ending part of article section URL"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "article section content"
                        },
                        "secondDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "article section second content"
                        },
                        "limit": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Number of articles displayed in the listing"
                        },
                        "homepageLimit": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Number of articles displayed on the homepage"
                        },
                        "sorting": {
                              "enum": [
                                    "alphabetically",
                                    "newest-first",
                                    "oldest-first"
                              ],
                              "description": "Article sorting in the listing"
                        },
                        "perexLimit": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Number of character displayed in the article perex"
                        },
                        "hidePublishDate": {
                              "type": "boolean",
                              "description": "Hide article publish date in the listing"
                        },
                        "showPrevNext": {
                              "type": "boolean",
                              "description": "Show next/previous buttons in the listing"
                        },
                        "showOnHomepage": {
                              "type": "boolean",
                              "description": "Show articles on the homepage"
                        },
                        "linkText": {
                              "type": "string",
                              "nullable": true,
                              "description": "Link text (in the menu)"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "article meta title"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "article meta description"
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "flag whether the article section is visible on web"
                        },
                        "access": {
                              "enum": [
                                    "all",
                                    "logged-in",
                                    "logged-out"
                              ],
                              "description": "flag indicating, whether the article section can be viewed by everyone (value of the flag is: `all`), by logged in users only ('logged-in'), or by logged out users only ('logged-out')"
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "sourceOgImageName": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "title"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_articles_sections",
    description: "Detail of article section. Returns a detail of the article section",
    inputSchema: {
      "type": "object",
      "properties": {
            "articleSectionId": {
                  "type": "integer",
                  "description": "article section ID"
            }
      },
      "required": [
            "articleSectionId"
      ]
}
  },
  {
    name: "update_articles_sections",
    description: "Update of article section. Updates the article section",
    inputSchema: {
      "type": "object",
      "properties": {
            "articleSectionId": {
                  "type": "integer",
                  "description": "article section ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "article section title"
                        },
                        "language": {
                              "type": "string",
                              "description": "Article section language. Available and settable only if module Foreign languages is active and initialized."
                        },
                        "indexName": {
                              "type": "string",
                              "nullable": true,
                              "description": "ending part of article section URL"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "article section content"
                        },
                        "secondDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "article section second content"
                        },
                        "limit": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Number of articles displayed in the listing"
                        },
                        "homepageLimit": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Number of articles displayed on the homepage"
                        },
                        "sorting": {
                              "enum": [
                                    "alphabetically",
                                    "newest-first",
                                    "oldest-first"
                              ],
                              "description": "Article sorting in the listing"
                        },
                        "perexLimit": {
                              "type": "integer",
                              "nullable": true,
                              "description": "Number of character displayed in the article perex"
                        },
                        "hidePublishDate": {
                              "type": "boolean",
                              "description": "Hide article publish date in the listing"
                        },
                        "showPrevNext": {
                              "type": "boolean",
                              "description": "Show next/previous buttons in the listing"
                        },
                        "showOnHomepage": {
                              "type": "boolean",
                              "description": "Show articles on the homepage"
                        },
                        "linkText": {
                              "type": "string",
                              "nullable": true,
                              "description": "Link text (in the menu)"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "article meta title"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "article meta description"
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "flag whether the article section is visible on web"
                        },
                        "access": {
                              "enum": [
                                    "all",
                                    "logged-in",
                                    "logged-out"
                              ],
                              "description": "flag indicating, whether the article section can be viewed by everyone (value of the flag is: `all`), by logged in users only ('logged-in'), or by logged out users only ('logged-out')"
                        },
                        "sourceImageName": {
                              "type": "string",
                              "nullable": true
                        },
                        "sourceOgImageName": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "articleSectionId",
            "data"
      ]
}
  },
  {
    name: "delete_articles_sections",
    description: "Deletion of article section. If the article section cannot be deleted, because it contains article(s), a 409 code is returned.  Optional parameter 'force' with 'true' value allows deletion of article section including permanent deletion of article(s) having this section set as default",
    inputSchema: {
      "type": "object",
      "properties": {
            "articleSectionId": {
                  "type": "integer",
                  "description": "article section ID"
            },
            "force": {
                  "type": "boolean",
                  "description": "allows deletion of article section that contains article(s) if set to `true`"
            }
      },
      "required": [
            "articleSectionId"
      ]
}
  },
  {
    name: "list_pages",
    description: "List of pages. Returns a list of pages",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_pages",
    description: "Insert of page. Creates a new page",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "page title"
                        },
                        "indexName": {
                              "type": "string",
                              "description": "ending part of page URL"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "page content"
                        },
                        "linkText": {
                              "type": "string",
                              "nullable": true,
                              "description": "page title in the menu"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "page meta title"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "page meta description"
                        },
                        "canonicalUrl": {
                              "type": "string",
                              "nullable": true,
                              "description": "canonical URL of the page"
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "flag whether the page is visible on web"
                        },
                        "access": {
                              "enum": [
                                    "all",
                                    "logged-in",
                                    "logged-out",
                                    "admin-only"
                              ],
                              "description": "flag indicating, whether the page can be viewed by everyone (value of the flag is: `all`), by logged in users only ('logged-in'), by logged out users only ('logged-out'), or by administrators only ('a"
                        },
                        "sourceOgImageName": {
                              "type": "string",
                              "nullable": true
                        }
                  },
                  "required": [
                        "title"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "get_pages",
    description: "Detail of page. Returns a detail of the page",
    inputSchema: {
      "type": "object",
      "properties": {
            "pageId": {
                  "type": "integer",
                  "description": "page ID"
            }
      },
      "required": [
            "pageId"
      ]
}
  },
  {
    name: "update_pages",
    description: "Update of page. Updates the page",
    inputSchema: {
      "type": "object",
      "properties": {
            "pageId": {
                  "type": "integer",
                  "description": "page ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "title": {
                              "type": "string",
                              "description": "page title"
                        },
                        "indexName": {
                              "type": "string",
                              "description": "ending part of page URL"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "page content"
                        },
                        "linkText": {
                              "type": "string",
                              "nullable": true,
                              "description": "page title in the menu"
                        },
                        "metaTitle": {
                              "type": "string",
                              "nullable": true,
                              "description": "page meta title"
                        },
                        "metaDescription": {
                              "type": "string",
                              "nullable": true,
                              "description": "page meta description"
                        },
                        "canonicalUrl": {
                              "type": "string",
                              "nullable": true,
                              "description": "canonical URL of the page"
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "flag whether the page is visible on web"
                        },
                        "access": {
                              "enum": [
                                    "all",
                                    "logged-in",
                                    "logged-out",
                                    "admin-only"
                              ],
                              "description": "flag indicating, whether the page can be viewed by everyone (value of the flag is: `all`), by logged in users only ('logged-in'), by logged out users only ('logged-out'), or by administrators only ('a"
                        },
                        "sourceOgImageName": {
                              "type": "string",
                              "nullable": true
                        }
                  }
            }
      },
      "required": [
            "pageId",
            "data"
      ]
}
  },
  {
    name: "delete_pages",
    description: "Delete of page. Deletes the page",
    inputSchema: {
      "type": "object",
      "properties": {
            "pageId": {
                  "type": "integer",
                  "description": "page ID"
            }
      },
      "required": [
            "pageId"
      ]
}
  },
  {
    name: "list_discussions_posts",
    description: "List of discussion posts. List of discussion posts, filterable by product GUID, article ID, page ID, customer GUID, author's e-mail, and creation date. Requires \"discussion\" module to be active",
    inputSchema: {
      "type": "object",
      "properties": {
            "productGuid": {
                  "type": "string",
                  "description": "guid of the product associated to discussion"
            },
            "articleId": {
                  "type": "integer",
                  "description": "identifier of the article associated to discussion"
            },
            "pageId": {
                  "type": "integer",
                  "description": "identifier of the page associated to discussion"
            },
            "customerGuid": {
                  "type": "string",
                  "description": "guid of the customer associated to discussion"
            },
            "userEmail": {
                  "type": "string",
                  "description": "e-mail of the post's author"
            },
            "creationDateFrom": {
                  "type": "string",
                  "description": "date and time of the post creation - lower limit"
            },
            "creationDateTo": {
                  "type": "string",
                  "description": "date and time of the post creation - upper limit"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default and max value is 100."
            }
      }
}
  },
  {
    name: "create_discussions_posts",
    description: "Creation of discussion posts. Allows the creation of multiple discussion posts at once. The limit of items per request is defined to 100.   Discussions can be created for: products, articles, and pages. Requires \"discussion\" module to be active.   Request is processing all the items. If there are some errors in item definitions,",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "parentId": {
                                    "type": "integer",
                                    "nullable": true,
                                    "description": "Discussion post parent identifier."
                              },
                              "productGuid": {
                                    "type": "string"
                              },
                              "articleId": {
                                    "type": "integer",
                                    "nullable": true,
                                    "description": "Discussion post article identifier."
                              },
                              "pageId": {
                                    "type": "integer",
                                    "nullable": true,
                                    "description": "Discussion post page identifier."
                              },
                              "customerGuid": {
                                    "type": "string"
                              },
                              "name": {
                                    "type": "string",
                                    "nullable": true,
                                    "description": "Name of the author."
                              },
                              "email": {
                                    "type": "string",
                                    "description": "Email of the author."
                              },
                              "title": {
                                    "type": "string",
                                    "nullable": true,
                                    "description": "Title of the post."
                              },
                              "content": {
                                    "type": "string",
                                    "description": "Content of the post."
                              },
                              "creationDate": {
                                    "type": "string",
                                    "nullable": true
                              },
                              "authorized": {
                                    "type": "boolean",
                                    "description": "Flag whether the post is authorized (visible on the web)."
                              }
                        },
                        "required": [
                              "email",
                              "content",
                              "authorized"
                        ]
                  }
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_discussions_posts",
    description: "Discussion post update. Updates discussion post's data. Requires \"discussion\" module to be active",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "Discussion post id"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "name": {
                              "type": "string",
                              "nullable": true,
                              "description": "Name of the author."
                        },
                        "email": {
                              "type": "string",
                              "description": "Email of the author."
                        },
                        "title": {
                              "type": "string",
                              "nullable": true,
                              "description": "Title of the post."
                        },
                        "content": {
                              "type": "string",
                              "description": "Content of the post."
                        },
                        "creationDate": {
                              "type": "string",
                              "nullable": true
                        },
                        "authorized": {
                              "type": "boolean",
                              "description": "Flag whether the post is authorized (visible on the web)."
                        }
                  }
            }
      },
      "required": [
            "id",
            "data"
      ]
}
  },
  {
    name: "delete_discussions_posts",
    description: "Removal of discussion post. Deletes discussion post. Requires \"discussion\" module to be active",
    inputSchema: {
      "type": "object",
      "properties": {
            "id": {
                  "type": "integer",
                  "description": "ID of discussion"
            }
      },
      "required": [
            "id"
      ]
}
  },
  {
    name: "list_system_jobs",
    description: "List of jobs. List of jobs in queue. Using the \"status\" parameter to filter by completed|pending|running|failed|expired|killed.  Without this filter it will show all statuses. Also you can filter results depends on time of creation and completion",
    inputSchema: {
      "type": "object",
      "properties": {
            "status": {
                  "type": "string",
                  "description": "supported values: `completed`, `pending`, `running`, `failed`, `expired`, `killed`"
            },
            "creationTimeFrom": {
                  "type": "string",
                  "description": "date and time of job creation - lower limit"
            },
            "creationTimeTo": {
                  "type": "string",
                  "description": "date and time of job creation - upper limit"
            },
            "completionTimeFrom": {
                  "type": "string",
                  "description": "date and time of job completion - lower limit"
            },
            "completionTimeTo": {
                  "type": "string",
                  "description": "date and time of job completion - upper limit"
            },
            "itemsPerPage": {
                  "type": "integer",
                  "description": "Returned items per page. Default value is 100. Max value is 500."
            }
      }
}
  },
  {
    name: "get_system_jobs",
    description: "Job detail. Returns information about job. If job is completed, it will contain additional information about job result.   Returns 404 if job does not exist.  Returns 403 response if job detail of unprocessed job is requested more than 10 times",
    inputSchema: {
      "type": "object",
      "properties": {
            "jobId": {
                  "type": "string",
                  "description": ""
            }
      },
      "required": [
            "jobId"
      ]
}
  },
  {
    name: "list_system_files",
    description: "List of uploaded files. Retrieves your uploaded files that can be copied in supported endpoints to entities within e-shop",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_system_files",
    description: "Batch files upload. **This endpoint has been only renamed from \"File upload\" after we created new synchronous endpoint one file upload. Url and structure is unchanged**  Performs file upload asynchronously.  Please note that order of files matter (result of job respects the order of images in request).   In case of spe",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "array",
                  "items": {
                        "type": "object",
                        "properties": {
                              "sourceUrl": {
                                    "type": "string",
                                    "description": "source URL of the image you want to upload."
                              },
                              "name": {
                                    "type": "string"
                              }
                        },
                        "required": [
                              "sourceUrl"
                        ]
                  }
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "create_system_file",
    description: "File upload. **This is new endpoint - older asynchronous endpoint has been only renamed to \"Batch files upload\" in documentation, url and structure is unchanged**  **Please, do not use this endpoint for batch file upload!**  Performs one file upload synchronously in same way as asynchronous files  upload.   In t",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "sourceUrl": {
                              "type": "string",
                              "description": "source URL of the image you want to upload."
                        },
                        "name": {
                              "type": "string"
                        }
                  },
                  "required": [
                        "sourceUrl"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "list_system_endpoints",
    description: "List of available endpoints. List of endpoints available within the systems. Using the \"status\" parameter, you can list the approved  endpoints, or endpoints pending approval. In default state, without the parameter, the endpoint returns  the approved endpoints",
    inputSchema: {
      "type": "object",
      "properties": {
            "status": {
                  "type": "string",
                  "description": "supported values: `approved`, `pending`"
            }
      }
}
  },
  {
    name: "list_reviews_products",
    description: "List of products reviews. Returns list of product's reviews",
    inputSchema: {
      "type": "object",
      "properties": {
            "dateFrom": {
                  "type": "string",
                  "description": "Filter reviews with creation date after date"
            },
            "dateTo": {
                  "type": "string",
                  "description": "Filter reviews with creation date before date"
            },
            "changeTimeFrom": {
                  "type": "string",
                  "description": "Filter reviews changed after this date (included)"
            },
            "productGuid": {
                  "type": "string",
                  "description": "Product identifier to filter reviews by."
            },
            "orderCode": {
                  "type": "string",
                  "description": "Order identifier to filter reviews by."
            }
      }
}
  },
  {
    name: "create_reviews_products",
    description: "Product review insertion. Importing product reviews with option to backdate them",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "productGuid": {
                              "type": "string"
                        },
                        "date": {
                              "type": "string",
                              "nullable": true
                        },
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "full name (can be `null`)"
                        },
                        "email": {
                              "type": "string",
                              "description": "email address"
                        },
                        "description": {
                              "type": "string",
                              "nullable": true
                        },
                        "rating": {
                              "type": "integer",
                              "description": "Number from 1 to 5 representing starts of review's rating."
                        },
                        "customerGuid": {
                              "type": "string",
                              "nullable": true,
                              "description": "Customer guid related to review. Can be null."
                        },
                        "orderCode": {
                              "type": "string",
                              "nullable": true,
                              "description": "Order code related to review. Can be null."
                        },
                        "ipAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "IP address of the client who made the review"
                        },
                        "reaction": {
                              "type": "object",
                              "properties": {
                                    "reactionCreated": {
                                          "type": "string",
                                          "nullable": true
                                    },
                                    "reactionFullName": {
                                          "type": "string",
                                          "nullable": true
                                    },
                                    "reactionEmail": {
                                          "type": "string",
                                          "nullable": true
                                    },
                                    "reactionText": {
                                          "type": "string",
                                          "nullable": true
                                    }
                              }
                        }
                  },
                  "required": [
                        "productGuid",
                        "rating"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_reviews_products",
    description: "Product review update. Updates the product review. This endpoint is available only when the 'Rating' module is active",
    inputSchema: {
      "type": "object",
      "properties": {
            "reviewId": {
                  "type": "integer",
                  "description": "review ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Text of the review. Can be null only if 'Comment is required' setting is disabled."
                        },
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Fullname of review's author. Can be null only if 'Comment is required' setting is disabled."
                        },
                        "authorized": {
                              "type": "boolean",
                              "description": "flag whether the review is authorized"
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "flag whether the review is visible on web"
                        },
                        "reaction": {
                              "type": "object",
                              "properties": {
                                    "reactionFullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Fullname of reaction author. Can be null."
                                    },
                                    "reactionEmail": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Email of the reaction author."
                                    },
                                    "reactionText": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Text of the reaction."
                                    }
                              }
                        }
                  }
            }
      },
      "required": [
            "reviewId",
            "data"
      ]
}
  },
  {
    name: "list_reviews_project",
    description: "List of project reviews. Returns a list of the project reviews. This endpoint is available only when the 'Rating' module is active. Also, the project must have store ratings enabled in the administration settings. The endpoint supports [Paging](#section/basic-principles/paging)",
    inputSchema: {
      "type": "object",
      "properties": {}
}
  },
  {
    name: "create_reviews_project",
    description: "Project review insertion. Creates a new project review. This endpoint is available only when the 'Rating' module is active. Also, the e-shop must have store ratings enabled in the administration settings",
    inputSchema: {
      "type": "object",
      "properties": {
            "data": {
                  "type": "object",
                  "properties": {
                        "date": {
                              "type": "string",
                              "nullable": true
                        },
                        "orderCode": {
                              "type": "string",
                              "nullable": true,
                              "description": "Order code related to review. Can be null."
                        },
                        "rating": {
                              "type": "integer",
                              "description": "Number from 1 to 5 representing stars of review's rating."
                        },
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Text of the review. Can be null only if 'Comment is required' setting is disabled."
                        },
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Fullname of review's author. Can be null only if 'Comment is required' setting is disabled."
                        },
                        "email": {
                              "type": "string",
                              "description": "Email of the review author."
                        },
                        "customerGuid": {
                              "type": "string",
                              "nullable": true,
                              "description": "Customer guid related to review. Can be null."
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "Flag whether the review is visible on web."
                        },
                        "ipAddress": {
                              "type": "string",
                              "nullable": true,
                              "description": "IP address of the client who made the review."
                        },
                        "reaction": {
                              "type": "object",
                              "properties": {
                                    "reactionCreated": {
                                          "type": "string",
                                          "nullable": true
                                    },
                                    "reactionFullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Fullname of reaction author. Can be null."
                                    },
                                    "reactionEmail": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Email of the reaction author."
                                    },
                                    "reactionText": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Text of the reaction."
                                    }
                              }
                        }
                  },
                  "required": [
                        "rating"
                  ]
            }
      },
      "required": [
            "data"
      ]
}
  },
  {
    name: "update_reviews_project",
    description: "Project review update. Updates the project review. This endpoint is available only when the 'Rating' module is active. Also, the project must have store ratings enabled in the administration settings",
    inputSchema: {
      "type": "object",
      "properties": {
            "reviewId": {
                  "type": "integer",
                  "description": "review ID"
            },
            "data": {
                  "type": "object",
                  "properties": {
                        "description": {
                              "type": "string",
                              "nullable": true,
                              "description": "Text of the review. Can be null only if 'Comment and name is required' setting is disabled."
                        },
                        "fullName": {
                              "type": "string",
                              "nullable": true,
                              "description": "Fullname of review's author. Can be null only if 'Comment and name is required' setting is disabled."
                        },
                        "visible": {
                              "type": "boolean",
                              "description": "Flag whether the review is visible on web."
                        },
                        "reaction": {
                              "type": "object",
                              "properties": {
                                    "reactionFullName": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Fullname of reaction author. Can be null."
                                    },
                                    "reactionEmail": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Email of the reaction author."
                                    },
                                    "reactionText": {
                                          "type": "string",
                                          "nullable": true,
                                          "description": "Text of the reaction."
                                    }
                              }
                        }
                  }
            }
      },
      "required": [
            "reviewId",
            "data"
      ]
}
  }
];

// CZ: MCP Server instance
// EN: MCP Server instance
const server = new Server(
  { name: "shoptet-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// CZ: Vrátí seznam všech tools
// EN: Return list of all tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// CZ: Zpracování volání tool
// EN: Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;
  let result;

  try {
    switch (name) {
    case "list_eshop": {
      const url = `${BASE_URL}/api/eshop`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_eshop_design": {
      const url = `${BASE_URL}/api/eshop/design`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_eshop_document_settings": {
      const url = `${BASE_URL}/api/eshop/document-settings`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_eshop_customer_fields": {
      const url = `${BASE_URL}/api/eshop/customer-fields`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_products": {
      const url = `${BASE_URL}/api/products`;
      const params = new URLSearchParams();
    if (args.availabilityId !== undefined) params.append('availabilityId', String(args.availabilityId));
    if (args.availabilityWhenSoldOutId !== undefined) params.append('availabilityWhenSoldOutId', String(args.availabilityWhenSoldOutId));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.visibility !== undefined) params.append('visibility', String(args.visibility));
    if (args.type !== undefined) params.append('type', String(args.type));
    if (args.brandName !== undefined) params.append('brandName', String(args.brandName));
    if (args.brandCode !== undefined) params.append('brandCode', String(args.brandCode));
    if (args.defaultCategoryGuid !== undefined) params.append('defaultCategoryGuid', String(args.defaultCategoryGuid));
    if (args.categoryGuid !== undefined) params.append('categoryGuid', String(args.categoryGuid));
    if (args.flag !== undefined) params.append('flag', String(args.flag));
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.productCodes !== undefined) params.append('productCodes', String(args.productCodes));
    if (args.productGuids !== undefined) params.append('productGuids', String(args.productGuids));
    if (args.supplierGuid !== undefined) params.append('supplierGuid', String(args.supplierGuid));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_products": {
      const url = `${BASE_URL}/api/products`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "create_products_copy": {
      const url = `${BASE_URL}/api/products/${args.guid}/copy`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_products_snapshot": {
      const url = `${BASE_URL}/api/products/snapshot`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.productCodes !== undefined) params.append('productCodes', String(args.productCodes));
    if (args.productGuids !== undefined) params.append('productGuids', String(args.productGuids));
    if (args.availabilityId !== undefined) params.append('availabilityId', String(args.availabilityId));
    if (args.availabilityWhenSoldOutId !== undefined) params.append('availabilityWhenSoldOutId', String(args.availabilityWhenSoldOutId));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.visibility !== undefined) params.append('visibility', String(args.visibility));
    if (args.type !== undefined) params.append('type', String(args.type));
    if (args.brandName !== undefined) params.append('brandName', String(args.brandName));
    if (args.brandCode !== undefined) params.append('brandCode', String(args.brandCode));
    if (args.defaultCategoryGuid !== undefined) params.append('defaultCategoryGuid', String(args.defaultCategoryGuid));
    if (args.categoryGuid !== undefined) params.append('categoryGuid', String(args.categoryGuid));
    if (args.flag !== undefined) params.append('flag', String(args.flag));
    if (args.supplierGuid !== undefined) params.append('supplierGuid', String(args.supplierGuid));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_products_snapshot_pricelists": {
      const url = `${BASE_URL}/api/products/snapshot/pricelists`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_products": {
      const url = `${BASE_URL}/api/products/${args.guid}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_products": {
      const url = `${BASE_URL}/api/products/${args.guid}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "delete_products": {
      const url = `${BASE_URL}/api/products/${args.guid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "update_products_batch": {
      const url = `${BASE_URL}/api/products/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_batch": {
      const url = `${BASE_URL}/api/products/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('DELETE', url, body);
      break;
    }
    case "get_products_code": {
      const url = `${BASE_URL}/api/products/code/${args.code}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_products_code": {
      const url = `${BASE_URL}/api/products/code/${args.code}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "delete_products_code": {
      const url = `${BASE_URL}/api/products/code/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_products_images": {
      const url = `${BASE_URL}/api/products/${args.guid}/images/${args.gallery}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_images": {
      const url = `${BASE_URL}/api/products/${args.guid}/images/${args.gallery}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_images": {
      const url = `${BASE_URL}/api/products/${args.guid}/images/${args.gallery}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_images": {
      const url = `${BASE_URL}/api/products/${args.guid}/images/${args.gallery}`;
      const params = new URLSearchParams();
    if (args.removeReference !== undefined) params.append('removeReference', String(args.removeReference));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('DELETE', fullUrl);
      break;
    }
    case "update_products_images_source": {
      const url = `${BASE_URL}/api/products/${args.guid}/images/${args.gallery}/source`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_images_by_gallery_and_imagename": {
      const url = `${BASE_URL}/api/products/${args.guid}/images/${args.gallery}/${args.imageName}`;
      const params = new URLSearchParams();
    if (args.removeReference !== undefined) params.append('removeReference', String(args.removeReference));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('DELETE', fullUrl);
      break;
    }
    case "create_products_related_files": {
      const url = `${BASE_URL}/api/products/${args.guid}/related-files`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_products_related_files": {
      const url = `${BASE_URL}/api/products/${args.guid}/related-files`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "delete_products_related_files_by_guid_and_id": {
      const url = `${BASE_URL}/api/products/${args.guid}/related-files/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_changes": {
      const url = `${BASE_URL}/api/products/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_categories": {
      const url = `${BASE_URL}/api/categories`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_categories": {
      const url = `${BASE_URL}/api/categories`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_categories": {
      const url = `${BASE_URL}/api/categories/${args.categoryGuid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_categories": {
      const url = `${BASE_URL}/api/categories/${args.categoryGuid}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_categories": {
      const url = `${BASE_URL}/api/categories/${args.categoryGuid}`;
      const params = new URLSearchParams();
    if (args.deleteUsed !== undefined) params.append('deleteUsed', String(args.deleteUsed));
    if (args.deleteChildren !== undefined) params.append('deleteChildren', String(args.deleteChildren));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('DELETE', fullUrl);
      break;
    }
    case "update_categories_batch": {
      const url = `${BASE_URL}/api/categories/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "update_categories_products_priority_batch": {
      const url = `${BASE_URL}/api/categories/products-priority/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "get_categories_productsPriority": {
      const url = `${BASE_URL}/api/categories/${args.categoryGuid}/productsPriority`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_categories_productsPriority": {
      const url = `${BASE_URL}/api/categories/${args.categoryGuid}/productsPriority`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "list_parametric_categories": {
      const url = `${BASE_URL}/api/parametric-categories`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_parametric_categories": {
      const url = `${BASE_URL}/api/parametric-categories`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "get_parametric_categories": {
      const url = `${BASE_URL}/api/parametric-categories/${args.categoryGuid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_parametric_categories": {
      const url = `${BASE_URL}/api/parametric-categories/${args.categoryGuid}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_parametric_categories": {
      const url = `${BASE_URL}/api/parametric-categories/${args.categoryGuid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_parametric_categories_available_parameters": {
      const url = `${BASE_URL}/api/parametric-categories-available-parameters/${args.categoryGuid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_parametric_categories_definition": {
      const url = `${BASE_URL}/api/parametric-categories-definition`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_products_flags": {
      const url = `${BASE_URL}/api/products/flags`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_flags": {
      const url = `${BASE_URL}/api/products/flags`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_flags": {
      const url = `${BASE_URL}/api/products/flags/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_flags": {
      const url = `${BASE_URL}/api/products/flags/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_measure_units": {
      const url = `${BASE_URL}/api/products/measure-units`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_products_availabilities": {
      const url = `${BASE_URL}/api/products/availabilities`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_availabilities": {
      const url = `${BASE_URL}/api/products/availabilities`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_availabilities": {
      const url = `${BASE_URL}/api/products/availabilities/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_availabilities": {
      const url = `${BASE_URL}/api/products/availabilities/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_surcharge_parameters": {
      const url = `${BASE_URL}/api/products/surcharge-parameters`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_products_surcharge_parameters": {
      const url = `${BASE_URL}/api/products/surcharge-parameters`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_products_surcharge_parameters": {
      const url = `${BASE_URL}/api/products/surcharge-parameters/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_surcharge_parameters_by_code": {
      const url = `${BASE_URL}/api/products/surcharge-parameters/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_surcharge_parameters": {
      const url = `${BASE_URL}/api/products/surcharge-parameters/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_surcharge_parameters": {
      const url = `${BASE_URL}/api/products/surcharge-parameters/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "update_products_surcharge_parameters_by_paramindex_and_value": {
      const url = `${BASE_URL}/api/products/surcharge-parameters/${args.paramIndex}/${args.valueIndex}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_surcharge_parameters_by_paramindex_and_value": {
      const url = `${BASE_URL}/api/products/surcharge-parameters/${args.paramIndex}/${args.valueIndex}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_filtering_parameters": {
      const url = `${BASE_URL}/api/products/filtering-parameters`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_products_filtering_parameters": {
      const url = `${BASE_URL}/api/products/filtering-parameters`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_products_filtering_parameters": {
      const url = `${BASE_URL}/api/products/filtering-parameters/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_filtering_parameters_by_code": {
      const url = `${BASE_URL}/api/products/filtering-parameters/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_filtering_parameters": {
      const url = `${BASE_URL}/api/products/filtering-parameters/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_filtering_parameters": {
      const url = `${BASE_URL}/api/products/filtering-parameters/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "update_products_filtering_parameters_by_code_and_valueindex": {
      const url = `${BASE_URL}/api/products/filtering-parameters/${args.code}/${args.valueIndex}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_filtering_parameters_by_code_and_valueindex": {
      const url = `${BASE_URL}/api/products/filtering-parameters/${args.code}/${args.valueIndex}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_variant_parameters": {
      const url = `${BASE_URL}/api/products/variant-parameters`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_products_variant_parameters": {
      const url = `${BASE_URL}/api/products/variant-parameters`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_products_variant_parameters": {
      const url = `${BASE_URL}/api/products/variant-parameters/${args.paramIndex}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_variant_parameters_by_paramindex": {
      const url = `${BASE_URL}/api/products/variant-parameters/${args.paramIndex}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_variant_parameters": {
      const url = `${BASE_URL}/api/products/variant-parameters/${args.paramIndex}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_variant_parameters": {
      const url = `${BASE_URL}/api/products/variant-parameters/${args.paramIndex}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "update_products_variant_parameters_by_paramindex_and_rawvalu": {
      const url = `${BASE_URL}/api/products/variant-parameters/${args.paramIndex}/${args.rawValue}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_variant_parameters_by_paramindex_and_rawvalu": {
      const url = `${BASE_URL}/api/products/variant-parameters/${args.paramIndex}/${args.rawValue}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_consumption_taxes": {
      const url = `${BASE_URL}/api/products/consumption-taxes`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_consumption_taxes": {
      const url = `${BASE_URL}/api/products/consumption-taxes`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_products_consumption_taxes": {
      const url = `${BASE_URL}/api/products/consumption-taxes/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_products_consumption_taxes": {
      const url = `${BASE_URL}/api/products/consumption-taxes/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_products_recycling_fee_categories": {
      const url = `${BASE_URL}/api/products/recycling-fee-categories`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_products_warranties": {
      const url = `${BASE_URL}/api/products/warranties`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_products_alternativeProducts": {
      const url = `${BASE_URL}/api/products/${args.guid}/alternativeProducts`;
      const params = new URLSearchParams();
    if (args.visible !== undefined) params.append('visible', String(args.visible));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_products_alternativeProducts": {
      const url = `${BASE_URL}/api/products/${args.guid}/alternativeProducts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "set_products_alternativeProducts": {
      const url = `${BASE_URL}/api/products/${args.guid}/alternativeProducts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PUT', url, body);
      break;
    }
    case "get_products_relatedProducts": {
      const url = `${BASE_URL}/api/products/${args.guid}/relatedProducts`;
      const params = new URLSearchParams();
    if (args.visible !== undefined) params.append('visible', String(args.visible));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_products_relatedProducts": {
      const url = `${BASE_URL}/api/products/${args.guid}/relatedProducts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "set_products_relatedProducts": {
      const url = `${BASE_URL}/api/products/${args.guid}/relatedProducts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PUT', url, body);
      break;
    }
    case "create_products_set": {
      const url = `${BASE_URL}/api/products/${args.guid}/set`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "set_products_set": {
      const url = `${BASE_URL}/api/products/${args.guid}/set`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PUT', url, body);
      break;
    }
    case "list_products_units": {
      const url = `${BASE_URL}/api/products/units`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_products_gifts": {
      const url = `${BASE_URL}/api/products/${args.guid}/gifts`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_products_gifts": {
      const url = `${BASE_URL}/api/products/${args.guid}/gifts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "set_products_gifts": {
      const url = `${BASE_URL}/api/products/${args.guid}/gifts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PUT', url, body);
      break;
    }
    case "list_pricelists": {
      const url = `${BASE_URL}/api/pricelists`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_pricelists": {
      const url = `${BASE_URL}/api/pricelists`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_pricelists": {
      const url = `${BASE_URL}/api/pricelists/${args.id}`;
      const params = new URLSearchParams();
    if (args.code !== undefined) params.append('code', String(args.code));
    if (args.guid !== undefined) params.append('guid', String(args.guid));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_pricelists": {
      const url = `${BASE_URL}/api/pricelists/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_pricelists": {
      const url = `${BASE_URL}/api/pricelists/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_pricelists_snapshot": {
      const url = `${BASE_URL}/api/pricelists/${args.id}/snapshot`;
      const params = new URLSearchParams();
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.actionPriceDateFrom !== undefined) params.append('actionPriceDateFrom', String(args.actionPriceDateFrom));
    if (args.actionPriceDateTo !== undefined) params.append('actionPriceDateTo', String(args.actionPriceDateTo));
    if (args.vatRate !== undefined) params.append('vatRate', String(args.vatRate));
    if (args.currencyCode !== undefined) params.append('currencyCode', String(args.currencyCode));
    if (args.orderableMinAmount !== undefined) params.append('orderableMinAmount', String(args.orderableMinAmount));
    if (args.orderableMinAmountFrom !== undefined) params.append('orderableMinAmountFrom', String(args.orderableMinAmountFrom));
    if (args.orderableMinAmountTo !== undefined) params.append('orderableMinAmountTo', String(args.orderableMinAmountTo));
    if (args.orderableMaxAmount !== undefined) params.append('orderableMaxAmount', String(args.orderableMaxAmount));
    if (args.orderableMaxAmountFrom !== undefined) params.append('orderableMaxAmountFrom', String(args.orderableMaxAmountFrom));
    if (args.orderableMaxAmountTo !== undefined) params.append('orderableMaxAmountTo', String(args.orderableMaxAmountTo));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_pricelists_batch": {
      const url = `${BASE_URL}/api/pricelists/${args.id}/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "list_sales_channels": {
      const url = `${BASE_URL}/api/sales-channels`;
      const params = new URLSearchParams();
    if (args.type !== undefined) params.append('type', String(args.type));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_orders": {
      const url = `${BASE_URL}/api/orders`;
      const params = new URLSearchParams();
    if (args.statusId !== undefined) params.append('statusId', String(args.statusId));
    if (args.shippingGuid !== undefined) params.append('shippingGuid', String(args.shippingGuid));
    if (args.shippingCompanyCode !== undefined) params.append('shippingCompanyCode', String(args.shippingCompanyCode));
    if (args.paymentMethodGuid !== undefined) params.append('paymentMethodGuid', String(args.paymentMethodGuid));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.customerGuid !== undefined) params.append('customerGuid', String(args.customerGuid));
    if (args.email !== undefined) params.append('email', String(args.email));
    if (args.phone !== undefined) params.append('phone', String(args.phone));
    if (args.productCode !== undefined) params.append('productCode', String(args.productCode));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.sourceId !== undefined) params.append('sourceId', String(args.sourceId));
    if (args.orderCodes !== undefined) params.append('orderCodes', String(args.orderCodes));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_orders": {
      const url = `${BASE_URL}/api/orders`;
      const params = new URLSearchParams();
    if (args.suppressDocumentGeneration !== undefined) params.append('suppressDocumentGeneration', String(args.suppressDocumentGeneration));
    if (args.suppressEmailSending !== undefined) params.append('suppressEmailSending', String(args.suppressEmailSending));
    if (args.suppressProductChecking !== undefined) params.append('suppressProductChecking', String(args.suppressProductChecking));
    if (args.suppressStockMovements !== undefined) params.append('suppressStockMovements', String(args.suppressStockMovements));
    if (args.suppressHistoricalMandatoryFields !== undefined) params.append('suppressHistoricalMandatoryFields', String(args.suppressHistoricalMandatoryFields));
    if (args.suppressHistoricalPaymentChecking !== undefined) params.append('suppressHistoricalPaymentChecking', String(args.suppressHistoricalPaymentChecking));
    if (args.suppressHistoricalShippingChecking !== undefined) params.append('suppressHistoricalShippingChecking', String(args.suppressHistoricalShippingChecking));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "list_orders_history_snapshot": {
      const url = `${BASE_URL}/api/orders/history/snapshot`;
      const params = new URLSearchParams();
    if (args.orderCodes !== undefined) params.append('orderCodes', String(args.orderCodes));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.userId !== undefined) params.append('userId', String(args.userId));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_orders_snapshot": {
      const url = `${BASE_URL}/api/orders/snapshot`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.orderCodes !== undefined) params.append('orderCodes', String(args.orderCodes));
    if (args.statusId !== undefined) params.append('statusId', String(args.statusId));
    if (args.shippingGuid !== undefined) params.append('shippingGuid', String(args.shippingGuid));
    if (args.shippingCompanyCode !== undefined) params.append('shippingCompanyCode', String(args.shippingCompanyCode));
    if (args.paymentMethodGuid !== undefined) params.append('paymentMethodGuid', String(args.paymentMethodGuid));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.customerGuid !== undefined) params.append('customerGuid', String(args.customerGuid));
    if (args.email !== undefined) params.append('email', String(args.email));
    if (args.phone !== undefined) params.append('phone', String(args.phone));
    if (args.productCode !== undefined) params.append('productCode', String(args.productCode));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.sourceId !== undefined) params.append('sourceId', String(args.sourceId));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_orders_status_change": {
      const url = `${BASE_URL}/api/orders/status-change`;
      const params = new URLSearchParams();
    if (args.suppressDocumentGeneration !== undefined) params.append('suppressDocumentGeneration', String(args.suppressDocumentGeneration));
    if (args.suppressEmailSending !== undefined) params.append('suppressEmailSending', String(args.suppressEmailSending));
    if (args.suppressSmsSending !== undefined) params.append('suppressSmsSending', String(args.suppressSmsSending));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "get_orders": {
      const url = `${BASE_URL}/api/orders/${args.code}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "delete_orders": {
      const url = `${BASE_URL}/api/orders/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "update_orders_head": {
      const url = `${BASE_URL}/api/orders/${args.code}/head`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "create_orders_item": {
      const url = `${BASE_URL}/api/orders/${args.code}/item`;
      const params = new URLSearchParams();
    if (args.suppressProductChecking !== undefined) params.append('suppressProductChecking', String(args.suppressProductChecking));
    if (args.suppressStockMovements !== undefined) params.append('suppressStockMovements', String(args.suppressStockMovements));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "update_orders_item": {
      const url = `${BASE_URL}/api/orders/${args.code}/item/${args.id}`;
      const params = new URLSearchParams();
    if (args.suppressProductGuidCheck !== undefined) params.append('suppressProductGuidCheck', String(args.suppressProductGuidCheck));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "delete_orders_item": {
      const url = `${BASE_URL}/api/orders/${args.code}/item/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "create_orders_item_surcharge_parameters": {
      const url = `${BASE_URL}/api/orders/${args.code}/item/${args.id}/surcharge-parameters`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_orders_item_surcharge_parameters": {
      const url = `${BASE_URL}/api/orders/${args.code}/item/${args.id}/surcharge-parameters/${args.relationId}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "create_orders_payment": {
      const url = `${BASE_URL}/api/orders/${args.code}/payment`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_orders_payment": {
      const url = `${BASE_URL}/api/orders/${args.code}/payment/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "create_orders_shipping": {
      const url = `${BASE_URL}/api/orders/${args.code}/shipping`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_orders_shipping": {
      const url = `${BASE_URL}/api/orders/${args.code}/shipping/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "get_orders_pdf": {
      const url = `${BASE_URL}/api/orders/${args.code}/pdf`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_orders_history": {
      const url = `${BASE_URL}/api/orders/${args.code}/history`;
      const params = new URLSearchParams();
    if (args.system !== undefined) params.append('system', String(args.system));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_orders_history": {
      const url = `${BASE_URL}/api/orders/${args.code}/history`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_orders_history": {
      const url = `${BASE_URL}/api/orders/${args.code}/history/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "update_orders_notes": {
      const url = `${BASE_URL}/api/orders/${args.code}/notes`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "update_orders_status": {
      const url = `${BASE_URL}/api/orders/${args.code}/status`;
      const params = new URLSearchParams();
    if (args.suppressDocumentGeneration !== undefined) params.append('suppressDocumentGeneration', String(args.suppressDocumentGeneration));
    if (args.suppressEmailSending !== undefined) params.append('suppressEmailSending', String(args.suppressEmailSending));
    if (args.suppressSmsSending !== undefined) params.append('suppressSmsSending', String(args.suppressSmsSending));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "create_orders_copy": {
      const url = `${BASE_URL}/api/orders/${args.code}/copy`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "create_orders_delivery_notes": {
      const url = `${BASE_URL}/api/orders/${args.code}/delivery-notes`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_orders_statuses": {
      const url = `${BASE_URL}/api/orders/statuses`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_orders_sources": {
      const url = `${BASE_URL}/api/orders/sources`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_orders_changes": {
      const url = `${BASE_URL}/api/orders/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_orders_claims": {
      const url = `${BASE_URL}/api/orders/claims`;
      const params = new URLSearchParams();
    if (args.includeClosedAndCancelledOrders !== undefined) params.append('includeClosedAndCancelledOrders', String(args.includeClosedAndCancelledOrders));
    if (args.productCode !== undefined) params.append('productCode', String(args.productCode));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_orders_batch": {
      const url = `${BASE_URL}/api/orders/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_orders_gifts": {
      const url = `${BASE_URL}/api/orders/gifts`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_orders_gifts": {
      const url = `${BASE_URL}/api/orders/gifts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_orders_gifts": {
      const url = `${BASE_URL}/api/orders/gifts/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_orders_gifts_settings": {
      const url = `${BASE_URL}/api/orders/gifts/settings`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_orders_gifts_settings": {
      const url = `${BASE_URL}/api/orders/gifts/settings`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "list_invoices": {
      const url = `${BASE_URL}/api/invoices`;
      const params = new URLSearchParams();
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.proformaInvoiceCode !== undefined) params.append('proformaInvoiceCode', String(args.proformaInvoiceCode));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.taxDateFrom !== undefined) params.append('taxDateFrom', String(args.taxDateFrom));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.varSymbol !== undefined) params.append('varSymbol', String(args.varSymbol));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_invoices_snapshot": {
      const url = `${BASE_URL}/api/invoices/snapshot`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.proformaInvoiceCodeFrom !== undefined) params.append('proformaInvoiceCodeFrom', String(args.proformaInvoiceCodeFrom));
    if (args.proformaInvoiceCodeTo !== undefined) params.append('proformaInvoiceCodeTo', String(args.proformaInvoiceCodeTo));
    if (args.dueDateFrom !== undefined) params.append('dueDateFrom', String(args.dueDateFrom));
    if (args.dueDateTo !== undefined) params.append('dueDateTo', String(args.dueDateTo));
    if (args.taxDateFrom !== undefined) params.append('taxDateFrom', String(args.taxDateFrom));
    if (args.taxDateTo !== undefined) params.append('taxDateTo', String(args.taxDateTo));
    if (args.orderCodeFrom !== undefined) params.append('orderCodeFrom', String(args.orderCodeFrom));
    if (args.orderCodeTo !== undefined) params.append('orderCodeTo', String(args.orderCodeTo));
    if (args.customerGuid !== undefined) params.append('customerGuid', String(args.customerGuid));
    if (args.varSymbol !== undefined) params.append('varSymbol', String(args.varSymbol));
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.hasTaxId !== undefined) params.append('hasTaxId', String(args.hasTaxId));
    if (args.hasVatId !== undefined) params.append('hasVatId', String(args.hasVatId));
    if (args.hasCompanyId !== undefined) params.append('hasCompanyId', String(args.hasCompanyId));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_invoices": {
      const url = `${BASE_URL}/api/invoices/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_orders_invoice": {
      const url = `${BASE_URL}/api/orders/${args.code}/invoice`;
      const params = new URLSearchParams();
    if (args.suppressExistenceCheck !== undefined) params.append('suppressExistenceCheck', String(args.suppressExistenceCheck));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "create_api_orders_{code}_proforma_invoice.yaml": {
      const url = `${BASE_URL}/api_orders_${args.code}_proforma-invoice.yaml`;
      const params = new URLSearchParams();
    if (args.suppressExistenceCheck !== undefined) params.append('suppressExistenceCheck', String(args.suppressExistenceCheck));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "create_proforma_invoices_invoice": {
      const url = `${BASE_URL}/api/proforma-invoices/${args.code}/invoice`;
      const params = new URLSearchParams();
    if (args.suppressExistenceCheck !== undefined) params.append('suppressExistenceCheck', String(args.suppressExistenceCheck));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "update_invoices_link_proforma_invoice": {
      const url = `${BASE_URL}/api/invoices/${args.code}/link-proforma-invoice`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "update_invoices_link_proof_payment": {
      const url = `${BASE_URL}/api/invoices/${args.code}/link-proof-payment`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "get_invoices_pdf": {
      const url = `${BASE_URL}/api/invoices/${args.code}/pdf`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_invoices_isdoc": {
      const url = `${BASE_URL}/api/invoices/${args.code}/isdoc`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_invoices_changes": {
      const url = `${BASE_URL}/api/invoices/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_proforma_invoices": {
      const url = `${BASE_URL}/api/proforma-invoices`;
      const params = new URLSearchParams();
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.varSymbol !== undefined) params.append('varSymbol', String(args.varSymbol));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_proforma_invoices_snapshot": {
      const url = `${BASE_URL}/api/proforma-invoices/snapshot`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.proformaInvoiceCodeFrom !== undefined) params.append('proformaInvoiceCodeFrom', String(args.proformaInvoiceCodeFrom));
    if (args.proformaInvoiceCodeTo !== undefined) params.append('proformaInvoiceCodeTo', String(args.proformaInvoiceCodeTo));
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.paid !== undefined) params.append('paid', String(args.paid));
    if (args.currencyCode !== undefined) params.append('currencyCode', String(args.currencyCode));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_proforma_invoices": {
      const url = `${BASE_URL}/api/proforma-invoices/${args.code}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_proforma_invoices_pdf": {
      const url = `${BASE_URL}/api/proforma-invoices/${args.code}/pdf`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_proforma_invoices_changes": {
      const url = `${BASE_URL}/api/proforma-invoices/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_proof_payments": {
      const url = `${BASE_URL}/api/proof-payments`;
      const params = new URLSearchParams();
    if (args.code !== undefined) params.append('code', String(args.code));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    if (args.proformaInvoiceCode !== undefined) params.append('proformaInvoiceCode', String(args.proformaInvoiceCode));
    if (args.invoiceCode !== undefined) params.append('invoiceCode', String(args.invoiceCode));
    if (args.issueDate !== undefined) params.append('issueDate', String(args.issueDate));
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.closed !== undefined) params.append('closed', String(args.closed));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_proof_payments": {
      const url = `${BASE_URL}/api/proof-payments`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_proof_payments": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_proof_payments": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_proof_payments": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_proof_payments_snapshot": {
      const url = `${BASE_URL}/api/proof-payments/snapshot`;
      const params = new URLSearchParams();
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.taxDateFrom !== undefined) params.append('taxDateFrom', String(args.taxDateFrom));
    if (args.taxDateTo !== undefined) params.append('taxDateTo', String(args.taxDateTo));
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.currencyCode !== undefined) params.append('currencyCode', String(args.currencyCode));
    if (args.closed !== undefined) params.append('closed', String(args.closed));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_proof_payments_order": {
      const url = `${BASE_URL}/api/proof-payments/order/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_proof_payments_order": {
      const url = `${BASE_URL}/api/proof-payments/order/${args.code}`;
      
      
      result = await shoptetRequest('POST', url);
      break;
    }
    case "get_proof_payments_proforma_invoice": {
      const url = `${BASE_URL}/api/proof-payments/proforma-invoice/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_proof_payments_proforma_invoice": {
      const url = `${BASE_URL}/api/proof-payments/proforma-invoice/${args.code}`;
      
      
      result = await shoptetRequest('POST', url);
      break;
    }
    case "create_proof_payments_document_settings": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}/document-settings`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_proof_payments_pdf": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}/pdf`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_proof_payments_isdoc": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}/isdoc`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_proof_payments_changes": {
      const url = `${BASE_URL}/api/proof-payments/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_credit_notes": {
      const url = `${BASE_URL}/api/credit-notes`;
      const params = new URLSearchParams();
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.invoiceCode !== undefined) params.append('invoiceCode', String(args.invoiceCode));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.varSymbol !== undefined) params.append('varSymbol', String(args.varSymbol));
    if (args.proofPaymentCode !== undefined) params.append('proofPaymentCode', String(args.proofPaymentCode));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_credit_notes_snapshot": {
      const url = `${BASE_URL}/api/credit-notes/snapshot`;
      const params = new URLSearchParams();
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.invoiceCodeFrom !== undefined) params.append('invoiceCodeFrom', String(args.invoiceCodeFrom));
    if (args.invoiceCodeTo !== undefined) params.append('invoiceCodeTo', String(args.invoiceCodeTo));
    if (args.dueDateFrom !== undefined) params.append('dueDateFrom', String(args.dueDateFrom));
    if (args.dueDateTo !== undefined) params.append('dueDateTo', String(args.dueDateTo));
    if (args.hasProofPaymentCode !== undefined) params.append('hasProofPaymentCode', String(args.hasProofPaymentCode));
    if (args.taxDateFrom !== undefined) params.append('taxDateFrom', String(args.taxDateFrom));
    if (args.taxDateTo !== undefined) params.append('taxDateTo', String(args.taxDateTo));
    if (args.orderCodeFrom !== undefined) params.append('orderCodeFrom', String(args.orderCodeFrom));
    if (args.orderCodeTo !== undefined) params.append('orderCodeTo', String(args.orderCodeTo));
    if (args.customerGuid !== undefined) params.append('customerGuid', String(args.customerGuid));
    if (args.varSymbol !== undefined) params.append('varSymbol', String(args.varSymbol));
    if (args.restocked !== undefined) params.append('restocked', String(args.restocked));
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_credit_notes": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_credit_notes": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_credit_notes": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "create_credit_notes_restock": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}/restock`;
      
      
      result = await shoptetRequest('POST', url);
      break;
    }
    case "create_invoices_credit_note": {
      const url = `${BASE_URL}/api/invoices/${args.code}/credit-note`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "create_proof_payments_credit_note": {
      const url = `${BASE_URL}/api/proof-payments/${args.code}/credit-note`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "create_credit_notes_item": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}/item`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_credit_notes_item": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}/item/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_credit_notes_item": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}/item/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_credit_notes_pdf": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}/pdf`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_credit_notes_isdoc": {
      const url = `${BASE_URL}/api/credit-notes/${args.code}/isdoc`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_credit_notes_changes": {
      const url = `${BASE_URL}/api/credit-notes/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_delivery_notes": {
      const url = `${BASE_URL}/api/delivery-notes`;
      const params = new URLSearchParams();
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_delivery_notes_snapshot": {
      const url = `${BASE_URL}/api/delivery-notes/snapshot`;
      const params = new URLSearchParams();
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.orderCodeFrom !== undefined) params.append('orderCodeFrom', String(args.orderCodeFrom));
    if (args.orderCodeTo !== undefined) params.append('orderCodeTo', String(args.orderCodeTo));
    if (args.customerGuid !== undefined) params.append('customerGuid', String(args.customerGuid));
    if (args.isValid !== undefined) params.append('isValid', String(args.isValid));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_delivery_notes": {
      const url = `${BASE_URL}/api/delivery-notes/${args.code}`;
      const params = new URLSearchParams();
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_delivery_notes_pdf": {
      const url = `${BASE_URL}/api/delivery-notes/${args.code}/pdf`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_export": {
      const url = `${BASE_URL}/api/export/${args.type}/${args.format}`;
      const params = new URLSearchParams();
    if (args.currency !== undefined) params.append('currency', String(args.currency));
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.dateFrom !== undefined) params.append('dateFrom', String(args.dateFrom));
    if (args.dateTo !== undefined) params.append('dateTo', String(args.dateTo));
    if (args.taxDateFrom !== undefined) params.append('taxDateFrom', String(args.taxDateFrom));
    if (args.taxDateTo !== undefined) params.append('taxDateTo', String(args.taxDateTo));
    if (args.include !== undefined) params.append('include', String(args.include));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_sales_channels": {
      const url = `${BASE_URL}/api/sales-channels/${args.guid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_sales_channels_id": {
      const url = `${BASE_URL}/api/sales-channels/id/${args.id}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_stocks": {
      const url = `${BASE_URL}/api/stocks`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_stocks": {
      const url = `${BASE_URL}/api/stocks/${args.stockId}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_stocks_movements": {
      const url = `${BASE_URL}/api/stocks/${args.stockId}/movements`;
      const params = new URLSearchParams();
    if (args.lastId !== undefined) params.append('lastId', String(args.lastId));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    if (args.include !== undefined) params.append('include', String(args.include));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "update_stocks_movements": {
      const url = `${BASE_URL}/api/stocks/${args.stockId}/movements`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "get_stocks_movements_last": {
      const url = `${BASE_URL}/api/stocks/${args.stockId}/movements/last`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "get_stocks_supplies": {
      const url = `${BASE_URL}/api/stocks/${args.stockId}/supplies`;
      const params = new URLSearchParams();
    if (args.productGuid !== undefined) params.append('productGuid', String(args.productGuid));
    if (args.code !== undefined) params.append('code', String(args.code));
    if (args.onlyWithClaim !== undefined) params.append('onlyWithClaim', String(args.onlyWithClaim));
    if (args.changedFrom !== undefined) params.append('changedFrom', String(args.changedFrom));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_suppliers": {
      const url = `${BASE_URL}/api/suppliers`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_brands": {
      const url = `${BASE_URL}/api/brands`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_brands": {
      const url = `${BASE_URL}/api/brands`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_brands": {
      const url = `${BASE_URL}/api/brands/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_brands": {
      const url = `${BASE_URL}/api/brands/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_brands": {
      const url = `${BASE_URL}/api/brands/${args.code}`;
      const params = new URLSearchParams();
    if (args.deleteUsed !== undefined) params.append('deleteUsed', String(args.deleteUsed));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('DELETE', fullUrl);
      break;
    }
    case "create_brands_batch": {
      const url = `${BASE_URL}/api/brands/batch`;
      
      const bodyData = {};
    if (args.batchFileUrlPath !== undefined) bodyData['batchFileUrlPath'] = args.batchFileUrlPath;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_customers": {
      const url = `${BASE_URL}/api/customers`;
      const params = new URLSearchParams();
    if (args.email !== undefined) params.append('email', String(args.email));
    if (args.phone !== undefined) params.append('phone', String(args.phone));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_customers": {
      const url = `${BASE_URL}/api/customers`;
      const params = new URLSearchParams();
    if (args.suppressMandatoryFieldsCheck !== undefined) params.append('suppressMandatoryFieldsCheck', String(args.suppressMandatoryFieldsCheck));
    if (args.sendRegistrationEmail !== undefined) params.append('sendRegistrationEmail', String(args.sendRegistrationEmail));
    if (args.language !== undefined) params.append('language', String(args.language));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "list_customers_snapshot": {
      const url = `${BASE_URL}/api/customers/snapshot`;
      const params = new URLSearchParams();
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.changeTimeTo !== undefined) params.append('changeTimeTo', String(args.changeTimeTo));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_customers": {
      const url = `${BASE_URL}/api/customers/${args.guid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_customers": {
      const url = `${BASE_URL}/api/customers/${args.guid}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_customers": {
      const url = `${BASE_URL}/api/customers/${args.guid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_customers_accounts": {
      const url = `${BASE_URL}/api/customers/${args.guid}/accounts`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_customers_accounts": {
      const url = `${BASE_URL}/api/customers/${args.guid}/accounts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_customers_accounts_by_guid_and_accountguid": {
      const url = `${BASE_URL}/api/customers/${args.guid}/accounts/${args.accountGuid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_customers_accounts": {
      const url = `${BASE_URL}/api/customers/${args.guid}/accounts/${args.accountGuid}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_customers_accounts": {
      const url = `${BASE_URL}/api/customers/${args.guid}/accounts/${args.accountGuid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_customers_delivery_addresses": {
      const url = `${BASE_URL}/api/customers/${args.guid}/delivery-addresses`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_customers_delivery_addresses": {
      const url = `${BASE_URL}/api/customers/${args.guid}/delivery-addresses`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_customers_delivery_addresses_by_guid_and_addressguid": {
      const url = `${BASE_URL}/api/customers/${args.guid}/delivery-addresses/${args.addressGuid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_customers_delivery_addresses": {
      const url = `${BASE_URL}/api/customers/${args.guid}/delivery-addresses/${args.addressGuid}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_customers_delivery_addresses": {
      const url = `${BASE_URL}/api/customers/${args.guid}/delivery-addresses/${args.addressGuid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_customers_remarks": {
      const url = `${BASE_URL}/api/customers/${args.guid}/remarks`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_customers_remarks": {
      const url = `${BASE_URL}/api/customers/${args.guid}/remarks`;
      
      const bodyData = {};
    if (args.schema !== undefined) bodyData['schema'] = args.schema;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_customers_remarks_by_guid_and_id": {
      const url = `${BASE_URL}/api/customers/${args.guid}/remarks/${args.id}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_customers_remarks": {
      const url = `${BASE_URL}/api/customers/${args.guid}/remarks/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_customers_remarks": {
      const url = `${BASE_URL}/api/customers/${args.guid}/remarks/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_customers_changes": {
      const url = `${BASE_URL}/api/customers/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_customers_regions": {
      const url = `${BASE_URL}/api/customers/regions`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_customers_groups": {
      const url = `${BASE_URL}/api/customers/groups`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_customers_groups": {
      const url = `${BASE_URL}/api/customers/groups`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_customers_groups": {
      const url = `${BASE_URL}/api/customers/groups/${args.id}`;
      const params = new URLSearchParams();
    if (args.language !== undefined) params.append('language', String(args.language));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "delete_customers_groups": {
      const url = `${BASE_URL}/api/customers/groups/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_template_include": {
      const url = `${BASE_URL}/api/template-include`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_template_include": {
      const url = `${BASE_URL}/api/template-include`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_template_include": {
      const url = `${BASE_URL}/api/template-include/${args.location}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "get_payment_status": {
      const url = `${BASE_URL}/api/payment-status/${args.paymentCode}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_payment_status": {
      const url = `${BASE_URL}/api/payment-status/${args.paymentCode}`;
      const params = new URLSearchParams();
    if (args.suppressDocumentGeneration !== undefined) params.append('suppressDocumentGeneration', String(args.suppressDocumentGeneration));
    if (args.suppressEmailSending !== undefined) params.append('suppressEmailSending', String(args.suppressEmailSending));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "list_webhooks": {
      const url = `${BASE_URL}/api/webhooks`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_webhooks": {
      const url = `${BASE_URL}/api/webhooks`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_webhooks": {
      const url = `${BASE_URL}/api/webhooks/${args.id}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_webhooks": {
      const url = `${BASE_URL}/api/webhooks/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_webhooks": {
      const url = `${BASE_URL}/api/webhooks/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "create_webhooks_renew_signature_key": {
      const url = `${BASE_URL}/api/webhooks/renew-signature-key`;
      
      
      result = await shoptetRequest('POST', url);
      break;
    }
    case "list_webhooks_notifications": {
      const url = `${BASE_URL}/api/webhooks/notifications`;
      const params = new URLSearchParams();
    if (args.status !== undefined) params.append('status', String(args.status));
    if (args.event !== undefined) params.append('event', String(args.event));
    if (args.active !== undefined) params.append('active', String(args.active));
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_shipping_methods": {
      const url = `${BASE_URL}/api/shipping-methods`;
      const params = new URLSearchParams();
    if (args.salesChannelGuid !== undefined) params.append('salesChannelGuid', String(args.salesChannelGuid));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_shipping_methods": {
      const url = `${BASE_URL}/api/shipping-methods`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_shipping_request": {
      const url = `${BASE_URL}/api/shipping-request/${args.shippingRequestCode}/${args.shippingGuid}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "set_shipping_request": {
      const url = `${BASE_URL}/api/shipping-request/${args.shippingRequestCode}/${args.shippingGuid}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PUT', url, body);
      break;
    }
    case "get_shipping_request_status": {
      const url = `${BASE_URL}/api/shipping-request/${args.shippingRequestCode}/${args.shippingGuid}/status`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_payment_methods": {
      const url = `${BASE_URL}/api/payment-methods`;
      const params = new URLSearchParams();
    if (args.salesChannelGuid !== undefined) params.append('salesChannelGuid', String(args.salesChannelGuid));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_payment_methods": {
      const url = `${BASE_URL}/api/payment-methods`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_payment_methods": {
      const url = `${BASE_URL}/api/payment-methods/${args.guid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_unsubscribed_emails": {
      const url = `${BASE_URL}/api/unsubscribed-emails`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_unsubscribed_emails": {
      const url = `${BASE_URL}/api/unsubscribed-emails`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_mailing_lists": {
      const url = `${BASE_URL}/api/mailing-lists`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_mailing_lists": {
      const url = `${BASE_URL}/api/mailing-lists`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', fullUrl, body);
      break;
    }
    case "get_mailing_lists": {
      const url = `${BASE_URL}/api/mailing-lists/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_mailing_lists_by_code": {
      const url = `${BASE_URL}/api/mailing-lists/${args.code}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_mailing_lists_changes": {
      const url = `${BASE_URL}/api/mailing-lists/${args.code}/changes`;
      const params = new URLSearchParams();
    if (args.from !== undefined) params.append('from', String(args.from));
    if (args.changeType !== undefined) params.append('changeType', String(args.changeType));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_discount_coupons": {
      const url = `${BASE_URL}/api/discount-coupons`;
      const params = new URLSearchParams();
    if (args.template !== undefined) params.append('template', String(args.template));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.reusable !== undefined) params.append('reusable', String(args.reusable));
    if (args.validFrom !== undefined) params.append('validFrom', String(args.validFrom));
    if (args.validTo !== undefined) params.append('validTo', String(args.validTo));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_discount_coupons": {
      const url = `${BASE_URL}/api/discount-coupons`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_discount_coupons": {
      const url = `${BASE_URL}/api/discount-coupons`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('DELETE', url, body);
      break;
    }
    case "list_discount_coupons_snapshot": {
      const url = `${BASE_URL}/api/discount-coupons/snapshot`;
      const params = new URLSearchParams();
    if (args.codeFrom !== undefined) params.append('codeFrom', String(args.codeFrom));
    if (args.codeTo !== undefined) params.append('codeTo', String(args.codeTo));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.discountType !== undefined) params.append('discountType', String(args.discountType));
    if (args.validFrom !== undefined) params.append('validFrom', String(args.validFrom));
    if (args.validTo !== undefined) params.append('validTo', String(args.validTo));
    if (args.reusable !== undefined) params.append('reusable', String(args.reusable));
    if (args.template !== undefined) params.append('template', String(args.template));
    if (args.currency !== undefined) params.append('currency', String(args.currency));
    if (args.shippingPrice !== undefined) params.append('shippingPrice', String(args.shippingPrice));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_discount_coupons": {
      const url = `${BASE_URL}/api/discount-coupons/${args.code}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "delete_discount_coupons_by_code": {
      const url = `${BASE_URL}/api/discount-coupons/${args.code}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "create_discount_coupons_set": {
      const url = `${BASE_URL}/api/discount-coupons/set`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_discount_coupons_use": {
      const url = `${BASE_URL}/api/discount-coupons/use/${args.code}`;
      const params = new URLSearchParams();
    if (args.suppressOrderChecking !== undefined) params.append('suppressOrderChecking', String(args.suppressOrderChecking));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', fullUrl, body);
      break;
    }
    case "list_discount_coupons_templates": {
      const url = `${BASE_URL}/api/discount-coupons/templates`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_discount_coupons_templates": {
      const url = `${BASE_URL}/api/discount-coupons/templates`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "delete_discount_coupons_templates": {
      const url = `${BASE_URL}/api/discount-coupons/templates/${args.guid}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_xy_discounts": {
      const url = `${BASE_URL}/api/xy-discounts`;
      const params = new URLSearchParams();
    if (args.customerGroupCode !== undefined) params.append('customerGroupCode', String(args.customerGroupCode));
    if (args.validFrom !== undefined) params.append('validFrom', String(args.validFrom));
    if (args.validTo !== undefined) params.append('validTo', String(args.validTo));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_xy_discounts": {
      const url = `${BASE_URL}/api/xy-discounts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_xy_discounts": {
      const url = `${BASE_URL}/api/xy-discounts/${args.id}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_xy_discounts": {
      const url = `${BASE_URL}/api/xy-discounts/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_xy_discounts": {
      const url = `${BASE_URL}/api/xy-discounts/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_xy_discounts_settings": {
      const url = `${BASE_URL}/api/xy-discounts/settings`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_xy_discounts_settings": {
      const url = `${BASE_URL}/api/xy-discounts/settings`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "list_quantity_discounts": {
      const url = `${BASE_URL}/api/quantity-discounts`;
      const params = new URLSearchParams();
    if (args.customerGroupCode !== undefined) params.append('customerGroupCode', String(args.customerGroupCode));
    if (args.validFrom !== undefined) params.append('validFrom', String(args.validFrom));
    if (args.validTo !== undefined) params.append('validTo', String(args.validTo));
    if (args.status !== undefined) params.append('status', String(args.status));
    if (args.isActive !== undefined) params.append('isActive', String(args.isActive));
    if (args.includeUnregisteredCustomers !== undefined) params.append('includeUnregisteredCustomers', String(args.includeUnregisteredCustomers));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_quantity_discounts": {
      const url = `${BASE_URL}/api/quantity-discounts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_quantity_discounts_snapshot": {
      const url = `${BASE_URL}/api/quantity-discounts/snapshot`;
      const params = new URLSearchParams();
    if (args.customerGroupCode !== undefined) params.append('customerGroupCode', String(args.customerGroupCode));
    if (args.validFrom !== undefined) params.append('validFrom', String(args.validFrom));
    if (args.validTo !== undefined) params.append('validTo', String(args.validTo));
    if (args.status !== undefined) params.append('status', String(args.status));
    if (args.isActive !== undefined) params.append('isActive', String(args.isActive));
    if (args.includeUnregisteredCustomers !== undefined) params.append('includeUnregisteredCustomers', String(args.includeUnregisteredCustomers));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_quantity_discounts": {
      const url = `${BASE_URL}/api/quantity-discounts/${args.id}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_quantity_discounts": {
      const url = `${BASE_URL}/api/quantity-discounts/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_quantity_discounts": {
      const url = `${BASE_URL}/api/quantity-discounts/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_volume_discounts": {
      const url = `${BASE_URL}/api/volume-discounts`;
      const params = new URLSearchParams();
    if (args.customerGroupCode !== undefined) params.append('customerGroupCode', String(args.customerGroupCode));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_articles": {
      const url = `${BASE_URL}/api/articles`;
      const params = new URLSearchParams();
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_articles": {
      const url = `${BASE_URL}/api/articles`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_articles_snapshot": {
      const url = `${BASE_URL}/api/articles/snapshot`;
      const params = new URLSearchParams();
    if (args.idFrom !== undefined) params.append('idFrom', String(args.idFrom));
    if (args.idTo !== undefined) params.append('idTo', String(args.idTo));
    if (args.articleLanguage !== undefined) params.append('articleLanguage', String(args.articleLanguage));
    if (args.publishDateFrom !== undefined) params.append('publishDateFrom', String(args.publishDateFrom));
    if (args.publishDateTo !== undefined) params.append('publishDateTo', String(args.publishDateTo));
    if (args.changeDateFrom !== undefined) params.append('changeDateFrom', String(args.changeDateFrom));
    if (args.changeDateTo !== undefined) params.append('changeDateTo', String(args.changeDateTo));
    if (args.visible !== undefined) params.append('visible', String(args.visible));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_articles": {
      const url = `${BASE_URL}/api/articles/${args.articleId}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_articles": {
      const url = `${BASE_URL}/api/articles/${args.articleId}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_articles": {
      const url = `${BASE_URL}/api/articles/${args.articleId}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_articles_sections": {
      const url = `${BASE_URL}/api/articles/sections`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_articles_sections": {
      const url = `${BASE_URL}/api/articles/sections`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_articles_sections": {
      const url = `${BASE_URL}/api/articles/sections/${args.articleSectionId}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_articles_sections": {
      const url = `${BASE_URL}/api/articles/sections/${args.articleSectionId}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_articles_sections": {
      const url = `${BASE_URL}/api/articles/sections/${args.articleSectionId}`;
      const params = new URLSearchParams();
    if (args.force !== undefined) params.append('force', String(args.force));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('DELETE', fullUrl);
      break;
    }
    case "list_pages": {
      const url = `${BASE_URL}/api/pages`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_pages": {
      const url = `${BASE_URL}/api/pages`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "get_pages": {
      const url = `${BASE_URL}/api/pages/${args.pageId}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "update_pages": {
      const url = `${BASE_URL}/api/pages/${args.pageId}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_pages": {
      const url = `${BASE_URL}/api/pages/${args.pageId}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_discussions_posts": {
      const url = `${BASE_URL}/api/discussions-posts`;
      const params = new URLSearchParams();
    if (args.productGuid !== undefined) params.append('productGuid', String(args.productGuid));
    if (args.articleId !== undefined) params.append('articleId', String(args.articleId));
    if (args.pageId !== undefined) params.append('pageId', String(args.pageId));
    if (args.customerGuid !== undefined) params.append('customerGuid', String(args.customerGuid));
    if (args.userEmail !== undefined) params.append('userEmail', String(args.userEmail));
    if (args.creationDateFrom !== undefined) params.append('creationDateFrom', String(args.creationDateFrom));
    if (args.creationDateTo !== undefined) params.append('creationDateTo', String(args.creationDateTo));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_discussions_posts": {
      const url = `${BASE_URL}/api/discussions-posts`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_discussions_posts": {
      const url = `${BASE_URL}/api/discussions-posts/${args.id}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "delete_discussions_posts": {
      const url = `${BASE_URL}/api/discussions-posts/${args.id}`;
      
      
      result = await shoptetRequest('DELETE', url);
      break;
    }
    case "list_system_jobs": {
      const url = `${BASE_URL}/api/system/jobs`;
      const params = new URLSearchParams();
    if (args.status !== undefined) params.append('status', String(args.status));
    if (args.creationTimeFrom !== undefined) params.append('creationTimeFrom', String(args.creationTimeFrom));
    if (args.creationTimeTo !== undefined) params.append('creationTimeTo', String(args.creationTimeTo));
    if (args.completionTimeFrom !== undefined) params.append('completionTimeFrom', String(args.completionTimeFrom));
    if (args.completionTimeTo !== undefined) params.append('completionTimeTo', String(args.completionTimeTo));
    if (args.itemsPerPage !== undefined) params.append('itemsPerPage', String(args.itemsPerPage));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "get_system_jobs": {
      const url = `${BASE_URL}/api/system/jobs/${args.jobId}`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "list_system_files": {
      const url = `${BASE_URL}/api/system/files`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_system_files": {
      const url = `${BASE_URL}/api/system/files`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "create_system_file": {
      const url = `${BASE_URL}/api/system/file`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "list_system_endpoints": {
      const url = `${BASE_URL}/api/system/endpoints`;
      const params = new URLSearchParams();
    if (args.status !== undefined) params.append('status', String(args.status));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "list_reviews_products": {
      const url = `${BASE_URL}/api/reviews/products`;
      const params = new URLSearchParams();
    if (args.dateFrom !== undefined) params.append('dateFrom', String(args.dateFrom));
    if (args.dateTo !== undefined) params.append('dateTo', String(args.dateTo));
    if (args.changeTimeFrom !== undefined) params.append('changeTimeFrom', String(args.changeTimeFrom));
    if (args.productGuid !== undefined) params.append('productGuid', String(args.productGuid));
    if (args.orderCode !== undefined) params.append('orderCode', String(args.orderCode));
    const qs = params.toString();
    const fullUrl = qs ? `${url}?${qs}` : url;
      
      result = await shoptetRequest('GET', fullUrl);
      break;
    }
    case "create_reviews_products": {
      const url = `${BASE_URL}/api/reviews/products`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_reviews_products": {
      const url = `${BASE_URL}/api/reviews/products/${args.reviewId}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
    case "list_reviews_project": {
      const url = `${BASE_URL}/api/reviews/project`;
      
      
      result = await shoptetRequest('GET', url);
      break;
    }
    case "create_reviews_project": {
      const url = `${BASE_URL}/api/reviews/project`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('POST', url, body);
      break;
    }
    case "update_reviews_project": {
      const url = `${BASE_URL}/api/reviews/project/${args.reviewId}`;
      
      const bodyData = {};
    if (args.data !== undefined) bodyData['data'] = args.data;
    const body = Object.keys(bodyData).length ? JSON.stringify(bodyData) : undefined;
      result = await shoptetRequest('PATCH', url, body);
      break;
    }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

// CZ: Spuštění serveru přes stdio
// EN: Start server via stdio
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("✅ Shoptet MCP server running (312 tools)");
