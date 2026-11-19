# Dominio 4: Pivotal Cloud Foundry (PCF) / TAS

## 4.1 Visión General de Cloud Foundry

Cloud Foundry es una Platform-as-a-Service (PaaS) open source que abstrae la infraestructura para que los desarrolladores se enfoquen exclusivamente en el código. Pivotal Cloud Foundry (PCF) fue la distribución comercial, ahora renombrada como **VMware Tanzu Application Service (TAS)**.

### Filosofía: cf push

```bash
# El workflow más simple posible
cd my-application/
cf push my-app
```

Con un solo comando: detecta el lenguaje, construye la aplicación, crea un contenedor, configura networking, balancea carga, y despliega.

---

## 4.2 Arquitectura de Cloud Foundry

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                        Cloud Controller                       │
│            (API principal, gestiona apps y servicios)         │
└─────────────────────────────────────────────────────────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
┌────────────┐  ┌───────────┐  ┌──────────┐  ┌────────────┐
│   Diego     │  │  Gorouter │  │  UAA     │  │   Loggre-  │
│   (Runtime) │  │  (Router) │  │  (Auth)  │  │   gator    │
└────────────┘  └───────────┘  └──────────┘  └────────────┘
        │
        ▼
┌────────────────────────────────────────────┐
│              Diego Cells                     │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐      │
│  │ App │  │ App │  │ App │  │ App │      │
│  │  1  │  │  2  │  │  3  │  │  N  │      │
│  └─────┘  └─────┘  └─────┘  └─────┘      │
└────────────────────────────────────────────┘
```

| Componente | Función |
|-----------|---------|
| **Cloud Controller** | API REST, gestiona apps, orgs, spaces, service bindings |
| **Diego** | Orquestador de contenedores, gestiona el ciclo de vida de apps |
| **Gorouter** | Enrutador HTTP que distribuye tráfico entre instancias |
| **UAA** | User Account & Authentication (OAuth2, SAML, LDAP) |
| **Loggregator** | Sistema de logging y metrics agregado |
| **BOSH** | Herramienta para despliegue y gestión del ciclo de vida de la plataforma |
| **Buildpacks** | Detectan y compilan aplicaciones automáticamente |
| **Service Broker** | API estándar para provisionar servicios (DBs, queues, etc.) |

---

## 4.3 Organizaciones, Spaces y Roles

### Estructura Multi-tenant

```
┌─── Foundation (PCF Installation) ───────────────┐
│                                                  │
│  ┌─── Org: production ────────────────────────┐ │
│  │  ┌── Space: web ───┐  ┌── Space: api ──┐  │ │
│  │  │  app-frontend    │  │  app-backend   │  │ │
│  │  │  app-admin       │  │  app-worker    │  │ │
│  │  └─────────────────┘  └────────────────┘  │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌─── Org: staging ──────────────────────────┐  │
│  │  ┌── Space: dev ──┐  ┌── Space: qa ────┐ │  │
│  │  │  app-v2-test   │  │  app-v2-qa      │ │  │
│  │  └────────────────┘  └────────────────┘  │  │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### Roles

| Nivel | Rol | Permisos |
|-------|-----|----------|
| **Org** | OrgManager | Gestiona users, quotas, spaces |
| **Org** | BillingManager | Ve uso y facturación |
| **Org** | OrgAuditor | Solo lectura de org |
| **Space** | SpaceDeveloper | Push apps, bind services, ver logs |
| **Space** | SpaceManager | Gestiona users del space |
| **Space** | SpaceAuditor | Solo lectura del space |

```bash
# Gestión de orgs y spaces
cf create-org my-org
cf create-space production -o my-org
cf target -o my-org -s production

# Roles
cf set-org-role user@email.com my-org OrgManager
cf set-space-role user@email.com my-org production SpaceDeveloper
```

---

## 4.4 Desplegando Aplicaciones

### cf push con Manifest

```yaml
# manifest.yml
---
applications:
- name: my-api
  memory: 1G
  instances: 3
  disk_quota: 512M
  buildpacks:
  - java_buildpack_offline
  path: target/my-api-1.0.jar
  env:
    SPRING_PROFILES_ACTIVE: cloud
    JBP_CONFIG_OPEN_JDK_JRE: '{ jre: { version: 17.+ } }'
  routes:
  - route: my-api.apps.example.com
  - route: my-api-internal.apps.internal
  services:
  - postgres-db
  - redis-cache
  - config-server
  health-check-type: http
  health-check-http-endpoint: /actuator/health
  timeout: 180
  stack: cflinuxfs4

- name: my-frontend
  memory: 256M
  instances: 2
  buildpacks:
  - staticfile_buildpack
  path: dist/
  routes:
  - route: www.example.com
  env:
    FORCE_HTTPS: true
```

