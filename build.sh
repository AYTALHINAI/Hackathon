#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Ensure proper permissions for all binaries
echo "Setting permissions..."
chmod +x node_modules/.bin/* 2>/dev/null || true

# Try multiple build approaches
echo "Building application..."

# Method 1: Try npx directly
if command -v npx >/dev/null 2>&1; then
    echo "Using npx vite build..."
    npx vite build
elif [ -f "node_modules/.bin/vite" ]; then
    echo "Using local vite binary..."
    chmod +x node_modules/.bin/vite
    ./node_modules/.bin/vite build
else
    echo "Using npm run build..."
    npm run build
fi

echo "Build completed successfully!"
