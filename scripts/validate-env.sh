#!/usr/bin/env bash
# validate-env.sh — checks all required env vars are set before deploying
# Usage: bash scripts/validate-env.sh

set -e

ENV_FILE=".env.local"
ERRORS=0

check() {
  local key="$1"
  local val
  val=$(grep "^$key=" "$ENV_FILE" 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")
  if [[ -z "$val" || "$val" == "REPLACE_ME" ]]; then
    echo "  ✗  $key  — missing or not set"
    ERRORS=$((ERRORS + 1))
  else
    # Only show first 12 chars for secrets
    local preview="${val:0:12}..."
    echo "  ✓  $key  ($preview)"
  fi
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Helix LMS — Environment Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "[ Auth ]"
check "AUTH_SECRET"
check "NEXTAUTH_URL"
echo ""
echo "[ Google OAuth ]"
check "GOOGLE_CLIENT_ID"
check "GOOGLE_CLIENT_SECRET"
echo ""
echo "[ Database (Supabase) ]"
check "DATABASE_URL"
check "DIRECT_URL"
echo ""
echo "[ Supabase Public ]"
check "NEXT_PUBLIC_SUPABASE_URL"
check "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY"
echo ""

if [[ $ERRORS -gt 0 ]]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  $ERRORS missing var(s). Fix before deploying."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
else
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  All vars present. Ready to deploy."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi
