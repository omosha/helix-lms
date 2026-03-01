#!/usr/bin/env bash
# push-env-to-vercel.sh — reads .env.local and syncs all vars to Vercel production
# Usage: bash scripts/push-env-to-vercel.sh
#
# Skips comment lines and empty lines.
# Removes existing var first to avoid duplicates, then adds fresh.

set -e

ENV_FILE=".env.local"
ENVIRONMENT="production"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found."
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Syncing $ENV_FILE → Vercel ($ENVIRONMENT)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

while IFS= read -r line; do
  # Skip comments and blank lines
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue

  key="${line%%=*}"
  value="${line#*=}"

  # Skip keys with no value
  [[ -z "$value" ]] && continue

  echo "  → Setting $key"

  # Remove existing, suppress error if not found
  echo "$value" | npx vercel env rm "$key" "$ENVIRONMENT" --yes 2>/dev/null || true

  # Add fresh
  echo "$value" | npx vercel env add "$key" "$ENVIRONMENT" 2>/dev/null

done < "$ENV_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. Run: npx vercel --prod"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