### Comandos Esenciales

```bash
# Deployment
cf push my-app                         # Push con manifest
cf push my-app -p app.jar -b java_buildpack  # Push explícito
cf push my-app --no-start              # Push sin iniciar
cf start my-app                        # Iniciar app
cf restart my-app                      # Reiniciar
cf restage my-app                      # Re-construir droplet

# Scaling
cf scale my-app -i 5                   # Escalar instancias
cf scale my-app -m 2G                  # Cambiar memoria
cf scale my-app -k 1G                  # Cambiar disco

# Información
cf apps                                # Listar apps
cf app my-app                          # Detalle de app
cf logs my-app --recent                # Logs recientes
cf logs my-app                         # Tail de logs
cf events my-app                       # Eventos recientes
cf env my-app                          # Variables de entorno

# Gestión de rutas
cf map-route my-app example.com --hostname api
cf unmap-route my-app example.com --hostname old-api
cf routes                              # Listar rutas

# Variables de entorno
cf set-env my-app DB_URL "postgres://..."
cf unset-env my-app OLD_VAR
```

---

## 4.5 Buildpacks

Los buildpacks detectan automáticamente el lenguaje y construyen la aplicación.

### Buildpacks Disponibles

| Buildpack | Detecta | Archivos clave |
|-----------|---------|----------------|
| **java_buildpack** | Java, Spring Boot | `.jar`, `.war`, `pom.xml` |
| **nodejs_buildpack** | Node.js | `package.json` |
| **python_buildpack** | Python | `requirements.txt`, `setup.py` |
| **go_buildpack** | Go | `go.mod`, `main.go` |
| **ruby_buildpack** | Ruby | `Gemfile` |
| **dotnet_core_buildpack** | .NET | `*.csproj`, `*.sln` |
| **staticfile_buildpack** | HTML/JS/CSS | `Staticfile` |
| **binary_buildpack** | Binarios compilados | N/A |
| **php_buildpack** | PHP | `composer.json`, `index.php` |

```bash
# Listar buildpacks disponibles
cf buildpacks

# Especificar buildpack
cf push my-app -b python_buildpack

# Múltiples buildpacks (multi-buildpack)
cf push my-app -b https://github.com/custom-bp -b java_buildpack
```

---

## 4.6 Services y Service Broker

### Marketplace

```bash
# Ver servicios disponibles
cf marketplace
cf marketplace -e p.mysql        # Detalles de un servicio

# Crear instancia de servicio
cf create-service p.mysql db-medium my-database
cf create-service p-redis shared-vm my-cache

# Bind (vincular a app)
cf bind-service my-app my-database
cf restage my-app               # Necesario después del bind

# Unbind
cf unbind-service my-app my-database

# Service Keys (credenciales sin bind)
cf create-service-key my-database external-access
cf service-key my-database external-access
```

### User-Provided Services

Para servicios externos no gestionados por el marketplace:

```bash
# Crear servicio con credenciales
cf create-user-provided-service external-db \
  -p '{"uri":"postgres://user:pass@external-host:5432/mydb"}'

# Crear servicio para syslog drain
cf create-user-provided-service my-logs \
  -l syslog://logs.example.com:514

# Crear servicio con route service
cf create-user-provided-service rate-limiter \
  -r https://rate-limiter.example.com
```

### VCAP_SERVICES

Cuando se hace bind, las credenciales se inyectan como JSON en la variable de entorno `VCAP_SERVICES`:

```json
{
  "p.mysql": [{
    "name": "my-database",
    "credentials": {
      "hostname": "10.0.4.35",
      "port": 3306,
      "username": "cf_user_abc123",
      "password": "generated_password",
      "uri": "mysql://cf_user_abc123:generated_password@10.0.4.35:3306/mydb"
    },
    "tags": ["mysql", "relational"],
    "plan": "db-medium"
  }]
}
```

---

## 4.7 Blue-Green Deployments en CF

```bash
# 1. Push nueva versión con nombre temporal
cf push my-app-green -f manifest.yml --no-route

# 2. Mapear la ruta de producción al green
cf map-route my-app-green example.com --hostname my-app

# 3. Verificar que funciona correctamente
# ... testing ...

# 4. Unmapear la ruta del blue (viejo)
cf unmap-route my-app-blue example.com --hostname my-app

# 5. Eliminar la versión vieja
cf delete my-app-blue -f

# 6. Renombrar green a producción
cf rename my-app-green my-app
```

