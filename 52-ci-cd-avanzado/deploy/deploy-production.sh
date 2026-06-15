#!/bin/bash
set -e

SERVER="user@example.com"
REMOTE_PATH="/var/www/production"

echo "Building application for production..."
npm run build

echo "Copying files to production server..."
rsync -avz --delete dist/ "$SERVER:$REMOTE_PATH"

echo "Invalidating CDN cache..."
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/purge_cache" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'

echo "Production deployment complete!"
