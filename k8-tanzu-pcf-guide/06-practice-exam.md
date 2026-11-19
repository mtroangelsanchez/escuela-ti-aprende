# Examen de Práctica - Kubernetes, Tanzu y PCF

## Instrucciones
- 60 preguntas de opción múltiple
- Tiempo sugerido: 90 minutos
- Puntaje mínimo para aprobar: 72%
- Distribución: 30% Kubernetes Fundamentos, 20% Kubernetes Avanzado, 25% Tanzu, 25% PCF

---

## Sección 1: Kubernetes Fundamentos (18 preguntas)

### Pregunta 1
¿Cuál componente del Control Plane almacena todo el estado del cluster?

A) kube-apiserver  
B) kube-scheduler  
C) etcd  
D) kube-controller-manager

**Respuesta:** C  
**Explicación:** etcd es la base de datos clave-valor distribuida que almacena todo el estado del cluster. Es el único componente stateful del control plane.

---

### Pregunta 2
¿Qué tipo de Service es el default cuando no se especifica `type`?

A) NodePort  
B) LoadBalancer  
C) ExternalName  
D) ClusterIP

**Respuesta:** D  
**Explicación:** ClusterIP es el tipo por defecto. Crea una IP virtual interna accesible solo dentro del cluster.

---

### Pregunta 3
Un Deployment tiene `maxSurge: 1` y `maxUnavailable: 0` con 3 réplicas. ¿Cuántos Pods máximo existirán durante una actualización?

A) 3  
B) 4  
C) 5  
D) 6

**Respuesta:** B  
**Explicación:** maxSurge: 1 permite crear 1 Pod adicional sobre las réplicas deseadas (3+1=4). maxUnavailable: 0 asegura que siempre haya al menos 3 Pods disponibles.

---

### Pregunta 4
¿Cuál access mode de PersistentVolume permite que múltiples nodos monten el volumen en lectura-escritura?

A) ReadWriteOnce (RWO)  
B) ReadOnlyMany (ROX)  
C) ReadWriteMany (RWX)  
D) ReadWriteOncePod (RWOP)

**Respuesta:** C  
**Explicación:** ReadWriteMany (RWX) permite que múltiples nodos monten el volumen simultáneamente con acceso de lectura-escritura. Soportado por NFS, EFS, etc.

---

### Pregunta 5
¿Qué recurso RBAC otorga permisos a nivel de namespace específico?

A) ClusterRole + ClusterRoleBinding  
B) Role + RoleBinding  
C) ClusterRole + RoleBinding  
D) ServiceAccount

**Respuesta:** B  
**Explicación:** Role define permisos dentro de un namespace. RoleBinding vincula un Role a un usuario/grupo/SA dentro del mismo namespace.

---

### Pregunta 6
Un Pod tiene un `readinessProbe` que falla. ¿Qué sucede?

A) El Pod se reinicia  
B) El Pod se elimina  
C) El Pod se remueve del Service (no recibe tráfico)  
D) El nodo se marca como NotReady

**Respuesta:** C  
**Explicación:** readinessProbe determina si el Pod está listo para recibir tráfico. Si falla, el Pod se remueve de los endpoints del Service pero sigue ejecutándose.

---

### Pregunta 7
¿Cuál es el rango de puertos válido para un Service de tipo NodePort?

A) 1-65535  
B) 80-443  
C) 30000-32767  
D) 8080-9090

**Respuesta:** C  
**Explicación:** NodePort asigna un puerto en el rango 30000-32767 por defecto en todos los nodos del cluster.

---

### Pregunta 8
¿Qué tipo de Ingress path matching es más específico?

A) Prefix  
B) Exact  
C) ImplementationSpecific  
D) Regex

**Respuesta:** B  
**Explicación:** Exact requiere una coincidencia exacta del path. Prefix coincide con cualquier path que empiece con el valor especificado.

---

### Pregunta 9
¿Qué sucede si se elimina un ConfigMap que está montado como volumen en un Pod en ejecución?

