# Dominio 3: VMware Tanzu - Plataforma Kubernetes Enterprise

## 3.1 Visión General de VMware Tanzu

VMware Tanzu es un portfolio de productos para modernizar aplicaciones, infraestructura y operaciones. Integra Kubernetes con el ecosistema VMware para ofrecer una plataforma cloud-native enterprise.

### Portfolio Tanzu

| Producto | Función |
|----------|---------|
| **Tanzu Kubernetes Grid (TKG)** | Distribución Kubernetes multi-cloud conformant |
| **Tanzu Application Platform (TAP)** | PaaS sobre Kubernetes con developer experience |
| **Tanzu Mission Control (TMC)** | Gestión centralizada de múltiples clusters |
| **Tanzu Observability (Aria Operations)** | Monitoring y analytics para apps cloud-native |
| **Tanzu Service Mesh** | Conectividad y seguridad entre servicios |
| **Tanzu Application Service (TAS)** | Evolución de Pivotal Cloud Foundry |

---

## 3.2 Tanzu Kubernetes Grid (TKG)

### Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                  Tanzu Mission Control                    │
│              (Gestión Multi-Cluster)                      │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─── Management Cluster ───┐  ┌── Workload Cluster 1 ──┐
│  Cluster API              │  │  Applications           │
│  TKG Extensions           │  │  Contour (Ingress)      │
│  Cert Manager             │  │  Fluent Bit (Logging)   │
│  Pinniped (Auth)          │  │  Prometheus (Metrics)   │
└───────────────────────────┘  └─────────────────────────┘
                                ┌── Workload Cluster 2 ──┐
                                │  Applications           │
                                │  Contour (Ingress)      │
                                │  Harbor (Registry)      │
                                └─────────────────────────┘
```

### Instalación y Configuración TKG

```bash
# Instalar Tanzu CLI
tanzu plugin install --group vmware-tkg/default:v2.4.0

# Crear Management Cluster (vSphere)
tanzu management-cluster create --ui
# O con archivo de configuración
tanzu management-cluster create -f mgmt-cluster-config.yaml

# Crear Workload Cluster
tanzu cluster create my-workload-cluster \
  --plan prod \
  --controlplane-machine-count 3 \
  --worker-machine-count 5 \
  --kubernetes-version v1.27.5

# Obtener credenciales
tanzu cluster kubeconfig get my-workload-cluster --admin

# Listar clusters
tanzu cluster list
tanzu cluster get my-workload-cluster
```

### Archivo de Configuración TKG

```yaml
#! cluster-config.yaml
CLUSTER_NAME: production-cluster
CLUSTER_PLAN: prod
INFRASTRUCTURE_PROVIDER: vsphere
VSPHERE_SERVER: vcenter.example.com
VSPHERE_USERNAME: administrator@vsphere.local
VSPHERE_DATACENTER: /dc01
VSPHERE_DATASTORE: /dc01/datastore/vsanDatastore
VSPHERE_NETWORK: /dc01/network/tkg-workload
VSPHERE_RESOURCE_POOL: /dc01/host/cluster01/Resources/tkg
VSPHERE_FOLDER: /dc01/vm/tkg
VSPHERE_SSH_AUTHORIZED_KEY: ssh-rsa AAAA...
CONTROL_PLANE_MACHINE_COUNT: 3
WORKER_MACHINE_COUNT: 5
CONTROLPLANE_SIZE: large
WORKER_SIZE: extra-large
ENABLE_AUDIT_LOGGING: true
ENABLE_DEFAULT_STORAGE_CLASS: true
```

---

## 3.3 Tanzu Application Platform (TAP)

### Componentes Principales

| Componente | Función |
|-----------|---------|
| **Supply Chain** | Pipeline automatizado de código a producción |
| **Cloud Native Buildpacks** | Detecta lenguaje y construye imagen OCI automáticamente |
| **Cartographer** | Orquesta supply chains declarativamente |
| **Backstage (TAP GUI)** | Portal de desarrollador con catálogo de servicios |
| **Crossplane** | Provisión de servicios de infraestructura |
| **Knative** | Serverless workloads |

### Developer Workflow con TAP

```bash
# Crear workload desde código fuente
tanzu apps workload create my-app \
  --git-repo https://github.com/org/my-app \
  --git-branch main \
  --type web \
  --label app.kubernetes.io/part-of=my-app \
  --namespace dev

