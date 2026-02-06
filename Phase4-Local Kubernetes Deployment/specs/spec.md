# Phase 4 Spec: Kubernetes Deployment

## Goal
The goal of Phase 4 is to transition the Todo Application from a locally running set of processes to a containerized, orchestrated environment using Kubernetes. This ensures scalability, reliability, and consistency across environments.

## Scope
- Dockerize all three major components:
  - **Backend**: FastAPI with SQLModel and SQLite.
  - **Frontend**: Next.js with Tailwind CSS.
  - **AI MCP Server**: Python FastMCP service.
- Orchestrate deployment on a local Kubernetes cluster (Minikube).
- Manage configuration via ConfigMaps and Secrets.
- Ensure cross-component communication within the K8s cluster.

## Architecture
The system will be deployed as three separate microservices in the Kubernetes cluster.

### ☸️ Kubernetes Components
1. **Frontend Deployment & Service**: 
   - Exposes the Next.js app on port 3000.
   - Service Type: `LoadBalancer` (to access from host).
2. **Backend Deployment & Service**:
   - Runs the FastAPI app on port 8888.
   - Service Type: `ClusterIP` (internal only).
3. **MCP Server Deployment & Service**:
   - Runs the AI MCP server on port 8000.
   - Service Type: `ClusterIP` (internal only).
4. **Volume Persistence**:
   - Use `PersistentVolumeClaim` (PVC) for the SQLite database file to ensure task data survives pod restarts.

### 🖼️ Container Strategy
- Use multi-stage builds for Frontend and Backend to minimize image size.
- Standardize on `python:3.11-slim` for Python services.
- Standardize on `node:18-alpine` for the Next.js frontend.

## Requirements
- **Dockerization**: All services must have working `Dockerfile`s.
- **Portability**: The setup should work on any local K8s cluster (Minikube, Kind).
- **Communication**: Frontend should talk to Backend via internal K8s DNS (e.g., `http://backend:8888`).
- **Security**: Sensitive keys like `GROQ_API_KEY` must be stored in K8s `Secrets`.

## Acceptance Criteria
1. All three components are running as Kubernetes Pods.
2. The user can access the dashboard at a stable local address (Minikube IP).
3. The AI Chatbot can successfully communicate with the backend within the cluster.
4. Database changes persist after recreating the backend Pod.