A) El Pod falla inmediatamente  
B) El Pod sigue funcionando con los datos cacheados  
C) El Pod se reinicia automáticamente  
D) Los archivos desaparecen del volumen

**Respuesta:** B  
**Explicación:** Los ConfigMaps montados como volúmenes se actualizan periódicamente (kubelet sync period), pero eliminar el ConfigMap no causa una falla inmediata del Pod. Los datos ya montados persisten hasta el siguiente sync.

---

### Pregunta 10
¿Cuál NetworkPolicy aísla completamente un namespace de tráfico ingress?

A) `spec: { podSelector: {}, policyTypes: [Ingress] }`  
B) `spec: { podSelector: {}, policyTypes: [Egress] }`  
C) `spec: { podSelector: {matchLabels: {deny: all}} }`  
D) NetworkPolicies no pueden aislar namespaces completos

**Respuesta:** A  
**Explicación:** podSelector vacío selecciona TODOS los pods del namespace. policyTypes: [Ingress] sin reglas de ingress = deny all ingress.

---

### Pregunta 11
¿Qué componente del worker node mantiene las reglas de red para los Services?

A) kubelet  
B) kube-proxy  
C) Container Runtime  
D) CoreDNS

**Respuesta:** B  
**Explicación:** kube-proxy mantiene reglas de red (iptables o IPVS) en cada nodo para dirigir el tráfico de los Services a los Pods correspondientes.

---

### Pregunta 12
¿Cuál es la diferencia principal entre `kubectl apply` y `kubectl create`?

A) apply es más rápido  
B) create soporta más recursos  
C) apply es declarativo (crea o actualiza), create es imperativo (solo crea)  
D) No hay diferencia

**Respuesta:** C  
**Explicación:** `kubectl apply` es declarativo: crea el recurso si no existe o lo actualiza si ya existe. `kubectl create` es imperativo: falla si el recurso ya existe.

---

### Pregunta 13
Un Pod usa `resources.requests.memory: 256Mi` y `resources.limits.memory: 512Mi`. ¿Qué pasa si usa 600Mi?

A) Se throttlea hasta 512Mi  
B) Se mata con OOMKilled  
C) Se mueve a otro nodo  
D) Se ignora el límite

**Respuesta:** B  
**Explicación:** Si un contenedor excede su memory limit, el kernel Linux lo mata con OOM (Out Of Memory). A diferencia de CPU que se throttlea, la memoria no se puede "limitar" de forma gradual.

---

### Pregunta 14
¿Qué DNS record se crea para un Service tipo ClusterIP llamado "api" en namespace "prod"?

A) api.prod  
B) api.prod.svc.cluster.local  
C) prod-api.cluster.local  
D) api.svc.prod.local

**Respuesta:** B  
**Explicación:** El formato DNS de un Service es: `<service-name>.<namespace>.svc.cluster.local`

---

### Pregunta 15
¿Cuál Secret type se usa para credenciales de Docker Registry?

A) Opaque  
B) kubernetes.io/tls  
C) kubernetes.io/dockerconfigjson  
D) kubernetes.io/basic-auth

**Respuesta:** C  
**Explicación:** El type `kubernetes.io/dockerconfigjson` almacena credenciales para pull de imágenes de registries privados. Se referencia con `imagePullSecrets`.

---

### Pregunta 16
¿Qué ResourceQuota limita el número total de Pods en un namespace?

A) `limits.pods`  
B) `count/pods`  
C) `pods`  
D) `max-pods`

**Respuesta:** C  
**Explicación:** En ResourceQuota, el campo `pods` directamente limita el número máximo de Pods que pueden existir en el namespace.

---

### Pregunta 17
¿Cuál flag de `kubectl` muestra en qué nodo se ejecuta cada Pod?

A) `--all-namespaces`  
B) `--show-labels`  
C) `-o wide`  
D) `--verbose`

**Respuesta:** C  
**Explicación:** `-o wide` muestra información adicional incluyendo el nodo donde se ejecuta el Pod, la IP del Pod, y otros detalles.

---

### Pregunta 18
¿Qué pasa si un Pod referencia un Secret que no existe?

