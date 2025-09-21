# React/Vite to GCP VM Deployment Troubleshooting Guide

This guide documents all issues encountered during the deployment of a React/Vite application to a GCP VM using GitHub Actions, Docker, Artifact Registry, and Secret Manager. Follow this guide to prevent common deployment pitfalls.

## 🎯 **Critical Issues and Solutions**

### 1. **Environment Variables Not Available in React App**

**Issue**: `Uncaught Error: Missing required env: VITE_SITE_TITLE`

**Root Cause**: `.dockerignore` file was excluding `.env` files from Docker build context, preventing Vite from accessing environment variables during build time.

**Solution**:
```bash
# In .dockerignore - Comment out or remove:
# **/.env*

# Allow .env files for production builds
```

**Prevention**:
- ✅ Always verify `.dockerignore` doesn't exclude necessary files
- ✅ Remember: Vite needs environment variables at **BUILD TIME**, not runtime
- ✅ Test Docker build context with: `docker build --progress=plain`

### 2. **Service Account Authentication Issues**

**Issue**: `ACCESS_TOKEN_SCOPE_INSUFFICIENT` when accessing Secret Manager from VM

**Root Causes**:
- IAM API not enabled in GCP project
- Service account lacking proper permissions
- Service account key not properly uploaded to VM

**Solutions**:
```bash
# Enable required APIs
gcloud services enable iam.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create dedicated VM service account
gcloud iam service-accounts create vm-secret-manager-access \
  --display-name="VM Secret Manager Access" \
  --project=YOUR_PROJECT_ID

# Grant minimal required permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:vm-secret-manager-access@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:vm-secret-manager-access@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.reader"

# Create and download key
gcloud iam service-accounts keys create vm-service-account-key.json \
  --iam-account=vm-secret-manager-access@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

**Prevention**:
- ✅ Use dedicated service accounts with minimal permissions
- ✅ Always verify API enablement before deployment
- ✅ Test service account permissions before full deployment

### 3. **TypeScript Build Errors**

**Issue**: Build failures due to `import.meta.env` type issues and property mismatches

**Solutions**:
```typescript
// Fix import.meta.env type issue
const env = (import.meta as any).env;

// Verify property names match config
config.contactPhones[0] // not config.contactPhone
```

**Prevention**:
- ✅ Always run `npm run build` locally before deployment
- ✅ Set up TypeScript strict mode
- ✅ Use proper environment variable types

### 4. **External Access and Firewall Issues**

**Issue**: Application not accessible from external IPs

**Solutions**:
```bash
# Create GCP firewall rules
gcloud compute firewall-rules create allow-http \
  --allow tcp:80 \
  --source-ranges 0.0.0.0/0 \
  --description "Allow HTTP traffic"

gcloud compute firewall-rules create allow-https \
  --allow tcp:443 \
  --source-ranges 0.0.0.0/0 \
  --description "Allow HTTPS traffic"
