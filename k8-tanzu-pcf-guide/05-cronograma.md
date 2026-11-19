# Cronograma de Estudio - 10 Semanas

## Visión General

Plan estructurado para dominar Kubernetes, VMware Tanzu y Pivotal Cloud Foundry (PCF/TAS) en 10 semanas con dedicación de 1.5-2 horas diarias.

---

## Semanas 1-2: Kubernetes Fundamentos

### Objetivos
- Comprender la arquitectura de Kubernetes
- Dominar los objetos básicos (Pods, Deployments, Services)
- Manejar networking, storage y configuración

### Temario Diario

| Día | Tema | Práctica |
|-----|------|----------|
| 1 | Arquitectura: Control Plane y Worker Nodes | Instalar minikube/kind, explorar componentes |
| 2 | Pods y contenedores multi-container | Crear pods, sidecar patterns |
| 3 | Deployments y ReplicaSets | Rolling updates, rollbacks |
| 4 | Services: ClusterIP, NodePort, LoadBalancer | Exponer apps, verificar conectividad |
| 5 | Ingress y Networking | Instalar ingress controller, configurar rutas |
| 6 | ConfigMaps y Secrets | Inyectar config, montar como volúmenes |
| 7 | PersistentVolumes, PVCs, StorageClasses | Provisión dinámica, access modes |
| 8 | Namespaces y ResourceQuotas | Multi-tenancy, limits |
| 9 | RBAC: Roles, ClusterRoles, Bindings | Crear roles para diferentes equipos |
| 10 | NetworkPolicies | Deny all, allow selectivo |
| 11-12 | Laboratorio integrador + Quiz Semana 1-2 | App multi-tier completa |
| 13-14 | Repaso y práctica de examen | 30 preguntas de práctica |

### Laboratorio Semana 2
Desplegar aplicación completa:
- Frontend (nginx) con Ingress + TLS
- Backend (API) con HPA
- Base de datos (PostgreSQL) con StatefulSet + PVC
- ConfigMaps para configuración
- NetworkPolicies entre tiers

---

## Semanas 3-4: Kubernetes Avanzado

### Objetivos
- Dominar workloads avanzados (StatefulSets, DaemonSets, Jobs)
- Entender scheduling avanzado
- Implementar seguridad y observabilidad

### Temario Diario

| Día | Tema | Práctica |
|-----|------|----------|
| 1 | StatefulSets y Headless Services | Desplegar cluster de DB |
| 2 | DaemonSets | Desplegar agente de logging |
| 3 | Jobs y CronJobs | Tareas batch, backups programados |
| 4 | HPA y VPA | Auto-escalamiento con métricas |
| 5 | Taints, Tolerations, NodeAffinity | Scheduling controlado |
| 6 | PodAffinity, PodAntiAffinity, PDB | Alta disponibilidad |
| 7 | Pod Security Standards y SecurityContext | Hardening de pods |
| 8 | Service Accounts, Token Projection | Seguridad de identidad |
| 9 | Helm: instalar, crear charts | Desplegar apps con Helm |
| 10 | Estrategias de Deploy: Blue/Green, Canary | Implementar zero-downtime |
| 11 | Probes avanzadas y Observabilidad | startup/liveness/readiness |
| 12 | Prometheus y ServiceMonitor | Monitoreo con Prometheus |
| 13-14 | Laboratorio integrador + Quiz Semana 3-4 | Cluster production-ready |

### Laboratorio Semana 4
Cluster production-ready:
- StatefulSet con PDB para base de datos
- HPA con métricas custom
- DaemonSet para Fluentd
- Helm chart propio
- Blue/Green deployment

---

## Semanas 5-6: VMware Tanzu

### Objetivos
- Comprender el portfolio Tanzu
- Instalar y operar TKG
- Dominar TAP y supply chains
- Gestión multi-cluster con TMC

### Temario Diario

| Día | Tema | Práctica |
|-----|------|----------|
| 1 | Overview del portfolio Tanzu | Diagrama de componentes |
| 2 | TKG: Arquitectura y Management Cluster | Revisar documentación |
| 3 | TKG: Crear Workload Clusters | tanzu cluster create |
| 4 | TKG Packages: Contour, Harbor | Instalar paquetes |
| 5 | TKG Packages: Prometheus, Grafana, Fluent Bit | Observabilidad |
| 6 | TAP: Overview y Supply Chains | Cartographer conceptos |
| 7 | TAP: Workloads y developer workflow | tanzu apps workload create |
| 8 | TAP: Buildpacks y Knative | Builds automáticos |
| 9 | TMC: Gestión centralizada | Políticas y clusters |
| 10 | vSphere with Tanzu: Supervisor Cluster | TanzuKubernetesCluster |
| 11 | Pinniped: Autenticación federada | LDAP/OIDC config |
| 12 | Tanzu Service Mesh | Seguridad inter-servicios |
| 13-14 | Laboratorio integrador + Quiz Semana 5-6 | Platform completa |

