# #!/bin/bash

# # GCP Setup Script for Greenscape Deployment
# # This script sets up the required GCP resources following the proven deployment pattern

# set -e

# # Colors for output
# RED='\033[0;31m'
# GREEN='\033[0;32m'
# YELLOW='\033[1;33m'
# NC='\033[0m'

# # Function to print colored output
# print_status() {
#     echo -e "${GREEN}[INFO]${NC} $1"
# }

# print_warning() {
#     echo -e "${YELLOW}[WARNING]${NC} $1"
# }

# print_error() {
#     echo -e "${RED}[ERROR]${NC} $1"
# }

# # Check if required tools are installed
# check_requirements() {
#     print_status "Checking requirements..."

#     if ! command -v gcloud &> /dev/null; then
#         print_error "Google Cloud CLI is not installed. Please install it first."
#         exit 1
#     fi

#     if ! command -v docker &> /dev/null; then
#         print_error "Docker is not installed. Please install it first."
#         exit 1
#     fi
# }

# # Set project variables
# setup_variables() {
#     if [ -z "$PROJECT_ID" ]; then
#         echo -n "Enter your GCP Project ID: "
#         read PROJECT_ID
#     fi

#     if [ -z "$REGISTRY_REGION" ]; then
#         REGISTRY_REGION="us-central1"
#     fi

#     if [ -z "$REPOSITORY_NAME" ]; then
#         REPOSITORY_NAME="greenscape"
#     fi

#     if [ -z "$APP_NAME" ]; then
#         APP_NAME="greenscape"
#     fi

#     print_status "Using Project ID: $PROJECT_ID"
#     print_status "Using Registry Region: $REGISTRY_REGION"
#     print_status "Using Repository Name: $REPOSITORY_NAME"
#     print_status "Using App Name: $APP_NAME"
# }

# # Enable required APIs
# enable_apis() {
#     print_status "Enabling required GCP APIs..."

#     gcloud services enable artifactregistry.googleapis.com --project=$PROJECT_ID
#     gcloud services enable secretmanager.googleapis.com --project=$PROJECT_ID
#     gcloud services enable compute.googleapis.com --project=$PROJECT_ID

#     print_status "APIs enabled successfully"
# }

# # Create Artifact Registry repository
# create_artifact_registry() {
#     print_status "Creating Artifact Registry repository..."

#     # Check if repository already exists
#     if gcloud artifacts repositories describe $REPOSITORY_NAME \
#         --location=$REGISTRY_REGION \
#         --project=$PROJECT_ID &> /dev/null; then
#         print_warning "Repository $REPOSITORY_NAME already exists"
#     else
#         gcloud artifacts repositories create $REPOSITORY_NAME \
#             --repository-format=docker \
#             --location=$REGISTRY_REGION \
#             --description="Docker repository for Greenscape application" \
#             --project=$PROJECT_ID
#         print_status "Repository created successfully"
#     fi
# }

# # Create service account for GitHub Actions
# create_service_account() {
#     print_status "Creating service account for GitHub Actions..."

#     SA_NAME="github-actions-deploy"
#     SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

#     # Check if service account exists
#     if gcloud iam service-accounts describe $SA_EMAIL --project=$PROJECT_ID &> /dev/null; then
#         print_warning "Service account $SA_EMAIL already exists"
#     else
#         gcloud iam service-accounts create $SA_NAME \
#             --display-name="GitHub Actions Deployment" \
#             --description="Service account for GitHub Actions to deploy to GCP" \
#             --project=$PROJECT_ID
#         print_status "Service account created successfully"
#     fi

#     # Grant necessary roles
#     print_status "Granting IAM roles..."

#     gcloud projects add-iam-policy-binding $PROJECT_ID \
#         --member="serviceAccount:$SA_EMAIL" \
#         --role="roles/artifactregistry.writer"

#     gcloud projects add-iam-policy-binding $PROJECT_ID \
#         --member="serviceAccount:$SA_EMAIL" \
#         --role="roles/secretmanager.secretAccessor"

