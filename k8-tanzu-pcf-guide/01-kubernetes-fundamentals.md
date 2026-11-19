# Dominio 1: Kubernetes - Fundamentos y Arquitectura

## 1.1 Arquitectura de Kubernetes

### Componentes del Control Plane

| Componente | Función |
|-----------|---------|
| **kube-apiserver** | Punto de entrada para todas las operaciones REST. Valida y configura datos para los objetos API |
| **etcd** | Base de datos clave-valor distribuida que almacena todo el estado del cluster |
| **kube-scheduler** | Asigna Pods a nodos basándose en restricciones, afinidad, recursos disponibles |
| **kube-controller-manager** | Ejecuta controladores (ReplicaSet, Deployment, Node, Service Account) |
| **cloud-controller-manager** | Interactúa con APIs de proveedores cloud (LoadBalancer, Routes, Volumes) |

### Componentes del Worker Node

| Componente | Función |
|-----------|---------|
| **kubelet** | Agente que se ejecuta en cada nodo, gestiona contenedores según PodSpecs |
| **kube-proxy** | Mantiene reglas de red (iptables/IPVS) para la comunicación de servicios |
| **Container Runtime** | containerd, CRI-O (Docker deprecated desde v1.24) |

### Diagrama Conceptual

```
┌─────────────────── Control Plane ───────────────────┐
│  ┌──────────┐  ┌────────┐  ┌───────────┐          │
│  │ API      │  │ etcd   │  │ Scheduler │          │
│  │ Server   │  │        │  │           │          │
│  └──────────┘  └────────┘  └───────────┘          │
│  ┌───────────────────────┐  ┌──────────────────┐   │
│  │ Controller Manager    │  │ Cloud Controller │   │
│  └───────────────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
┌─── Worker Node 1 ─┐ ┌─── Worker Node 2 ─┐ ┌─── Worker Node N ─┐
│  kubelet           │ │  kubelet           │ │  kubelet           │
│  kube-proxy        │ │  kube-proxy        │ │  kube-proxy        │
│  Container Runtime │ │  Container Runtime │ │  Container Runtime │
│  [Pod] [Pod]       │ │  [Pod] [Pod]       │ │  [Pod] [Pod]       │
└────────────────────┘ └────────────────────┘ └────────────────────┘
```

---

## 1.2 Objetos Fundamentales de Kubernetes

### Pods

El **Pod** es la unidad más pequeña desplegable. Puede contener uno o más contenedores que comparten red y almacenamiento.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: web
    tier: frontend
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    livenessProbe:
      httpGet:
        path: /healthz
        port: 80
      initialDelaySeconds: 3
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
```

### Deployments

Gestiona ReplicaSets y proporciona actualizaciones declarativas para Pods.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:v2.0
        ports:
        - containerPort: 8080
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: db-config
              key: host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
```

### Services

Expone un conjunto de Pods como un servicio de red.

```yaml
# ClusterIP (interno)
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: ClusterIP
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080
---
# NodePort (acceso externo via puerto del nodo)
apiVersion: v1
kind: Service
metadata:
  name: web-nodeport
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080
---
# LoadBalancer (cloud provider)
apiVersion: v1
kind: Service
metadata:
  name: web-lb
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080
```

### Tipos de Service

| Tipo | Uso | Acceso |
|------|-----|--------|
| **ClusterIP** | Default. Comunicación interna | Solo dentro del cluster |
| **NodePort** | Desarrollo/testing | IP del nodo + puerto (30000-32767) |
| **LoadBalancer** | Producción en cloud | IP externa asignada por cloud provider |
| **ExternalName** | Alias DNS | Mapeo CNAME a servicio externo |

---

## 1.3 Networking en Kubernetes

### Modelo de Red

1. Todo Pod puede comunicarse con cualquier otro Pod sin NAT
2. Los agentes de un nodo pueden comunicarse con todos los Pods en ese nodo
3. Los Pods ven su propia IP igual que otros Pods la ven

### Ingress

Gestiona acceso HTTP/HTTPS externo a servicios dentro del cluster.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 8080
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

### NetworkPolicies

Controlan el flujo de tráfico a nivel de Pod.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      tier: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          tier: frontend
    ports:
    - protocol: TCP
      port: 8080
```

---

## 1.4 Almacenamiento

### PersistentVolumes y PersistentVolumeClaims

```yaml
# StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iopsPerGB: "10"
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
---
# Pod usando PVC
apiVersion: v1
kind: Pod
metadata:
  name: db-pod
spec:
  containers:
  - name: postgres
    image: postgres:15
    volumeMounts:
    - name: data
      mountPath: /var/lib/postgresql/data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: data-pvc
```

### Access Modes

| Modo | Abreviación | Descripción |
|------|-------------|-------------|
| ReadWriteOnce | RWO | Montado lectura-escritura por un solo nodo |
| ReadOnlyMany | ROX | Montado solo-lectura por múltiples nodos |
| ReadWriteMany | RWX | Montado lectura-escritura por múltiples nodos |
| ReadWriteOncePod | RWOP | Montado lectura-escritura por un solo Pod |

---

## 1.5 ConfigMaps y Secrets

```yaml
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_HOST: "postgres-service"
  DATABASE_PORT: "5432"
  LOG_LEVEL: "info"
  config.yaml: |
    server:
      port: 8080
      timeout: 30s
    features:
      cache: true
---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=  # base64 encoded
  API_KEY: c2VjcmV0LWtleS0xMjM=
```

---

## 1.6 Namespaces y RBAC

### Namespaces

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    environment: prod
---
# ResourceQuota
apiVersion: v1
kind: ResourceQuota
metadata:
  name: prod-quota
  namespace: production
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.cpu: "40"
    limits.memory: 80Gi
    pods: "50"
    services: "20"
```

### RBAC

```yaml
# Role (namespace-scoped)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: production
subjects:
- kind: User
  name: developer@example.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
---
# ClusterRole (cluster-wide)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list"]
```

---

## 1.7 Comandos Esenciales kubectl

```bash
# Gestión de contextos
kubectl config get-contexts
kubectl config use-context my-cluster
kubectl config set-context --current --namespace=production

# Operaciones CRUD
kubectl apply -f deployment.yaml
kubectl get pods -o wide --show-labels
kubectl describe pod nginx-pod
kubectl delete deployment web-app
kubectl logs pod-name -c container-name --follow
kubectl exec -it pod-name -- /bin/sh

# Debugging
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl top pods --sort-by=memory
kubectl get pods --field-selector status.phase=Failed
kubectl rollout status deployment/web-app
kubectl rollout undo deployment/web-app --to-revision=2

# Scaling
kubectl scale deployment web-app --replicas=5
kubectl autoscale deployment web-app --min=2 --max=10 --cpu-percent=70
```

---

## Resumen Clave para Certificación

| Concepto | Punto Crítico |
|----------|---------------|
| Pod | Unidad mínima, comparte red y storage entre contenedores |
| Deployment | Gestiona ReplicaSets, rolling updates, rollbacks |
| Service | ClusterIP (default), NodePort, LoadBalancer, ExternalName |
| Ingress | Enrutamiento HTTP/HTTPS con TLS, path-based routing |
| PV/PVC | Desacoplamiento storage del Pod, StorageClass para provisión dinámica |
| ConfigMap/Secret | Configuración externalizada, Secret en base64 (no cifrado por defecto) |
| RBAC | Role+RoleBinding (namespace), ClusterRole+ClusterRoleBinding (cluster) |
| NetworkPolicy | Default allow-all, se aplican de forma aditiva |