A) Se crea con valores vacíos  
B) El Pod queda en estado Pending  
C) El Pod se crea pero el contenedor falla al iniciar (CreateContainerConfigError)  
D) Se ignora silenciosamente

**Respuesta:** C  
**Explicación:** Si un Pod referencia un Secret inexistente (como variable de entorno), el contenedor no puede iniciar y muestra error `CreateContainerConfigError`.

---

## Sección 2: Kubernetes Avanzado (12 preguntas)

### Pregunta 19
¿Qué garantiza un StatefulSet que un Deployment no?

A) Alta disponibilidad  
B) Rolling updates  
C) Identidad de red estable y almacenamiento persistente por pod  
D) Auto-scaling

**Respuesta:** C  
**Explicación:** StatefulSet proporciona: nombres de Pod predecibles (pod-0, pod-1), DNS estable, PVCs individuales por réplica, y orden garantizado de creación/eliminación.

---

### Pregunta 20
¿Cuál Taint effect evita que NUEVOS Pods se programen en un nodo pero NO desaloja los existentes?

A) NoExecute  
B) NoSchedule  
C) PreferNoSchedule  
D) DontSchedule

**Respuesta:** B  
**Explicación:** NoSchedule impide que nuevos Pods se programen sin la Toleration correspondiente, pero no afecta Pods ya ejecutándose en el nodo. NoExecute sí desaloja.

---

### Pregunta 21
Un HPA tiene `stabilizationWindowSeconds: 300` para scaleDown. ¿Qué significa?

A) Espera 300s antes de empezar a monitorear  
B) El HPA se desactiva por 300s después de cada escala  
C) No reduce réplicas hasta que la métrica está estable durante 300s  
D) Reduce 1 réplica cada 300s

**Respuesta:** C  
**Explicación:** stabilizationWindow evita el "flapping" (escalar arriba y abajo constantemente). El HPA espera que las métricas se mantengan por debajo del umbral durante el período de ventana antes de reducir réplicas.

---

### Pregunta 22
¿Cuál `concurrencyPolicy` de CronJob evita que se ejecuten múltiples Jobs simultáneamente?

A) Replace  
B) Allow  
C) Forbid  
D) Serial

**Respuesta:** C  
**Explicación:** `Forbid` impide crear un nuevo Job si el anterior aún se ejecuta. `Allow` permite concurrencia. `Replace` cancela el actual e inicia uno nuevo.

---

### Pregunta 23
¿Qué Pod Security Standard es el más restrictivo?

A) Privileged  
B) Baseline  
C) Restricted  
D) Hardened

**Respuesta:** C  
**Explicación:** Los niveles son: Privileged (sin restricciones) → Baseline (previene escalaciones conocidas) → Restricted (mejores prácticas de seguridad). No existe "Hardened" como nivel estándar.

---

### Pregunta 24
Para un cluster HPC que requiere mínima latencia inter-nodo, ¿qué combinación usar?

A) Spread Placement Group + ELB  
B) Cluster Placement Group + EFA  
C) Partition Placement Group + NLB  
D) DaemonSet + Host Network

**Respuesta:** B  
**Explicación:** Cluster Placement Group coloca instancias en el mismo rack. EFA (Elastic Fabric Adapter) provee bypass del kernel para comunicación directa MPI, ideal para HPC.

---

### Pregunta 25
Un PodDisruptionBudget con `minAvailable: 2` y 3 réplicas. ¿Cuántos Pods pueden estar down simultáneamente durante mantenimiento?

A) 0  
B) 1  
C) 2  
D) 3

**Respuesta:** B  
**Explicación:** Con minAvailable: 2 y 3 réplicas, solo 1 Pod puede estar unavailable a la vez (3 - 2 = 1).

---

### Pregunta 26
¿Qué comando de Helm restaura una release a una revisión anterior?

A) `helm undo`  
B) `helm rollback <release> <revision>`  
C) `helm restore`  
D) `helm revert`

**Respuesta:** B  
**Explicación:** `helm rollback <release-name> <revision-number>` restaura una release a una revisión anterior. Las revisiones se ven con `helm history`.