#     # Create and download service account key
#     print_status "Creating service account key..."
#     gcloud iam service-accounts keys create ./github-actions-key.json \
#         --iam-account=$SA_EMAIL \
#         --project=$PROJECT_ID

#     print_status "Service account key saved to ./github-actions-key.json"
#     print_warning "IMPORTANT: Add this key to GitHub Secrets as GCP_SA_KEY"
# }

# # Create secrets in Secret Manager
# create_secrets() {
#     print_status "Setting up Secret Manager..."

#     # Example secrets - you can add more as needed
#     echo -n "Enter API URL (or press Enter to skip): "
#     read API_URL

#     if [ ! -z "$API_URL" ]; then
#         if gcloud secrets describe api-url --project=$PROJECT_ID &> /dev/null; then
#             print_warning "Secret api-url already exists, updating..."
#             echo -n "$API_URL" | gcloud secrets versions add api-url --data-file=- --project=$PROJECT_ID
#         else
#             echo -n "$API_URL" | gcloud secrets create api-url --data-file=- --project=$PROJECT_ID
#         fi
#         print_status "API URL secret created/updated"
#     fi
# }

# # Set up VM service account key
# setup_vm_credentials() {
#     print_status "Setting up VM credentials..."

#     VM_SA_NAME="vm-deploy"
#     VM_SA_EMAIL="${VM_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

#     # Create VM service account
#     if gcloud iam service-accounts describe $VM_SA_EMAIL --project=$PROJECT_ID &> /dev/null; then
#         print_warning "VM service account $VM_SA_EMAIL already exists"
#     else
#         gcloud iam service-accounts create $VM_SA_NAME \
#             --display-name="VM Deployment" \
#             --description="Service account for VM to pull from Artifact Registry" \
#             --project=$PROJECT_ID
#     fi

#     # Grant necessary roles
#     gcloud projects add-iam-policy-binding $PROJECT_ID \
#         --member="serviceAccount:$VM_SA_EMAIL" \
#         --role="roles/artifactregistry.reader"

#     # Create VM service account key
#     gcloud iam service-accounts keys create ./vm-service-account-key.json \
#         --iam-account=$VM_SA_EMAIL \
#         --project=$PROJECT_ID

#     print_status "VM service account key saved to ./vm-service-account-key.json"
#     print_warning "IMPORTANT: Copy this key to your VM at /home/greenscapegeo/.gcp/service-account-key.json"
# }

# # Configure Docker authentication
# configure_docker() {
#     print_status "Configuring Docker authentication..."
#     gcloud auth configure-docker ${REGISTRY_REGION}-docker.pkg.dev
# }

# # Main execution
# main() {
#     echo "================================================"
#     echo "GCP Setup for Greenscape Deployment"
#     echo "================================================"

#     check_requirements
#     setup_variables
#     enable_apis
#     create_artifact_registry
#     create_service_account
#     create_secrets
#     setup_vm_credentials
#     configure_docker

#     echo ""
#     echo "================================================"
#     print_status "Setup completed successfully!"
#     echo "================================================"
#     echo ""
#     echo "Next steps:"
#     echo "1. Add the following secrets to your GitHub repository:"
#     echo "   - GCP_PROJECT_ID: $PROJECT_ID"
#     echo "   - GCP_SA_KEY: (contents of github-actions-key.json)"
#     echo "   - VM_HOST: 35.188.90.180"
#     echo "   - VM_SSH_USER: greenscapegeo"
#     echo "   - VM_SSH_KEY: (your SSH private key for the VM)"
#     echo ""
#     echo "2. Copy vm-service-account-key.json to your VM:"
#     echo "   scp vm-service-account-key.json greenscapegeo@35.188.90.180:~/.gcp/"
#     echo ""
#     echo "3. Test the deployment by pushing to your main/master branch"
#     echo ""
#     print_warning "Remember to securely store and delete the generated key files after setup!"
# }

# # Run main function
# main "$@"