# Ver estado del supply chain
tanzu apps workload get my-app -n dev

# Tail de logs del build
tanzu apps workload tail my-app -n dev --since 10m

# Listar workloads
tanzu apps workload list -n dev

# Eliminar workload
tanzu apps workload delete my-app -n dev
```

### Supply Chain (Cartographer)

```yaml
apiVersion: carto.run/v1alpha1
kind: ClusterSupplyChain
metadata:
  name: source-to-url
spec:
  selector:
    apps.tanzu.vmware.com/workload-type: web
  resources:
  - name: source-provider
    templateRef:
      kind: ClusterSourceTemplate
      name: source-template
  - name: image-provider
    templateRef:
      kind: ClusterImageTemplate
      name: kpack-template
    sources:
    - resource: source-provider
      name: source
  - name: config-provider
    templateRef:
      kind: ClusterConfigTemplate
      name: convention-template
    images:
    - resource: image-provider
      name: image
  - name: app-config
    templateRef:
      kind: ClusterConfigTemplate
      name: config-template
    configs:
    - resource: config-provider
      name: config
  - name: config-writer
    templateRef:
      kind: ClusterTemplate
      name: config-writer-template
    configs:
    - resource: app-config
      name: config
```

### Workload YAML

```yaml
apiVersion: carto.run/v1alpha1
kind: Workload
metadata:
  name: spring-petclinic
  namespace: dev
  labels:
    apps.tanzu.vmware.com/workload-type: web
    app.kubernetes.io/part-of: petclinic
spec:
  source:
    git:
      url: https://github.com/spring-projects/spring-petclinic
      ref:
        branch: main
  build:
    env:
    - name: BP_JVM_VERSION
      value: "17"
  params:
  - name: annotations
    value:
      autoscaling.knative.dev/minScale: "1"
  serviceClaims:
  - name: database
    ref:
      apiVersion: services.apps.tanzu.vmware.com/v1alpha1
      kind: ClassClaim
      name: postgres-claim
```

---

## 3.4 Tanzu Mission Control (TMC)

### Funcionalidades

- **Lifecycle Management**: Crear, actualizar, eliminar clusters desde una consola central
- **Policy Management**: Aplicar políticas de seguridad, red, cuotas de forma centralizada
- **Data Protection**: Backup y restore de clusters con Velero
- **Inspection**: Conformance testing con Sonobuoy
- **Access Control**: Gestión de RBAC centralizada

### CLI TMC

```bash
# Login
tmc login

# Gestión de clusters
tmc cluster list
tmc cluster create -f cluster-spec.yaml
tmc cluster attach my-cluster --cluster-group production

# Políticas
tmc cluster policy create \
  --cluster-name prod-cluster \
  --policy-type security \
  --recipe strict

# Backup
tmc cluster dataprotection create \
  --cluster-name prod-cluster \
  --backup-location s3-backup \
  --schedule "0 2 * * *"
```

---

## 3.5 TKG Packages y Extensiones

### Paquetes Comunes

```bash
# Listar paquetes disponibles
tanzu package available list -A

# Instalar Contour (Ingress Controller)
tanzu package install contour \
  --package contour.tanzu.vmware.com \
  --version 1.25.2+vmware.1 \
  --values-file contour-values.yaml \
  --namespace tkg-system

# Instalar Harbor (Container Registry)
tanzu package install harbor \
  --package harbor.tanzu.vmware.com \
  --version 2.9.1+vmware.1 \
  --values-file harbor-values.yaml \
  --namespace tanzu-system-registry

