# Dominio 2: Kubernetes Avanzado - Operaciones y Patrones

## 2.1 StatefulSets

Para aplicaciones con estado que requieren identidad de red estable y almacenamiento persistente ordenado.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "postgres-headless"
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: pg-secret
              key: password
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 50Gi
---
# Headless Service (requerido por StatefulSet)
apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
  - port: 5432
```

**Características clave:**
- Nombres de Pod predecibles: `postgres-0`, `postgres-1`, `postgres-2`
- DNS estable: `postgres-0.postgres-headless.default.svc.cluster.local`
- Escala/desescala de forma ordenada
- PVCs individuales por réplica (no se comparten)

---

## 2.2 DaemonSets

Ejecutan exactamente un Pod por nodo (logging, monitoring, networking).

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: kube-system
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      tolerations:
      - key: node-role.kubernetes.io/control-plane
        operator: Exists
        effect: NoSchedule
      containers:
      - name: fluentd
        image: fluent/fluentd:v1.16
        resources:
          limits:
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: varlog
          mountPath: /var/log
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
```

---

## 2.3 Jobs y CronJobs

```yaml
# Job (ejecución única)
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
spec:
  backoffLimit: 3
  activeDeadlineSeconds: 300
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: migrate
        image: myapp-migrate:v1.0
        command: ["python", "manage.py", "migrate"]
---
# CronJob (ejecución periódica)
apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-backup
spec:
  schedule: "0 2 * * *"  # 2 AM diario
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 5
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: backup
            image: backup-tool:latest
            env:
            - name: S3_BUCKET
              value: "my-backups"
```

---

## 2.4 Horizontal Pod Autoscaler (HPA) y VPA

```yaml
# HPA basado en CPU y métricas custom
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 20
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
```

---

## 2.5 Taints, Tolerations y Affinity

### Taints y Tolerations

```bash
# Añadir taint a un nodo
kubectl taint nodes node1 gpu=true:NoSchedule
kubectl taint nodes node2 dedicated=ml-workloads:PreferNoSchedule
```

```yaml
# Pod con tolerations
apiVersion: v1
kind: Pod
metadata:
  name: gpu-pod
spec:
  tolerations:
  - key: "gpu"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
  containers:
  - name: ml-training
    image: ml-model:v1
    resources:
      limits:
        nvidia.com/gpu: 1
```

### Node Affinity

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: high-memory-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: high-memory
  template:
    metadata:
      labels:
        app: high-memory
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: node-type
                operator: In
                values:
                - high-memory
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 80
            preference:
              matchExpressions:
              - key: zone
                operator: In
                values:
                - us-east-1a
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - high-memory
            topologyKey: kubernetes.io/hostname
      containers:
      - name: app
        image: myapp:latest
```

---

## 2.6 Pod Disruption Budgets (PDB)

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: web-pdb
spec:
  minAvailable: 2    # O usar maxUnavailable: 1
  selector:
    matchLabels:
      app: web
```

---

## 2.7 Helm - Package Manager

```bash
# Operaciones básicas
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm search repo bitnami/postgresql

# Instalación
helm install my-postgres bitnami/postgresql \
  --namespace databases \
  --create-namespace \
  --set auth.postgresPassword=secretpass \
  --set primary.persistence.size=50Gi \
  --values custom-values.yaml

# Gestión
helm list -n databases
helm upgrade my-postgres bitnami/postgresql -f new-values.yaml
helm rollback my-postgres 1
helm uninstall my-postgres -n databases

# Crear chart propio
helm create my-chart
helm package my-chart
helm install my-release ./my-chart
```

### Estructura de un Chart

```
my-chart/
├── Chart.yaml          # Metadatos del chart
├── values.yaml         # Valores por defecto
├── charts/             # Dependencias
├── templates/          # Manifests con templates Go
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── _helpers.tpl    # Template helpers
│   └── NOTES.txt       # Post-install notes
└── .helmignore
```

---

## 2.8 Seguridad en Kubernetes

### Pod Security Standards (PSS)

```yaml
# Namespace con Pod Security Admission
apiVersion: v1
kind: Namespace
metadata:
  name: restricted-ns
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### SecurityContext

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    image: myapp:v1
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
    volumeMounts:
    - name: tmp
      mountPath: /tmp
  volumes:
  - name: tmp
    emptyDir: {}
```

### Service Accounts y Token Projection

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/app-role
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  template:
    spec:
      serviceAccountName: app-sa
      automountServiceAccountToken: false
      containers:
      - name: app
        image: myapp:v1
        volumeMounts:
        - name: token
          mountPath: /var/run/secrets/tokens
      volumes:
      - name: token
        projected:
          sources:
          - serviceAccountToken:
              path: token
              expirationSeconds: 3600
              audience: api
```

---

## 2.9 Observabilidad

### Probes Avanzados

```yaml
spec:
  containers:
  - name: app
    image: myapp:v1
    startupProbe:
      httpGet:
        path: /healthz
        port: 8080
      failureThreshold: 30
      periodSeconds: 10
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      periodSeconds: 10
      failureThreshold: 3
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      periodSeconds: 5
      failureThreshold: 3
```

### Prometheus ServiceMonitor

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: app-monitor
spec:
  selector:
    matchLabels:
      app: web
  endpoints:
  - port: metrics
    interval: 15s
    path: /metrics
```

---

## 2.10 Estrategias de Deployment

| Estrategia | Descripción | Uso |
|-----------|-------------|-----|
| **Rolling Update** | Actualización gradual (default) | Mayoría de aplicaciones |
| **Recreate** | Elimina todos los Pods antes de crear nuevos | Aplicaciones que no pueden tener 2 versiones |
| **Blue/Green** | Dos ambientes completos, switch via Service | Zero downtime con rollback instantáneo |
| **Canary** | Pequeño % del tráfico a la nueva versión | Validación progresiva |

### Blue/Green con Kubernetes

```yaml
# Deployment Blue (actual)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: blue
  template:
    metadata:
      labels:
        app: myapp
        version: blue
    spec:
      containers:
      - name: app
        image: myapp:v1.0
---
# Deployment Green (nuevo)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green
  template:
    metadata:
      labels:
        app: myapp
        version: green
    spec:
      containers:
      - name: app
        image: myapp:v2.0
---
# Service - cambiar selector para switch
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: myapp
    version: green  # Cambiar a 'green' para el switch
  ports:
  - port: 80
    targetPort: 8080
```

---

## Resumen Clave para Certificación

| Concepto | Punto Crítico |
|----------|---------------|
| StatefulSet | Identidad estable, storage individual, orden de creación/eliminación |
| DaemonSet | Un Pod por nodo, ideal para agentes de logging/monitoring |
| HPA | Escala por CPU, memoria o métricas custom; stabilizationWindow evita flapping |
| Taints/Tolerations | Taints en nodos repelen Pods; Tolerations permiten scheduling |
| Affinity | required = obligatorio; preferred = mejor esfuerzo |
| PDB | Protege disponibilidad durante maintenance/upgrades |
| Helm | Package manager, Chart = conjunto de templates + values |
| PSS | Privileged, Baseline, Restricted (niveles de seguridad) |
| Blue/Green | Dos deployments, switch via Service selector |