---

### Pregunta 27
¿Cuál es la diferencia entre `podAffinity` required y preferred?

A) required es más rápido  
B) required es hard constraint (obligatorio), preferred es soft constraint (mejor esfuerzo)  
C) preferred aplica solo en scheduling, required en runtime  
D) No hay diferencia funcional

**Respuesta:** B  
**Explicación:** `requiredDuringSchedulingIgnoredDuringExecution` es un hard constraint: si no se cumple, el Pod no se programa. `preferredDuringScheduling...` es soft: el scheduler intenta cumplirlo pero no es obligatorio.

---

### Pregunta 28
¿Qué probe se usa para determinar si una aplicación con arranque lento ha terminado de inicializar?

A) livenessProbe  
B) readinessProbe  
C) startupProbe  
D) initializationProbe

**Respuesta:** C  
**Explicación:** startupProbe se ejecuta solo durante el arranque. Mientras startupProbe no tenga éxito, liveness y readiness probes se desactivan. Ideal para apps que tardan en iniciar.

---

### Pregunta 29
En un DaemonSet, ¿cómo se ejecuta un Pod en nodos del control plane que tienen el taint `node-role.kubernetes.io/control-plane:NoSchedule`?

A) Usando nodeSelector  
B) Añadiendo una Toleration para ese taint  
C) Usando priorityClassName  
D) No es posible

**Respuesta:** B  
**Explicación:** Se agrega una toleration: `{key: "node-role.kubernetes.io/control-plane", operator: "Exists", effect: "NoSchedule"}` para que el DaemonSet pueda programar Pods en nodos del control plane.

---

### Pregunta 30
¿Cuál estrategia de deployment en Kubernetes elimina TODOS los Pods existentes antes de crear los nuevos?

A) RollingUpdate  
B) Recreate  
C) BlueGreen  
D) Canary

**Respuesta:** B  
**Explicación:** `strategy.type: Recreate` elimina todos los Pods del Deployment actual antes de crear los nuevos. Causa downtime pero es necesario cuando no pueden coexistir dos versiones.

---

## Sección 3: VMware Tanzu (15 preguntas)

### Pregunta 31
¿Cuál producto Tanzu es una distribución Kubernetes conformant para múltiples clouds?

A) Tanzu Application Platform  
B) Tanzu Mission Control  
C) Tanzu Kubernetes Grid  
D) Tanzu Application Service

**Respuesta:** C  
**Explicación:** Tanzu Kubernetes Grid (TKG) es la distribución Kubernetes enterprise de VMware que funciona en vSphere, AWS, y Azure con conformance certificada por CNCF.

---

### Pregunta 32
¿Qué componente de TAP orquesta el pipeline de código a producción (supply chain)?

A) Knative  
B) Cartographer  
C) Backstage  
D) Crossplane

**Respuesta:** B  
**Explicación:** Cartographer define y orquesta Supply Chains declarativamente: desde source code, pasando por build (buildpacks), testing, hasta deployment en producción.

---

### Pregunta 33
¿Qué tipo de cluster en TKG gestiona el ciclo de vida de otros clusters?

A) Supervisor Cluster  
B) Management Cluster  
C) Master Cluster  
D) Control Cluster

**Respuesta:** B  
**Explicación:** El Management Cluster usa Cluster API para gestionar el ciclo de vida (crear, actualizar, escalar, eliminar) de los Workload Clusters.

---

### Pregunta 34
¿Qué paquete TKG proporciona funcionalidad de Ingress Controller?

A) Harbor  
B) Prometheus  
C) Contour  
D) Fluent Bit

**Respuesta:** C  
**Explicación:** Contour es el Ingress Controller incluido como paquete en TKG. Usa Envoy como data plane proxy y soporta HTTPProxy CRD para configuración avanzada.

---

### Pregunta 35
¿Qué componente Tanzu proporciona autenticación federada (LDAP/OIDC) para clusters?

A) UAA  
B) Pinniped  
C) Dex  
D) Keycloak

