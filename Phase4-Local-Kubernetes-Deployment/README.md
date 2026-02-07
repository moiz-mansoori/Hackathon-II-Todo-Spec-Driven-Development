# ☸️ Phase 4: Local Kubernetes Deployment

> **Containers, orchestration, and infrastructure as code!**

Welcome to DevOps territory! 🐳 In this phase, I containerized the entire application and created Kubernetes manifests to deploy it like a pro.

---

## 🎯 What's This About?

Instead of running things manually, we now have:

- 🐳 **Docker containers** for each service
- ☸️ **Kubernetes manifests** for deployment
- 📦 **Helm charts** for easy management
- 🔐 **Secrets** managed properly

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER                            │
│                    Namespace: mansoori-todo                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐   │
│  │  Frontend   │   │   Backend   │   │     MCP Server      │   │
│  │  (Next.js)  │   │  (FastAPI)  │   │    (AI Chatbot)     │   │
│  │   :3000     │──▶│    :8888    │◀──│       :8000         │   │
│  └─────────────┘   └─────────────┘   └─────────────────────┘   │
│         │                 │                                      │
│         │                 ▼                                      │
│         │          ┌─────────────┐                              │
│         │          │    Neon     │                              │
│         │          │ PostgreSQL  │                              │
│         │          └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
Phase4-Local-Kubernetes-Deployment/
│
├── kubernetes/              # Raw K8s Manifests
│   ├── deployments.yaml    # Pod configurations
│   ├── services.yaml       # Service definitions
│   ├── secrets.yaml        # Secrets (base64)
│   ├── namespace.yaml      # Namespace creation
│   └── pvc.yaml           # Persistent volumes
│
└── helm/mansoori-todo/     # Helm Chart ⭐
    ├── Chart.yaml          # Chart metadata
    ├── values.yaml         # Configuration values
    ├── README.md           # Chart documentation
    └── templates/
        ├── _helpers.tpl    # Template helpers
        ├── namespace.yaml
        ├── secrets.yaml
        ├── backend-deployment.yaml
        ├── mcp-deployment.yaml
        ├── frontend-deployment.yaml
        └── services.yaml
```

---

## 🚀 Quick Start with Helm

### Prerequisites
- Docker Desktop or Minikube
- Helm 3.0+
- kubectl

### 1. Start Minikube

```bash
minikube start
```

### 2. Build Docker Images

```bash
# Point Docker to Minikube's daemon
eval $(minikube docker-env)  # Linux/Mac
minikube docker-env | Invoke-Expression  # Windows

# Build images
docker build -t mansoori-todo-backend:latest ../Phase2/backend
docker build -t mansoori-todo-frontend:latest ../Phase2/frontend
docker build -t mansoori-todo-mcp:latest ../Phase3/mcp-server
```

### 3. Deploy with Helm

```bash
# Install the chart
helm install mansoori-todo ./helm/mansoori-todo

# Or with custom values
helm install mansoori-todo ./helm/mansoori-todo \
  --set secrets.jwtSecret="your-secret" \
  --set secrets.groqApiKey="your-api-key"
```

### 4. Verify Deployment

```bash
kubectl get pods -n mansoori-todo
kubectl get services -n mansoori-todo

# Expected output:
# NAME          READY   STATUS    
# backend       1/1     Running   
# frontend      1/1     Running   
# mcp-server    1/1     Running
```

### 5. Access the App

```bash
minikube service frontend-service -n mansoori-todo
```

---

## ✅ Helm Chart Validation

```bash
$ helm lint ./helm/mansoori-todo
==> Linting ./helm/mansoori-todo
[INFO] Chart.yaml: icon is recommended

1 chart(s) linted, 0 chart(s) failed ✅
```

---

## 📋 Generated Resources

| Resource | Type | Purpose |
|----------|------|---------|
| `mansoori-todo` | Namespace | Isolation |
| `todo-secrets` | Secret | JWT, Groq, DB |
| `backend-service` | Service | Internal :8888 |
| `mcp-service` | Service | Internal :8000 |
| `frontend-service` | LoadBalancer | External :3000 |
| `backend` | Deployment | FastAPI pod |
| `frontend` | Deployment | Next.js pod |
| `mcp-server` | Deployment | AI chatbot pod |

---

## 🔧 Configuration (values.yaml)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `namespace` | mansoori-todo | K8s namespace |
| `backend.replicaCount` | 1 | Backend replicas |
| `frontend.replicaCount` | 1 | Frontend replicas |
| `database.useNeon` | true | Use cloud DB |
| `secrets.jwtSecret` | dev-secret | Auth key |
| `secrets.groqApiKey` | "" | AI API key |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Kubernetes** | Orchestration |
| **Helm** | Package management |
| **Minikube** | Local K8s cluster |

---

## 📖 What I Learned

1. **Containerization** - Writing Dockerfiles
2. **Kubernetes Resources** - Pods, Services, Deployments
3. **Helm Charts** - Template-based K8s management
4. **Secrets Management** - Secure configuration
5. **Infrastructure as Code** - Declarative deployments

---

## 🔗 Useful Commands

```bash
# Validate the chart
helm lint ./helm/mansoori-todo

# Preview generated YAML
helm template mansoori-todo ./helm/mansoori-todo

# Upgrade deployment
helm upgrade mansoori-todo ./helm/mansoori-todo

# Uninstall
helm uninstall mansoori-todo
kubectl delete namespace mansoori-todo
```

---

## 👨‍💻 Author

**Moiz Ahmed Mansoori**
- [LinkedIn](https://linkedin.com/in/moiz-mansoori)
- [GitHub](https://github.com/moiz-mansoori)

---

<p align="center">
  <i>"Infrastructure as code is the poetry of DevOps."</i> ☸️
</p>
