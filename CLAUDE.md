# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
BakerzBite is a static bakery/café website built with vanilla HTML/CSS/JavaScript and styled with Tailwind CSS. It's a single-page application showcasing products (cakes, pastries, cookies, drinks) with a non-functional shopping cart UI.

## Commands

### Development
```bash
npm install          # Install dependencies
npm start           # Start Vite dev server (typically http://localhost:5173)
npm run build       # Build for production
```

## Architecture

### Tech Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework)
- **Styling**: Tailwind CSS v3.1.8 with utility-first approach
- **Build Tool**: Vite v3.1.7
- **CSS Processing**: PostCSS with Autoprefixer

### File Structure
- `index.html` - Single-page application with all content
- `script.js` - Minimal JavaScript (mobile menu toggle only)
- `style.css` - Custom CSS additions to Tailwind
- `tailwind.config.js` - Custom theme extensions (fonts, backgrounds, animations)
- Asset directories:
  - `/Images/` - Logos, backgrounds, gallery images
  - `/Cakes/`, `/Pastries/` - Product images
  - `/Icons/` - Category icons

### Key Tailwind Customizations
- Custom fonts: Oxygen, Pacifico
- Custom background images: 'hero' and 'bg' patterns
- Custom animation: 'fadein'
- Content scanning: All files (`["*"]`)

### Current Limitations
- No backend/API integration
- Shopping cart UI exists but has no functionality
- No form submission handling
- No testing framework
- No linting configuration