### Autopilot Plugin (simplifica blue-green)

```bash
# Instalar plugin
cf install-plugin autopilot

# Deploy zero-downtime automático
cf zero-downtime-push my-app -f manifest.yml
```

---

## 4.8 Cloud Foundry CLI Avanzado

### SSH y Debugging

```bash
# SSH a una instancia
cf ssh my-app
cf ssh my-app -i 2               # Instancia específica

# Túnel SSH para debug
cf ssh my-app -L 5005:localhost:5005  # Debug port forwarding

# Ver contenedor del app
cf ssh my-app -c "ls /app"
cf ssh my-app -c "cat /etc/os-release"
```

### Tasks

```bash
# Ejecutar task one-off
cf run-task my-app --command "rake db:migrate" --name "migrate"
cf run-task my-app --command "python cleanup.py" --memory 2G

# Ver tasks
cf tasks my-app
```

### Application Security Groups (ASGs)

```json
[
  {
    "protocol": "tcp",
    "destination": "10.0.0.0/16",
    "ports": "5432",
    "description": "Allow access to internal PostgreSQL"
  },
  {
    "protocol": "tcp",
    "destination": "0.0.0.0/0",
    "ports": "443",
    "description": "Allow HTTPS outbound"
  }
]
```

```bash
cf create-security-group db-access db-asg.json
cf bind-security-group db-access my-org production
```

---

## 4.9 Spring Cloud Services (SCS)

Servicios empresariales comunes en PCF/TAS:

### Config Server

```bash
cf create-service p.config-server standard my-config \
  -c '{"git":{"uri":"https://github.com/org/config-repo","label":"main"}}'
cf bind-service my-app my-config
```

### Service Registry (Eureka)

```bash
cf create-service p.service-registry standard my-registry
cf bind-service my-app my-registry
```

### Circuit Breaker (Hystrix Dashboard)

```bash
cf create-service p-circuit-breaker-dashboard standard my-dashboard
```

---

## 4.10 Logging y Metrics

### Loggregator / Log Cache

```bash
# Logs de aplicación
cf logs my-app --recent          # Últimos logs buffered
cf logs my-app                   # Stream en tiempo real

# Tipos de logs:
# [APP/PROC/WEB/0] - Logs de la app
# [RTR/0] - Logs del router (requests HTTP)
# [STG] - Logs de staging (build)
# [CELL/0] - Logs de la célula Diego
# [API/0] - Logs del Cloud Controller

# Log Cache (query histórico)
cf install-plugin "log-cache"
cf query 'cpu{source_id="my-app-guid"}'
```

### Drains (enviar logs a sistemas externos)

```bash
# Syslog drain
cf create-user-provided-service splunk-drain \
  -l syslog-tls://splunk.example.com:6514

cf bind-service my-app splunk-drain
```

---

## 4.11 BOSH - Operaciones de Plataforma

BOSH es el sistema de despliegue y gestión del ciclo de vida de Cloud Foundry.

```bash
# Comandos básicos BOSH
bosh deployments              # Listar deployments
bosh vms                      # Ver VMs
bosh instances --details      # Detalle de instancias
bosh tasks --recent=20        # Tasks recientes
bosh releases                 # Releases instalados
bosh stemcells                # Stemcells disponibles

# Diagnósticos
bosh logs -d cf router         # Logs de un job
bosh ssh -d cf diego-cell/0    # SSH a una VM
bosh cloud-check -d cf         # Health check
bosh recreate -d cf router/0   # Recrear una VM
```

---

## Resumen Clave para Certificación

| Concepto | Punto Crítico |
|----------|---------------|
| cf push | Un comando para desplegar: detecta, construye, despliega, balancea |
| Orgs/Spaces | Multi-tenancy: Org (organización) > Space (ambiente) |
| Buildpacks | Auto-detección de lenguaje, construye sin Dockerfile |
| Services | Marketplace + broker, credenciales via VCAP_SERVICES |
| Diego | Runtime que orquesta contenedores (replacement de DEA) |
| Gorouter | HTTP router con round-robin y session affinity |
| UAA | Autenticación OAuth2/SAML, gestión de tokens |
| Blue-Green | Deploy sin downtime con route mapping/unmapping |
| BOSH | Lifecycle management de la plataforma completa |
| ASGs | Firewall rules para aplicaciones (egress control) |
| Manifest | YAML declarativo con config de la app (memoria, instancias, routes) |