### Laboratorio Semana 6
Plataforma Tanzu completa:
- TKG management + workload cluster
- Contour como ingress
- Harbor como registry
- Deploy de app via TAP supply chain
- Monitoreo con Prometheus/Grafana

---

## Semanas 7-8: Pivotal Cloud Foundry / TAS

### Objetivos
- Comprender la arquitectura de Cloud Foundry
- Dominar cf push y el ciclo de vida de aplicaciones
- Gestionar services, buildpacks y networking
- Operaciones con BOSH

### Temario Diario

| Día | Tema | Práctica |
|-----|------|----------|
| 1 | Arquitectura CF: Diego, Gorouter, UAA | Diagrama de componentes |
| 2 | Orgs, Spaces, Roles | Crear orgs/spaces, asignar roles |
| 3 | cf push y manifest.yml | Desplegar diferentes apps |
| 4 | Buildpacks y staging | Java, Node.js, Python buildpacks |
| 5 | Services Marketplace y Binding | Crear/bind servicios |
| 6 | User-Provided Services y VCAP_SERVICES | Servicios externos |
| 7 | Routes, Domains y Blue-Green deploy | Zero-downtime deployment |
| 8 | Scaling, Health Checks, SSH | Operaciones de app |
| 9 | Logging (Loggregator) y Drains | Configurar log drain |
| 10 | Spring Cloud Services | Config Server, Registry |
| 11 | ASGs y seguridad de red | Firewall rules |
| 12 | BOSH: operaciones de plataforma | Stemcells, releases, tasks |
| 13-14 | Laboratorio integrador + Quiz Semana 7-8 | App full-stack en CF |

### Laboratorio Semana 8
Aplicación full-stack en Cloud Foundry:
- Backend Spring Boot con service binding (DB + Cache)
- Frontend estático con staticfile_buildpack
- Config Server para configuración externalizada
- Blue-Green deployment
- Log drain a sistema externo
- ASGs configurados

---

## Semana 9: Integración y Comparativas

### Objetivos
- Entender cuándo usar cada tecnología
- Migración entre plataformas
- Patrones de arquitectura empresarial

### Temario Diario

| Día | Tema | Práctica |
|-----|------|----------|
| 1 | Kubernetes vs Cloud Foundry: cuándo usar qué | Tabla comparativa |
| 2 | Migración de CF a Kubernetes/TAP | Plan de migración |
| 3 | Patrones multi-cluster y multi-cloud | Arquitectura de referencia |
| 4 | CI/CD para K8s, Tanzu y CF | Pipelines con GitHub Actions |
| 5 | Seguridad enterprise end-to-end | Compliance y auditoría |
| 6 | Networking avanzado: Service Mesh vs Gorouter | Comparativa de enrutamiento |
| 7 | Casos de estudio y escenarios reales | Resolver 10 escenarios |

---

## Semana 10: Repaso Final y Exámenes de Práctica

### Objetivos
- Identificar y reforzar áreas débiles
- Practicar con exámenes completos
- Ganar velocidad y confianza

### Plan de la Semana

| Día | Actividad |
|-----|-----------|
| 1 | Examen de práctica completo #1 (60 preguntas, 90 min) |
| 2 | Revisión de respuestas incorrectas, estudio dirigido |
| 3 | Examen de práctica completo #2 (60 preguntas, 90 min) |
| 4 | Revisión + flashcards de conceptos clave |
| 5 | Examen de práctica completo #3 (60 preguntas, 90 min) |
| 6 | Repaso final de tablas comparativas y cheatsheets |
| 7 | Descanso + revisión ligera de notas |

---

## Recursos Recomendados por Semana

| Semana | Recurso Principal |
|--------|-------------------|
| 1-2 | kubernetes.io/docs, KillerCoda labs, CKAD exercises |
| 3-4 | CKA practice exams, Helm docs, Kubernetes patterns book |
| 5-6 | docs.vmware.com/tanzu, TAP docs, Tanzu Developer Center |
| 7-8 | docs.cloudfoundry.org, PCF/TAS documentation, cf CLI reference |
| 9 | Architecture whitepapers, case studies |
| 10 | Practice exams, flashcards, cheat sheets |

---

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Quiz semanal | ≥ 75% desde semana 3 |
| Exámenes de práctica | ≥ 80% en semana 10 |
| Labs completados | 100% de labs semanales |
| Tiempo por pregunta | < 90 segundos promedio |
| Conceptos memorizados | Tablas comparativas sin consultar |