**Respuesta:** B  
**Explicación:** Pinniped es el componente de autenticación en TKG que permite federar identidad desde LDAP, OIDC, y otros proveedores hacia los clusters Kubernetes.

---

### Pregunta 36
En Tanzu Application Platform, ¿cómo se llama el portal de desarrollador basado en Backstage?

A) TAP Developer Portal  
B) TAP GUI  
C) Tanzu Dashboard  
D) Application Live View

**Respuesta:** B  
**Explicación:** TAP GUI es el portal de desarrollador basado en Backstage que proporciona catálogo de servicios, visualización de supply chains, y acceso a APIs y documentación.

---

### Pregunta 37
¿Qué producto Tanzu permite gestionar múltiples clusters desde una consola central con políticas unificadas?

A) Tanzu Kubernetes Grid  
B) Tanzu Application Platform  
C) Tanzu Mission Control  
D) Tanzu Observability

**Respuesta:** C  
**Explicación:** Tanzu Mission Control (TMC) proporciona gestión centralizada multi-cluster: lifecycle, políticas de seguridad, backup con Velero, y conformance testing.

---

### Pregunta 38
¿Qué tecnología usa TAP para construir imágenes de contenedor automáticamente sin Dockerfile?

A) Docker Build  
B) Kaniko  
C) Cloud Native Buildpacks  
D) Podman

**Respuesta:** C  
**Explicación:** Cloud Native Buildpacks detectan el lenguaje y framework del código fuente y construyen imágenes OCI reproducibles automáticamente, sin necesidad de escribir un Dockerfile.

---

### Pregunta 39
En vSphere with Tanzu, ¿qué recurso define el tamaño de las VMs para nodos de un cluster?

A) NodePool  
B) VM Class  
C) Machine Template  
D) Instance Type

**Respuesta:** B  
**Explicación:** VM Classes definen los recursos de CPU y memoria para las VMs de nodos en vSphere with Tanzu (ej: best-effort-medium = 2 CPU, 8 GB RAM).

---

### Pregunta 40
¿Cuál es la evolución de Pivotal Cloud Foundry en el portfolio Tanzu?

A) Tanzu Application Platform  
B) Tanzu Kubernetes Grid  
C) Tanzu Application Service  
D) Tanzu Build Service

**Respuesta:** C  
**Explicación:** Tanzu Application Service (TAS) es la evolución directa de Pivotal Cloud Foundry (PCF). Mantiene la experiencia cf push sobre infraestructura moderna.

---

### Pregunta 41
¿Qué comando Tanzu CLI se usa para instalar un paquete de extensión?

A) `tanzu extension install`  
B) `tanzu package install`  
C) `tanzu addon install`  
D) `tanzu plugin install`

**Respuesta:** B  
**Explicación:** `tanzu package install <name> --package <package-name> --version <version>` instala un paquete de la cartucho PackageRepository del cluster.

---

### Pregunta 42
¿Qué componente Tanzu proporciona funcionalidad serverless sobre Kubernetes?

A) Cartographer  
B) Flux  
C) Knative  
D) Argo

**Respuesta:** C  
**Explicación:** Knative proporciona capacidades serverless en TAP: scale-to-zero, auto-scaling basado en tráfico, y gestión de revisions para blue/green deployments.

---

### Pregunta 43
¿Cuál es el propósito de Crossplane en Tanzu Application Platform?

A) Monitoreo de aplicaciones  
B) Service mesh entre pods  
C) Provisión de servicios de infraestructura como código  
D) Ingress routing

**Respuesta:** C  
**Explicación:** Crossplane permite a los desarrolladores provisionar servicios de infraestructura (bases de datos, caches, queues) de forma declarativa como recursos de Kubernetes.

---

### Pregunta 44
¿Qué herramienta usa TMC para realizar backup y restore de clusters?

A) Kasten K10  
B) Velero  
C) Restic  
D) BOSH Backup

**Respuesta:** B  
**Explicación:** Tanzu Mission Control integra Velero para data protection: backup y restore de recursos de Kubernetes y persistent volumes.

---

### Pregunta 45
¿Qué CRD personalizado de Contour ofrece funcionalidad más avanzada que el Ingress estándar de Kubernetes?

