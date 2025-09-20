# Multi-stage build: build React app then serve with Node.js
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN if [ -f package-lock.json ]; then npm ci; elif [ -f yarn.lock ]; then yarn --frozen-lockfile; elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; else npm i; fi

# Copy all source files including .env
COPY . .

# Debug: Verify .env file exists in build context
RUN echo "🔍 BUILD CONTEXT VERIFICATION:" && \
    ls -la /app/.env* || echo "❌ No .env files found in build context" && \
    echo "🔍 First 10 lines of .env:" && \
    head -10 /app/.env 2>/dev/null || echo "❌ Cannot read .env file" && \
    echo "🔍 VITE_SITE_TITLE in .env:" && \
    grep "VITE_SITE_TITLE" /app/.env || echo "❌ VITE_SITE_TITLE not found in .env"

# Build the application with environment variables
RUN echo "🏗️ Starting Vite build with environment variables..." && \
    npm run build && \
    echo "🔍 BUILD COMPLETED - Checking built files:" && \
    ls -la /app/dist/ && \
    echo "🔍 Checking if VITE_SITE_TITLE made it into the built files:" && \
    grep -r "VITE_SITE_TITLE\|Greenscape" /app/dist/ || echo "❌ VITE_SITE_TITLE not found in built files"

FROM node:20-alpine
WORKDIR /app
# Install serve to serve static files
RUN npm install -g serve
# Copy built files
COPY --from=build /app/dist ./dist
EXPOSE 80
# Serve on port 80
CMD ["serve", "-s", "dist", "-l", "80"]

