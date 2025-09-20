# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development!
- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

### Docker
- `docker build -t greenscape:latest .` - Build Docker image
- `docker run --rm -p 8080:80 greenscape:latest` - Test container locally

### Deployment
- Push to master/main branch triggers automated GitHub Actions deployment to GCP VM
- Environment variables are fetched from GCP Secret Manager secret named "greenscape"

## Architecture

### Environment-Driven Configuration
This is a **completely environment-driven React application**. All content, styling, and behavior is controlled via environment variables in `.env` file:

- **No hardcoded content** - Everything from text to colors to section ordering comes from `VITE_*` environment variables
- **JSON arrays in env** - Complex data structures like contact phones, service items, and navigation sections are stored as JSON strings in environment variables
- **Section modularity** - The app renders sections based on `VITE_ENABLED_SECTIONS` array, making it highly configurable

### Core Configuration System
- `src/config.ts` - Central configuration parser that validates and transforms all `VITE_*` environment variables
- `src/types.ts` - TypeScript interfaces defining the complete configuration schema
- **Strict validation** - The `must()` function ensures required environment variables are present, failing fast if missing

### Component Architecture
- **Component registry** - `src/App.tsx` contains a registry mapping section names to React components
- **Services variants** - Single `Services` component handles three variants (Showroom, Design, Planting) via props
- **Modular sections** - Each section in `src/modules/` is self-contained and environment-driven

### Leaf Animation System
- `LeavesBackground.tsx` - Mouse-following particle system
- Configurable via `VITE_LEAF_*` variables (SVG paths, count, color, follow strength)
- Supports multiple SVG shapes via `VITE_LEAF_SVGS` JSON array

### Deployment Architecture
- **Multi-stage Docker build** - Node.js build stage → Node.js + serve runtime (not nginx)
- **GCP integration** - Automated deployment via GitHub Actions to GCP VM using Artifact Registry
- **Secret management** - Environment variables stored in GCP Secret Manager, fetched during deployment
- **Caddy proxy** - Application runs behind Caddy reverse proxy on VM

## Environment Variables

### Critical Variables
- `VITE_ENABLED_SECTIONS` - JSON array controlling which sections appear and in what order
- `VITE_BRAND_COLOR` - CSS custom property for consistent theming
- `VITE_LEAF_*` - Controls the mouse-following particle animation
- Contact info stored as `VITE_CONTACT_PHONES` (JSON array) and other contact fields

### Deployment Secrets (GitHub)
- `GCP_PROJECT_ID` - GCP project for Artifact Registry and Secret Manager
- `GCP_SA_KEY` - Service account JSON key for GCP access
- `VM_HOST`, `VM_SSH_USER`, `VM_SSH_KEY` - SSH access to deployment VM
- Secret Manager secret "greenscape" contains all `VITE_*` environment variables

## Development Notes

### TypeScript Issues
- Use `(import.meta as any).env` to access Vite environment variables due to TypeScript limitations
- Contact phone data: Use `config.contactPhones[0]` (array) not `config.contactPhone` (doesn't exist)

### Adding New Sections
1. Create component in `src/modules/`
2. Add to registry in `src/App.tsx`
3. Add section name to `VITE_ENABLED_SECTIONS` environment variable
4. Add any new configuration fields to `src/types.ts` and `src/config.ts`

### Deployment Container
- Container serves on port 80 internally, mapped to port 3000 on VM
- Uses `serve` package (not nginx) for static file hosting
- Health check uses `wget` (available in Alpine Linux)
- Connects to external "web" Docker network for Caddy integration