A) IngressRoute  
B) VirtualService  
C) HTTPProxy  
D) Gateway

**Respuesta:** C  
**Explicación:** HTTPProxy es el CRD nativo de Contour que ofrece: rate limiting, header policies, weighted routing, TLS delegation, y otras funcionalidades más avanzadas que el Ingress estándar.

---

## Sección 4: Pivotal Cloud Foundry / TAS (15 preguntas)

### Pregunta 46
¿Qué componente de Cloud Foundry es responsable de orquestar los contenedores de aplicaciones?

A) Gorouter  
B) Cloud Controller  
C) Diego  
D) UAA

**Respuesta:** C  
**Explicación:** Diego es el runtime de Cloud Foundry. Gestiona el scheduling, ejecución y health-checking de los contenedores de aplicaciones en las Diego Cells.

---

### Pregunta 47
¿Qué variable de entorno contiene las credenciales de servicios vinculados a una aplicación CF?

A) CF_SERVICES  
B) VCAP_SERVICES  
C) SERVICE_CREDENTIALS  
D) BOUND_SERVICES

**Respuesta:** B  
**Explicación:** VCAP_SERVICES es la variable de entorno JSON que contiene todas las credenciales de los servicios que están vinculados (bound) a la aplicación.

---

### Pregunta 48
¿Cuál rol de Space permite a un usuario desplegar aplicaciones y vincular servicios?

A) SpaceManager  
B) SpaceAuditor  
C) SpaceDeveloper  
D) OrgManager

**Respuesta:** C  
**Explicación:** SpaceDeveloper tiene permisos para: cf push, bind/unbind services, ver logs, SSH a apps, y gestionar rutas dentro del space.

---

### Pregunta 49
¿Qué hace `cf restage my-app`?

A) Reinicia la aplicación sin recompilar  
B) Re-ejecuta el buildpack y recrea el droplet  
C) Escala la aplicación a 0 y luego la inicia  
D) Actualiza las rutas de la aplicación

**Respuesta:** B  
**Explicación:** `cf restage` re-ejecuta el proceso de staging: detecta buildpack, compila código, y crea un nuevo droplet. Necesario cuando cambian variables de entorno o se actualiza un buildpack.

---

### Pregunta 50
¿Cuál es la diferencia entre `cf restart` y `cf restage`?

A) No hay diferencia  
B) restart reinicia contenedores; restage re-construye el droplet  
C) restage es más rápido  
D) restart actualiza el buildpack

**Respuesta:** B  
**Explicación:** `cf restart` solo reinicia los contenedores con el mismo droplet. `cf restage` re-ejecuta el buildpack y crea un nuevo droplet (necesario después de bind-service o cambio de buildpack).

---

### Pregunta 51
En un Blue-Green deployment en CF, ¿qué comando asocia una ruta de producción a la nueva versión?

A) `cf bind-route`  
B) `cf map-route`  
C) `cf add-route`  
D) `cf assign-route`

**Respuesta:** B  
**Explicación:** `cf map-route <app-name> <domain> --hostname <host>` asocia una ruta a una aplicación. Se usa para dirigir tráfico de producción a la nueva versión (green).

---

### Pregunta 52
¿Qué hace un buildpack en Cloud Foundry?

A) Crea una VM para la aplicación  
B) Detecta el lenguaje, compila la aplicación y produce un droplet ejecutable  
C) Configura el load balancer  
D) Provisiona servicios de base de datos

**Respuesta:** B  
**Explicación:** Los buildpacks detectan automáticamente el lenguaje/framework, descargan dependencias, compilan el código, y producen un "droplet" (tarball ejecutable) que Diego ejecuta.

---

### Pregunta 53
¿Qué componente de CF maneja la autenticación OAuth2 y gestión de tokens?

A) Cloud Controller  
B) Diego  
C) UAA  
D) Gorouter

**Respuesta:** C  
**Explicación:** UAA (User Account and Authentication) es el servidor OAuth2 de Cloud Foundry. Gestiona: autenticación de usuarios, tokens JWT, federación con LDAP/SAML, y scopes.

