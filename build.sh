#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Ensure proper permissions
echo "Setting permissions..."
chmod +x node_modules/.bin/vite

# Build the application
echo "Building application..."
npm run build

echo "Build completed successfully!"
