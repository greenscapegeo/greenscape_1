# Multi-stage build: build React app then serve with Node.js
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; elif [ -f yarn.lock ]; then yarn --frozen-lockfile; elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; else npm i; fi
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
# Install serve to serve static files
RUN npm install -g serve
# Copy built files
COPY --from=build /app/dist ./dist
EXPOSE 80
# Serve on port 80
CMD ["serve", "-s", "dist", "-l", "80"]