---

### Pregunta 54
¿Qué comando muestra los servicios disponibles en el marketplace?

A) `cf services`  
B) `cf marketplace`  
C) `cf offerings`  
D) `cf catalog`

**Respuesta:** B  
**Explicación:** `cf marketplace` muestra los servicios disponibles para provisionar (planes, descripciones). `cf services` muestra las instancias de servicio ya creadas.

---

### Pregunta 55
¿Qué herramienta gestiona el ciclo de vida de la plataforma Cloud Foundry (VMs, releases, stemcells)?

A) Terraform  
B) BOSH  
C) Concourse  
D) CredHub

**Respuesta:** B  
**Explicación:** BOSH despliega y gestiona la plataforma CF completa: provisiona VMs, aplica releases (software), gestiona stemcells (OS base), health monitoring, y self-healing.

---

### Pregunta 56
¿Cuál tipo de health-check verifica que la app responde en un endpoint HTTP?

A) port  
B) process  
C) http  
D) tcp

**Respuesta:** C  
**Explicación:** `health-check-type: http` verifica que la aplicación responde con HTTP 200 en el endpoint configurado (`health-check-http-endpoint`). Es el más completo.

---

### Pregunta 57
¿Para qué se usan los Application Security Groups (ASGs)?

A) Autenticación de usuarios  
B) Control de tráfico de egress desde aplicaciones  
C) Cifrado de datos en tránsito  
D) Rate limiting

**Respuesta:** B  
**Explicación:** ASGs definen reglas de firewall para el tráfico de salida (egress) de las aplicaciones CF. Controlan a qué IPs/puertos externos pueden conectarse las apps.

---

### Pregunta 58
¿Qué Spring Cloud Service proporciona configuración externalizada desde un repositorio Git?

A) Service Registry  
B) Config Server  
C) Circuit Breaker Dashboard  
D) Application Broker

**Respuesta:** B  
**Explicación:** Spring Cloud Config Server sirve configuración externalizada desde un repo Git. Las apps obtienen su configuración al iniciar y pueden refresharla sin reiniciar.

---

### Pregunta 59
¿Cuántas instancias de una app se crean por defecto con `cf push` si no se especifica?

A) 0  
B) 1  
C) 2  
D) 3

**Respuesta:** B  
**Explicación:** Por defecto, `cf push` crea 1 instancia de la aplicación. Se puede cambiar con `-i <num>` o `instances:` en el manifest.

---

### Pregunta 60
¿Qué comando permite ejecutar un proceso one-off (como migración de DB) sin iniciar la app principal?

A) `cf run-task`  
B) `cf ssh -c`  
C) `cf exec`  
D) `cf job`

**Respuesta:** A  
**Explicación:** `cf run-task <app> --command "migrate db"` ejecuta un proceso aislado one-off usando el mismo droplet de la app. Ideal para migraciones, tareas batch, y scripts.

---

## Tabla de Respuestas Rápidas

| # | R | # | R | # | R | # | R |
|---|---|---|---|---|---|---|---|
| 1 | C | 16 | C | 31 | C | 46 | C |
| 2 | D | 17 | C | 32 | B | 47 | B |
| 3 | B | 18 | C | 33 | B | 48 | C |
| 4 | C | 19 | C | 34 | C | 49 | B |
| 5 | B | 20 | B | 35 | B | 50 | B |
| 6 | C | 21 | C | 36 | B | 51 | B |
| 7 | C | 22 | C | 37 | C | 52 | B |
| 8 | B | 23 | C | 38 | C | 53 | C |
| 9 | B | 24 | B | 39 | B | 54 | B |
| 10 | A | 25 | B | 40 | C | 55 | B |
| 11 | B | 26 | B | 41 | B | 56 | C |
| 12 | C | 27 | B | 42 | C | 57 | B |
| 13 | B | 28 | C | 43 | C | 58 | B |
| 14 | B | 29 | B | 44 | B | 59 | B |
| 15 | C | 30 | B | 45 | C | 60 | A |