# Instalar Prometheus + Grafana
tanzu package install prometheus \
  --package prometheus.tanzu.vmware.com \
  --version 2.47.0+vmware.1 \
  --namespace tanzu-system-monitoring

# Ver paquetes instalados
tanzu package installed list -A
tanzu package installed get contour -n tkg-system
```

### Contour Values

```yaml
# contour-values.yaml
infrastructure_provider: vsphere
namespace: tanzu-system-ingress
contour:
  configFileContents:
    accesslog-format: json
  replicas: 2
envoy:
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/load-balancer-ip: "10.0.1.100"
  hostPorts:
    enable: false
```

---

## 3.6 Tanzu con vSphere (vSphere with Tanzu)

### Supervisor Cluster

El Supervisor Cluster es un cluster Kubernetes integrado en vSphere que gestiona la infraestructura.

```yaml
# TanzuKubernetesCluster (vSphere with Tanzu)
apiVersion: run.tanzu.vmware.com/v1alpha3
kind: TanzuKubernetesCluster
metadata:
  name: workload-cluster
  namespace: my-namespace
spec:
  topology:
    controlPlane:
      replicas: 3
      vmClass: best-effort-medium
      storageClass: vsan-default-storage-policy
      tkr:
        reference:
          name: v1.27.5---vmware.1-tkg.1
    nodePools:
    - name: worker-pool
      replicas: 5
      vmClass: best-effort-xlarge
      storageClass: vsan-default-storage-policy
      tkr:
        reference:
          name: v1.27.5---vmware.1-tkg.1
  settings:
    storage:
      defaultClass: vsan-default-storage-policy
    network:
      cni:
        name: antrea
      services:
        cidrBlocks:
        - 10.96.0.0/12
      pods:
        cidrBlocks:
        - 192.168.0.0/16
```

### VM Classes (vSphere with Tanzu)

| VM Class | CPU | Memory | Uso |
|----------|-----|--------|-----|
| best-effort-xsmall | 2 | 2 GB | Dev/Test |
| best-effort-small | 2 | 4 GB | Aplicaciones ligeras |
| best-effort-medium | 2 | 8 GB | Workloads típicos |
| best-effort-large | 4 | 16 GB | Aplicaciones medianas |
| best-effort-xlarge | 4 | 32 GB | Bases de datos |
| best-effort-2xlarge | 8 | 64 GB | Cargas pesadas |

---

## 3.7 Autenticación en TKG (Pinniped)

```yaml
# Pinniped configuration para LDAP
apiVersion: idp.supervisor.pinniped.dev/v1alpha1
kind: LDAPIdentityProvider
metadata:
  name: corporate-ldap
  namespace: pinniped-supervisor
spec:
  host: "ldap.company.com:636"
  tls:
    certificateAuthorityData: "LS0tLS1..."
  bind:
    secretName: ldap-bind-credentials
  userSearch:
    base: "ou=users,dc=company,dc=com"
    filter: "&(objectClass=person)(uid={})"
    attributes:
      username: "uid"
      uid: "uidNumber"
  groupSearch:
    base: "ou=groups,dc=company,dc=com"
    filter: "&(objectClass=groupOfNames)(member={})"
    attributes:
      groupName: "cn"
```

---

## Resumen Clave para Certificación

| Concepto | Punto Crítico |
|----------|---------------|
| TKG | Distribución K8s enterprise: management cluster + workload clusters |
| TAP | PaaS sobre K8s con supply chains automatizados (código → producción) |
| TMC | Gestión multi-cluster centralizada: políticas, backup, lifecycle |
| Cartographer | Orquesta supply chains declarativamente (source → build → deploy) |
| vSphere with Tanzu | Supervisor Cluster integrado en vCenter, VM Classes para sizing |
| Pinniped | Autenticación federada (LDAP, OIDC) para clusters TKG |
| Packages | Extensiones gestionadas: Contour, Harbor, Prometheus, Grafana |
| Buildpacks | Construcción automática de imágenes OCI sin Dockerfile |
