#!/bin/bash

# Flight Academy CMS Deployment Script

echo "🚀 Starting Flight Academy CMS Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Copying from .env.example..."
    cp .env.example .env
    print_warning "Please update .env with your Strapi API URL before proceeding."
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Build the project
print_status "Building the project..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Build completed successfully!"
else
    print_error "Build failed. Please check the errors above."
    exit 1
fi

# Check if Strapi is configured
print_warning "CMS Integration Checklist:"
echo "  □ Strapi CMS is installed and running"
echo "  □ Content types are configured (Aircraft, Instructor, Course, Testimonial)"
echo "  □ API permissions are set for public access"
echo "  □ Environment variables are configured"
echo "  □ CORS is configured in Strapi"

print_status "Frontend build completed! 🎉"
print_warning "Next steps:"
echo "  1. Set up Strapi CMS following docs/STRAPI_SETUP.md"
echo "  2. Configure your production environment variables"
echo "  3. Deploy the dist/ folder to your hosting service"
echo "  4. Test the CMS integration"

# Optional: Start preview server
read -p "Start preview server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Starting preview server..."
    npm run preview
fi