```

**Prevention**:
- ✅ Test external access immediately after deployment
- ✅ Verify firewall rules before going live
- ✅ Use proper health checks

### 5. **Path Expansion Issues in Scripts**

**Issue**: `~` not expanding properly in shell scripts

**Solution**:
```bash
# Use $HOME instead of ~
gcloud auth activate-service-account --key-file=$HOME/.gcp/service-account-key.json
```

**Prevention**:
- ✅ Always use `$HOME` in shell scripts instead of `~`
- ✅ Test path expansion in CI/CD environments

## 🔧 **Best Practices for React/Vite + GCP Deployment**

### Environment Variable Management

1. **Create comprehensive `.env.example`**:
   ```bash
   VITE_SITE_TITLE=Your App Title
   VITE_SITE_DESCRIPTION=Your App Description
   VITE_API_URL=https://api.yourapp.com
   ```

2. **Store secrets in GCP Secret Manager**:
   ```bash
   # Create secret
   gcloud secrets create app-environment --data-file=.env.production

   # Verify secret
   gcloud secrets versions access latest --secret=app-environment
   ```

3. **Environment Variable Validation**:
   ```typescript
   // src/config.ts
   const requiredEnvVars = [
     'VITE_SITE_TITLE',
     'VITE_SITE_DESCRIPTION'
   ];

   requiredEnvVars.forEach(envVar => {
     if (!import.meta.env[envVar]) {
       throw new Error(`Missing required env: ${envVar}`);
     }
   });
   ```

### Docker Best Practices

1. **Dockerfile optimization**:
   ```dockerfile
   # Multi-stage build with proper .env handling
   FROM node:20-alpine AS build
   WORKDIR /app

   # Copy package files first (better caching)
   COPY package*.json ./
   RUN npm ci

   # Copy source and .env files
   COPY . .

   # Verify .env exists before build
   RUN ls -la .env* && head -5 .env

   # Build with environment variables
   RUN npm run build
   ```

2. **Proper .dockerignore**:
   ```
   node_modules
   dist
   .git
   .DS_Store
   npm-debug.log*
   # DO NOT exclude .env files for production builds
   # **/.env*
   ```

### GitHub Actions Workflow Best Practices

1. **Comprehensive logging**:
   ```yaml
   - name: Debug Environment Variables
     run: |
       echo "🔍 Verifying .env file:"
       ls -la .env*
       echo "🔍 VITE_ variables count:"
       grep "^VITE_" .env | wc -l
       echo "🔍 First 5 variables:"
       head -5 .env
   ```

2. **Fallback strategies**:
   ```yaml
   - name: Create .env with fallback
     run: |
       if gcloud secrets versions access latest --secret="app-env" > .env.tmp; then
         mv .env.tmp .env
       else
         echo "Using uploaded .env.production as fallback"
         cp .env.production .env
       fi
   ```

### Service Account Security

1. **Principle of least privilege**:
   ```yaml
   # Only grant necessary roles
   roles:
     - roles/secretmanager.secretAccessor
     - roles/artifactregistry.reader
   ```

2. **Dedicated service accounts**:
   - GitHub Actions SA: `github-actions-deploy@project.iam.gserviceaccount.com`
   - VM SA: `vm-secret-manager-access@project.iam.gserviceaccount.com`

## 🚨 **Critical Pre-Deployment Checklist**

### Before Every Deployment:

- [ ] **Local build test**: `npm run build` succeeds locally
- [ ] **Environment variables**: All VITE_ variables defined and accessible
- [ ] **Docker build test**: `docker build .` completes successfully
- [ ] **Service account permissions**: Verify SA has required roles
- [ ] **GCP APIs enabled**: IAM, Secret Manager, Artifact Registry
- [ ] **Firewall rules**: External access configured
- [ ] **.dockerignore**: Doesn't exclude necessary files
- [ ] **Secret Manager**: Environment variables stored and accessible

### After Deployment:

- [ ] **Container health**: `docker ps` shows running container
- [ ] **Application response**: HTTP 200 from application endpoint
- [ ] **Environment variables**: No "Missing required env" errors in console
- [ ] **External access**: Application accessible from public internet
- [ ] **Logs review**: No errors in container or deployment logs

## 🔍 **Debugging Commands**

### Quick Environment Variable Check:
```bash
# In running container
docker exec CONTAINER_NAME env | grep VITE_

# In built image
docker run --rm IMAGE_NAME env | grep VITE_

# Check .env file in container
docker exec CONTAINER_NAME cat /app/.env | head -10
```

### Secret Manager Debugging:
```bash
# Test secret access
gcloud secrets versions access latest --secret=SECRET_NAME --project=PROJECT_ID

# Check service account permissions
gcloud projects get-iam-policy PROJECT_ID --flatten="bindings[].members" --filter="bindings.members:serviceAccount:SA_EMAIL"
```

### Container Debugging:
```bash
# Check container logs
docker logs CONTAINER_NAME --tail 50

# Interactive container access
docker exec -it CONTAINER_NAME /bin/sh

# Container resource usage
docker stats CONTAINER_NAME
```

## 📋 **Common Error Patterns**

| Error | Likely Cause | Solution |
|-------|--------------|----------|
| `Missing required env: VITE_*` | `.dockerignore` excluding `.env` | Remove `.env*` from `.dockerignore` |
| `ACCESS_TOKEN_SCOPE_INSUFFICIENT` | Service account lacks permissions | Grant `secretmanager.secretAccessor` role |
| `Unable to read file [~/.gcp/key.json]` | Path expansion issue | Use `$HOME` instead of `~` |
| `Container not responding` | Port mapping or firewall issue | Check docker-compose ports and GCP firewall |
| `Image not found` | Artifact Registry authentication | Configure docker auth for registry |

## 🎯 **Success Metrics**

A successful deployment should show:

1. **GitHub Actions**: ✅ All steps pass, no errors
2. **Docker Build**: ✅ Environment variables found in build context
3. **Container**: ✅ Running and healthy
4. **Application**: ✅ Loads without JavaScript errors
5. **External Access**: ✅ Accessible from public internet
6. **Environment Variables**: ✅ All VITE_ variables properly embedded

---

**Remember**: Most deployment issues stem from environment variable handling, service account permissions, or Docker context problems. Always verify these three areas first when troubleshooting.