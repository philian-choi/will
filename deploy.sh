#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Starting deployment process...${NC}"

# Create dist directory
echo "Creating distribution directory..."
rm -rf dist
mkdir dist

# Copy files to dist
echo "Copying files..."
cp -r index.html css js images robots.txt sitemap.xml LICENSE README.md dist/

# Optimize images
echo "Optimizing images..."
if command -v optipng &> /dev/null; then
    find dist/images -name "*.png" -exec optipng -o5 {} \;
fi

# Minify CSS
if command -v cleancss &> /dev/null; then
    echo "Minifying CSS..."
    for file in dist/css/*.css; do
        cleancss -o "${file}.min" "$file"
        mv "${file}.min" "$file"
    done
fi

# Minify JavaScript
if command -v uglifyjs &> /dev/null; then
    echo "Minifying JavaScript..."
    for file in dist/js/*.js; do
        uglifyjs "$file" -o "${file}.min" -c -m
        mv "${file}.min" "$file"
    done
fi

echo -e "${GREEN}Deployment files prepared in 'dist' directory${NC}"
echo "Please upload the contents of the 'dist' directory to your web server" 