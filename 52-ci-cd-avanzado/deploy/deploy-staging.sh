#!/bin/bash
set -e

SERVER="user@staging.example.com"
REMOTE_PATH="/var/www/staging"

echo "Building application..."
npm run build

echo "Copying files to staging server..."
rsync -avz --delete dist/ "$SERVER:$REMOTE_PATH"

echo "Restarting application..."
ssh "$SERVER" "sudo systemctl restart nginx"

echo "Staging deployment complete!"
