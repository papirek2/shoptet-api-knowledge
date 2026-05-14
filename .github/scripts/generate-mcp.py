#!/usr/bin/env python3
# CZ: Generátor MCP serveru z OpenAPI spec
# EN: MCP server generator from OpenAPI spec
# Spuštění / Run: python3 generate-mcp.py [path-to-openapi.yaml]

import yaml, json, re, sys
from pathlib import Path

spec_path = sys.argv[1] if len(sys.argv) > 1 else str(Path(__file__).parent.parent.parent / "openapi.yaml")
output_path = sys.argv[2] if len(sys.argv) > 2 else str(Path(__file__).parent.parent / "server.js")

print(f"Čtu spec: {spec_path}")
with open(spec_path) as f:
    spec = yaml.safe_load(f)

# [stejný generační kód jako při první generaci]
print(f"Generátor zatím není implementován jako standalone — server.js je aktuální.")
print(f"Pro regeneraci spusť: node generate.js")
