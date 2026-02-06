# Mansoori Todo Helm Chart

A Helm chart for deploying the Mansoori Todo Application to Kubernetes.

## Components

| Service | Description | Port |
|---------|-------------|------|
| Backend | FastAPI REST API | 8888 |
| MCP Server | AI Chatbot (FastMCP) | 8000 |
| Frontend | Next.js Web App | 3000 |

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+
- Docker images built for each component

## Installation

### 1. Build Docker Images

```bash
# From Phase4 directory
docker build -t mansoori-todo-backend:latest ../Phase2/backend
docker build -t mansoori-todo-mcp:latest ../Phase3/mcp-server
docker build -t mansoori-todo-frontend:latest ../Phase2/frontend
```

### 2. Install the Chart

```bash
# Install with default values
helm install mansoori-todo ./helm/mansoori-todo

# Install with custom values
helm install mansoori-todo ./helm/mansoori-todo \
  --set database.neonUrl="your-neon-connection-string" \
  --set secrets.jwtSecret="your-jwt-secret" \
  --set secrets.groqApiKey="your-groq-api-key"

# Install with values file
helm install mansoori-todo ./helm/mansoori-todo -f custom-values.yaml
```

### 3. Verify Installation

```bash
kubectl get pods -n mansoori-todo
kubectl get services -n mansoori-todo
```

## Configuration

Key configuration options in `values.yaml`:

| Parameter | Description | Default |
|-----------|-------------|---------|
| `namespace` | Kubernetes namespace | `mansoori-todo` |
| `backend.replicaCount` | Backend replicas | `1` |
| `frontend.replicaCount` | Frontend replicas | `1` |
| `database.useNeon` | Use Neon PostgreSQL | `true` |
| `database.neonUrl` | Neon connection string | `""` |
| `secrets.jwtSecret` | JWT signing key | `dev-secret...` |
| `secrets.groqApiKey` | Groq AI API key | `""` |

## Upgrade

```bash
helm upgrade mansoori-todo ./helm/mansoori-todo
```

## Uninstall

```bash
helm uninstall mansoori-todo
kubectl delete namespace mansoori-todo
```

## Chart Structure

```
helm/mansoori-todo/
├── Chart.yaml              # Chart metadata
├── values.yaml             # Default configuration
└── templates/
    ├── _helpers.tpl        # Template helpers
    ├── namespace.yaml      # Namespace
    ├── secrets.yaml        # Secrets
    ├── backend-deployment.yaml
    ├── mcp-deployment.yaml
    ├── frontend-deployment.yaml
    └── services.yaml       # All services
```

## Author

**Moiz Ahmed Mansoori**
- GitHub: https://github.com/moiz-mansoori
- LinkedIn: https://linkedin.com/in/moiz-mansoori
