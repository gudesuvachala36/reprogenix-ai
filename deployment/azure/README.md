# Azure Cloud Deployment (Phase 3 Architecture)

This document outlines the Phase 3 production cloud deployment on **Microsoft Azure**, corresponding to **Layer 10: Cloud Deployment** of the Reprogenix AI System Architecture.

---

## Infrastructure Topology

```
                  Internet / Mobile / Web Clients
                                │
                                ▼
                   ┌──────────────────────────┐
                   │     Azure Front Door     │ (Global CDN, WAF, SSL)
                   └────────────┬─────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌────────────────────────┐                    ┌────────────────────────┐
│   Azure Blob Storage   │                    │  Azure Container Apps  │
│   (React / Vite SPA)   │                    │  (FastAPI Microservice)│
└────────────────────────┘                    └───────────┬────────────┘
                                                          │
                                ┌─────────────────────────┴─────────────┐
                                ▼                                       ▼
                 ┌─────────────────────────────┐         ┌─────────────────────────────┐
                 │ Azure DB for PostgreSQL     │         │       Azure Key Vault       │
                 │ Flexible Server (Encrypted) │         │   (Secrets, Keys & Certs)   │
                 └─────────────────────────────┘         └─────────────────────────────┘
                                │                                       │
                                └───────────────────┬───────────────────┘
                                                    ▼
                                     ┌─────────────────────────────┐
                                     │   Azure Monitor & App       │
                                     │         Insights            │
                                     └─────────────────────────────┘
```

---

## Component Specifications

### 1. Presentation Hosting
- **Service:** Azure Front Door + Azure Blob Storage (Static Website hosting)
- **Features:** Global Anycast routing, automated HTTP-to-HTTPS redirect, custom domain with managed TLS 1.3 certificates, Web Application Firewall (WAF) OWASP ruleset.

### 2. Backend API Runtime
- **Service:** Azure Container Apps (managed Kubernetes/KEDA) or Azure App Service (Linux)
- **Features:** Auto-scaling from 1 to N replicas based on HTTP request volume, zero-downtime blue/green deployments, virtual network (VNet) injection for private backend communication.

### 3. Database Layer
- **Service:** Azure Database for PostgreSQL Flexible Server
- **Security:** Private endpoint integration within Azure VNet (no public internet access), AES-256 storage encryption at rest, TLS 1.3 in transit, automated point-in-time recovery (PITR).

### 4. Cryptographic Key & Secret Management
- **Service:** Azure Key Vault
- **Function:** Stores database credentials, third-party API keys (Groq, teleconsultation tokens), and cryptographic signing keys for session authentication.
- **Access:** System-assigned Managed Identity (zero stored passwords in application configuration).

### 5. Telemetry & Clinical Observability
- **Service:** Azure Monitor & Application Insights
- **Metrics:** Request latency, HTTP status code distribution, database connection pooling, CPU/RAM utilization, and real-time error tracking.

---

## Deployment Steps (Azure CLI)

### 1. Provision Resource Group & Azure Key Vault
```bash
az group create --name rg-reprogenix-prod --location eastus2
az keyvault create --name kv-reprogenix-prod --resource-group rg-reprogenix-prod --location eastus2
```

### 2. Deploy Azure Database for PostgreSQL
```bash
az postgres flexible-server create \
  --resource-group rg-reprogenix-prod \
  --name ps-reprogenix-prod \
  --location eastus2 \
  --admin-user reproadmin \
  --sku-name Standard_D2s_v3 \
  --tier GeneralPurpose \
  --storage-size 128 \
  --version 16
```

### 3. Deploy Backend Container
```bash
az containerapp env create --name env-reprogenix --resource-group rg-reprogenix-prod --location eastus2
az containerapp create \
  --name api-reprogenix \
  --resource-group rg-reprogenix-prod \
  --environment env-reprogenix \
  --image <acr-name>.azurecr.io/reprogenix-backend:latest \
  --target-port 8000 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 10
```

### 4. Deploy Frontend Static Assets
```bash
az storage blob upload-batch \
  --account-name streprogenixfrontend \
  --source ./frontend/dist \
  --destination '$web'
```
